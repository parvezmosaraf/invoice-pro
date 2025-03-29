export interface Client {
  id: string;
  name: string;
  company: string;
  address: string;
}

export interface CompanyDetails {
  name: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
}

export interface InvoiceItem {
  id?: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id?: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  notes?: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface InvoiceData {
  invoiceNumber: string;
  clientId: string;
  client: Client;
  company: CompanyDetails;
  issueDate: string;
  dueDate: string;
  currency: string;
  notes: string;
  items: InvoiceItem[];
  status: 'draft' | 'pending' | 'paid';
} 