import { useState } from "react";
import { Plus, Search, Pencil, Trash2, Users } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { User, Mail, Building2, Phone, MapPin } from "lucide-react";
import type { Client } from "@/types/client";
import { ClientService } from "@/services/ClientService";

// Client form component
function ClientForm({ 
  open, 
  onOpenChange, 
  onClientAdded 
}: { 
  open: boolean; 
  onOpenChange: (open: boolean) => void; 
  onClientAdded: (client: Omit<Client, 'id'>) => void;
}) {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(z.object({
      name: z.string().min(2, "Name must be at least 2 characters"),
      email: z.string().email("Invalid email address"),
      company: z.string().optional(),
      phone: z.string().optional(),
      address: z.string().optional(),
    })),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      address: "",
    },
  });

  const onSubmit = (data: any) => {
    onClientAdded(data);
    onOpenChange(false);
    form.reset();
    toast({
      title: "Client added",
      description: `${data.name} has been added to your clients.`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
          <DialogDescription>
            Enter your client's details. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-10" placeholder="Full name" {...field} />
                      </div>
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          className="pl-10"
                          placeholder="client@example.com" 
                          type="email" 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company (Optional)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-10" placeholder="Company name" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone (Optional)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-10" placeholder="(123) 456-7890" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address (Optional)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-10" placeholder="Street address, city, state, zip code" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex flex-col-reverse sm:flex-row gap-3">
              <Button 
                variant="outline" 
                type="button" 
                onClick={() => onOpenChange(false)}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button type="submit" className="w-full sm:w-auto">
                Save Client
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

// Main Clients page component
export default function Clients() {
  const [clients, setClients] = useState<Client[]>(ClientService.getAll());
  const [isAddingClient, setIsAddingClient] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddClient = (clientData: Omit<Client, 'id'>) => {
    const newClient = ClientService.add(clientData);
    setClients([...clients, newClient]);
  };

  const handleDeleteClient = (id: string, name: string) => {
    if (ClientService.delete(id)) {
      setClients(clients.filter(client => client.id !== id));
      toast({
        title: "Client deleted",
        description: `${name} has been removed from your clients.`,
      });
    }
  };

  return (
    <DashboardLayout title="Clients">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Your Clients</h2>
            <p className="text-muted-foreground">Manage your clients and their information</p>
          </div>
          <Button 
            onClick={() => setIsAddingClient(true)}
            className="w-full sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Client
          </Button>
        </div>

        <Card className="border shadow-lg">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>All Clients</CardTitle>
                <CardDescription>You have {clients.length} total clients</CardDescription>
              </div>
              <div className="w-full sm:w-auto relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  className="pl-10 w-full sm:w-[300px]" 
                  placeholder="Search clients..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="rounded-md border">
              <div className="grid grid-cols-3 sm:grid-cols-4 bg-muted/50 p-4 text-sm font-medium">
                <div>Name</div>
                <div className="hidden sm:block">Email</div>
                <div>Phone</div>
                <div className="text-right">Actions</div>
              </div>
              <div className="divide-y">
                {filteredClients.length > 0 ? (
                  filteredClients.map((client) => (
                    <div key={client.id} className="grid grid-cols-3 sm:grid-cols-4 p-4 text-sm items-center">
                      <div className="font-medium truncate">{client.name}</div>
                      <div className="hidden sm:block truncate">{client.email}</div>
                      <div className="truncate">{client.phone || "—"}</div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteClient(client.id, client.name)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <Users className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
                    <p className="text-muted-foreground">No clients found</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <ClientForm 
          open={isAddingClient}
          onOpenChange={setIsAddingClient}
          onClientAdded={handleAddClient}
        />
      </div>
    </DashboardLayout>
  );
}
