import { Invoice, generateId, generateInvoiceNumber } from "@/models/invoice";
import { ClientService } from "./ClientService";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { supabase } from '../lib/supabase'

const STORAGE_KEY = 'invoicesxpert_invoices';

export const InvoiceService = {
  getAll: (): Invoice[] => {
    const invoices = localStorage.getItem(STORAGE_KEY);
    return invoices ? JSON.parse(invoices) : [];
  },
  
  add: (invoice: Omit<Invoice, 'id' | 'invoiceNumber'>): Invoice => {
    const newInvoice = {
      ...invoice,
      id: generateId(),
      invoiceNumber: generateInvoiceNumber(),
    };
    
    const invoices = InvoiceService.getAll();
    invoices.push(newInvoice);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
    
    return newInvoice;
  },
  
  getById: (id: string): Invoice | undefined => {
    const invoices = InvoiceService.getAll();
    return invoices.find(invoice => invoice.id === id);
  },
  
  update: (id: string, data: Partial<Omit<Invoice, 'id' | 'invoiceNumber'>>): Invoice | null => {
    const invoices = InvoiceService.getAll();
    const index = invoices.findIndex(invoice => invoice.id === id);
    
    if (index === -1) return null;
    
    const updatedInvoice = {
      ...invoices[index],
      ...data,
    };
    
    invoices[index] = updatedInvoice;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
    
    return updatedInvoice;
  },
  
  delete: (id: string): boolean => {
    const invoices = InvoiceService.getAll();
    const filtered = invoices.filter(invoice => invoice.id !== id);
    
    if (filtered.length === invoices.length) return false;
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  },
  
  generatePdf: async (invoice: Invoice, elementId: string): Promise<Blob> => {
    try {
      // Wait for a moment to ensure the element is rendered
      await new Promise(resolve => setTimeout(resolve, 500));

      const element = document.getElementById(elementId);
      if (!element) {
        throw new Error('Invoice element not found');
      }

      // Create canvas from the invoice element
      const canvas = await html2canvas(element, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 1024, // Fixed width for consistency
        onclone: (doc) => {
          // Get the element in the cloned document
          const clonedElement = doc.getElementById(elementId);
          if (clonedElement) {
            // Set fixed width for consistent rendering
            clonedElement.style.width = '1024px';
            clonedElement.style.margin = '0';
            clonedElement.style.padding = '32px';
            clonedElement.style.backgroundColor = '#ffffff';
          }
        }
      });

      // Create PDF with A4 dimensions
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      // A4 dimensions in mm
      const pdfWidth = 210;
      const pdfHeight = 297;

      // Calculate dimensions to fit the page while maintaining aspect ratio
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Add image to PDF
      pdf.addImage(
        canvas.toDataURL('image/png'),
        'PNG',
        0,
        0,
        imgWidth,
        imgHeight,
        undefined,
        'FAST'
      );

      // If content overflows a page, add new pages
      if (imgHeight > pdfHeight) {
        let remainingHeight = imgHeight;
        let currentPage = 1;

        while (remainingHeight > pdfHeight) {
          pdf.addPage();
          pdf.addImage(
            canvas.toDataURL('image/png'),
            'PNG',
            0,
            -(pdfHeight * currentPage),
            imgWidth,
            imgHeight,
            undefined,
            'FAST'
          );
          remainingHeight -= pdfHeight;
          currentPage++;
        }
      }

      // Return as blob
      return pdf.output('blob');
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw error;
    }
  },

  async createInvoice(invoice: Omit<Invoice, 'id' | 'createdAt' | 'updatedAt'>) {
    const { data, error } = await supabase
      .from('invoices')
      .insert([invoice])
      .select()
      .single()

    if (error) throw error
    return data
  },

  async getInvoices(userId: string) {
    const { data, error } = await supabase
      .from('invoices')
      .select('*')
      .eq('userId', userId)
      .order('createdAt', { ascending: false })

    if (error) throw error
    return data
  },

  async getInvoice(id: string) {
    const { data, error } = await supabase
      .from('invoices')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  async updateInvoice(id: string, updates: Partial<Invoice>) {
    const { data, error } = await supabase
      .from('invoices')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async deleteInvoice(id: string) {
    const { error } = await supabase
      .from('invoices')
      .delete()
      .eq('id', id)

    if (error) throw error
  }
};
