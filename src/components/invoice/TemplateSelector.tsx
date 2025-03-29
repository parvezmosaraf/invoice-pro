import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getTemplateComponent } from "./InvoiceTemplates";
import { InvoiceData } from "@/types/invoice";

interface TemplateSelectorProps {
  selectedTemplate: string;
  onTemplateChange: (template: string) => void;
  previewData: InvoiceData;
}

const templates = [
  { id: "classic", name: "Classic", description: "A clean, professional design suitable for any business" },
  { id: "modern", name: "Modern", description: "Contemporary design with a minimal aesthetic" },
  { id: "creative", name: "Creative", description: "Bold design perfect for creative professionals" },
  { id: "corporate", name: "Corporate", description: "Professional template for corporate businesses" },
  { id: "minimalist", name: "Minimalist", description: "Clean and simple design focusing on essentials" },
  { id: "elegant", name: "Elegant", description: "Sophisticated design with elegant typography" },
  { id: "premium", name: "Premium Dark", description: "Modern dark theme with gradient accents" },
  { id: "minimalistPro", name: "Minimalist Pro", description: "Enhanced minimalist design with modern touches" },
  { id: "businessPro", name: "Business Pro", description: "Professional template with advanced layout" },
];

export default function TemplateSelector({ selectedTemplate, onTemplateChange, previewData }: TemplateSelectorProps) {
  const TemplateComponent = getTemplateComponent(selectedTemplate);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Select value={selectedTemplate} onValueChange={onTemplateChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select template" />
          </SelectTrigger>
          <SelectContent>
            {templates.map((template) => (
              <SelectItem key={template.id} value={template.id} className="flex flex-col py-3">
                <span className="font-medium">{template.name}</span>
                <span className="text-xs text-gray-500 mt-1">{template.description}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="relative w-full aspect-[1/1.4] bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 transform scale-[0.23] origin-top-left" 
            style={{ 
              width: '435%', 
              height: '435%',
            }}
          >
            <TemplateComponent template={selectedTemplate} data={previewData} />
          </div>
        </div>
      </div>
    </div>
  );
} 