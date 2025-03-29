import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Download, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { TemplatePreviewDialog } from "@/components/invoice/TemplatePreviewDialog";

const templates = [
  {
    id: 1,
    name: "Classic",
    description: "A clean, professional design suitable for any business",
    thumbnail: "/templates/classic.svg",
    preview: "/templates/classic.svg"
  },
  {
    id: 2,
    name: "Modern",
    description: "Contemporary design with a minimal aesthetic",
    thumbnail: "/templates/modern.svg",
    preview: "/templates/modern.svg"
  },
  {
    id: 3,
    name: "Creative",
    description: "Bold design perfect for creative professionals",
    thumbnail: "/templates/creative.svg",
    preview: "/templates/creative.svg"
  },
  {
    id: 4,
    name: "Corporate",
    description: "Formal design ideal for corporate businesses",
    thumbnail: "/templates/corporate.svg",
    preview: "/templates/corporate.svg"
  },
  {
    id: 5,
    name: "Minimalist",
    description: "Simple and elegant design focused on essential information",
    thumbnail: "/templates/minimalist.svg",
    preview: "/templates/minimalist.svg"
  },
  {
    id: 6,
    name: "Elegant",
    description: "Sophisticated design with premium styling",
    thumbnail: "/templates/elegant.svg",
    preview: "/templates/elegant.svg"
  },
  {
    id: 7,
    name: "Premium Dark",
    description: "Modern dark theme with gradient accents and sleek design",
    thumbnail: "/templates/premium.svg",
    preview: "/templates/premium.svg"
  },
  {
    id: 8,
    name: "Minimalist Pro",
    description: "Enhanced minimalist design with modern touches and clean typography",
    thumbnail: "/templates/minimalist-pro.svg",
    preview: "/templates/minimalist-pro.svg"
  },
  {
    id: 9,
    name: "Business Pro",
    description: "Professional template with advanced layout and elegant styling",
    thumbnail: "/templates/business-pro.svg",
    preview: "/templates/business-pro.svg"
  },
  {
    id: 10,
    name: "Boutique",
    description: "Elegant design with rose gold accents and refined typography",
    thumbnail: "/templates/boutique.svg",
    preview: "/templates/boutique.svg"
  },
  {
    id: 11,
    name: "Tech",
    description: "Modern tech-inspired design with neon accents and dark theme",
    thumbnail: "/templates/tech.svg",
    preview: "/templates/tech.svg"
  },
  {
    id: 12,
    name: "Nature",
    description: "Eco-friendly design with organic shapes and green accents",
    thumbnail: "/templates/nature.svg",
    preview: "/templates/nature.svg"
  },
  {
    id: 13,
    name: "Vintage",
    description: "Classic vintage style with ornate borders and sepia tones",
    thumbnail: "/templates/vintage.svg",
    preview: "/templates/vintage.svg"
  },
  {
    id: 14,
    name: "Artistic",
    description: "Creative design with bold colors and abstract shapes",
    thumbnail: "/templates/artistic.svg",
    preview: "/templates/artistic.svg"
  },
  {
    id: 15,
    name: "Luxury",
    description: "Premium design with gold accents and elegant styling",
    thumbnail: "/templates/luxury.svg",
    preview: "/templates/luxury.svg"
  },
  {
    id: 16,
    name: "Gradient",
    description: "Modern design with beautiful color gradients",
    thumbnail: "/templates/gradient.svg",
    preview: "/templates/gradient.svg"
  },
  {
    id: 17,
    name: "Clean",
    description: "Minimal design with perfect balance of whitespace",
    thumbnail: "/templates/clean.svg",
    preview: "/templates/clean.svg"
  },
  {
    id: 18,
    name: "Professional",
    description: "Timeless design for established businesses",
    thumbnail: "/templates/professional.svg",
    preview: "/templates/professional.svg"
  },
  {
    id: 19,
    name: "Dynamic",
    description: "Modern design with dynamic layout and bold typography",
    thumbnail: "/templates/dynamic.svg",
    preview: "/templates/dynamic.svg"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Templates() {
  const [selectedTemplate, setSelectedTemplate] = useState<typeof templates[0] | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handlePreview = (template: typeof templates[0]) => {
    setSelectedTemplate(template);
    setPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setPreviewOpen(false);
    // Optional: Clear selected template after animation completes
    setTimeout(() => setSelectedTemplate(null), 300);
  };

  const handleUseTemplate = (template: typeof templates[0]) => {
    // Navigate to invoice creation with template parameter
    navigate(`/invoice?template=${template.name.toLowerCase().replace(/\s+/g, '')}`);
    
    toast({
      title: "Template Selected",
      description: `${template.name} template has been selected for your next invoice.`,
    });
  };

  const handlePreviewAll = () => {
    // Set the first template as selected and open preview
    // User can navigate through all templates in the preview mode
    if (templates.length > 0) {
      setSelectedTemplate(templates[0]);
      setPreviewOpen(true);
    }
  };

  return (
    <DashboardLayout title="Invoice Templates">
      <motion.div 
        className="space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Invoice Templates</h2>
            <p className="text-muted-foreground">
              Choose from our selection of professionally designed invoice templates
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="bg-background" onClick={handlePreviewAll}>
              <Eye className="h-4 w-4 mr-2" />
              Preview All
            </Button>
            <Button className="bg-primary hover:bg-primary/90 transition-colors">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {templates.map((template) => (
            <motion.div key={template.id} variants={itemVariants}>
              <Card className="overflow-hidden h-full flex flex-col border hover:shadow-lg transition-shadow duration-300">
                <div className="relative aspect-[4/3] bg-white">
                  <img 
                    src={template.thumbnail} 
                    alt={template.name} 
                    className="w-full h-full object-contain p-4 bg-white"
                  />
                  {/* Glass effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent"></div>
                </div>
                
                <CardHeader className="pb-2">
                  <CardTitle>{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    Customizable fields
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    Responsive design
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    Professional layout
                  </div>
                </CardContent>
                
                <CardFooter className="pt-0 flex flex-col sm:flex-row gap-2">
                  <Button 
                    variant="outline" 
                    className="w-full sm:w-auto"
                    onClick={() => handlePreview(template)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button 
                    className="w-full sm:w-auto"
                    onClick={() => handleUseTemplate(template)}
                  >
                    Use this template
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Template Preview Dialog */}
      <TemplatePreviewDialog
        isOpen={previewOpen}
        onClose={handleClosePreview}
        template={selectedTemplate}
      />
    </DashboardLayout>
  );
}
