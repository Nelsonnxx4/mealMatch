import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";

const countries = [
  { name: "Nigeria", flag: "🇳🇬", dishes: 150, popular: "Jollof Rice" },
  { name: "Ghana", flag: "🇬🇭", dishes: 80, popular: "Waakye" },
  { name: "Kenya", flag: "🇰🇪", dishes: 70, popular: "Nyama Choma" },
  { name: "South Africa", flag: "🇿🇦", dishes: 90, popular: "Bunny Chow" },
  { name: "Cameroon", flag: "🇨🇲", dishes: 60, popular: "Ndolé" },
  { name: "Senegal", flag: "🇸🇳", dishes: 55, popular: "Thieboudienne" },
  { name: "Ethiopia", flag: "🇪🇹", dishes: 75, popular: "Injera" },
  { name: "Tanzania", flag: "🇹🇿", dishes: 50, popular: "Ugali" },
];

const CountriesSection = () => {
  return (
    <section className="py-20 bg-background" id="countries">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Across Africa
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold mt-2 mb-4">
            Food from <span className="text-gradient">Your Country</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            We&apos;ve curated dishes from across the continent. Select your
            country for authentic local recommendations.
          </p>
        </div>

        {/* Countries Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {countries.map((country, index) => (
            <div
              key={country.name}
              className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-soft transition-all duration-300 cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="text-4xl mb-3">{country.flag}</div>
              <h3 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors">
                {country.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {country.dishes}+ dishes
              </p>
              <p className="text-xs text-primary mt-2">
                Try: {country.popular}
              </p>

              {/* Hover Arrow */}
              <ArrowRight className="absolute top-6 right-6 w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            More countries coming soon!
          </p>
          <Button variant="outline">Request Your Country</Button>
        </div>
      </div>
    </section>
  );
};

export default CountriesSection;
