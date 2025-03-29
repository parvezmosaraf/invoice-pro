import { InvoiceData } from "@/types/invoice";

interface InvoiceTemplateProps {
  template: string;
  data: InvoiceData;
}

const calculateInvoiceTotals = (data: InvoiceData) => {
  const calculateItemTotal = (item: any) => {
    return item.quantity * (typeof item.price === 'string' ? parseFloat(item.price) || 0 : item.price);
  };

  const subtotal = data.items.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  const tax = (subtotal * (data.taxRate || 0)) / 100;
  const total = subtotal + tax;

  return { subtotal, tax, total };
};

export const ClassicTemplate = ({ data }: InvoiceTemplateProps) => {
  const calculateItemTotal = (item: any) => {
    return item.quantity * (typeof item.price === 'string' ? parseFloat(item.price) || 0 : item.price);
  };

  const subtotal = data.items.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  const tax = (subtotal * (data.taxRate || 0)) / 100;
  const total = subtotal + tax;

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <div className="flex justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">INVOICE</h1>
          <p className="text-gray-600 mt-1">#{data.invoiceNumber}</p>
        </div>
        <div className="text-right">
          <p className="text-gray-600">Issue Date: {data.issueDate}</p>
          <p className="text-gray-600">Due Date: {data.dueDate}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-gray-600 font-semibold mb-2">From</h2>
          <p className="text-gray-800">{data.company.name}</p>
          <p className="text-gray-600">{data.company.address}</p>
          <p className="text-gray-600">{data.company.city}, {data.company.country} {data.company.postalCode}</p>
        </div>
        <div>
          <h2 className="text-gray-600 font-semibold mb-2">Bill To</h2>
          <p className="text-gray-800">{data.client.name}</p>
          <p className="text-gray-600">{data.client.company}</p>
          <p className="text-gray-600">{data.client.address}</p>
        </div>
      </div>

      <table className="w-full mb-8">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4">Description</th>
            <th className="text-right py-3 px-4">Quantity</th>
            <th className="text-right py-3 px-4">Price</th>
            <th className="text-right py-3 px-4">Total</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item) => (
            <tr key={item.id} className="border-b border-gray-100">
              <td className="py-3 px-4">{item.description}</td>
              <td className="text-right py-3 px-4">{item.quantity}</td>
              <td className="text-right py-3 px-4">{data.currency} {item.price.toFixed(2)}</td>
              <td className="text-right py-3 px-4">{data.currency} {(item.quantity * item.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-8 flex justify-end">
        <div className="w-80">
          <div className="flex justify-between py-2">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">{data.currency} {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Tax ({(data.taxRate || 0).toFixed(1)}%)</span>
            <span className="font-medium">{data.currency} {tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 text-lg font-bold">
            <span>Total</span>
            <span>{data.currency} {total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {data.notes && (
        <div className="border-t border-gray-200 pt-4">
          <h2 className="text-gray-600 font-semibold mb-2">Notes</h2>
          <p className="text-gray-600">{data.notes}</p>
        </div>
      )}
    </div>
  );
};

export const ModernTemplate = ({ data }: InvoiceTemplateProps) => {
  const calculateItemTotal = (item: any) => {
    return item.quantity * (typeof item.price === 'string' ? parseFloat(item.price) || 0 : item.price);
  };

  const subtotal = data.items.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  const tax = (subtotal * (data.taxRate || 0)) / 100;
  const total = subtotal + tax;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl">
      <div className="bg-primary text-white p-6 -mx-8 -mt-8 mb-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-light">INVOICE</h1>
          <p className="text-xl">#{data.invoiceNumber}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-12 mb-12">
        <div>
          <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-4">From</h2>
          <p className="font-medium">{data.company.name}</p>
          <p className="text-gray-600">{data.company.address}</p>
          <p className="text-gray-600">{data.company.city}, {data.company.country} {data.company.postalCode}</p>
        </div>
        <div>
          <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-4">Bill To</h2>
          <p className="font-medium">{data.client.name}</p>
          <p className="text-gray-600">{data.client.company}</p>
          <p className="text-gray-600">{data.client.address}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-12 mb-12">
        <div>
          <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-4">Issue Date</h2>
          <p className="font-medium">{data.issueDate}</p>
        </div>
        <div>
          <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-4">Due Date</h2>
          <p className="font-medium">{data.dueDate}</p>
        </div>
      </div>

      <table className="w-full mb-12">
        <thead>
          <tr className="border-b-2 border-gray-200">
            <th className="text-left py-4 px-4 text-sm uppercase tracking-wider text-gray-500">Description</th>
            <th className="text-right py-4 px-4 text-sm uppercase tracking-wider text-gray-500">Quantity</th>
            <th className="text-right py-4 px-4 text-sm uppercase tracking-wider text-gray-500">Price</th>
            <th className="text-right py-4 px-4 text-sm uppercase tracking-wider text-gray-500">Total</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item) => (
            <tr key={item.id} className="border-b border-gray-100">
              <td className="py-4 px-4">{item.description}</td>
              <td className="text-right py-4 px-4">{item.quantity}</td>
              <td className="text-right py-4 px-4">{data.currency} {item.price.toFixed(2)}</td>
              <td className="text-right py-4 px-4">{data.currency} {(item.quantity * item.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-8 flex justify-end">
        <div className="w-80 bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between py-2">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">{data.currency} {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Tax ({(data.taxRate || 0).toFixed(1)}%)</span>
            <span className="font-medium">{data.currency} {tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 text-lg font-bold text-blue-600">
            <span>Total</span>
            <span>{data.currency} {total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {data.notes && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-2">Notes</h2>
          <p className="text-gray-600">{data.notes}</p>
        </div>
      )}
    </div>
  );
};

export const CreativeTemplate = ({ data }: InvoiceTemplateProps) => {
  const { subtotal, tax, total } = calculateInvoiceTotals(data);
  
  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl">
      <div className="bg-white p-8 rounded-lg">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-transparent bg-clip-text">INVOICE</h1>
            <p className="text-gray-500 mt-2">#{data.invoiceNumber}</p>
          </div>
          <div className="text-right">
            <div className="inline-block bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] p-[1px] rounded">
              <div className="bg-white px-4 py-2 rounded">
                <p className="text-sm text-gray-600">Issue Date</p>
                <p className="font-medium">{data.issueDate}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-12 mb-12">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-[#FF6B6B] font-medium mb-4">From</h2>
            <p className="font-bold">{data.company.name}</p>
            <p className="text-gray-600">{data.company.address}</p>
            <p className="text-gray-600">{data.company.city}, {data.company.country} {data.company.postalCode}</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-[#4ECDC4] font-medium mb-4">Bill To</h2>
            <p className="font-bold">{data.client.name}</p>
            <p className="text-gray-600">{data.client.company}</p>
            <p className="text-gray-600">{data.client.address}</p>
          </div>
        </div>

        <div className="mb-12">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left py-4 px-6 bg-gray-50 rounded-l-lg text-gray-600">Description</th>
                <th className="text-right py-4 px-6 bg-gray-50 text-gray-600">Quantity</th>
                <th className="text-right py-4 px-6 bg-gray-50 text-gray-600">Price</th>
                <th className="text-right py-4 px-6 bg-gray-50 rounded-r-lg text-gray-600">Total</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item, index) => (
                <tr key={item.id} className={index % 2 === 0 ? 'bg-gray-50/50' : ''}>
                  <td className="py-4 px-6">{item.description}</td>
                  <td className="text-right py-4 px-6">{item.quantity}</td>
                  <td className="text-right py-4 px-6">{data.currency} {item.price.toFixed(2)}</td>
                  <td className="text-right py-4 px-6">{data.currency} {(item.quantity * item.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mb-12">
          <div className="w-1/3">
            <div className="flex justify-between py-4">
              <span className="text-gray-600">Subtotal</span>
              <span>{data.currency} {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-4">
              <span className="text-gray-600">Tax ({(data.taxRate || 0).toFixed(1)}%)</span>
              <span>{data.currency} {tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-4 border-t-2 border-dashed border-gray-200">
              <span className="font-bold">Total</span>
              <span className="font-bold text-[#4ECDC4]">{data.currency} {total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {data.notes && (
          <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#FF6B6B]">
            <h2 className="text-[#FF6B6B] font-medium mb-2">Notes</h2>
            <p className="text-gray-600">{data.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export const CorporateTemplate = ({ data }: InvoiceTemplateProps) => {
  const { subtotal, tax, total } = calculateInvoiceTotals(data);
  
  return (
    <div className="bg-slate-50 p-8 rounded-xl">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-light">INVOICE</h1>
          <p className="text-gray-400 mt-2">#{data.invoiceNumber}</p>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="text-sm text-gray-400">Issue Date</p>
            <p className="font-medium">{data.issueDate}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Due Date</p>
            <p className="font-medium">{data.dueDate}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-12 mb-12">
        <div className="bg-[#334155] p-6 rounded-lg">
          <h2 className="text-sm uppercase tracking-wider text-gray-400 mb-4">From</h2>
          <p className="font-medium">{data.company.name}</p>
          <p className="text-gray-400">{data.company.address}</p>
          <p className="text-gray-400">{data.company.city}, {data.company.country} {data.company.postalCode}</p>
        </div>
        <div className="bg-[#334155] p-6 rounded-lg">
          <h2 className="text-sm uppercase tracking-wider text-gray-400 mb-4">Bill To</h2>
          <p className="font-medium">{data.client.name}</p>
          <p className="text-gray-400">{data.client.company}</p>
          <p className="text-gray-400">{data.client.address}</p>
        </div>
      </div>

      <div className="bg-[#334155] rounded-lg p-6 mb-12">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="text-left py-4 px-4 text-sm uppercase tracking-wider text-gray-400">Description</th>
              <th className="text-right py-4 px-4 text-sm uppercase tracking-wider text-gray-400">Quantity</th>
              <th className="text-right py-4 px-4 text-sm uppercase tracking-wider text-gray-400">Price</th>
              <th className="text-right py-4 px-4 text-sm uppercase tracking-wider text-gray-400">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item) => (
              <tr key={item.id} className="border-b border-gray-700">
                <td className="py-4 px-4">{item.description}</td>
                <td className="text-right py-4 px-4">{item.quantity}</td>
                <td className="text-right py-4 px-4">{data.currency} {item.price.toFixed(2)}</td>
                <td className="text-right py-4 px-4">{data.currency} {(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mb-12">
        <div className="w-1/3 bg-[#334155] p-6 rounded-lg shadow-sm border border-slate-200">
          <div className="flex justify-between py-2">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">{data.currency} {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-200">
            <span className="text-gray-600">Tax ({(data.taxRate || 0).toFixed(1)}%)</span>
            <span className="font-medium">{data.currency} {tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 text-lg font-bold text-slate-800">
            <span>Total</span>
            <span>{data.currency} {total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {data.notes && (
        <div className="bg-[#334155] p-6 rounded-lg">
          <h2 className="text-sm uppercase tracking-wider text-gray-400 mb-2">Notes</h2>
          <p className="text-gray-300">{data.notes}</p>
        </div>
      )}
    </div>
  );
};

export const MinimalistTemplate = ({ data }: InvoiceTemplateProps) => {
  const { subtotal, tax, total } = calculateInvoiceTotals(data);
  
  return (
    <div className="bg-white p-12 rounded-lg shadow-lg max-w-4xl mx-auto">
      <div className="border-t-2 border-black pt-8 mb-12">
        <div className="flex justify-between items-start">
          <h1 className="text-3xl font-light tracking-tight">INVOICE</h1>
          <div className="text-right">
            <p className="text-sm text-gray-600 mb-1">#{data.invoiceNumber}</p>
            <p className="text-sm text-gray-600">Issue Date: {data.issueDate}</p>
            <p className="text-sm text-gray-600">Due Date: {data.dueDate}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-16 mb-16">
        <div>
          <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-4">From</h2>
          <p className="font-medium">{data.company.name}</p>
          <p className="text-sm text-gray-600">{data.company.address}</p>
          <p className="text-sm text-gray-600">{data.company.city}, {data.company.country} {data.company.postalCode}</p>
        </div>
        <div>
          <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Bill To</h2>
          <p className="font-medium">{data.client.name}</p>
          <p className="text-sm text-gray-600">{data.client.company}</p>
          <p className="text-sm text-gray-600">{data.client.address}</p>
        </div>
      </div>

      <table className="w-full mb-16">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-4 text-xs uppercase tracking-widest text-gray-500">Description</th>
            <th className="text-right py-4 text-xs uppercase tracking-widest text-gray-500">Quantity</th>
            <th className="text-right py-4 text-xs uppercase tracking-widest text-gray-500">Price</th>
            <th className="text-right py-4 text-xs uppercase tracking-widest text-gray-500">Total</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item) => (
            <tr key={item.id} className="border-b border-gray-100">
              <td className="py-4">{item.description}</td>
              <td className="text-right py-4">{item.quantity}</td>
              <td className="text-right py-4">{data.currency} {item.price.toFixed(2)}</td>
              <td className="text-right py-4">{data.currency} {(item.quantity * item.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end mb-16">
        <div className="w-1/3">
          <div className="flex justify-between py-4">
            <span className="text-sm text-gray-600">Subtotal</span>
            <span>{data.currency} {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-4">
            <span className="text-sm text-gray-600">Tax ({(data.taxRate || 0).toFixed(1)}%)</span>
            <span>{data.currency} {tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-4 border-t border-black">
            <span className="font-medium">Total</span>
            <span className="font-medium">{data.currency} {total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {data.notes && (
        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Notes</h2>
          <p className="text-sm text-gray-600">{data.notes}</p>
        </div>
      )}
    </div>
  );
};

export const ElegantTemplate = ({ data }: InvoiceTemplateProps) => {
  const { subtotal, tax, total } = calculateInvoiceTotals(data);
  
  return (
    <div className="bg-white p-12 rounded-lg shadow-lg border-2 border-[#DAA520]">
      <div className="bg-[#1A1A1A] -mx-12 -mt-12 p-12 mb-12">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-light text-white">{data.company.name}</h1>
            <p className="text-[#DAA520] tracking-widest mt-2">ESTABLISHED 2024</p>
          </div>
          <div className="text-right">
            <h2 className="text-3xl font-light text-white">INVOICE</h2>
            <p className="text-[#DAA520] mt-2">#{data.invoiceNumber}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-16 mb-16">
        <div className="border border-[#DAA520] p-6">
          <h2 className="text-sm tracking-widest text-gray-600 mb-4">FROM</h2>
          <p className="text-xl mb-2">{data.company.name}</p>
          <p className="text-gray-600">{data.company.address}</p>
          <p className="text-gray-600">{data.company.city}, {data.company.country} {data.company.postalCode}</p>
        </div>
        <div className="border border-[#DAA520] p-6">
          <h2 className="text-sm tracking-widest text-gray-600 mb-4">BILL TO</h2>
          <p className="text-xl mb-2">{data.client.name}</p>
          <p className="text-gray-600">{data.client.company}</p>
          <p className="text-gray-600">{data.client.address}</p>
        </div>
      </div>

      <table className="w-full mb-16">
        <thead>
          <tr className="bg-[#1A1A1A]">
            <th className="text-left py-4 px-6 text-white">Description</th>
            <th className="text-right py-4 px-6 text-white">Quantity</th>
            <th className="text-right py-4 px-6 text-white">Price</th>
            <th className="text-right py-4 px-6 text-white">Total</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item) => (
            <tr key={item.id} className="border-b border-[#DAA520]">
              <td className="py-4 px-6">{item.description}</td>
              <td className="text-right py-4 px-6">{item.quantity}</td>
              <td className="text-right py-4 px-6">{data.currency} {item.price.toFixed(2)}</td>
              <td className="text-right py-4 px-6">{data.currency} {(item.quantity * item.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end mb-16">
        <div className="w-1/3 bg-[#1A1A1A] p-6">
          <div className="flex justify-between py-4 text-white">
            <span>Subtotal</span>
            <span>{data.currency} {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-4 text-white border-b border-[#DAA520]/20">
            <span>Tax ({(data.taxRate || 0).toFixed(1)}%)</span>
            <span>{data.currency} {tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-4">
            <span className="text-[#DAA520] text-lg">TOTAL</span>
            <span className="text-[#DAA520] text-lg">{data.currency} {total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {data.notes && (
        <div>
          <h2 className="text-sm tracking-widest text-gray-600 mb-4">NOTES</h2>
          <p className="text-gray-600">{data.notes}</p>
        </div>
      )}
    </div>
  );
};

export const PremiumTemplate = ({ data }: InvoiceTemplateProps) => {
  const { subtotal, tax, total } = calculateInvoiceTotals(data);
  
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 rounded-lg">
      <div className="border-b border-slate-700 pb-8 mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-5xl font-light tracking-tight mb-2">INVOICE</h1>
            <p className="text-slate-400 text-sm">#{data.invoiceNumber}</p>
          </div>
          <div className="text-right">
            <div className="bg-slate-800 px-4 py-2 rounded-lg">
              <p className="text-sm text-slate-400">Amount Due</p>
              <p className="text-2xl font-semibold text-blue-400">
                {data.currency} {data.items.reduce((sum, item) => sum + (item.quantity * item.price), 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-12 mb-12">
        <div>
          <h2 className="text-sm uppercase tracking-wider text-slate-400 mb-4">From</h2>
          <div className="space-y-2">
            <p className="font-medium">{data.company.name}</p>
            <p className="text-slate-400">{data.company.address}</p>
            <p className="text-slate-400">{data.company.city}, {data.company.country} {data.company.postalCode}</p>
          </div>
        </div>
        <div>
          <h2 className="text-sm uppercase tracking-wider text-slate-400 mb-4">Bill To</h2>
          <div className="space-y-2">
            <p className="font-medium">{data.client.name}</p>
            <p className="text-slate-400">{data.client.company}</p>
            <p className="text-slate-400">{data.client.address}</p>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="py-3 text-left text-slate-400 font-medium">Description</th>
              <th className="py-3 text-right text-slate-400 font-medium">Quantity</th>
              <th className="py-3 text-right text-slate-400 font-medium">Price</th>
              <th className="py-3 text-right text-slate-400 font-medium">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item) => (
              <tr key={item.id} className="border-b border-slate-700/50">
                <td className="py-4">{item.description}</td>
                <td className="py-4 text-right">{item.quantity}</td>
                <td className="py-4 text-right">{data.currency} {item.price.toFixed(2)}</td>
                <td className="py-4 text-right">{data.currency} {(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mb-12">
        <div className="w-1/3 space-y-3">
          <div className="flex justify-between py-2 text-slate-400">
            <span>Subtotal</span>
            <span>{data.currency} {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 text-slate-400">
            <span>Tax ({(data.taxRate || 0).toFixed(1)}%)</span>
            <span>{data.currency} {tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 border-t border-slate-700">
            <span className="font-medium">Total</span>
            <span className="font-medium text-blue-400">{data.currency} {total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {data.notes && (
        <div className="bg-slate-800/50 p-6 rounded-lg">
          <h2 className="text-sm uppercase tracking-wider text-slate-400 mb-2">Notes</h2>
          <p className="text-slate-300">{data.notes}</p>
        </div>
      )}
    </div>
  );
};

export const MinimalistProTemplate = ({ data }: InvoiceTemplateProps) => {
  const { subtotal, tax, total } = calculateInvoiceTotals(data);
  
  return (
    <div className="bg-white p-8 rounded-lg">
      <div className="flex justify-between items-start mb-12">
        <div>
          <h1 className="text-6xl font-extralight text-gray-800">Invoice</h1>
          <p className="text-gray-500 mt-2">#{data.invoiceNumber}</p>
        </div>
        <div className="text-right space-y-1">
          <p className="text-sm text-gray-500">Issue Date: {data.issueDate}</p>
          <p className="text-sm text-gray-500">Due Date: {data.dueDate}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-16 mb-16">
        <div>
          <div className="h-1 w-12 bg-blue-500 mb-4"></div>
          <h2 className="text-sm text-gray-400 mb-2">From</h2>
          <div className="space-y-1">
            <p className="text-lg font-medium">{data.company.name}</p>
            <p className="text-gray-600">{data.company.address}</p>
            <p className="text-gray-600">{data.company.city}, {data.company.country}</p>
            <p className="text-gray-600">{data.company.postalCode}</p>
          </div>
        </div>
        <div>
          <div className="h-1 w-12 bg-gray-200 mb-4"></div>
          <h2 className="text-sm text-gray-400 mb-2">Bill To</h2>
          <div className="space-y-1">
            <p className="text-lg font-medium">{data.client.name}</p>
            <p className="text-gray-600">{data.client.company}</p>
            <p className="text-gray-600">{data.client.address}</p>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left py-4 text-sm font-normal text-gray-400">Description</th>
              <th className="text-right py-4 text-sm font-normal text-gray-400">Quantity</th>
              <th className="text-right py-4 text-sm font-normal text-gray-400">Price</th>
              <th className="text-right py-4 text-sm font-normal text-gray-400">Total</th>
            </tr>
          </thead>
          <tbody className="border-t border-gray-100">
            {data.items.map((item) => (
              <tr key={item.id} className="border-b border-gray-50">
                <td className="py-4">{item.description}</td>
                <td className="py-4 text-right">{item.quantity}</td>
                <td className="py-4 text-right">{data.currency} {item.price.toFixed(2)}</td>
                <td className="py-4 text-right">{data.currency} {(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mb-16">
        <div className="w-1/3">
          <div className="space-y-3 border-t border-gray-100 pt-3">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span>{data.currency} {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Tax ({(data.taxRate || 0).toFixed(1)}%)</span>
              <span>{data.currency} {tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span className="text-blue-500">{data.currency} {total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {data.notes && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-sm text-gray-400 mb-2">Notes</h2>
          <p className="text-gray-600">{data.notes}</p>
        </div>
      )}
    </div>
  );
};

export const BusinessProTemplate = ({ data }: InvoiceTemplateProps) => {
  const { subtotal, tax, total } = calculateInvoiceTotals(data);
  
  return (
    <div className="bg-white p-8 rounded-lg">
      <div className="flex justify-between items-start mb-12 border-b border-gray-200 pb-8">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="h-12 w-2 bg-indigo-600"></div>
            <h1 className="text-4xl font-bold text-gray-900">INVOICE</h1>
          </div>
          <p className="text-gray-500">#{data.invoiceNumber}</p>
        </div>
        <div className="text-right">
          <div className="inline-block border border-indigo-100 rounded-lg p-4 bg-indigo-50">
            <p className="text-sm text-indigo-600 mb-1">Amount Due</p>
            <p className="text-2xl font-bold text-indigo-600">
              {data.currency} {data.items.reduce((sum, item) => sum + (item.quantity * item.price), 0).toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-12 mb-12">
        <div className="p-6 bg-gray-50 rounded-lg">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">From</h2>
          <div className="space-y-2">
            <p className="font-bold text-gray-900">{data.company.name}</p>
            <p className="text-gray-600">{data.company.address}</p>
            <p className="text-gray-600">{data.company.city}, {data.company.country}</p>
            <p className="text-gray-600">{data.company.postalCode}</p>
          </div>
        </div>
        <div className="p-6 bg-gray-50 rounded-lg">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Bill To</h2>
          <div className="space-y-2">
            <p className="font-bold text-gray-900">{data.client.name}</p>
            <p className="text-gray-600">{data.client.company}</p>
            <p className="text-gray-600">{data.client.address}</p>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <div className="bg-gray-50 rounded-t-lg border-b border-gray-200">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">Description</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-gray-900">Quantity</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-gray-900">Price</th>
                <th className="text-right py-4 px-6 text-sm font-semibold text-gray-900">Total</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item, index) => (
                <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="py-4 px-6">{item.description}</td>
                  <td className="py-4 px-6 text-right">{item.quantity}</td>
                  <td className="py-4 px-6 text-right">{data.currency} {item.price.toFixed(2)}</td>
                  <td className="py-4 px-6 text-right">{data.currency} {(item.quantity * item.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end mb-12">
        <div className="w-1/3">
          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">{data.currency} {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Tax ({(data.taxRate || 0).toFixed(1)}%)</span>
              <span className="font-medium">{data.currency} {tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-3">
              <span className="font-semibold text-gray-900">Total Amount</span>
              <span className="font-bold text-indigo-600">{data.currency} {total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {data.notes && (
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h2 className="text-sm font-semibold text-gray-900 mb-2">Notes</h2>
          <p className="text-gray-600">{data.notes}</p>
        </div>
      )}

      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="text-center">
          <p className="text-gray-500 text-sm">Thank you for your business!</p>
          <p className="text-gray-400 text-sm mt-1">Payment is due within {new Date(data.dueDate).getDate() - new Date(data.issueDate).getDate()} days</p>
        </div>
      </div>
    </div>
  );
};

export const BoutiqueTemplate = ({ data }: InvoiceTemplateProps) => {
  const { subtotal, tax, total } = calculateInvoiceTotals(data);
  
  return (
    <div className="bg-white p-8 rounded-lg">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-light text-pink-900 tracking-wider">INVOICE</h1>
          <p className="text-pink-700 mt-1">#{data.invoiceNumber}</p>
        </div>
        <div className="text-right">
          <p className="text-pink-700">Issue Date: {data.issueDate}</p>
          <p className="text-pink-700">Due Date: {data.dueDate}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="bg-pink-50 p-6 rounded-lg">
          <h2 className="text-pink-900 font-semibold mb-2 tracking-wide">FROM</h2>
          <p className="text-pink-900">{data.company.name}</p>
          <p className="text-pink-700">{data.company.address}</p>
          <p className="text-pink-700">{data.company.city}, {data.company.country} {data.company.postalCode}</p>
        </div>
        <div className="bg-pink-50 p-6 rounded-lg">
          <h2 className="text-pink-900 font-semibold mb-2 tracking-wide">BILL TO</h2>
          <p className="text-pink-900">{data.client.name}</p>
          <p className="text-pink-700">{data.client.company}</p>
          <p className="text-pink-700">{data.client.address}</p>
        </div>
      </div>

      <div className="bg-pink-50 rounded-lg overflow-hidden mb-8">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left py-4 px-6 text-pink-900">Description</th>
              <th className="text-right py-4 px-6 text-pink-900">Quantity</th>
              <th className="text-right py-4 px-6 text-pink-900">Price</th>
              <th className="text-right py-4 px-6 text-pink-900">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item) => (
              <tr key={item.id} className="border-t border-pink-200">
                <td className="py-4 px-6 text-pink-900">{item.description}</td>
                <td className="text-right py-4 px-6 text-pink-700">{item.quantity}</td>
                <td className="text-right py-4 px-6 text-pink-700">{data.currency} {item.price.toFixed(2)}</td>
                <td className="text-right py-4 px-6 text-pink-700">{data.currency} {(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mb-8">
        <div className="w-1/3">
          <div className="flex justify-between py-2">
            <span className="text-pink-700">Subtotal</span>
            <span className="text-pink-900">{data.currency} {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-pink-700">Tax ({(data.taxRate || 0).toFixed(1)}%)</span>
            <span className="text-pink-900">{data.currency} {tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 border-t border-pink-200">
            <span className="font-semibold text-pink-900">Total</span>
            <span className="font-semibold text-pink-900">{data.currency} {total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {data.notes && (
        <div className="border-t border-pink-200 pt-4">
          <h2 className="text-pink-900 font-semibold mb-2">Notes</h2>
          <p className="text-pink-700">{data.notes}</p>
        </div>
      )}
    </div>
  );
};

export const TechTemplate = ({ data }: InvoiceTemplateProps) => {
  const { subtotal, tax, total } = calculateInvoiceTotals(data);
  
  return (
    <div className="bg-slate-900 text-white p-8 rounded-lg">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-cyan-400 tracking-tight">INVOICE</h1>
          <p className="text-slate-400 mt-1">#{data.invoiceNumber}</p>
        </div>
        <div className="border border-cyan-500 rounded-lg p-4">
          <p className="text-cyan-400 text-sm">Amount Due</p>
          <p className="text-2xl font-bold">{data.currency} {data.items.reduce((sum, item) => sum + (item.quantity * item.price), 0).toFixed(2)}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="bg-slate-800 p-6 rounded-lg">
          <h2 className="text-slate-400 text-sm font-medium mb-2">FROM</h2>
          <p className="text-white font-medium">{data.company.name}</p>
          <p className="text-slate-400">{data.company.address}</p>
          <p className="text-slate-400">{data.company.city}, {data.company.country} {data.company.postalCode}</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-lg">
          <h2 className="text-slate-400 text-sm font-medium mb-2">BILL TO</h2>
          <p className="text-white font-medium">{data.client.name}</p>
          <p className="text-slate-400">{data.client.company}</p>
          <p className="text-slate-400">{data.client.address}</p>
        </div>
      </div>

      <div className="bg-slate-800 rounded-lg overflow-hidden mb-8">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-4 px-6 text-slate-400">Description</th>
              <th className="text-right py-4 px-6 text-slate-400">Quantity</th>
              <th className="text-right py-4 px-6 text-slate-400">Price</th>
              <th className="text-right py-4 px-6 text-slate-400">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item) => (
              <tr key={item.id} className="border-b border-slate-700">
                <td className="py-4 px-6">{item.description}</td>
                <td className="text-right py-4 px-6">{item.quantity}</td>
                <td className="text-right py-4 px-6">{data.currency} {item.price.toFixed(2)}</td>
                <td className="text-right py-4 px-6">{data.currency} {(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mb-8">
        <div className="w-1/3">
          <div className="flex justify-between py-2">
            <span className="text-slate-400">Subtotal</span>
            <span>{data.currency} {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-slate-400">Tax ({(data.taxRate || 0).toFixed(1)}%)</span>
            <span>{data.currency} {tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 border-t border-slate-700">
            <span className="font-medium text-cyan-400">Total</span>
            <span className="font-medium text-cyan-400">{data.currency} {total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {data.notes && (
        <div className="bg-slate-800 p-4 rounded-lg">
          <h2 className="text-slate-400 font-medium mb-2">Notes</h2>
          <p className="text-slate-300">{data.notes}</p>
        </div>
      )}
    </div>
  );
};

export const NatureTemplate = ({ data }: InvoiceTemplateProps) => {
  const { subtotal, tax, total } = calculateInvoiceTotals(data);
  
  return (
    <div className="bg-green-50 p-8 rounded-lg">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-light text-green-800">Invoice</h1>
          <p className="text-green-600 mt-1">#{data.invoiceNumber}</p>
        </div>
        <div className="text-right">
          <p className="text-green-600">Issue Date: {data.issueDate}</p>
          <p className="text-green-600">Due Date: {data.dueDate}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="bg-white border-2 border-green-200 p-6 rounded-xl">
          <h2 className="text-green-600 font-medium mb-2">FROM</h2>
          <p className="text-green-800 font-medium">{data.company.name}</p>
          <p className="text-green-600">{data.company.address}</p>
          <p className="text-green-600">{data.company.city}, {data.company.country} {data.company.postalCode}</p>
        </div>
        <div className="bg-white border-2 border-green-200 p-6 rounded-xl">
          <h2 className="text-green-600 font-medium mb-2">BILL TO</h2>
          <p className="text-green-800 font-medium">{data.client.name}</p>
          <p className="text-green-600">{data.client.company}</p>
          <p className="text-green-600">{data.client.address}</p>
        </div>
      </div>

      <div className="bg-white border-2 border-green-200 rounded-xl overflow-hidden mb-8">
        <table className="w-full">
          <thead>
            <tr className="bg-green-100">
              <th className="text-left py-4 px-6 text-green-800">Description</th>
              <th className="text-right py-4 px-6 text-green-800">Quantity</th>
              <th className="text-right py-4 px-6 text-green-800">Price</th>
              <th className="text-right py-4 px-6 text-green-800">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item) => (
              <tr key={item.id} className="border-t border-green-100">
                <td className="py-4 px-6 text-green-800">{item.description}</td>
                <td className="text-right py-4 px-6 text-green-600">{item.quantity}</td>
                <td className="text-right py-4 px-6 text-green-600">{data.currency} {item.price.toFixed(2)}</td>
                <td className="text-right py-4 px-6 text-green-600">{data.currency} {(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mb-8">
        <div className="w-1/3 bg-white border-2 border-green-200 rounded-xl p-4">
          <div className="flex justify-between py-2">
            <span className="text-green-600">Subtotal</span>
            <span className="text-green-800">{data.currency} {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-green-600">Tax ({(data.taxRate || 0).toFixed(1)}%)</span>
            <span className="text-green-800">{data.currency} {tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 border-t border-green-100">
            <span className="font-medium text-green-800">Total</span>
            <span className="font-medium text-green-800">{data.currency} {total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {data.notes && (
        <div className="bg-white border-2 border-green-200 p-4 rounded-xl">
          <h2 className="text-green-800 font-medium mb-2">Notes</h2>
          <p className="text-green-600">{data.notes}</p>
        </div>
      )}
    </div>
  );
};

export const VintageTemplate = ({ data }: InvoiceTemplateProps) => {
  const { subtotal, tax, total } = calculateInvoiceTotals(data);
  
  return (
    <div className="bg-amber-50 p-8 rounded-lg">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-serif text-amber-900">INVOICE</h1>
          <p className="text-amber-700 font-serif mt-1">#{data.invoiceNumber}</p>
        </div>
        <div className="text-right">
          <p className="text-amber-700 font-serif">Issue Date: {data.issueDate}</p>
          <p className="text-amber-700 font-serif">Due Date: {data.dueDate}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="border-2 border-amber-200 p-6 rounded">
          <h2 className="text-amber-900 font-serif font-medium mb-2">FROM</h2>
          <p className="text-amber-900 font-serif">{data.company.name}</p>
          <p className="text-amber-700">{data.company.address}</p>
          <p className="text-amber-700">{data.company.city}, {data.company.country} {data.company.postalCode}</p>
        </div>
        <div className="border-2 border-amber-200 p-6 rounded">
          <h2 className="text-amber-900 font-serif font-medium mb-2">BILL TO</h2>
          <p className="text-amber-900 font-serif">{data.client.name}</p>
          <p className="text-amber-700">{data.client.company}</p>
          <p className="text-amber-700">{data.client.address}</p>
        </div>
      </div>

      <div className="border-2 border-amber-200 rounded overflow-hidden mb-8">
        <table className="w-full">
          <thead>
            <tr className="bg-amber-100">
              <th className="text-left py-4 px-6 text-amber-900 font-serif">Description</th>
              <th className="text-right py-4 px-6 text-amber-900 font-serif">Quantity</th>
              <th className="text-right py-4 px-6 text-amber-900 font-serif">Price</th>
              <th className="text-right py-4 px-6 text-amber-900 font-serif">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item) => (
              <tr key={item.id} className="border-t border-amber-200">
                <td className="py-4 px-6 text-amber-900">{item.description}</td>
                <td className="text-right py-4 px-6 text-amber-700">{item.quantity}</td>
                <td className="text-right py-4 px-6 text-amber-700">{data.currency} {item.price.toFixed(2)}</td>
                <td className="text-right py-4 px-6 text-amber-700">{data.currency} {(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mb-8">
        <div className="w-1/3 border-2 border-amber-200 p-4 rounded">
          <div className="flex justify-between py-2">
            <span className="text-amber-700 font-serif">Subtotal</span>
            <span className="text-amber-900">{data.currency} {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-amber-700 font-serif">Tax ({(data.taxRate || 0).toFixed(1)}%)</span>
            <span className="text-amber-900">{data.currency} {tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 border-t border-amber-200">
            <span className="font-medium text-amber-900 font-serif">Total</span>
            <span className="font-medium text-amber-900">{data.currency} {total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {data.notes && (
        <div className="border-t-2 border-amber-200 pt-4">
          <h2 className="text-amber-900 font-serif font-medium mb-2">Notes</h2>
          <p className="text-amber-700">{data.notes}</p>
        </div>
      )}
    </div>
  );
};

export const ArtisticTemplate = ({ data }: InvoiceTemplateProps) => {
  const { subtotal, tax, total } = calculateInvoiceTotals(data);
  
  return (
    <div className="bg-purple-50 p-8 rounded-lg">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-5xl font-light text-purple-900 tracking-wide">invoice</h1>
          <p className="text-purple-600 mt-1">#{data.invoiceNumber}</p>
        </div>
        <div className="text-right">
          <p className="text-purple-600">Issue Date: {data.issueDate}</p>
          <p className="text-purple-600">Due Date: {data.dueDate}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-purple-900 font-medium mb-2">FROM</h2>
          <p className="text-purple-900">{data.company.name}</p>
          <p className="text-purple-600">{data.company.address}</p>
          <p className="text-purple-600">{data.company.city}, {data.company.country} {data.company.postalCode}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-purple-900 font-medium mb-2">BILL TO</h2>
          <p className="text-purple-900">{data.client.name}</p>
          <p className="text-purple-600">{data.client.company}</p>
          <p className="text-purple-600">{data.client.address}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <table className="w-full">
          <thead>
            <tr className="border-b border-purple-100">
              <th className="text-left py-4 px-6 text-purple-900">Description</th>
              <th className="text-right py-4 px-6 text-purple-900">Quantity</th>
              <th className="text-right py-4 px-6 text-purple-900">Price</th>
              <th className="text-right py-4 px-6 text-purple-900">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item) => (
              <tr key={item.id} className="border-b border-purple-50">
                <td className="py-4 px-6 text-purple-900">{item.description}</td>
                <td className="text-right py-4 px-6 text-purple-600">{item.quantity}</td>
                <td className="text-right py-4 px-6 text-purple-600">{data.currency} {item.price.toFixed(2)}</td>
                <td className="text-right py-4 px-6 text-purple-600">{data.currency} {(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mb-8">
        <div className="w-1/3 bg-white p-4 rounded-lg shadow-lg">
          <div className="flex justify-between py-2">
            <span className="text-purple-600">Subtotal</span>
            <span className="text-purple-900">{data.currency} {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-purple-600">Tax ({(data.taxRate || 0).toFixed(1)}%)</span>
            <span className="text-purple-900">{data.currency} {tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 border-t border-purple-100">
            <span className="font-medium text-purple-900">Total</span>
            <span className="font-medium text-purple-900">{data.currency} {total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {data.notes && (
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-purple-900 font-medium mb-2">Notes</h2>
          <p className="text-purple-600">{data.notes}</p>
        </div>
      )}
    </div>
  );
};

export const LuxuryTemplate = ({ data }: InvoiceTemplateProps) => {
  const { subtotal, tax, total } = calculateInvoiceTotals(data);
  
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 rounded-lg">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-5xl font-light text-yellow-500 tracking-wider">INVOICE</h1>
          <p className="text-gray-400 mt-1">#{data.invoiceNumber}</p>
        </div>
        <div className="text-right">
          <p className="text-gray-400">Issue Date: {data.issueDate}</p>
          <p className="text-gray-400">Due Date: {data.dueDate}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="bg-gray-800 border border-yellow-500/20 p-6 rounded-lg">
          <h2 className="text-yellow-500 font-medium mb-2">FROM</h2>
          <p className="text-white">{data.company.name}</p>
          <p className="text-gray-400">{data.company.address}</p>
          <p className="text-gray-400">{data.company.city}, {data.company.country} {data.company.postalCode}</p>
        </div>
        <div className="bg-gray-800 border border-yellow-500/20 p-6 rounded-lg">
          <h2 className="text-yellow-500 font-medium mb-2">BILL TO</h2>
          <p className="text-white">{data.client.name}</p>
          <p className="text-gray-400">{data.client.company}</p>
          <p className="text-gray-400">{data.client.address}</p>
        </div>
      </div>

      <div className="bg-gray-800 border border-yellow-500/20 rounded-lg overflow-hidden mb-8">
        <table className="w-full">
          <thead>
            <tr className="border-b border-yellow-500/20">
              <th className="text-left py-4 px-6 text-yellow-500">Description</th>
              <th className="text-right py-4 px-6 text-yellow-500">Quantity</th>
              <th className="text-right py-4 px-6 text-yellow-500">Price</th>
              <th className="text-right py-4 px-6 text-yellow-500">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item) => (
              <tr key={item.id} className="border-b border-gray-700">
                <td className="py-4 px-6">{item.description}</td>
                <td className="text-right py-4 px-6 text-gray-400">{item.quantity}</td>
                <td className="text-right py-4 px-6 text-gray-400">{data.currency} {item.price.toFixed(2)}</td>
                <td className="text-right py-4 px-6 text-gray-400">{data.currency} {(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mb-8">
        <div className="w-1/3 bg-gray-800 border border-yellow-500/20 p-4 rounded-lg">
          <div className="flex justify-between py-2">
            <span className="text-gray-400">Subtotal</span>
            <span>{data.currency} {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-400">Tax ({(data.taxRate || 0).toFixed(1)}%)</span>
            <span>{data.currency} {tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 border-t border-yellow-500/20">
            <span className="font-medium text-yellow-500">Total</span>
            <span className="font-medium text-yellow-500">{data.currency} {total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {data.notes && (
        <div className="bg-gray-800 border border-yellow-500/20 p-4 rounded-lg">
          <h2 className="text-yellow-500 font-medium mb-2">Notes</h2>
          <p className="text-gray-400">{data.notes}</p>
        </div>
      )}
    </div>
  );
};

export const GradientTemplate = ({ data }: InvoiceTemplateProps) => {
  const { subtotal, tax, total } = calculateInvoiceTotals(data);
  
  return (
    <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-8 rounded-lg">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-5xl font-bold tracking-tight">INVOICE</h1>
          <p className="text-blue-100 mt-1">#{data.invoiceNumber}</p>
        </div>
        <div className="text-right">
          <p className="text-blue-100">Issue Date: {data.issueDate}</p>
          <p className="text-blue-100">Due Date: {data.dueDate}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
          <h2 className="text-blue-100 font-medium mb-2">FROM</h2>
          <p className="text-white">{data.company.name}</p>
          <p className="text-blue-100">{data.company.address}</p>
          <p className="text-blue-100">{data.company.city}, {data.company.country} {data.company.postalCode}</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
          <h2 className="text-blue-100 font-medium mb-2">BILL TO</h2>
          <p className="text-white">{data.client.name}</p>
          <p className="text-blue-100">{data.client.company}</p>
          <p className="text-blue-100">{data.client.address}</p>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden mb-8">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/20">
              <th className="text-left py-4 px-6 text-blue-100">Description</th>
              <th className="text-right py-4 px-6 text-blue-100">Quantity</th>
              <th className="text-right py-4 px-6 text-blue-100">Price</th>
              <th className="text-right py-4 px-6 text-blue-100">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item) => (
              <tr key={item.id} className="border-b border-white/10">
                <td className="py-4 px-6">{item.description}</td>
                <td className="text-right py-4 px-6 text-blue-100">{item.quantity}</td>
                <td className="text-right py-4 px-6 text-blue-100">{data.currency} {item.price.toFixed(2)}</td>
                <td className="text-right py-4 px-6 text-blue-100">{data.currency} {(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mb-8">
        <div className="w-1/3 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
          <div className="flex justify-between py-2">
            <span className="text-blue-100">Subtotal</span>
            <span>{data.currency} {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-blue-100">Tax ({(data.taxRate || 0).toFixed(1)}%)</span>
            <span>{data.currency} {tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 border-t border-white/20">
            <span className="font-medium">Total</span>
            <span className="font-medium">{data.currency} {total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {data.notes && (
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
          <h2 className="text-blue-100 font-medium mb-2">Notes</h2>
          <p className="text-blue-100">{data.notes}</p>
        </div>
      )}
    </div>
  );
};

export const CleanTemplate = ({ data }: InvoiceTemplateProps) => {
  const { subtotal, tax, total } = calculateInvoiceTotals(data);
  
  return (
    <div className="bg-white p-8 rounded-lg">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-medium text-gray-900">Invoice</h1>
          <p className="text-gray-500 mt-1">#{data.invoiceNumber}</p>
        </div>
        <div className="text-right">
          <p className="text-gray-500">Issue Date: {data.issueDate}</p>
          <p className="text-gray-500">Due Date: {data.dueDate}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-gray-700 font-medium mb-2">FROM</h2>
          <p className="text-gray-900">{data.company.name}</p>
          <p className="text-gray-500">{data.company.address}</p>
          <p className="text-gray-500">{data.company.city}, {data.company.country} {data.company.postalCode}</p>
        </div>
        <div>
          <h2 className="text-gray-700 font-medium mb-2">BILL TO</h2>
          <p className="text-gray-900">{data.client.name}</p>
          <p className="text-gray-500">{data.client.company}</p>
          <p className="text-gray-500">{data.client.address}</p>
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden mb-8">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left py-4 px-6 text-gray-700">Description</th>
              <th className="text-right py-4 px-6 text-gray-700">Quantity</th>
              <th className="text-right py-4 px-6 text-gray-700">Price</th>
              <th className="text-right py-4 px-6 text-gray-700">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item) => (
              <tr key={item.id} className="border-t border-gray-200">
                <td className="py-4 px-6 text-gray-900">{item.description}</td>
                <td className="text-right py-4 px-6 text-gray-500">{item.quantity}</td>
                <td className="text-right py-4 px-6 text-gray-500">{data.currency} {item.price.toFixed(2)}</td>
                <td className="text-right py-4 px-6 text-gray-500">{data.currency} {(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mb-8">
        <div className="w-1/3">
          <div className="flex justify-between py-2">
            <span className="text-gray-500">Subtotal</span>
            <span className="text-gray-900">{data.currency} {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-500">Tax ({(data.taxRate || 0).toFixed(1)}%)</span>
            <span className="text-gray-900">{data.currency} {tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 border-t border-gray-200">
            <span className="font-medium text-gray-900">Total</span>
            <span className="font-medium text-gray-900">{data.currency} {total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {data.notes && (
        <div className="border-t border-gray-200 pt-4">
          <h2 className="text-gray-700 font-medium mb-2">Notes</h2>
          <p className="text-gray-500">{data.notes}</p>
        </div>
      )}
    </div>
  );
};

export const ProfessionalTemplate = ({ data }: InvoiceTemplateProps) => {
  const { subtotal, tax, total } = calculateInvoiceTotals(data);
  
  return (
    <div className="bg-slate-50 p-8 rounded-lg">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-semibold text-slate-900">INVOICE</h1>
          <p className="text-slate-600 mt-1">#{data.invoiceNumber}</p>
        </div>
        <div className="text-right">
          <p className="text-slate-600">Issue Date: {data.issueDate}</p>
          <p className="text-slate-600">Due Date: {data.dueDate}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-slate-800 font-medium mb-2">FROM</h2>
          <p className="text-slate-900">{data.company.name}</p>
          <p className="text-slate-600">{data.company.address}</p>
          <p className="text-slate-600">{data.company.city}, {data.company.country} {data.company.postalCode}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-slate-800 font-medium mb-2">BILL TO</h2>
          <p className="text-slate-900">{data.client.name}</p>
          <p className="text-slate-600">{data.client.company}</p>
          <p className="text-slate-600">{data.client.address}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-100">
              <th className="text-left py-4 px-6 text-slate-800">Description</th>
              <th className="text-right py-4 px-6 text-slate-800">Quantity</th>
              <th className="text-right py-4 px-6 text-slate-800">Price</th>
              <th className="text-right py-4 px-6 text-slate-800">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item) => (
              <tr key={item.id} className="border-t border-slate-200">
                <td className="py-4 px-6 text-slate-900">{item.description}</td>
                <td className="text-right py-4 px-6 text-slate-600">{item.quantity}</td>
                <td className="text-right py-4 px-6 text-slate-600">{data.currency} {item.price.toFixed(2)}</td>
                <td className="text-right py-4 px-6 text-slate-600">{data.currency} {(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mb-8">
        <div className="w-1/3 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between py-2">
            <span className="text-slate-600">Subtotal</span>
            <span className="text-slate-900">{data.currency} {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-slate-600">Tax ({(data.taxRate || 0).toFixed(1)}%)</span>
            <span className="text-slate-900">{data.currency} {tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 border-t border-slate-200">
            <span className="font-medium text-slate-900">Total</span>
            <span className="font-medium text-slate-900">{data.currency} {total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {data.notes && (
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-slate-800 font-medium mb-2">Notes</h2>
          <p className="text-slate-600">{data.notes}</p>
        </div>
      )}
    </div>
  );
};

export function getTemplateComponent(template: string) {
  const templates: { [key: string]: React.ComponentType<InvoiceTemplateProps> } = {
    classic: ClassicTemplate,
    modern: ModernTemplate,
    creative: CreativeTemplate,
    corporate: CorporateTemplate,
    minimalist: MinimalistTemplate,
    elegant: ElegantTemplate,
    premium: PremiumTemplate,
    minimalistpro: MinimalistProTemplate,
    businesspro: BusinessProTemplate,
    boutique: BoutiqueTemplate,
    tech: TechTemplate,
    nature: NatureTemplate,
    vintage: VintageTemplate,
    artistic: ArtisticTemplate,
    luxury: LuxuryTemplate,
    gradient: GradientTemplate,
    clean: CleanTemplate,
    professional: ProfessionalTemplate,
  };

  const templateKey = template.toLowerCase();
  return templates[templateKey] || ClassicTemplate;
} 