import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Link, useNavigate } from "react-router-dom";
import { FileText, CheckCircle, ArrowRight } from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";
import { useToast } from "@/hooks/use-toast";
import UserService from "@/services/UserService";
import { motion } from "framer-motion";

const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

type RegisterValues = z.infer<typeof registerSchema>;

const features = [
  "Create and manage unlimited invoices",
  "Access to all invoice templates",
  "Professional invoice customization",
  "Client management tools",
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

export default function Register() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(data: RegisterValues) {
    const userData = {
      name: data.name,
      email: data.email,
    };
    
    localStorage.setItem('proinvoice_user_data', JSON.stringify(userData));
    UserService.setUser(userData);
    
    toast({
      title: "Registration successful",
      description: "Redirecting to homepage...",
    });
    
    setTimeout(() => {
      navigate("/");
    }, 1000);
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
          className="relative z-10 w-full max-w-5xl"
        >
          <div className="backdrop-blur-sm bg-card/50 rounded-2xl shadow-2xl border overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Form Section */}
              <div className="p-8 md:p-12">
                <div className="w-full max-w-md mx-auto">
                  <Link to="/" className="inline-flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-xl font-bold">ProInvoice</span>
                  </Link>
                  
                  <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                    Create your account
                  </h1>
                  <p className="text-muted-foreground mb-8">
                    Get started with ProInvoice today
                  </p>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">Full Name</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="John Doe" 
                                autoComplete="name"
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
                            <FormLabel className="text-sm font-medium">Password</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Create a strong password" 
                                type="password" 
                                autoComplete="new-password"
                                className="h-12 bg-background/50"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" className="w-full h-12 text-base mt-2">
                        Create Account
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </form>
                  </Form>
                  
                  <div className="text-center mt-8">
                    <p className="text-sm text-muted-foreground">
                      Already have an account?{" "}
                      <Link to="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
                        Log in
                      </Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* Features Section */}
              <div className="relative hidden md:block bg-gradient-to-br from-primary/5 to-background p-12">
                <div className="absolute inset-0 bg-grid-white/10"></div>
                <div className="relative">
                  <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8"
                  >
                    <div>
                      <h2 className="text-2xl font-bold mb-4">
                        Everything you need to manage your invoices
                      </h2>
                      <p className="text-muted-foreground">
                        Join thousands of businesses who trust ProInvoice
                      </p>
                    </div>

                    <ul className="space-y-4">
                      {features.map((feature, index) => (
                        <motion.li 
                          key={index} 
                          variants={itemVariants}
                          className="flex items-start bg-card/50 p-4 rounded-lg backdrop-blur-sm border"
                        >
                          <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                          <span className="font-medium">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                    
                    <div className="bg-card/50 rounded-xl p-6 backdrop-blur-sm border">
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                          <img 
                            src="https://placehold.co/100x100/e5edff/0a2463?text=JD" 
                            alt="User Avatar" 
                            className="w-10 h-10 rounded-full"
                          />
                        </div>
                        <div>
                          <p className="font-medium">
                            "ProInvoice has streamlined my entire billing process."
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Jane Doe, Freelance Designer
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
