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
          <p className="lead">Last updated: August 7, 2025</p>

          <h2>Introduction</h2>
          <p>
            At Bitcoin Perception, we are committed to protecting your privacy and maintaining the highest standards of data protection. This comprehensive Privacy Policy explains how we collect, use, process, disclose, and safeguard your personal information when you access and use our platform, services, and Bitcoin market intelligence tools.
          </p>

          <h2>Information We Collect</h2>
          <h3>Personal Information</h3>
          <p>We collect personal information that you voluntarily provide to us when registering for our services, subscribing to our newsletter, or contacting us directly. This information may include:</p>
          <ul>
            <li>Full name and professional title</li>
            <li>Email address and phone number</li>
            <li>Company name and business information</li>
            <li>Account credentials and authentication data</li>
            <li>Payment and billing information</li>
            <li>Communication preferences and interests</li>
            <li>Professional background and use case information</li>
          </ul>

          <h3>Technical and Usage Information</h3>
          <p>
            We automatically collect technical information about your device and how you interact with our Bitcoin market intelligence platform, including:
          </p>
          <ul>
            <li>Device identifiers, browser type, and operating system</li>
            <li>IP address, location data, and network information</li>
            <li>Usage patterns, feature interactions, and session duration</li>
            <li>API usage, query patterns, and data access logs</li>
            <li>Performance metrics and error reporting data</li>
            <li>Referral sources and marketing campaign interactions</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use the collected information to provide, maintain, and improve our Bitcoin market intelligence services for legitimate business purposes, including:</p>
          <ul>
            <li>Delivering real-time Bitcoin sentiment analysis and market intelligence</li>
            <li>Providing personalized dashboards and custom data insights</li>
            <li>Processing subscriptions, payments, and account management</li>
            <li>Enhancing platform performance and user experience optimization</li>
            <li>Delivering customer support and technical assistance</li>
            <li>Sending important service updates and security notifications</li>
            <li>Conducting research and analytics to improve our offerings</li>
            <li>Compliance with legal obligations and industry regulations</li>
          </ul>

          <h2>Information Sharing and Disclosure</h2>
          <p>
            We maintain strict control over your personal information and only share it in specific, limited circumstances as outlined below. We never sell your personal data to third parties.
          </p>
          <ul>
            <li><strong>Service Providers:</strong> Trusted third-party vendors who assist in delivering our services (payment processing, cloud hosting, analytics)</li>
            <li><strong>Legal Compliance:</strong> When required by law, court order, or to protect our legal rights and safety</li>
            <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales (with advance notice to users)</li>
            <li><strong>Your Consent:</strong> With your explicit permission for specific purposes not covered in this policy</li>
          </ul>

          <h2>Data Security and Protection</h2>
          <p>
            We implement enterprise-grade security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Our security measures include:
          </p>
          <ul>
            <li>End-to-end encryption for data transmission and storage</li>
            <li>Multi-factor authentication and access controls</li>
            <li>Regular security audits and vulnerability assessments</li>
            <li>SOC 2 Type II compliance standards</li>
            <li>Employee security training and background checks</li>
          </ul>
          <p>
            While we maintain industry-leading security standards, no method of Internet transmission or electronic storage is 100% secure. We continuously monitor and improve our security practices.
          </p>

          <h2>Your Privacy Rights</h2>
          <p>Depending on your jurisdiction, you may have the following rights regarding your personal information:</p>
          <ul>
            <li><strong>Access:</strong> Request copies of your personal data we hold</li>
            <li><strong>Rectification:</strong> Request correction of inaccurate or incomplete information</li>
            <li><strong>Erasure:</strong> Request deletion of your personal data (subject to legal requirements)</li>
            <li><strong>Portability:</strong> Request transfer of your data in a machine-readable format</li>
            <li><strong>Restriction:</strong> Request limitation of processing activities</li>
            <li><strong>Objection:</strong> Object to processing based on legitimate interests</li>
            <li><strong>Withdraw Consent:</strong> Revoke previously given consent at any time</li>
          </ul>
          <p>
            To exercise these rights, please contact us using the information below. We will respond within 30 days of receiving your request.
          </p>

          <h2>Data Retention</h2>
          <p>
            We retain personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy. Upon account termination, we will delete or anonymize your personal data within 90 days, except where required by law to retain certain information.
          </p>

          <h2>International Data Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place for international transfers, including Standard Contractual Clauses and adequacy decisions.
          </p>

          <h2>Updates to This Policy</h2>
          <p>
            We may update this Privacy Policy periodically to reflect changes in our practices or applicable laws. We will notify you of material changes via email or prominent notice on our platform at least 30 days before the changes take effect.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
          </p>
          <ul>
            <li>Email: <a href="mailto:privacy@perception.to">privacy@perception.to</a></li>
            <li>Data Protection Officer: <a href="mailto:dpo@perception.to">dpo@perception.to</a></li>
            <li>Address: Bitcoin Perception, Inc., Legal Department</li>
          </ul>
        </div>
      </div>
    </div>
  );
}