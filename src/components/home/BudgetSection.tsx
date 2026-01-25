// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
import { Wallet, TrendingUp, Crown, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";

const tiers = [
  {
    id: "sapa",
    name: "Sapa Mode",
    range: "₦500 - ₦2,000",
    description:
      "When pocket dey cry but belle must chop. Budget-friendly meals that still satisfy.",
    emoji: "😅",
    icon: Wallet,
    variant: "sapa" as const,
    examples: [
      "Indomie with egg",
      "Bread and akara",
      "Ewa agoyin",
      "Garri and groundnut",
    ],
  },
  {
    id: "guidance",
    name: "Guidance Level",
    range: "₦2,000 - ₦8,000",
    description:
      "You're managing well! Enjoy balanced meals without breaking the bank.",
    emoji: "😌",
    icon: TrendingUp,
    variant: "guidance" as const,
    examples: [
      "Jollof rice & chicken",
      "Pounded yam & egusi",
      "Fried rice combo",
      "Amala & ewedu",
    ],
  },
  {
    id: "baller",
    name: "Baller Status",
    range: "₦8,000 - ₦15,000+",
    description:
      "Money dey! Treat yourself to premium dishes and fine dining experiences.",
    emoji: "🤑",
    icon: Crown,
    variant: "baller" as const,
    examples: [
      "Pepper soup & assorted",
      "Seafood okro",
      "Grilled fish platter",
      "Full suya box",
    ],
  },
];

const BudgetSection = () => {
  return (
    <section className="py-20 bg-background" id="budget-tiers">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Budget Tiers
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold mt-2 mb-4">
            What&apos;s Your <span className="text-gradient">Money Status</span>
            ?
          </h2>
          <p className="text-muted-foreground text-lg">
            We understand the levels. Tell us your budget and we&apos;ll
            recommend meals that match.
          </p>
        </div>

        {/* Tier Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {tiers.map((tier, index) => {
            const Icon = tier.icon;

            return (
              <article
                key={tier.id}
                className="relative overflow-hidden group cursor-pointer hover:-translate-y-2 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                // type={tier.variant}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        tier.variant === "sapa"
                          ? "bg-sapa/20"
                          : tier.variant === "guidance"
                            ? "bg-guidance/20"
                            : "bg-baller/20"
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 ${
                          tier.variant === "sapa"
                            ? "text-sapa"
                            : tier.variant === "guidance"
                              ? "text-guidance"
                              : "text-baller"
                        }`}
                      />
                    </div>
                    <span className="text-4xl">{tier.emoji}</span>
                  </div>
                  <div>
                    <h3 className="text-xl">{tier.name}</h3>
                    <p
                      className={`text-lg font-bold mt-1 ${
                        tier.variant === "sapa"
                          ? "text-sapa"
                          : tier.variant === "guidance"
                            ? "text-guidance"
                            : "text-baller"
                      }`}
                    >
                      {tier.range}
                    </p>
                  </div>
                  <span className="text-sm">{tier.description}</span>
                </div>
                <p className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">
                      Popular picks:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {tier.examples.map((example) => (
                        <span
                          key={example}
                          className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground"
                        >
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Button
                    className="w-full group/btn mt-4"
                    variant={tier.variant}
                  >
                    Explore {tier.name.split(" ")[0]} Meals
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BudgetSection;
