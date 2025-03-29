import { Invoice } from "@/types/invoice";
import { generatePDF } from "@/services/PDFService";

export const ShareService = {
  async generateShareableLink(invoice: Invoice) {
    // Generate a unique payment link for the invoice
    const baseUrl = window.location.origin;
    const paymentLink = `${baseUrl}/pay/${invoice.id}`;
    return paymentLink;
  },

  async shareWithCashapp(invoice: Invoice) {
    try {
      // Generate PDF
      const pdfBlob = await generatePDF(invoice);
      const pdfUrl = URL.createObjectURL(pdfBlob);
      
      // Generate payment link
      const paymentLink = await this.generateShareableLink(invoice);
      
      // Format the message
      const message = `Invoice #${invoice.invoiceNumber} - ${invoice.total} ${invoice.currency}\nPay here: ${paymentLink}`;
      
      // Open Cashapp with the payment amount
      const cashappUrl = `cashapp://cash.app/pay/${encodeURIComponent(message)}`;
      
      // Try to open Cashapp
      window.location.href = cashappUrl;
      
      // Fallback to web version if app doesn't open
      setTimeout(() => {
        window.open(`https://cash.app/${encodeURIComponent(message)}`, '_blank');
      }, 1000);

      return pdfUrl;
    } catch (error) {
      console.error('Error sharing with Cashapp:', error);
      throw error;
    }
  },

  async shareWithZelle(invoice: Invoice) {
    try {
      // Generate PDF
      const pdfBlob = await generatePDF(invoice);
      const pdfUrl = URL.createObjectURL(pdfBlob);
      
      // Generate payment link
      const paymentLink = await this.generateShareableLink(invoice);
      
      // Format the message
      const message = `Invoice #${invoice.invoiceNumber} - ${invoice.total} ${invoice.currency}\nPay here: ${paymentLink}`;
      
      // Open Zelle
      const zelleUrl = `zelle://send?message=${encodeURIComponent(message)}`;
      
      // Try to open Zelle
      window.location.href = zelleUrl;
      
      // Fallback to web version if app doesn't open
      setTimeout(() => {
        window.open('https://www.zellepay.com/', '_blank');
      }, 1000);

      return pdfUrl;
    } catch (error) {
      console.error('Error sharing with Zelle:', error);
      throw error;
    }
  }
}; 