import { PageTransition } from "@/components/layout/PageTransition";
import { FileText, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useEffect, useState } from "react";
import UserService from "@/services/UserService";

const Privacy = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = UserService.getCurrentUser();
    if (user) {
      setUserEmail(user.email);
      setUserName(user.name);
    }
  }, []);

  const handleLogout = () => {
    UserService.clearUser();
    setUserEmail(null);
    setUserName(null);
    navigate('/login');
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <header className="w-full py-4 px-4 border-b sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">InvoicesXpert</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              {userEmail ? (
                <>
                  <Link to="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
                    Dashboard
                  </Link>
                  <div className="text-sm font-medium text-muted-foreground">
                    {userName || 'User'}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleLogout}
                    className="flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-sm font-medium hover:text-primary transition-colors">
                    Login
                  </Link>
                  <Link to="/register">
                    <Button size="sm">Get Started</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 py-16 flex-1">
          <div className="flex items-center gap-2 mb-8">
            <FileText className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">Privacy Policy</h1>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
              <p>
                We collect information that you provide directly to us when using InvoicesXpert, including:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Account information (name, email, password)</li>
                <li>Business information (company name, address, tax details)</li>
                <li>Client information (names, addresses, contact details)</li>
                <li>Invoice data (items, prices, payment terms)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
              <p>
                We use the collected information to:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Provide and maintain our service</li>
                <li>Process your invoices and payments</li>
                <li>Send you important updates and notifications</li>
                <li>Improve our service and user experience</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information, including:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Encryption of sensitive data</li>
                <li>Regular security assessments</li>
                <li>Access controls and authentication</li>
                <li>Secure data storage and transmission</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Data Sharing</h2>
              <p>
                We do not sell or rent your personal information to third parties. We may share your information with:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Service providers who assist in our operations</li>
                <li>Payment processors for transaction processing</li>
                <li>Legal authorities when required by law</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
              <p>
                You have the right to:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Export your data</li>
              </ul>
            </section>
          </div>
        </div>

        {/* Footer */}
        <footer className="py-12 px-4 border-t">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <FileText className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">InvoicesXpert</span>
              </div>
              
              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                <Link to="/terms" className="hover:text-foreground transition-colors">
                  Terms
                </Link>
                <Link to="/privacy" className="hover:text-foreground transition-colors">
                  Privacy
                </Link>
                <Link to="/contact" className="hover:text-foreground transition-colors">
                  Contact
                </Link>
                <a href="https://developersworld.io" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                  @developersworld
                </a>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} InvoicesXpert. All rights reserved. Developed by{' '}
              <a 
                href="https://developersworld.io" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Developers World LLC
              </a>
            </div>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
};

export default Privacy; 