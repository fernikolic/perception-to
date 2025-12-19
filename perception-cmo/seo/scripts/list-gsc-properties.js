import { google } from 'googleapis';

const auth = new google.auth.GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
});

const searchconsole = google.searchconsole({ version: 'v1', auth });

try {
  const res = await searchconsole.sites.list();
  console.log('Available GSC properties:');
  if (res.data.siteEntry) {
    res.data.siteEntry.forEach(site => {
      console.log(`  - ${site.siteUrl} (${site.permissionLevel})`);
    });
  } else {
    console.log('  No properties found for this account');
  }
} catch (err) {
  console.log('Error:', err.message);
}
