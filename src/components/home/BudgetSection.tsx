import { Wallet, TrendingUp, Crown, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";

const tiers = [
  {
    id: 1,
    name: "Sapa Mode",
    range: "₦500 - ₦2,000",
    description:
      "When pocket dey cry but belle must chop. Budget-friendly meals that still satisfy.",
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
    id: 2,
    name: "Guidance Level",
    range: "₦2,000 - ₦8,000",
    description:
      "You're managing well! Enjoy balanced meals without breaking the bank.",
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
    id: 3,
    name: "Baller Status",
    range: "₦8,000 - ₦15,000+",
    description:
      "Money dey! Treat yourself to premium dishes and fine dining experiences.",
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
    <section className="py-14 bg-gray-50/90" id="budget-tiers">
      <div className="container mx-auto px-4">
        <div className=" max-w-2xl mx-auto mb-10">
          <span className="text-green-700 font-semibold text-medium ">
            Budget Tiers
          </span>
          <h2 className="text-2xl sm:text-3xl text-gray-700  font-bold leading-6 my-2">
            What&apos;s Your Money Status?
          </h2>
          <p className="text-medium font-normal ">
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
                className="relative overflow-hidden group cursor-pointer hover:-translate-y-2 transition-all duration-300 animate-fade-in bg-white shadow-sm rounded-md p-4"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gray-50/10">
                      <Icon
                        className={`w-6 h-6  ${
                          tier.variant === "sapa"
                            ? "text-red-600"
                            : tier.variant === "guidance"
                              ? "text-orange-600"
                              : "text-green-600"
                        }`}
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-gray-800 text-xl">{tier.name}</h3>
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
