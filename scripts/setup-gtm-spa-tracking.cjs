#!/usr/bin/env node
/**
 * GTM API Script: Set up SPA page view tracking
 *
 * This script:
 * 1. Creates a History Change trigger in GTM
 * 2. Updates the GA4 Configuration tag to fire on History Change
 * 3. Publishes the changes
 *
 * Prerequisites:
 * - gcloud auth application-default login
 * - GTM API enabled in GCP console
 */

const { google } = require('googleapis');

const GTM_CONTAINER_ID = 'GTM-NVDZX38V';
const GA4_MEASUREMENT_ID = 'G-N636BYJDMX';

async function main() {
  console.log('='.repeat(50));
  console.log('GTM SPA Tracking Setup');
  console.log('='.repeat(50));

  // Authenticate using application default credentials
  const auth = new google.auth.GoogleAuth({
    scopes: [
      'https://www.googleapis.com/auth/tagmanager.edit.containers',
      'https://www.googleapis.com/auth/tagmanager.publish'
    ]
  });

  const tagmanager = google.tagmanager({ version: 'v2', auth });

  try {
    // Step 1: Find the GTM account and container
    console.log('\n1. Finding GTM container...');
    const accountsRes = await tagmanager.accounts.list();
    const accounts = accountsRes.data.account || [];

    let containerPath = null;
    let workspacePath = null;

    for (const account of accounts) {
      const containersRes = await tagmanager.accounts.containers.list({
        parent: account.path
      });

      const containers = containersRes.data.container || [];
      const container = containers.find(c => c.publicId === GTM_CONTAINER_ID);

      if (container) {
        containerPath = container.path;
        console.log(`   Found: ${container.name} (${container.publicId})`);
        console.log(`   Path: ${containerPath}`);
        break;
      }
    }

    if (!containerPath) {
      throw new Error(`Container ${GTM_CONTAINER_ID} not found`);
    }

    // Step 2: Get the default workspace
    console.log('\n2. Getting workspace...');
    const workspacesRes = await tagmanager.accounts.containers.workspaces.list({
      parent: containerPath
    });

    const workspaces = workspacesRes.data.workspace || [];
    const defaultWorkspace = workspaces.find(w => w.name === 'Default Workspace') || workspaces[0];

    if (!defaultWorkspace) {
      throw new Error('No workspace found');
    }

    workspacePath = defaultWorkspace.path;
    console.log(`   Using workspace: ${defaultWorkspace.name}`);

    // Step 3: List existing triggers to check if History Change already exists
    console.log('\n3. Checking existing triggers...');
    const triggersRes = await tagmanager.accounts.containers.workspaces.triggers.list({
      parent: workspacePath
    });

    const triggers = triggersRes.data.trigger || [];
    let historyChangeTrigger = triggers.find(t => t.type === 'historyChange');

    if (historyChangeTrigger) {
      console.log(`   History Change trigger already exists: ${historyChangeTrigger.name}`);
    } else {
      // Create History Change trigger
      console.log('   Creating History Change trigger...');
      const newTrigger = await tagmanager.accounts.containers.workspaces.triggers.create({
        parent: workspacePath,
        requestBody: {
          name: 'History Change - SPA Navigation',
          type: 'historyChange'
        }
      });
      historyChangeTrigger = newTrigger.data;
      console.log(`   Created: ${historyChangeTrigger.name} (ID: ${historyChangeTrigger.triggerId})`);
    }

    // Step 4: Find the GA4 Configuration tag
    console.log('\n4. Finding GA4 Configuration tag...');
    const tagsRes = await tagmanager.accounts.containers.workspaces.tags.list({
      parent: workspacePath
    });

    const tags = tagsRes.data.tag || [];
    console.log(`   Found ${tags.length} tags`);

    // Look for GA4 config tag
    const ga4ConfigTag = tags.find(t =>
      t.type === 'gaawc' || // GA4 Configuration
      (t.parameter && t.parameter.some(p =>
        p.value && p.value.includes(GA4_MEASUREMENT_ID)
      ))
    );

    if (!ga4ConfigTag) {
      console.log('\n   Available tags:');
      tags.forEach(t => console.log(`   - ${t.name} (type: ${t.type})`));
      throw new Error('GA4 Configuration tag not found. Please check your GTM container.');
    }

    console.log(`   Found GA4 tag: ${ga4ConfigTag.name}`);

    // Step 5: Check if History Change trigger is already attached
    const existingFiringTriggerIds = ga4ConfigTag.firingTriggerId || [];
    const historyTriggerAttached = existingFiringTriggerIds.includes(historyChangeTrigger.triggerId);

    if (historyTriggerAttached) {
      console.log('   History Change trigger already attached to GA4 tag');
    } else {
      // Update the tag to include History Change trigger
      console.log('\n5. Updating GA4 tag to include History Change trigger...');

      const updatedFiringTriggerIds = [...existingFiringTriggerIds, historyChangeTrigger.triggerId];

      await tagmanager.accounts.containers.workspaces.tags.update({
        path: ga4ConfigTag.path,
        requestBody: {
          ...ga4ConfigTag,
          firingTriggerId: updatedFiringTriggerIds
        }
      });

      console.log('   GA4 Configuration tag updated');
    }

    // Step 6: Create a version and publish
    console.log('\n6. Creating and publishing new version...');

    const versionRes = await tagmanager.accounts.containers.workspaces.create_version({
      path: workspacePath,
      requestBody: {
        name: 'SPA Page View Tracking',
        notes: 'Added History Change trigger for SPA navigation tracking'
      }
    });

    const version = versionRes.data.containerVersion;
    console.log(`   Created version: ${version.containerVersionId}`);

    // Publish the version
    await tagmanager.accounts.containers.versions.publish({
      path: version.path
    });

    console.log('   Published successfully!');

    console.log('\n' + '='.repeat(50));
    console.log('DONE! GTM is now tracking SPA page navigation.');
    console.log('='.repeat(50));
    console.log('\nChanges made:');
    console.log('- Created "History Change - SPA Navigation" trigger');
    console.log('- Updated GA4 Configuration tag to fire on History Change');
    console.log('- Published new container version');
    console.log('\nGA4 will now receive page_view events for all SPA navigations.');

  } catch (error) {
    console.error('\nError:', error.message);

    if (error.message.includes('insufficient')) {
      console.log('\nTo fix permissions:');
      console.log('1. Go to https://tagmanager.google.com');
      console.log('2. Click Admin → User Management');
      console.log('3. Ensure your account has "Publish" permission');
    }

    if (error.code === 403) {
      console.log('\nTo enable the API:');
      console.log('1. Go to https://console.cloud.google.com/apis/library/tagmanager.googleapis.com');
      console.log('2. Click "Enable"');
      console.log('3. Run: gcloud auth application-default login');
    }

    process.exit(1);
  }
}

main();
