import { Link } from "react-router-dom";
import { PageTransition } from "@/components/layout/PageTransition";
import { Footer } from "@/components/layout/Footer";

export default function Privacy() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
            
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg text-muted-foreground mb-8">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                <p className="mb-4">
                  At ProInvoice, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose,
                  and safeguard your information when you use our service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
                <h3 className="text-xl font-medium mb-2">Personal Information</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Name and contact information</li>
                  <li>Billing information and payment details</li>
                  <li>Business information</li>
                  <li>Email address</li>
                  <li>Usage data and preferences</li>
                </ul>
                
                <h3 className="text-xl font-medium mb-2">Automatically Collected Information</h3>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Device and browser information</li>
                  <li>IP address and location data</li>
                  <li>Usage statistics and analytics</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
                <p className="mb-4">We use the collected information for various purposes:</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>To provide and maintain our service</li>
                  <li>To process your transactions</li>
                  <li>To send you important updates and notifications</li>
                  <li>To improve our service and user experience</li>
                  <li>To respond to your inquiries and provide support</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
                <p className="mb-4">
                  We implement appropriate security measures to protect your personal information. However, no method of
                  transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">5. Third-Party Services</h2>
                <p className="mb-4">
                  We may employ third-party companies and individuals to facilitate our service, provide service-related
                  services, or assist us in analyzing how our service is used. These third parties have access to your
                  personal information only to perform these tasks on our behalf.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
                <p className="mb-4">You have the right to:</p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate or incomplete information</li>
                  <li>Request deletion of your information</li>
                  <li>Object to processing of your information</li>
                  <li>Data portability</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">7. Changes to This Policy</h2>
                <p className="mb-4">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                  Privacy Policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
                <p className="mb-4">
                  If you have any questions about this Privacy Policy, please contact us at{" "}
                  <a href="mailto:privacy@proinvoice.com" className="text-primary hover:underline">
                    privacy@proinvoice.com
                  </a>
                </p>
              </section>
            </div>

            <div className="mt-12 pt-8 border-t">
              <Link to="/" className="text-primary hover:underline">
                ← Back to Home
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
} 