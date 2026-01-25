import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/Button";

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-hero relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/20 backdrop-blur-sm mb-6">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
            <span className="text-sm font-medium text-primary-foreground">
              Start Free Today
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-primary-foreground mb-6">
            Ready to Chop Better?
          </h2>

          <p className="text-lg sm:text-xl text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Join thousands of Africans who&apos;ve solved their daily "wetin I
            go chop?&quot; problem. Sign up now and never stress about food
            decisions again!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg hover:scale-105 transition-all duration-300 group"
              size="lg"
            >
              Create Free Account
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              className="border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10"
              size="lg"
              variant="outline"
            >
              Learn More
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 text-primary-foreground/70">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span className="text-sm">Free to start</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span className="text-sm">No credit card needed</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span className="text-sm">Works on all devices</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
