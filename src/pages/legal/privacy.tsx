import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export function PrivacyPage() {
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

        <h1 className="mb-8 text-4xl font-bold">Privacy Policy</h1>
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="lead">Last updated: March 18, 2024</p>

          <h2>Introduction</h2>
          <p>
            At Perception, we take your privacy seriously. This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information when you use our website and services.
          </p>

          <h2>Information We Collect</h2>
          <h3>Personal Information</h3>
          <p>We may collect personal information that you provide to us, including but not limited to:</p>
          <ul>
            <li>Name and contact information</li>
            <li>Account credentials</li>
            <li>Payment information</li>
            <li>Usage data and preferences</li>
          </ul>

          <h3>Usage Information</h3>
          <p>
            We automatically collect certain information about your device and how you interact with our services,
            including:
          </p>
          <ul>
            <li>Device information and identifiers</li>
            <li>Browser type and settings</li>
            <li>IP address and location data</li>
            <li>Usage patterns and preferences</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use the collected information for various purposes, including:</p>
          <ul>
            <li>Providing and maintaining our services</li>
            <li>Improving user experience</li>
            <li>Processing transactions</li>
            <li>Sending administrative information</li>
            <li>Providing customer support</li>
          </ul>

          <h2>Information Sharing</h2>
          <p>
            We may share your information with third parties only in the ways described in this privacy policy,
            including:
          </p>
          <ul>
            <li>Service providers and business partners</li>
            <li>Legal requirements and protection of rights</li>
            <li>Business transfers and acquisitions</li>
          </ul>

          <h2>Data Security</h2>
          <p>
            We implement appropriate technical and organizational security measures to protect your personal
            information. However, no method of transmission over the Internet is 100% secure.
          </p>

          <h2>Your Rights</h2>
          <p>You have certain rights regarding your personal information, including:</p>
          <ul>
            <li>Access to your personal information</li>
            <li>Correction of inaccurate data</li>
            <li>Deletion of your personal information</li>
            <li>Objection to processing</li>
            <li>Data portability</li>
          </ul>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at{' '}
            <a href="mailto:privacy@perception.to">privacy@perception.to</a>
          </p>
        </div>
      </div>
    </div>
  );
}