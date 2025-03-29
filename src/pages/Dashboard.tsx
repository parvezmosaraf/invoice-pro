import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Users, CreditCard, TrendingUp, DollarSign, Plus, Download, ArrowRight, Check, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ClientService } from "@/services/ClientService";
import { InvoiceService } from "@/services/InvoiceService";

export default function Dashboard() {
  const [clientCount, setClientCount] = useState(0);
  const [invoiceCount, setInvoiceCount] = useState(0);
  const [totalOutstanding, setTotalOutstanding] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);
  const [recentInvoices, setRecentInvoices] = useState<any[]>([]);

  useEffect(() => {
    // Get client count
    const clients = ClientService.getAll();
    setClientCount(clients.length);

    // Get invoice data
    const invoices = InvoiceService.getAll();
    setInvoiceCount(invoices.length);

    // Get recent invoices (last 5)
    setRecentInvoices(invoices.slice(-5).reverse());

    // Calculate totals
    let outstanding = 0;
    let paid = 0;
    invoices.forEach(invoice => {
      const total = invoice.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
      if (invoice.status === 'paid') {
        paid += total;
      } else {
        outstanding += total;
      }
    });
    setTotalOutstanding(outstanding);
    setTotalPaid(paid);
  }, []);

  const stats = [
    {
      title: "Total Invoices",
      value: invoiceCount.toString(),
      icon: FileText,
      change: invoiceCount === 0 ? "No invoices yet" : `${invoiceCount} total invoices`,
      positive: true,
    },
    {
      title: "Clients",
      value: clientCount.toString(),
      icon: Users,
      change: clientCount === 0 ? "Add your first client" : `${clientCount} total clients`,
      positive: true,
    },
    {
      title: "Outstanding",
      value: `$${totalOutstanding.toFixed(2)}`,
      icon: CreditCard,
      change: totalOutstanding === 0 ? "No outstanding payments" : "Total pending amount",
      positive: false,
    },
    {
      title: "Paid",
      value: `$${totalPaid.toFixed(2)}`,
      icon: TrendingUp,
      change: totalPaid === 0 ? "No payments received" : "Total received amount",
      positive: true,
    },
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

  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-6">
        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/invoice" className="w-full sm:w-auto">
            <Button className="w-full justify-center sm:justify-start bg-primary hover:bg-primary/90 transition-colors">
              <Plus className="mr-2 h-4 w-4" />
              Create Invoice
            </Button>
          </Link>
          <Link to="/clients" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full justify-center sm:justify-start">
              <Users className="mr-2 h-4 w-4" />
              Add Client
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="border shadow-md hover:shadow-lg transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className="p-2 bg-primary/10 rounded-full">
                  <stat.icon className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Invoices */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border shadow-md">
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <CardTitle>Recent Invoices</CardTitle>
                <CardDescription>Your recently created invoices</CardDescription>
              </div>
              <Link to="/invoice">
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <div className="grid grid-cols-5 bg-muted/50 p-4 text-sm font-medium">
                  <div>Invoice</div>
                  <div>Client</div>
                  <div>Date</div>
                  <div className="text-right">Amount</div>
                  <div className="text-right">Status</div>
                </div>
                <div className="divide-y">
                  {recentInvoices.length > 0 ? (
                    recentInvoices.map((invoice) => {
                      const total = invoice.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
                      return (
                        <div key={invoice.id} className="grid grid-cols-5 p-4 text-sm items-center">
                          <div className="font-medium truncate">{invoice.invoiceNumber}</div>
                          <div className="truncate">{invoice.client.name}</div>
                          <div className="truncate">{new Date(invoice.issueDate).toLocaleDateString()}</div>
                          <div className="text-right">{invoice.currency} {total.toFixed(2)}</div>
                          <div className="text-right">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                              ${invoice.status === 'paid' ? 'bg-green-100 text-green-700' : 
                                invoice.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                                'bg-red-100 text-red-700'}`}>
                              {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="p-8 text-center">
                      <FileText className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
                      <p className="text-muted-foreground">No recent invoices</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Summary */}
          <Card className="border shadow-md">
            <CardHeader>
              <CardTitle>Financial Summary</CardTitle>
              <CardDescription>Your invoice finances overview</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                  <p className="text-3xl font-bold">${(totalPaid + totalOutstanding).toFixed(2)}</p>
                </div>
                <div className="bg-primary/10 p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Paid</p>
                    <p className="text-lg font-medium text-green-600">${totalPaid.toFixed(2)}</p>
                  </div>
                  <div className="bg-green-100 p-2 rounded-full">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Outstanding</p>
                    <p className="text-lg font-medium text-yellow-600">${totalOutstanding.toFixed(2)}</p>
                  </div>
                  <div className="bg-yellow-100 p-2 rounded-full">
                    <Clock className="h-4 w-4 text-yellow-600" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
