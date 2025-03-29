import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Link, useNavigate } from "react-router-dom";
import { FileText, ArrowRight } from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";
import { useToast } from "@/hooks/use-toast";
import UserService from "@/services/UserService";
import { motion } from "framer-motion";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: LoginValues) {
    // Get stored user data
    const storedData = localStorage.getItem('proinvoice_user_data');
    if (storedData) {
      const userData = JSON.parse(storedData);
      if (userData.email === data.email) {
        UserService.setUser(userData);
        toast({
          title: "Login successful",
          description: "Redirecting to dashboard...",
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
        return;
      }
    }
    
    toast({
      title: "Login failed",
      description: "Invalid email or password",
      variant: "destructive",
    });
  }

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-gradient-to-br from-primary/5 via-secondary/5 to-background">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute inset-y-0 -left-[25%] w-[150%] rotate-12 bg-gradient-to-r from-primary/10 via-secondary/10 to-background blur-3xl"></div>
          <div className="absolute inset-y-0 -right-[25%] w-[150%] -rotate-12 bg-gradient-to-l from-primary/10 via-secondary/10 to-background blur-3xl"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-lg"
        >
          <div className="backdrop-blur-sm bg-card/50 rounded-2xl shadow-2xl border overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="w-full max-w-sm mx-auto">
                <Link to="/" className="inline-flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-xl font-bold">ProInvoice</span>
                </Link>
                
                <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                  Welcome back
                </h1>
                <p className="text-muted-foreground mb-8">
                  Sign in to your account to continue
                </p>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Email</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="you@example.com" 
                              type="email" 
                              autoComplete="email"
                              className="h-12 bg-background/50"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between">
                            <FormLabel className="text-sm font-medium">Password</FormLabel>
                            <Link to="/forgot-password" className="text-sm text-primary hover:text-primary/80 transition-colors">
                              Forgot password?
                            </Link>
                          </div>
                          <FormControl>
                            <Input 
                              placeholder="Enter your password" 
                              type="password" 
                              autoComplete="current-password"
                              className="h-12 bg-background/50"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full h-12 text-base mt-2">
                      Sign In
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                </Form>
                
                <div className="mt-8 pt-8 border-t text-center">
                  <p className="text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-primary hover:text-primary/80 font-medium transition-colors">
                      Create one now
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom text */}
          <p className="text-center text-sm text-muted-foreground mt-8">
            By signing in, you agree to our{" "}
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
            {" "}and{" "}
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
          </p>
        </motion.div>
      </div>
    </PageTransition>
  );
}
