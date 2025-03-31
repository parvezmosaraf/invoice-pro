import { PageTransition } from "@/components/layout/PageTransition";
import { FileText, LogOut, Mail, Phone, MapPin, Clock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useEffect, useState } from "react";
import UserService from "@/services/UserService";
import { Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

const Contact = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const navigate = useNavigate();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

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

  const onSubmit = async (data: FormData) => {
    try {
      // Here you would typically send the data to your backend
      console.log("Form data:", data);
      
      // For now, we'll just show a success message
      toast.success("Message sent successfully! We'll get back to you soon.");
      form.reset();
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    }
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
            <Mail className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">Contact Us</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <div className="bg-card p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
                <p className="text-muted-foreground mb-6">
                  Have questions or need assistance? We're here to help. Reach out to us through any of the following channels.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-muted-foreground">info@developersworld.io</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-muted-foreground">+1 954-865-1571</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-medium">Address</h3>
                      <p className="text-muted-foreground">
                        Fort Lauderdale<br />
                        Florida<br />
                        USA
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-4">Business Hours</h2>
                <div className="space-y-2 text-muted-foreground">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                  <p>Saturday: 10:00 AM - 4:00 PM EST</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card p-6 rounded-lg border">
              <h2 className="text-xl font-semibold mb-4">Send us a Message</h2>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Name</label>
                  <Input 
                    id="name" 
                    placeholder="Your name" 
                    {...form.register("name")}
                    className={form.formState.errors.name ? "border-destructive" : ""}
                  />
                  {form.formState.errors.name && (
                    <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your.email@example.com" 
                    {...form.register("email")}
                    className={form.formState.errors.email ? "border-destructive" : ""}
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                  <Input 
                    id="subject" 
                    placeholder="How can we help?" 
                    {...form.register("subject")}
                    className={form.formState.errors.subject ? "border-destructive" : ""}
                  />
                  {form.formState.errors.subject && (
                    <p className="text-sm text-destructive">{form.formState.errors.subject.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <Textarea 
                    id="message" 
                    placeholder="Your message..." 
                    className={`min-h-[150px] ${form.formState.errors.message ? "border-destructive" : ""}`}
                    {...form.register("message")}
                  />
                  {form.formState.errors.message && (
                    <p className="text-sm text-destructive">{form.formState.errors.message.message}</p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                  <Send className="h-4 w-4 mr-2" />
                  {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
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

export default Contact; 