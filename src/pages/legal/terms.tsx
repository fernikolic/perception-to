import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export function TermsPage() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <Button 
          variant="ghost" 
          className="mb-8"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <h1 className="mb-8 text-4xl font-bold">Terms of Service</h1>
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="lead">Last updated: March 18, 2024</p>

          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing or using Perception's services, you agree to be bound by these Terms of Service
            and all applicable laws and regulations.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            Perception provides crypto market intelligence and analytics tools through its web platform
            and API services. We reserve the right to modify, suspend, or discontinue any aspect of our
            services at any time.
          </p>

          <h2>3. User Accounts</h2>
          <p>
            To access certain features, you must register for an account. You are responsible for:
          </p>
          <ul>
            <li>Maintaining the confidentiality of your account</li>
            <li>All activities that occur under your account</li>
            <li>Notifying us of any unauthorized use</li>
          </ul>

          <h2>4. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe upon intellectual property rights</li>
            <li>Attempt to gain unauthorized access to our services</li>
            <li>Use our services for any illegal activities</li>
          </ul>

          <h2>5. Payment Terms</h2>
          <p>
            Certain services require payment. You agree to pay all fees according to the pricing
            terms in effect when the charges are incurred.
          </p>

          <h2>6. Data Usage and Privacy</h2>
          <p>
            Your use of our services is also governed by our Privacy Policy. By using our services,
            you consent to our collection and use of data as outlined in the Privacy Policy.
          </p>

          <h2>7. Intellectual Property</h2>
          <p>
            All content, features, and functionality of our services are owned by Perception and
            are protected by international copyright, trademark, and other intellectual property laws.
          </p>

          <h2>8. Limitation of Liability</h2>
          <p>
            Perception shall not be liable for any indirect, incidental, special, consequential,
            or punitive damages resulting from your use or inability to use our services.
          </p>

          <h2>9. Termination</h2>
          <p>
            We reserve the right to terminate or suspend your account and access to our services
            at our sole discretion, without notice, for conduct that we believe violates these
            Terms or is harmful to other users, us, or third parties.
          </p>

          <h2>10. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. We will notify users of any
            material changes via email or through our services.
          </p>

          <h2>11. Contact Information</h2>
          <p>
            For questions about these Terms, please contact us at{' '}
            <a href="mailto:legal@perception.to">legal@perception.to</a>
          </p>
        </div>
      </div>
    </div>
  );
}