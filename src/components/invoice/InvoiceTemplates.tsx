import { InvoiceData } from "@/types/invoice";

interface InvoiceTemplateProps {
  template: string;
  data: InvoiceData;
}

export const ClassicTemplate = ({ data }: InvoiceTemplateProps) => {
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

      <div className="flex justify-end mb-8">
        <div className="w-1/3">
          <div className="flex justify-between py-2">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-800">{data.currency} {data.items.reduce((sum, item) => sum + (item.quantity * item.price), 0).toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 border-t border-gray-200">
            <span className="font-semibold">Total</span>
            <span className="font-semibold">{data.currency} {data.items.reduce((sum, item) => sum + (item.quantity * item.price), 0).toFixed(2)}</span>
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
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
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

      <div className="flex justify-end mb-12">
        <div className="w-1/3">
          <div className="flex justify-between py-4 border-b border-gray-100">
            <span className="text-gray-600">Subtotal</span>
            <span>{data.currency} {data.items.reduce((sum, item) => sum + (item.quantity * item.price), 0).toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-4">
            <span className="font-medium">Total</span>
            <span className="font-medium text-primary">{data.currency} {data.items.reduce((sum, item) => sum + (item.quantity * item.price), 0).toFixed(2)}</span>
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
  return (
    <div className="bg-gradient-to-br from-[#FF6B6B] to-[#4ECDC4] p-1 rounded-lg">
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
              <span>{data.currency} {data.items.reduce((sum, item) => sum + (item.quantity * item.price), 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-4 border-t-2 border-dashed border-gray-200">
              <span className="font-bold">Total</span>
              <span className="font-bold text-[#4ECDC4]">{data.currency} {data.items.reduce((sum, item) => sum + (item.quantity * item.price), 0).toFixed(2)}</span>
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
  return (
    <div className="bg-[#1E293B] p-8 rounded-lg text-white">
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
        <div className="w-1/3 bg-[#334155] p-6 rounded-lg">
          <div className="flex justify-between py-4">
            <span className="text-gray-400">Subtotal</span>
            <span>{data.currency} {data.items.reduce((sum, item) => sum + (item.quantity * item.price), 0).toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-4 border-t border-gray-600">
            <span className="font-medium">Total</span>
            <span className="font-medium">{data.currency} {data.items.reduce((sum, item) => sum + (item.quantity * item.price), 0).toFixed(2)}</span>
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
            <span>{data.currency} {data.items.reduce((sum, item) => sum + (item.quantity * item.price), 0).toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-4 border-t border-black">
            <span className="font-medium">Total</span>
            <span className="font-medium">{data.currency} {data.items.reduce((sum, item) => sum + (item.quantity * item.price), 0).toFixed(2)}</span>
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
            <span>{data.currency} {data.items.reduce((sum, item) => sum + (item.quantity * item.price), 0).toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-4 border-t border-[#DAA520]">
            <span className="text-[#DAA520] text-lg">TOTAL</span>
            <span className="text-[#DAA520] text-lg">{data.currency} {data.items.reduce((sum, item) => sum + (item.quantity * item.price), 0).toFixed(2)}</span>
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

export const getTemplateComponent = (template: string) => {
  switch (template.toLowerCase()) {
    case 'classic':
      return ClassicTemplate;
    case 'modern':
      return ModernTemplate;
    case 'creative':
      return CreativeTemplate;
    case 'corporate':
      return CorporateTemplate;
    case 'minimalist':
      return MinimalistTemplate;
    case 'elegant':
      return ElegantTemplate;
    default:
      return ClassicTemplate;
  }
}; 