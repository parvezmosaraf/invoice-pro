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
  { id: "classic", name: "Classic" },
  { id: "modern", name: "Modern" },
  { id: "creative", name: "Creative" },
  { id: "corporate", name: "Corporate" },
  { id: "minimalist", name: "Minimalist" },
  { id: "elegant", name: "Elegant" },
  { id: "premium", name: "Premium Dark" },
  { id: "minimalistpro", name: "Minimalist Pro" },
  { id: "businesspro", name: "Business Pro" },
  { id: "boutique", name: "Boutique" },
  { id: "tech", name: "Tech" },
  { id: "nature", name: "Nature" },
  { id: "vintage", name: "Vintage" },
  { id: "artistic", name: "Artistic" },
  { id: "luxury", name: "Luxury" },
  { id: "gradient", name: "Gradient" },
  { id: "clean", name: "Clean" },
  { id: "professional", name: "Professional" }
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