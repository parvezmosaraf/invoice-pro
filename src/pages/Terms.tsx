import { PageTransition } from "@/components/layout/PageTransition";
import { FileText, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useEffect, useState } from "react";
import UserService from "@/services/UserService";

const Terms = () => {
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
            <h1 className="text-3xl font-bold">Terms of Service</h1>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using InvoicesXpert, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
              <p>
                Permission is granted to temporarily access InvoicesXpert for personal, non-commercial use only. This license does not include:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Modifying or copying the materials</li>
                <li>Using the materials for any commercial purpose</li>
                <li>Attempting to decompile or reverse engineer any software</li>
                <li>Removing any copyright or other proprietary notations</li>
                <li>Transferring the materials to another person</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
              <p>
                As a user of InvoicesXpert, you are responsible for:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Maintaining the confidentiality of your account</li>
                <li>All activities that occur under your account</li>
                <li>Ensuring your information is accurate and up-to-date</li>
                <li>Complying with all applicable laws and regulations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Service Modifications</h2>
              <p>
                We reserve the right to modify or discontinue any part of our service at any time. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Limitation of Liability</h2>
              <p>
                InvoicesXpert shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.
              </p>
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

export default Terms; 