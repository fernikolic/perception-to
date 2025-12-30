#!/bin/bash

#############################################
# Ghost CMS Self-Hosted Setup on GCP
# For: Perception Newsletter
#
# Prerequisites:
# - gcloud CLI installed and authenticated
# - A GCP project with billing enabled
#
# Usage:
# chmod +x gcp-setup.sh
# ./gcp-setup.sh
#############################################

set -e  # Exit on error

# Configuration - EDIT THESE
PROJECT_ID="${GCP_PROJECT_ID:-perception-app-3db34}"
ZONE="us-central1-a"
REGION="us-central1"
INSTANCE_NAME="ghost-newsletter"
MACHINE_TYPE="e2-micro"  # Free tier eligible
BOOT_DISK_SIZE="30"      # GB, free tier allows 30GB
DOMAIN="newsletter.perception.to"  # Your Ghost domain

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Ghost CMS Self-Hosted GCP Setup      ${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "Configuration:"
echo "  Project:  $PROJECT_ID"
echo "  Zone:     $ZONE"
echo "  Instance: $INSTANCE_NAME"
echo "  Machine:  $MACHINE_TYPE"
echo "  Domain:   $DOMAIN"
echo ""

# Confirm before proceeding
read -p "Continue with this configuration? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Aborted."
    exit 1
fi

echo ""
echo -e "${YELLOW}Step 1: Setting GCP project...${NC}"
gcloud config set project $PROJECT_ID

echo ""
echo -e "${YELLOW}Step 2: Enabling required APIs...${NC}"
gcloud services enable compute.googleapis.com

echo ""
echo -e "${YELLOW}Step 3: Creating firewall rules...${NC}"

# Allow HTTP
gcloud compute firewall-rules create allow-http \
    --allow tcp:80 \
    --target-tags=http-server \
    --description="Allow HTTP traffic" \
    --quiet 2>/dev/null || echo "  HTTP rule already exists"

# Allow HTTPS
gcloud compute firewall-rules create allow-https \
    --allow tcp:443 \
    --target-tags=https-server \
    --description="Allow HTTPS traffic" \
    --quiet 2>/dev/null || echo "  HTTPS rule already exists"

echo ""
echo -e "${YELLOW}Step 4: Creating static IP address...${NC}"
gcloud compute addresses create ghost-ip \
    --region=$REGION \
    --quiet 2>/dev/null || echo "  Static IP already exists"

STATIC_IP=$(gcloud compute addresses describe ghost-ip --region=$REGION --format="get(address)")
echo -e "  Static IP: ${GREEN}$STATIC_IP${NC}"

echo ""
echo -e "${YELLOW}Step 5: Creating VM instance...${NC}"
gcloud compute instances create $INSTANCE_NAME \
    --zone=$ZONE \
    --machine-type=$MACHINE_TYPE \
    --image-family=ubuntu-2204-lts \
    --image-project=ubuntu-os-cloud \
    --boot-disk-size=${BOOT_DISK_SIZE}GB \
    --boot-disk-type=pd-standard \
    --address=$STATIC_IP \
    --tags=http-server,https-server \
    --metadata=startup-script='#!/bin/bash
# Basic system setup
apt-get update
apt-get upgrade -y

# Install required packages
apt-get install -y curl nginx mysql-server

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# Install Ghost CLI
npm install ghost-cli@latest -g

# Create ghost user
adduser --disabled-password --gecos "" ghost
usermod -aG sudo ghost

# Create Ghost directory
mkdir -p /var/www/ghost
chown ghost:ghost /var/www/ghost

echo "Initial setup complete. Run ghost-install.sh to complete Ghost installation."
' \
    --quiet

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  VM Created Successfully!             ${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "Instance Details:"
echo "  Name:      $INSTANCE_NAME"
echo "  Zone:      $ZONE"
echo "  Static IP: $STATIC_IP"
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo ""
echo "1. Update your DNS records:"
echo "   Add an A record: $DOMAIN -> $STATIC_IP"
echo ""
echo "2. SSH into the VM:"
echo "   gcloud compute ssh $INSTANCE_NAME --zone=$ZONE"
echo ""
echo "3. Run the Ghost installation script:"
echo "   sudo -u ghost bash /tmp/ghost-install.sh"
echo ""
echo "4. Configure Mailgun in Ghost Admin:"
echo "   https://$DOMAIN/ghost/#/settings/email"
echo ""

# Create the Ghost installation script
echo ""
echo -e "${YELLOW}Creating Ghost installation script...${NC}"

# SCP the installation script to the VM
cat > /tmp/ghost-install-local.sh << 'GHOST_SCRIPT'
#!/bin/bash

#############################################
# Ghost Installation Script
# Run this as the 'ghost' user on the VM
#############################################

DOMAIN="${1:-newsletter.perception.to}"
EMAIL="${2:-fernando@perception.to}"

echo "Installing Ghost for domain: $DOMAIN"
echo "SSL email: $EMAIL"

# Secure MySQL
echo "Securing MySQL..."
sudo mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'temporary_password';"

# Create Ghost database and user
GHOST_DB_PASS=$(openssl rand -base64 32)
sudo mysql -u root -ptemporary_password << EOF
CREATE DATABASE ghost_production;
CREATE USER 'ghost'@'localhost' IDENTIFIED BY '$GHOST_DB_PASS';
GRANT ALL PRIVILEGES ON ghost_production.* TO 'ghost'@'localhost';
FLUSH PRIVILEGES;
EOF

echo "MySQL configured. Ghost DB password saved to ~/.ghost-db-pass"
echo "$GHOST_DB_PASS" > ~/.ghost-db-pass
chmod 600 ~/.ghost-db-pass

# Install Ghost
cd /var/www/ghost
ghost install \
    --url "https://$DOMAIN" \
    --db mysql \
    --dbhost localhost \
    --dbuser ghost \
    --dbpass "$GHOST_DB_PASS" \
    --dbname ghost_production \
    --process systemd \
    --no-prompt

echo ""
echo "========================================="
echo "Ghost Installation Complete!"
echo "========================================="
echo ""
echo "Access Ghost Admin: https://$DOMAIN/ghost/"
echo ""
echo "Next: Configure Mailgun in Ghost Admin"
echo "  Settings -> Email newsletter"
echo "  Add your Mailgun domain and API key"
echo ""
GHOST_SCRIPT

gcloud compute scp /tmp/ghost-install-local.sh $INSTANCE_NAME:/tmp/ghost-install.sh --zone=$ZONE --quiet
gcloud compute ssh $INSTANCE_NAME --zone=$ZONE --command="chmod +x /tmp/ghost-install.sh" --quiet

echo ""
echo -e "${GREEN}Setup complete!${NC}"
echo ""
echo "SSH into the VM and run the installation:"
echo "  gcloud compute ssh $INSTANCE_NAME --zone=$ZONE"
echo "  sudo -u ghost bash /tmp/ghost-install.sh $DOMAIN your-email@example.com"
