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
          <p className="lead">Last updated: August 7, 2025</p>

          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing, browsing, or using Bitcoin Perception's website, platform, API services, or any related services (collectively, the "Services"), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree to these terms, please discontinue use of our Services immediately.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            Bitcoin Perception provides comprehensive Bitcoin market intelligence, sentiment analysis, real-time data feeds, and financial analytics through our web platform, API services, and data tools. Our Services include but are not limited to:
          </p>
          <ul>
            <li>Real-time Bitcoin sentiment analysis and market intelligence</li>
            <li>Bitcoin Fear & Greed Index and historical data</li>
            <li>API access for data integration and custom applications</li>
            <li>Market research, reports, and analytical tools</li>
            <li>Educational resources and market insights</li>
          </ul>
          <p>
            We reserve the right to modify, enhance, suspend, or discontinue any aspect of our Services at any time, with or without notice, to maintain service quality and security.
          </p>

          <h2>3. User Accounts and Registration</h2>
          <p>
            To access certain premium features and Services, you must create an account and provide accurate, complete registration information. You are fully responsible for:
          </p>
          <ul>
            <li>Maintaining the security and confidentiality of your account credentials</li>
            <li>All activities, transactions, and communications that occur under your account</li>
            <li>Immediately notifying us of any unauthorized access or security breaches</li>
            <li>Ensuring your account information remains current and accurate</li>
            <li>Compliance with all applicable laws and regulations in your jurisdiction</li>
          </ul>
          <p>
            You must be at least 18 years old or the age of majority in your jurisdiction to create an account. Accounts registered by automated means or bots are strictly prohibited.
          </p>

          <h2>4. Acceptable Use Policy</h2>
          <p>You agree to use our Services responsibly and ethically. You expressly agree NOT to:</p>
          <ul>
            <li>Violate any applicable local, state, national, or international laws or regulations</li>
            <li>Infringe upon intellectual property rights, including copyrights, trademarks, or patents</li>
            <li>Attempt to gain unauthorized access to our Services, systems, or other users' accounts</li>
            <li>Use our Services for market manipulation, fraud, or other illegal financial activities</li>
            <li>Distribute malware, viruses, or other harmful computer code</li>
            <li>Engage in data scraping, harvesting, or automated data collection without permission</li>
            <li>Share, resell, or redistribute our data without explicit authorization</li>
            <li>Interfere with or disrupt the normal operation of our Services</li>
            <li>Impersonate any person or entity or misrepresent your affiliation</li>
          </ul>

          <h2>5. Subscription and Payment Terms</h2>
          <p>
            Certain Services require paid subscriptions or usage fees. By subscribing, you agree to the following payment terms:
          </p>
          <ul>
            <li>Pay all fees according to the pricing plans in effect when charges are incurred</li>
            <li>Provide accurate billing information and maintain current payment methods</li>
            <li>Authorize automatic renewal of subscriptions unless cancelled in advance</li>
            <li>Accept responsibility for all charges incurred under your account</li>
          </ul>
          <p>
            We reserve the right to modify pricing with 30 days' advance notice. Refunds are provided according to our refund policy available upon request.
          </p>

          <h2>6. Data Usage and Privacy</h2>
          <p>
            Your use of our Services is governed by our comprehensive Privacy Policy, which forms an integral part of these Terms. By using our Services, you acknowledge that you have read and agree to our data collection, processing, and usage practices as outlined in the Privacy Policy. We are committed to protecting your privacy and maintaining transparency in our data handling procedures.
          </p>

          <h2>7. Intellectual Property Rights</h2>
          <p>
            All content, features, functionality, software, algorithms, data compilations, and proprietary methodologies of our Services are owned by Bitcoin Perception, Inc. and are protected by United States and international copyright, trademark, patent, and other intellectual property laws. This includes but is not limited to:
          </p>
          <ul>
            <li>Our proprietary sentiment analysis algorithms and methodologies</li>
            <li>Data compilations, reports, and analytical insights</li>
            <li>Software, API interfaces, and technical documentation</li>
            <li>Trademarks, service marks, and trade names</li>
            <li>Website design, layout, and user interface elements</li>
          </ul>
          <p>
            You may not reproduce, distribute, modify, or create derivative works without explicit written permission.
          </p>

          <h2>8. Financial Disclaimer and Investment Risks</h2>
          <p>
            <strong>IMPORTANT:</strong> Our Services provide market intelligence and sentiment analysis for informational purposes only. This information does not constitute financial advice, investment recommendations, or trading signals. You acknowledge that:
          </p>
          <ul>
            <li>All financial trading involves substantial risk of loss</li>
            <li>Past performance does not guarantee future results</li>
            <li>You should consult qualified financial advisors before making investment decisions</li>
            <li>We are not liable for any trading losses or investment decisions based on our data</li>
            <li>Market sentiment data should be used as one factor among many in your analysis</li>
          </ul>

          <h2>9. Limitation of Liability and Disclaimers</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, BITCOIN PERCEPTION SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO:
          </p>
          <ul>
            <li>Loss of profits, data, or business opportunities</li>
            <li>Trading losses or investment damages</li>
            <li>Service interruptions or data inaccuracies</li>
            <li>Third-party actions or market volatility</li>
          </ul>
          <p>
            Our total liability for any claim shall not exceed the amount you paid for our Services in the 12 months preceding the claim.
          </p>

          <h2>10. Account Termination and Suspension</h2>
          <p>
            We reserve the right to terminate, suspend, or restrict your account and access to our Services immediately, with or without notice, for:
          </p>
          <ul>
            <li>Violation of these Terms or our Acceptable Use Policy</li>
            <li>Suspected fraudulent, abusive, or illegal activity</li>
            <li>Non-payment of fees or chargebacks</li>
            <li>Breach of security or unauthorized access attempts</li>
            <li>Harm to other users, our reputation, or business operations</li>
          </ul>
          <p>
            Upon termination, your right to access and use our Services ceases immediately. We may retain certain account information as required by law or for legitimate business purposes.
          </p>

          <h2>11. Modifications to Terms</h2>
          <p>
            We may modify these Terms of Service at any time to reflect changes in our Services, legal requirements, or business practices. We will provide advance notice of material changes through:
          </p>
          <ul>
            <li>Email notification to your registered email address</li>
            <li>Prominent notice on our website or platform</li>
            <li>In-app notifications for significant changes</li>
          </ul>
          <p>
            Continued use of our Services after the effective date constitutes acceptance of the updated Terms.
          </p>

          <h2>12. Governing Law and Dispute Resolution</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to conflict of law provisions. Any disputes arising from these Terms or your use of our Services shall be resolved through binding arbitration in accordance with the American Arbitration Association's Commercial Arbitration Rules.
          </p>

          <h2>13. Severability and Entire Agreement</h2>
          <p>
            If any provision of these Terms is found to be unenforceable or invalid, the remaining provisions shall remain in full force and effect. These Terms, together with our Privacy Policy, constitute the entire agreement between you and Bitcoin Perception regarding the use of our Services.
          </p>

          <h2>14. Contact Information</h2>
          <p>
            For questions, concerns, or legal matters regarding these Terms of Service, please contact us:
          </p>
          <ul>
            <li>Email: <a href="mailto:legal@perception.to">legal@perception.to</a></li>
            <li>Legal Department: <a href="mailto:legal@perception.to">legal@perception.to</a></li>
            <li>Business Address: Bitcoin Perception, Inc., Legal Department</li>
            <li>Customer Support: <a href="mailto:support@perception.to">support@perception.to</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}