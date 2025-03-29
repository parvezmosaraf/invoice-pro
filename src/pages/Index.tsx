import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { PageTransition } from "@/components/layout/PageTransition";
import { FileText, CheckCircle, ChevronRight, LogOut, Sparkles, Star, Zap, Crown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import UserService from "@/services/UserService";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const features = [
  "Create professional invoices in seconds",
  "Customize templates to match your brand",
  "Automatic calculations for taxes and totals",
  "Multi-currency support for global businesses",
  "Download as PDF or send directly to clients",
  "Manage all your clients in one place",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const bounceAnimations = [
  {
    initial: { y: 0, scale: 1 },
    animate: {
      y: [-10, 0],
      scale: [1, 1.1, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0
      }
    }
  },
  {
    initial: { y: 0, scale: 1 },
    animate: {
      y: [-8, 0],
      scale: [1, 1.05, 1],
      transition: {
        duration: 1.8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.3
      }
    }
  },
  {
    initial: { y: 0, scale: 1 },
    animate: {
      y: [-12, 0],
      scale: [1, 1.15, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.6
      }
    }
  },
  {
    initial: { y: 0, scale: 1 },
    animate: {
      y: [-6, 0],
      scale: [1, 1.08, 1],
      transition: {
        duration: 1.6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.9
      }
    }
  }
];

const floatAnimations = [
  {
    initial: { x: 0, y: 0 },
    animate: {
      x: [0, 100, 0, -100, 0],
      y: [0, -50, 0, 50, 0],
      scale: [1, 1.1, 1, 1.05, 1],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0
      }
    }
  },
  {
    initial: { x: 0, y: 0 },
    animate: {
      x: [0, -150, 0, 150, 0],
      y: [0, 80, 0, -80, 0],
      scale: [1, 1.15, 1, 1.08, 1],
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2
      }
    }
  },
  {
    initial: { x: 0, y: 0 },
    animate: {
      x: [0, 80, 0, -80, 0],
      y: [0, -100, 0, 100, 0],
      scale: [1, 1.12, 1, 1.1, 1],
      transition: {
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 4
      }
    }
  },
  {
    initial: { x: 0, y: 0 },
    animate: {
      x: [0, -120, 0, 120, 0],
      y: [0, 60, 0, -60, 0],
      scale: [1, 1.08, 1, 1.12, 1],
      transition: {
        duration: 9,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 6
      }
    }
  }
];

const notificationData = [
  {
    text: "Free to use",
    icon: Sparkles,
    gradient: "from-primary to-primary/50",
    position: "absolute"
  },
  {
    text: "No credit card",
    icon: Star,
    gradient: "from-purple-500 to-pink-500",
    position: "absolute"
  },
  {
    text: "Unlimited invoices",
    icon: Zap,
    gradient: "from-amber-500 to-orange-500",
    position: "absolute"
  },
  {
    text: "Premium features",
    icon: Crown,
    gradient: "from-emerald-500 to-teal-500",
    position: "absolute"
  }
];

// Add this CSS class
const textGradientClass = "bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50";

const Index = () => {
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
      <div className="min-h-screen flex flex-col bg-background">
        {/* Navigation */}
        <header className="w-full py-4 px-4 border-b sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">ProInvoice</span>
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
        
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-7xl mx-auto text-center relative">
            {/* Multiple floating notifications */}
            {notificationData.map((notification, index) => {
              const Icon = notification.icon;
              return (
                <motion.div
                  key={index}
                  initial="initial"
                  animate="animate"
                  variants={floatAnimations[index]}
                  className={`${notification.position} z-10`}
                  style={{
                    top: `${20 + (index * 15)}%`,
                    left: `${20 + (index * 15)}%`
                  }}
                >
                  <div className="relative">
                    <div className={`absolute -inset-1 bg-gradient-to-r ${notification.gradient} rounded-full blur-sm opacity-75 group-hover:opacity-100 transition duration-200`}></div>
                    <div className="relative flex items-center gap-2 bg-background px-4 py-2 rounded-full border shadow-lg">
                      <Icon className="h-4 w-4 text-yellow-500" />
                      <span className={`font-semibold text-sm bg-gradient-to-r ${notification.gradient} bg-clip-text text-transparent`}>
                        {notification.text}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto relative z-20"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance leading-tight">
                Professional <span className={textGradientClass}>Invoices</span> Made Simple
              </h1>
              <p className="text-xl text-muted-foreground mb-8 text-balance">
                Create beautiful, customizable invoices in seconds. Streamline your billing process and get paid faster.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                {!userEmail ? (
                  <>
                    <Link to="/register">
                      <Button size="lg" className="w-full sm:w-auto">
                        Get Started Free
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button size="lg" variant="outline" className="w-full sm:w-auto">
                        Log in
                      </Button>
                    </Link>
                  </>
                ) : (
                  <Link to="/dashboard">
                    <Button size="lg" className="w-full sm:w-auto">
                      Go to Dashboard
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </div>
            </motion.div>
            
            {/* App Preview */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-16 relative"
            >
              <div className="relative rounded-xl shadow-2xl overflow-hidden border bg-card">
                <img 
                  src="/banner.svg" 
                  alt="ProInvoice Banner" 
                  className="w-full h-auto dark:opacity-90"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent dark:from-black/30"></div>
                
                {/* Glass effect reflection */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-50 dark:from-white/10"></div>
              </div>
              
              {/* Background glow effect */}
              <div className="absolute -inset-x-20 -inset-y-10 bg-primary/5 dark:bg-primary/10 blur-3xl rounded-[40px] -z-10"></div>
            </motion.div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 px-4 bg-secondary/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Powerful features designed to help freelancers and small businesses create professional invoices with ease.
              </p>
            </div>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-card rounded-lg p-6 border flex items-center space-x-4 hover:shadow-md transition-shadow"
                >
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                  <span className="text-lg">{feature}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 px-4 bg-secondary">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to streamline your invoicing?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Join thousands of freelancers and small businesses who trust ProInvoice for their billing needs.
            </p>
            <Link to="/register">
              <Button size="lg">Get Started Now</Button>
            </Link>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="py-12 px-4 border-t">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <FileText className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">ProInvoice</span>
              </div>
              
              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                <Link to="#" className="hover:text-foreground transition-colors">
                  Terms
                </Link>
                <Link to="#" className="hover:text-foreground transition-colors">
                  Privacy
                </Link>
                <Link to="#" className="hover:text-foreground transition-colors">
                  Contact
                </Link>
                <a href="#" className="hover:text-foreground transition-colors">
                  @proinvoice
                </a>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} ProInvoice. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
};

export default Index;
