import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Plus, Trash2, Download, Send, FileText, FileCheck, Calendar, Search, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { ClientService } from "@/services/ClientService";
import { InvoiceService } from "@/services/InvoiceService";
import { generateId } from "@/models/invoice";
import ClientForm from "@/components/clients/ClientForm";
import { useNavigate, useLocation } from "react-router-dom";
import { getTemplateComponent } from "@/components/invoice/InvoiceTemplates";
import ReactDOM from "react-dom/client";
import { ShareInvoiceDialog } from "@/components/invoice/ShareInvoiceDialog";
import { ShareService } from "@/services/ShareService";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import TemplateSelector from "@/components/invoice/TemplateSelector";

const invoiceSchema = z.object({
  clientId: z.string().min(1, { message: "Client is required" }),
  issueDate: z.string(),
  dueDate: z.string(),
  currency: z.string(),
  notes: z.string().optional(),
  company: z.object({
    name: z.string().min(1, { message: "Company name is required" }),
    address: z.string().min(1, { message: "Company address is required" }),
    city: z.string().min(1, { message: "City is required" }),
    country: z.string().min(1, { message: "Country is required" }),
    postalCode: z.string().min(1, { message: "Postal code is required" }),
  }),
  items: z.array(
    z.object({
      id: z.string(),
      description: z.string().min(1, { message: "Description is required" }),
      quantity: z.number().min(1, { message: "Quantity must be at least 1" }),
      price: z.number().min(0, { message: "Price must be at least 0" }),
    })
  ).min(1, { message: "Add at least one item" }),
});

type InvoiceValues = z.infer<typeof invoiceSchema>;

const currencies = [
  { label: "USD - US Dollar", value: "USD" },
  { label: "EUR - Euro", value: "EUR" },
  { label: "GBP - British Pound", value: "GBP" },
  { label: "JPY - Japanese Yen", value: "JPY" },
  { label: "CAD - Canadian Dollar", value: "CAD" },
];

