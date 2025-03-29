
export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientId: string;
  client: Client;
  issueDate: string;
  dueDate: string;
  items: InvoiceItem[];
  notes?: string;
  currency: string;
  status: 'draft' | 'pending' | 'paid' | 'overdue';
  template?: string;
}

// Function to generate a unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Function to generate invoice number
export const generateInvoiceNumber = (): string => {
  const prefix = 'INV';
  const random = Math.floor(10000 + Math.random() * 90000);
  const timestamp = new Date().getTime().toString().slice(-4);
  return `${prefix}-${random}-${timestamp}`;
};
