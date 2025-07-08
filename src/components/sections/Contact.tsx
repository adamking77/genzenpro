import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/components/ui/use-toast"; // Added useToast

const Contact = () => {
  const { toast } = useToast(); // Added toast hook

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Get form data
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    console.log('Form submitted:', data);
    toast({
      title: "Form Submitted",
      description: "Your message has been sent (placeholder).",
    });
  };

  return (
    <section id="contact" className="py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-24">
            <div className="lg:col-span-5">
              <div className="space-y-12">
                <div className="space-y-8">
                  <h2 className="text-4xl md:text-5xl font-light leading-tight tracking-tight text-foreground">
                    Contact
                  </h2>
                  <div className="w-12 h-px bg-foreground/20"></div>
                </div>
                
                <div className="space-y-8">
                  <p className="text-lg font-light text-foreground/70 leading-relaxed">
                    Ready to transform your business? We're here to listen and craft solutions 
                    that drive meaningful results.
                  </p>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="font-light mb-2 text-foreground">Email</h3>
                    <p className="text-foreground/60 font-light">hello@consulting.com</p>
                  </div>
                  <div>
                    <h3 className="font-light mb-2 text-foreground">Phone</h3>
                    <p className="text-foreground/60 font-light">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-6 lg:col-start-7">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-light mb-3 text-foreground/70">Name</label>
                    <Input 
                      id="name"
                      name="name" // Added name attribute
                      placeholder="Your name" 
                      className="border-foreground/20 font-light focus:border-foreground/40"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-light mb-3 text-foreground/70">Company</label>
                    <Input 
                      id="company"
                      name="company" // Added name attribute
                      placeholder="Company name" 
                      className="border-foreground/20 font-light focus:border-foreground/40"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-light mb-3 text-foreground/70">Email</label>
                  <Input 
                    id="email"
                    name="email" // Added name attribute
                    type="email" 
                    placeholder="your@email.com" 
                    className="border-foreground/20 font-light focus:border-foreground/40"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-light mb-3 text-foreground/70">Message</label>
                  <Textarea 
                    id="message"
                    name="message" // Added name attribute
                    placeholder="Tell us about your project..."
                    rows={6}
                    className="border-foreground/20 font-light focus:border-foreground/40 resize-none"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  variant="outline"
                  size="lg" 
                  className="font-light border-foreground/20 hover:border-foreground/40"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;