/**
 * GTM API Setup Script
 * Creates GA4 event tags and triggers for conversion tracking
 *
 * Prerequisites:
 * 1. Enable Tag Manager API in Google Cloud Console
 * 2. Create a service account with "Tag Manager: Edit" permission
 * 3. Download the service account key JSON
 * 4. Add the service account email to your GTM container as an Editor
 *
 * Usage:
 * GTM_ACCOUNT_ID=xxx GTM_CONTAINER_ID=xxx GOOGLE_APPLICATION_CREDENTIALS=./path/to/key.json node scripts/setup-gtm-tags.js
 */

const { google } = require('googleapis');

// Configuration - these come from your GTM URL
// e.g., https://tagmanager.google.com/#/container/accounts/ACCOUNT_ID/containers/CONTAINER_ID
const GTM_ACCOUNT_ID = process.env.GTM_ACCOUNT_ID;
const GTM_CONTAINER_ID = process.env.GTM_CONTAINER_ID;
const GA4_MEASUREMENT_ID = 'G-N636BYJDMX';

async function main() {
  if (!GTM_ACCOUNT_ID || !GTM_CONTAINER_ID) {
    console.error('Error: GTM_ACCOUNT_ID and GTM_CONTAINER_ID environment variables are required');
    console.log('\nTo find these values:');
    console.log('1. Go to https://tagmanager.google.com');
    console.log('2. Open your container (GTM-NVDZX38V)');
    console.log('3. Look at the URL: accounts/ACCOUNT_ID/containers/CONTAINER_ID');
    process.exit(1);
  }

  // Authenticate using service account
  const auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/tagmanager.edit.containers'],
  });

  const tagmanager = google.tagmanager({ version: 'v2', auth });
  const parent = `accounts/${GTM_ACCOUNT_ID}/containers/${GTM_CONTAINER_ID}`;

  console.log('🔧 Setting up GTM tags for Perception...\n');

  try {
    // Get the workspace (we'll use the default workspace)
    const workspaces = await tagmanager.accounts.containers.workspaces.list({ parent });
    const workspace = workspaces.data.workspace?.[0];

    if (!workspace) {
      console.error('No workspace found. Please create a workspace in GTM first.');
      process.exit(1);
    }

    const workspacePath = workspace.path;
    console.log(`📁 Using workspace: ${workspace.name}\n`);

    // Step 1: Create GA4 Configuration Tag (if not exists)
    console.log('1️⃣  Creating GA4 Configuration Tag...');
    const ga4ConfigTag = await tagmanager.accounts.containers.workspaces.tags.create({
      parent: workspacePath,
      requestBody: {
        name: 'GA4 Configuration',
        type: 'gaawc', // GA4 Configuration tag type
        parameter: [
          {
            key: 'measurementId',
            type: 'template',
            value: GA4_MEASUREMENT_ID,
          },
          {
            key: 'sendPageView',
            type: 'boolean',
            value: 'true',
          },
        ],
        firingTriggerId: ['2147479553'], // All Pages trigger (built-in)
      },
    });
    console.log(`   ✅ Created: ${ga4ConfigTag.data.name} (ID: ${ga4ConfigTag.data.tagId})\n`);

    // Step 2: Create Custom Event Triggers
    console.log('2️⃣  Creating Custom Event Triggers...');

    const triggers = [
      { name: 'CE - trial_start', eventName: 'trial_start' },
      { name: 'CE - newsletter_signup', eventName: 'newsletter_signup' },
      { name: 'CE - exit_intent_shown', eventName: 'exit_intent_shown' },
      { name: 'CE - cta_click', eventName: 'cta_click' },
      { name: 'CE - attribution_captured', eventName: 'attribution_captured' },
    ];

    const createdTriggers = {};

    for (const trigger of triggers) {
      const result = await tagmanager.accounts.containers.workspaces.triggers.create({
        parent: workspacePath,
        requestBody: {
          name: trigger.name,
          type: 'customEvent',
          customEventFilter: [
            {
              type: 'equals',
              parameter: [
                { key: 'arg0', type: 'template', value: '{{_event}}' },
                { key: 'arg1', type: 'template', value: trigger.eventName },
              ],
            },
          ],
        },
      });
      createdTriggers[trigger.eventName] = result.data.triggerId;
      console.log(`   ✅ Created trigger: ${trigger.name} (ID: ${result.data.triggerId})`);
    }
    console.log('');

    // Step 3: Create Data Layer Variables
    console.log('3️⃣  Creating Data Layer Variables...');

    const variables = [
      { name: 'DLV - plan_type', dataLayerName: 'plan_type' },
      { name: 'DLV - signup_location', dataLayerName: 'signup_location' },
      { name: 'DLV - popup_type', dataLayerName: 'popup_type' },
      { name: 'DLV - cta_name', dataLayerName: 'cta_name' },
      { name: 'DLV - cta_destination', dataLayerName: 'cta_destination' },
      { name: 'DLV - attribution_source', dataLayerName: 'attribution_source' },
      { name: 'DLV - attribution_medium', dataLayerName: 'attribution_medium' },
      { name: 'DLV - attribution_campaign', dataLayerName: 'attribution_campaign' },
    ];

    for (const variable of variables) {
      await tagmanager.accounts.containers.workspaces.variables.create({
        parent: workspacePath,
        requestBody: {
          name: variable.name,
          type: 'v', // Data Layer Variable
          parameter: [
            { key: 'name', type: 'template', value: variable.dataLayerName },
            { key: 'dataLayerVersion', type: 'integer', value: '2' },
          ],
        },
      });
      console.log(`   ✅ Created variable: ${variable.name}`);
    }
    console.log('');

    // Step 4: Create GA4 Event Tags
    console.log('4️⃣  Creating GA4 Event Tags...');

    const eventTags = [
      {
        name: 'GA4 Event - Trial Start',
        eventName: 'trial_start',
        triggerId: createdTriggers['trial_start'],
        parameters: [
          { key: 'plan_type', value: '{{DLV - plan_type}}' },
          { key: 'attribution_source', value: '{{DLV - attribution_source}}' },
          { key: 'attribution_medium', value: '{{DLV - attribution_medium}}' },
          { key: 'attribution_campaign', value: '{{DLV - attribution_campaign}}' },
        ],
      },
      {
        name: 'GA4 Event - Newsletter Signup',
        eventName: 'newsletter_signup',
        triggerId: createdTriggers['newsletter_signup'],
        parameters: [
          { key: 'signup_location', value: '{{DLV - signup_location}}' },
          { key: 'attribution_source', value: '{{DLV - attribution_source}}' },
          { key: 'attribution_medium', value: '{{DLV - attribution_medium}}' },
          { key: 'attribution_campaign', value: '{{DLV - attribution_campaign}}' },
        ],
      },
      {
        name: 'GA4 Event - Exit Intent Shown',
        eventName: 'exit_intent_shown',
        triggerId: createdTriggers['exit_intent_shown'],
        parameters: [
          { key: 'popup_type', value: '{{DLV - popup_type}}' },
        ],
      },
      {
        name: 'GA4 Event - CTA Click',
        eventName: 'cta_click',
        triggerId: createdTriggers['cta_click'],
        parameters: [
          { key: 'cta_name', value: '{{DLV - cta_name}}' },
          { key: 'cta_destination', value: '{{DLV - cta_destination}}' },
        ],
      },
    ];

    for (const tag of eventTags) {
      const eventParameters = tag.parameters.map((p) => ({
        map: [
          { key: 'name', type: 'template', value: p.key },
          { key: 'value', type: 'template', value: p.value },
        ],
        type: 'map',
      }));

      await tagmanager.accounts.containers.workspaces.tags.create({
        parent: workspacePath,
        requestBody: {
          name: tag.name,
          type: 'gaawe', // GA4 Event tag type
          parameter: [
            { key: 'measurementId', type: 'tagReference', value: 'GA4 Configuration' },
            { key: 'eventName', type: 'template', value: tag.eventName },
            {
              key: 'eventParameters',
              type: 'list',
              list: eventParameters,
            },
          ],
          firingTriggerId: [tag.triggerId],
        },
      });
      console.log(`   ✅ Created tag: ${tag.name}`);
    }
    console.log('');

    console.log('🎉 GTM setup complete!\n');
    console.log('Next steps:');
    console.log('1. Go to GTM: https://tagmanager.google.com');
    console.log('2. Review the changes in your workspace');
    console.log('3. Click "Submit" to publish the container');
    console.log('4. Use GTM Preview mode to test the events');

  } catch (error) {
    if (error.code === 403) {
      console.error('\n❌ Permission denied. Make sure:');
      console.error('1. The Tag Manager API is enabled in Google Cloud Console');
      console.error('2. Your service account has "Tag Manager: Edit" permission');
      console.error('3. The service account email is added to GTM container as Editor');
    } else if (error.code === 404) {
      console.error('\n❌ Container not found. Check your GTM_ACCOUNT_ID and GTM_CONTAINER_ID');
    } else {
      console.error('\n❌ Error:', error.message);
    }
    process.exit(1);
  }
}

main();