export default function Invoice() {
  const { toast } = useToast();
  const [items, setItems] = useState([{ id: generateId(), description: "", quantity: 1, price: 0 }]);
  const [activeTab, setActiveTab] = useState("all");
  const [clients, setClients] = useState(ClientService.getAll());
  const [invoices, setInvoices] = useState(InvoiceService.getAll());
  const [isAddingClient, setIsAddingClient] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("classic");
  const navigate = useNavigate();
  const location = useLocation();
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [isClientDialogOpen, setIsClientDialogOpen] = useState(false);
  
  // Handle template selection from Templates page
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const template = params.get('template');
    
    if (template) {
      setActiveTab("create");
      setSelectedTemplate(template.toLowerCase());
      toast({
        title: "Template Selected",
        description: `The ${template} template has been applied to your new invoice.`,
      });
    }
  }, [location.search]);
  
  const form = useForm<InvoiceValues>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      clientId: "",
      issueDate: new Date().toISOString().split("T")[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      currency: "USD",
      notes: "",
      company: {
        name: "",
        address: "",
        city: "",
        country: "",
        postalCode: "",
      },
      items: [{ id: generateId(), description: "", quantity: 1, price: 0 }],
    },
  });
  
  const addItem = () => {
    const newItem = { id: generateId(), description: "", quantity: 1, price: 0 };
    const newItems = [...items, newItem];
    setItems(newItems);
    form.setValue('items', newItems);
  };
  
  const removeItem = (index: number) => {
    if (items.length > 1) {
      const newItems = [...items];
      newItems.splice(index, 1);
      setItems(newItems);
      form.setValue('items', newItems);
    }
  };
  
  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  };
  
  const onSubmit = (data: InvoiceValues) => {
    const client = ClientService.getById(data.clientId);
    if (!client) {
      toast({
        title: "Error",
        description: "Selected client not found",
        variant: "destructive"
      });
      return;
    }
    
    // Create the invoice object with a generated invoice number
    const newInvoice = {
      id: generateId(),
      invoiceNumber: `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
      clientId: data.clientId,
      client: client,
      issueDate: data.issueDate,
      dueDate: data.dueDate,
      currency: data.currency,
      notes: data.notes || "",
      company: data.company,
      items: data.items,
      status: 'pending' as const,
    };
    
    try {
      // Save the invoice
      const savedInvoice = InvoiceService.add(newInvoice);
      
      // Update local state
      setInvoices([...invoices, savedInvoice]);
      
      // Show success message
      toast({
        title: "Success!",
        description: `Invoice #${savedInvoice.invoiceNumber} has been created successfully.`,
      });
      
      // Reset form and items
      form.reset();
      setItems([{ id: generateId(), description: "", quantity: 1, price: 0 }]);
      setActiveTab("all");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create invoice. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleNewInvoice = () => {
    setActiveTab("create");
  };
  
  const handleAddClientClick = () => {
    setIsClientDialogOpen(true);
  };

  const handleClientDialogClose = () => {
    setIsClientDialogOpen(false);
  };

  const handleAddClient = (clientData: Omit<Client, 'id'>) => {
    const newClient = ClientService.add(clientData);
    setClients([...clients, newClient]);
    form.setValue("clientId", newClient.id);
    setIsClientDialogOpen(false);
    toast({
      title: "Success",
      description: "Client added successfully",
    });
  };
  
  const handleGeneratePdf = async () => {
    const data = form.getValues();
    const client = ClientService.getById(data.clientId);
    
    if (!client) {
      toast({
        title: "Error",
        description: "Please select a client first",
        variant: "destructive"
      });
      return;
    }
    
    try {
      // Create a temporary invoice for PDF
      const tempInvoice = {
        id: "temp",
        invoiceNumber: "PREVIEW",
        clientId: data.clientId,
        client: client,
        company: data.company,
        issueDate: data.issueDate,
        dueDate: data.dueDate,
        currency: data.currency,
        notes: data.notes || "",
        items: data.items,
        status: 'draft' as const
      };

      // Show loading toast
      toast({
        title: "Generating PDF",
        description: "Please wait while we generate your invoice...",
      });
      
      // Generate PDF
      const blob = await InvoiceService.generatePdf(tempInvoice, 'invoice-preview');
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Invoice-PREVIEW.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "PDF Generated",
        description: "Your invoice PDF has been generated and downloaded.",
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const handleDownloadInvoice = async (invoice: Invoice) => {
    try {
      // Create a hidden preview element
      const previewContainer = document.createElement('div');
      previewContainer.id = `invoice-${invoice.id}`;
      previewContainer.style.position = 'fixed';
      previewContainer.style.left = '-9999px';
      previewContainer.style.top = '-9999px';
      document.body.appendChild(previewContainer);

      // Render the invoice template
      const TemplateComponent = getTemplateComponent(selectedTemplate);
      const root = ReactDOM.createRoot(previewContainer);
      root.render(<TemplateComponent data={invoice} />);

      // Show loading toast
      toast({
        title: "Generating PDF",
        description: "Please wait while we generate your invoice...",
      });

      // Wait for rendering and generate PDF
      await new Promise(resolve => setTimeout(resolve, 500));
      const blob = await InvoiceService.generatePdf(invoice, `invoice-${invoice.id}`);
      
      // Cleanup
      document.body.removeChild(previewContainer);
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Invoice-${invoice.invoiceNumber}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "PDF Generated",
        description: "Your invoice PDF has been generated and downloaded.",
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const getPreviewData = () => {
    const formData = form.getValues();
    const client = clients.find(c => c.id === formData.clientId) || {
      id: "preview",
      name: "John Doe",
      email: "john@example.com",
      company: "Example Corp",
      address: "123 Example St",
    };

    return {
      id: "preview",
      invoiceNumber: "INV-2024-0000",
      clientId: client.id,
      client: client,
      issueDate: formData.issueDate,
      dueDate: formData.dueDate,
      currency: formData.currency,
      notes: formData.notes || "",
      company: formData.company,
      items: items,
      status: "draft" as const,
    };
  };

  const SelectedTemplate = getTemplateComponent(selectedTemplate);

  const handleShare = (invoice: any) => {
    setSelectedInvoice(invoice);
    setShareDialogOpen(true);
  };

  const handleShareMethod = async (method: 'cashapp' | 'zelle') => {
    try {
      if (!selectedInvoice) return;

      if (method === 'cashapp') {
        await ShareService.shareWithCashapp(selectedInvoice);
      } else {
        await ShareService.shareWithZelle(selectedInvoice);
      }

      setShareDialogOpen(false);
      toast({
        title: "Success",
        description: `Invoice shared via ${method === 'cashapp' ? 'Cash App' : 'Zelle'}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to share invoice. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <DashboardLayout title="Invoices">
      <div className="container mx-auto py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="all">All Invoices</TabsTrigger>
              <TabsTrigger value="create">Create Invoice</TabsTrigger>
            </TabsList>
            <Button onClick={handleNewInvoice}>
              <Plus className="w-4 h-4 mr-2" />
              New Invoice
            </Button>
          </div>

          <TabsContent value="create">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-8">
                <Card className="border shadow-sm">
                  <CardHeader>
                    <CardTitle>Invoice Details</CardTitle>
                    <CardDescription>Fill in the invoice information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-6">
                          {/* Company Details */}
                          <div className="space-y-4">
                            <h3 className="text-lg font-medium">Company Information</h3>
                            <div className="grid gap-4">
                              <FormField
                                control={form.control}
                                name="company.name"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Company Name</FormLabel>
                                    <FormControl>
                                      <Input {...field} placeholder="Your Company Name" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="company.address"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                      <Input {...field} placeholder="Street Address" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                  control={form.control}
                                  name="company.city"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>City</FormLabel>
                                      <FormControl>
                                        <Input {...field} placeholder="City" />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <FormField
                                  control={form.control}
                                  name="company.country"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Country</FormLabel>
                                      <FormControl>
                                        <Input {...field} placeholder="Country" />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                              <FormField
                                control={form.control}
                                name="company.postalCode"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Postal Code</FormLabel>
                                    <FormControl>
                                      <Input {...field} placeholder="Postal Code" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>

                          {/* Client Selection */}
                          <div className="space-y-4">
                            <h3 className="text-lg font-medium">Client Information</h3>
                            <FormField
                              control={form.control}
                              name="clientId"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Client</FormLabel>
                                  <div className="flex gap-2">
                                    <div className="flex-1">
                                      <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                          <SelectTrigger>
                                            <SelectValue placeholder="Select a client" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          {clients.map((client) => (
                                            <SelectItem key={client.id} value={client.id}>
                                              {client.name}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <Button
                                      type="button"
                                      variant="outline"
                                      onClick={handleAddClientClick}
                                      className="flex-shrink-0"
                                    >
                                      <UserPlus className="h-4 w-4 mr-2" />
                                      Add Client
                                    </Button>
                                  </div>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          {/* Invoice Details */}
                          <div className="space-y-4">
                            <h3 className="text-lg font-medium">Invoice Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="issueDate"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Issue Date</FormLabel>
                                    <FormControl>
                                      <Input type="date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name="dueDate"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Due Date</FormLabel>
                                    <FormControl>
                                      <Input type="date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <FormField
                              control={form.control}
                              name="currency"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Currency</FormLabel>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select currency" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {currencies.map((currency) => (
                                        <SelectItem key={currency.value} value={currency.value}>
                                          {currency.label}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          {/* Items */}
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <h3 className="text-lg font-medium">Items</h3>
                              <Button type="button" variant="outline" size="sm" onClick={addItem}>
                                <Plus className="h-4 w-4 mr-2" />
                                Add Item
                              </Button>
                            </div>
                            <div className="space-y-4">
                              {items.map((item, index) => (
                                <div key={item.id} className="p-4 border rounded-lg space-y-4">
                                  <div className="grid grid-cols-12 gap-4">
                                    <div className="col-span-12 md:col-span-6">
                                      <Input
                                        placeholder="Description"
                                        value={item.description}
                                        onChange={(e) => {
                                          const newItems = [...items];
                                          newItems[index].description = e.target.value;
                                          setItems(newItems);
                                          form.setValue(`items.${index}.description`, e.target.value);
                                        }}
                                      />
                                    </div>
                                    <div className="col-span-6 md:col-span-2">
                                      <Input
                                        type="number"
                                        placeholder="Qty"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => {
                                          const newItems = [...items];
                                          newItems[index].quantity = parseInt(e.target.value) || 0;
                                          setItems(newItems);
                                          form.setValue(`items.${index}.quantity`, parseInt(e.target.value) || 0);
                                        }}
                                      />
                                    </div>
                                    <div className="col-span-6 md:col-span-3">
                                      <Input
                                        type="number"
                                        placeholder="Price"
                                        min="0"
                                        step="0.01"
                                        value={item.price}
                                        onChange={(e) => {
                                          const newItems = [...items];
                                          newItems[index].price = parseFloat(e.target.value) || 0;
                                          setItems(newItems);
                                          form.setValue(`items.${index}.price`, parseFloat(e.target.value) || 0);
                                        }}
                                      />
                                    </div>
                                    {items.length > 1 && (
                                      <div className="col-span-12 md:col-span-1 flex justify-end">
                                        <Button
                                          type="button"
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => removeItem(index)}
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Notes */}
                          <div className="space-y-4">
                            <h3 className="text-lg font-medium">Additional Information</h3>
                            <FormField
                              control={form.control}
                              name="notes"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Notes</FormLabel>
                                  <FormControl>
                                    <Input {...field} placeholder="Add any notes or payment terms" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-end gap-4 pt-6">
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={handleGeneratePdf}
                            className="w-full sm:w-auto"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download PDF
                          </Button>
                          <Button 
                            type="submit"
                            className="w-full sm:w-auto"
                          >
                            <Send className="h-4 w-4 mr-2" />
                            Create Invoice
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>

              <div className="col-span-12 lg:col-span-4 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Template</CardTitle>
                    <CardDescription>Choose an invoice template</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TemplateSelector
                      selectedTemplate={selectedTemplate}
                      onTemplateChange={setSelectedTemplate}
                      previewData={getPreviewData()}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Preview</CardTitle>
                    <CardDescription>See how your invoice will look</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="relative w-full aspect-[1/1.4] bg-white rounded-lg shadow-sm overflow-hidden">
                      {form.getValues("clientId") && (
                        <div className="absolute inset-0 w-full h-full">
                          <div className="transform scale-[0.25] origin-top-left absolute left-0 top-0" style={{ width: '400%', height: '400%' }}>
                            <div id="invoice-preview">
                              <SelectedTemplate template={selectedTemplate} data={getPreviewData()!} />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="all">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border shadow-lg">
                <CardHeader className="bg-card">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <CardTitle className="text-xl font-bold">All Invoices</CardTitle>
                      <CardDescription>Manage and view your invoices</CardDescription>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                      <div className="relative flex-1 sm:flex-none">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-10 pr-4 w-full" placeholder="Search invoices..." />
                      </div>
                      <Button 
                        className="bg-primary hover:bg-primary/90 transition-colors w-full sm:w-auto" 
                        onClick={handleNewInvoice}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        New Invoice
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0 overflow-auto">
                  <div className="min-w-[800px]">
                    <Table>
                      <TableHeader className="bg-muted/50">
                        <TableRow>
                          <TableHead className="w-[100px]">Invoice</TableHead>
                          <TableHead>Client</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {invoices.length > 0 ? (
                          invoices.map((invoice) => (
                            <TableRow key={invoice.id}>
                              <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                              <TableCell>{invoice.client.name}</TableCell>
                              <TableCell>{new Date(invoice.issueDate).toLocaleDateString()}</TableCell>
                              <TableCell>
                                {invoice.currency} {invoice.items.reduce((sum, item) => sum + (item.quantity * item.price), 0).toFixed(2)}
                              </TableCell>
                              <TableCell>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                  ${invoice.status === 'paid' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 
                                    invoice.status === 'pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : 
                                    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                                  {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                                </span>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleDownloadInvoice(invoice)}
                                  >
                                    <Download className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleShare(invoice)}
                                  >
                                    <Send className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                              <FileText className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                              <p>No invoices yet</p>
                              <p className="text-sm mt-1">Click "New Invoice" to create one</p>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Add Client Dialog */}
      <Dialog open={isClientDialogOpen} onOpenChange={setIsClientDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <UserPlus className="mr-2 h-5 w-5 text-primary" />
              Add New Client
            </DialogTitle>
            <DialogDescription>
              Fill in the client details below to add them to your client list.
            </DialogDescription>
          </DialogHeader>
          <ClientForm onSubmit={handleAddClient} onCancel={handleClientDialogClose} />
        </DialogContent>
      </Dialog>

      <ShareInvoiceDialog
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
        invoice={selectedInvoice}
        onShareMethod={handleShareMethod}
      />
    </DashboardLayout>
  );
}
