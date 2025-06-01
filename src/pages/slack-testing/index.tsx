import { Logo } from "@/components/ui/logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const SlackTestingPage = () => {
  const oauthUrl = "https://slack.com/oauth/v2/authorize?client_id=268627365575.8796942905360&scope=incoming-webhook,chat:write&redirect_uri=https://us-central1-triple-upgrade-245423.cloudfunctions.net/btcpApiFunction3-1/slack/oauth_redirect";

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <div className="flex justify-center mb-10">
        <Logo />
      </div>
      
      <h1 className="text-3xl font-bold text-center mb-8">
        Perception Slack App Testing Guide
      </h1>
      <p className="text-lg text-center text-muted-foreground mb-10">
        A comprehensive guide for Slack reviewers to test the Perception app functionality
      </p>

      <div className="grid gap-8">
        {/* Installation Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Step 1: Installation</CardTitle>
            <CardDescription>Install the Perception app to your Slack workspace</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Use the OAuth link below to install the Perception app:</p>
            <div className="flex justify-center">
              <Button 
                className="bg-[#4A154B] hover:bg-[#3b113c] text-white"
                size="lg"
                onClick={() => window.open(oauthUrl, '_blank')}
              >
                Add to Slack
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Testing Steps Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Step 2: Testing Instructions</CardTitle>
            <CardDescription>Follow these steps to verify the app functionality</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-medium">2.1 Verify Channel Creation</h3>
              <p>Check that the <strong>#perception-trends</strong> channel has been automatically created in your workspace.</p>
            </div>
            <Separator />
            
            <div className="space-y-2">
              <h3 className="font-medium">2.2 Simulate a Trend Alert</h3>
              <p>To test trend alerts, we need to insert test data into our BigQuery dataset. The Slack app team will perform this step for you.</p>
            </div>
            <Separator />
            
            <div className="space-y-2">
              <h3 className="font-medium">2.3 Verify Data Endpoints</h3>
              <p>You can view trend data via these endpoints:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><code>/trends</code> - View current trends</li>
                <li><code>/trends/count</code> - View trend count metrics</li>
              </ul>
            </div>
            <Separator />
            
            <div className="space-y-2">
              <h3 className="font-medium">2.4 Uninstall the App</h3>
              <p>After testing, uninstall the app from your Slack workspace.</p>
            </div>
          </CardContent>
        </Card>

        {/* Expected Outcomes Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Step 3: Expected Outcomes</CardTitle>
            <CardDescription>What you should expect to see during testing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="list-disc pl-6 space-y-3">
              <li>A welcome message is posted in the <strong>#perception-trends</strong> channel.</li>
              <li>Trend alerts are triggered based on the simulated data.</li>
              <li>All data is removed upon uninstallation within 30 minutes.</li>
            </ul>
          </CardContent>
        </Card>

        {/* Support Contact Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Need Help?</CardTitle>
            <CardDescription>Contact our support team for assistance</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              For any questions or issues during testing, please contact: <a 
                href="mailto:support@perception.to" 
                className="text-blue-600 hover:underline"
              >
                support@perception.to
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SlackTestingPage; 