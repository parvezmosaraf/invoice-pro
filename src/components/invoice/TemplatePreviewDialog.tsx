import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TemplatePreviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  template: {
    name: string;
    preview: string;
  } | null;
}

export function TemplatePreviewDialog({ isOpen, onClose, template }: TemplatePreviewDialogProps) {
  if (!template) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90vw] h-[90vh] p-0">
        <div className="relative w-full h-full bg-white overflow-hidden">
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-50"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>

          {/* Template preview */}
          <div className="w-full h-full overflow-auto p-8">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-[1/1.4] bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={template.preview}
                  alt={`${template.name} Template Preview`}
                  className="w-full h-full object-contain"
                />
              </motion.div>

              {/* Template name */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center mt-4"
              >
                <h2 className="text-2xl font-semibold text-gray-900">{template.name}</h2>
                <p className="text-sm text-gray-500 mt-1">Click outside or use the close button to exit preview</p>
              </motion.div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 