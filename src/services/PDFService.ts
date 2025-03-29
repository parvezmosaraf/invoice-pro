import { Invoice } from "@/types/invoice";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function generatePDF(invoice: Invoice): Promise<Blob> {
  try {
    // Create a temporary container for the invoice
    const container = document.createElement('div');
    container.id = `invoice-${invoice.id}-pdf`;
    container.style.padding = '20px';
    container.style.backgroundColor = 'white';
    document.body.appendChild(container);

    // Render the invoice content
    container.innerHTML = `
      <div style="font-family: Arial, sans-serif;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
          <div>
            <h1 style="font-size: 24px; color: #1a1a1a;">INVOICE</h1>
            <p style="color: #666;">#${invoice.invoiceNumber}</p>
          </div>
          <div style="text-align: right;">
            <p style="color: #666;">Issue Date: ${invoice.issueDate}</p>
            <p style="color: #666;">Due Date: ${invoice.dueDate}</p>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 30px;">
          <div>
            <h2 style="font-size: 16px; color: #666; margin-bottom: 10px;">From</h2>
            <p style="margin: 0; color: #1a1a1a;">${invoice.company.name}</p>
            <p style="margin: 0; color: #666;">${invoice.company.address}</p>
            <p style="margin: 0; color: #666;">${invoice.company.city}, ${invoice.company.country} ${invoice.company.postalCode}</p>
          </div>
          <div>
            <h2 style="font-size: 16px; color: #666; margin-bottom: 10px;">Bill To</h2>
            <p style="margin: 0; color: #1a1a1a;">${invoice.client.name}</p>
            <p style="margin: 0; color: #666;">${invoice.client.company || ''}</p>
            <p style="margin: 0; color: #666;">${invoice.client.address || ''}</p>
          </div>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
          <thead>
            <tr style="border-bottom: 2px solid #eee;">
              <th style="text-align: left; padding: 10px; color: #666;">Description</th>
              <th style="text-align: right; padding: 10px; color: #666;">Quantity</th>
              <th style="text-align: right; padding: 10px; color: #666;">Price</th>
              <th style="text-align: right; padding: 10px; color: #666;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${invoice.items.map(item => `
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px;">${item.description}</td>
                <td style="text-align: right; padding: 10px;">${item.quantity}</td>
                <td style="text-align: right; padding: 10px;">${invoice.currency} ${item.price.toFixed(2)}</td>
                <td style="text-align: right; padding: 10px;">${invoice.currency} ${(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div style="display: flex; justify-content: flex-end; margin-bottom: 30px;">
          <div style="width: 300px;">
            <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee;">
              <span style="color: #666;">Subtotal</span>
              <span>${invoice.currency} ${invoice.items.reduce((sum, item) => sum + (item.quantity * item.price), 0).toFixed(2)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; padding: 10px 0; font-weight: bold;">
              <span>Total</span>
              <span>${invoice.currency} ${invoice.items.reduce((sum, item) => sum + (item.quantity * item.price), 0).toFixed(2)}</span>
            </div>
          </div>
        </div>

        ${invoice.notes ? `
          <div style="border-top: 1px solid #eee; padding-top: 20px;">
            <h2 style="font-size: 16px; color: #666; margin-bottom: 10px;">Notes</h2>
            <p style="color: #666;">${invoice.notes}</p>
          </div>
        ` : ''}
      </div>
    `;

    // Convert to canvas
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      logging: false
    });

    // Remove the temporary container
    document.body.removeChild(container);

    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'a4'
    });

    // Add the canvas as an image
    const imgData = canvas.toDataURL('image/png');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

    // Return as blob
    return pdf.output('blob');
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
} 