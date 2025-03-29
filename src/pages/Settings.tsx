import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import UserService from "@/services/UserService";
import { useEffect } from "react";

const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  company: z.string().optional(),
  website: z.string().optional(),
  avatarUrl: z.string().optional(),
});

const businessSchema = z.object({
  businessName: z.string().min(2, { message: "Business name is required" }),
  businessAddress: z.string().optional(),
  businessPhone: z.string().optional(),
  businessEmail: z.string().email({ message: "Please enter a valid email" }).optional(),
  taxId: z.string().optional(),
});

const notificationSchema = z.object({
  emailNotifications: z.boolean().default(true),
  invoiceReminders: z.boolean().default(true),
  paymentNotifications: z.boolean().default(true),
  marketingEmails: z.boolean().default(false),
});

type ProfileValues = z.infer<typeof profileSchema>;
type BusinessValues = z.infer<typeof businessSchema>;
type NotificationValues = z.infer<typeof notificationSchema>;

export default function Settings() {
  const { toast } = useToast();
  
  const profileForm = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      website: "",
      avatarUrl: "",
    },
  });
  
  const businessForm = useForm<BusinessValues>({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      businessName: "",
      businessAddress: "",
      businessPhone: "",
      businessEmail: "",
      taxId: "",
    },
  });
  
  const notificationForm = useForm<NotificationValues>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      emailNotifications: true,
      invoiceReminders: true,
      paymentNotifications: true,
      marketingEmails: false,
    },
  });
  
  // Load user data when component mounts
  useEffect(() => {
    const user = UserService.getCurrentUser();
    if (user) {
      // Update profile form
      profileForm.reset({
        name: user.name,
        email: user.email,
        company: user.company || "",
        website: user.website || "",
        avatarUrl: user.avatarUrl || "",
      });
      
      // Update business form
      businessForm.reset({
        businessName: user.businessName || "",
        businessAddress: user.businessAddress || "",
        businessPhone: user.businessPhone || "",
        businessEmail: user.businessEmail || "",
        taxId: user.taxId || "",
      });
    }
  }, []);
  
  const onProfileSubmit = (data: ProfileValues) => {
    UserService.updateUser(data);
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated.",
    });
  };
  
  const onBusinessSubmit = (data: BusinessValues) => {
    UserService.updateUser(data);
    toast({
      title: "Business details updated",
      description: "Your business information has been updated.",
    });
  };
  
  const onNotificationSubmit = (data: NotificationValues) => {
    console.log(data);
    toast({
      title: "Notification preferences updated",
      description: "Your notification preferences have been saved.",
    });
  };
  
  return (
    <DashboardLayout title="Settings">
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-1">Account Settings</h2>
          <p className="text-muted-foreground">
            Manage your account preferences and business details
          </p>
        </div>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="business">Business Details</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...profileForm}>
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-8">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      <div className="flex-shrink-0">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src="https://placehold.co/200x200/e5edff/0a2463?text=AJ" />
                          <AvatarFallback>AJ</AvatarFallback>
                        </Avatar>
                        <div className="mt-4">
                          <Button variant="outline" size="sm">
                            Change Avatar
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid gap-6 flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={profileForm.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={profileForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={profileForm.control}
                            name="company"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Company</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={profileForm.control}
                            name="website"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Website</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Password</h3>
                      <Separator className="mb-6" />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormItem>
                          <FormLabel>Current Password</FormLabel>
                          <FormControl>
                            <Input type="password" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                        
                        <div></div>
                        
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input type="password" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                        
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input type="password" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </div>
                    </div>
                    
                    <Button type="submit">Save Changes</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="business">
            <Card>
              <CardHeader>
                <CardTitle>Business Details</CardTitle>
                <CardDescription>
                  Update your business information that will appear on your invoices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...businessForm}>
                  <form onSubmit={businessForm.handleSubmit(onBusinessSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={businessForm.control}
                        name="businessName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Business Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={businessForm.control}
                        name="businessEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Business Email</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={businessForm.control}
                        name="businessPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Business Phone</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={businessForm.control}
                        name="taxId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tax ID / VAT Number</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={businessForm.control}
                      name="businessAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Address</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="pt-4">
                      <h3 className="text-lg font-medium mb-4">Business Logo</h3>
                      <Separator className="mb-6" />
                      
                      <div className="flex items-center gap-6">
                        <div className="h-20 w-20 rounded-md bg-muted/50 flex items-center justify-center">
                          <img 
                            src="https://placehold.co/200x200/e5edff/0a2463?text=Logo" 
                            alt="Business Logo" 
                            className="max-h-full max-w-full"
                          />
                        </div>
                        
                        <div>
                          <Button variant="outline">
                            Upload Logo
                          </Button>
                          <p className="text-sm text-muted-foreground mt-2">
                            Recommended size: 300×300px. Max file size: 5MB.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <Button type="submit">Save Business Details</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Configure how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...notificationForm}>
                  <form onSubmit={notificationForm.handleSubmit(onNotificationSubmit)} className="space-y-8">
                    <div className="space-y-4">
                      <FormField
                        control={notificationForm.control}
                        name="emailNotifications"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between p-4 rounded-lg border">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Email Notifications</FormLabel>
                              <FormDescription>
                                Receive notifications about account activity via email
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={notificationForm.control}
                        name="invoiceReminders"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between p-4 rounded-lg border">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Invoice Reminders</FormLabel>
                              <FormDescription>
                                Get reminders about upcoming and overdue invoices
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={notificationForm.control}
                        name="paymentNotifications"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between p-4 rounded-lg border">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Payment Notifications</FormLabel>
                              <FormDescription>
                                Receive updates when payments are made
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={notificationForm.control}
                        name="marketingEmails"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between p-4 rounded-lg border">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">Marketing Emails</FormLabel>
                              <FormDescription>
                                Receive tips, product updates and offers
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button type="submit">Save Preferences</Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
