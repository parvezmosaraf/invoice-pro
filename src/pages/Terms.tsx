import { Link } from "react-router-dom";
import { PageTransition } from "@/components/layout/PageTransition";
import { Footer } from "@/components/layout/Footer";

export default function Terms() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
            
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg text-muted-foreground mb-8">
                Last updated: {new Date().toLocaleDateString()}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                <p className="mb-4">
                  Welcome to ProInvoice. By accessing or using our service, you agree to be bound by these Terms of Service.
                  Please read these terms carefully before using our service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. Use of Service</h2>
                <p className="mb-4">
                  ProInvoice provides an online invoicing platform for businesses and individuals. You must be at least 18 years
                  old to use our service. You are responsible for maintaining the security of your account and any activities
                  that occur under your account.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. User Obligations</h2>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the confidentiality of your account</li>
                  <li>Use the service in compliance with all applicable laws</li>
                  <li>Not use the service for any illegal or unauthorized purpose</li>
                  <li>Not interfere with or disrupt the service</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property</h2>
                <p className="mb-4">
                  The service and its original content, features, and functionality are owned by ProInvoice and are protected
                  by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">5. Termination</h2>
                <p className="mb-4">
                  We may terminate or suspend your account and access to the service immediately, without prior notice or
                  liability, for any reason, including breach of these Terms of Service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
                <p className="mb-4">
                  In no event shall ProInvoice, nor its directors, employees, partners, agents, suppliers, or affiliates, be
                  liable for any indirect, incidental, special, consequential, or punitive damages.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">7. Changes to Terms</h2>
                <p className="mb-4">
                  We reserve the right to modify or replace these Terms at any time. We will provide notice of any changes by
                  posting the new Terms on this page.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
                <p className="mb-4">
                  If you have any questions about these Terms, please contact us at{" "}
                  <a href="mailto:support@proinvoice.com" className="text-primary hover:underline">
                    support@proinvoice.com
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