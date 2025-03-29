import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CashappIcon, ZelleIcon } from "@/components/ui/icons";

interface ShareInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoice: any;
  onShareMethod: (method: 'cashapp' | 'zelle') => void;
}

export function ShareInvoiceDialog({ open, onOpenChange, invoice, onShareMethod }: ShareInvoiceDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Invoice #{invoice?.invoiceNumber}</DialogTitle>
          <DialogDescription>
            Choose a payment method to share this invoice
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-32 hover:bg-green-50 hover:border-green-500 transition-colors"
            onClick={() => onShareMethod('cashapp')}
          >
            <CashappIcon className="h-12 w-12 mb-2 text-green-500" />
            <span className="text-sm font-medium">Cash App</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-32 hover:bg-purple-50 hover:border-purple-500 transition-colors"
            onClick={() => onShareMethod('zelle')}
          >
            <ZelleIcon className="h-12 w-12 mb-2 text-purple-500" />
            <span className="text-sm font-medium">Zelle</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 