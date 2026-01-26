import { MapPin, Coins, Utensils, Sparkles } from "lucide-react";

const steps = [
  {
    icon: MapPin,
    title: "Select Your Country",
    description:
      "Choose from 10+ African countries to get authentic local dish recommendations.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Coins,
    title: "Set Your Budget",
    description:
      "Pick your money status - Sapa, Guidance, or Baller. No judgment, just food!",
    color: "text-guidance",
    bg: "bg-guidance/10",
  },
  {
    icon: Utensils,
    title: "Pick Your Meal Type",
    description:
      "Breakfast, lunch, or dinner? We'll tailor recommendations to your time of day.",
    color: "text-baller",
    bg: "bg-baller/10",
  },
  {
    icon: Sparkles,
    title: "Get Recommendations",
    description:
      "Receive personalized meal suggestions with prices and where to find them.",
    color: "text-sapa",
    bg: "bg-sapa/10",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-white" id="how-it-works">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold mt-2 mb-4">
            How <span className="text-gradient">ChopWise</span> Works
          </h2>
          <p className="text-muted-foreground text-lg">
            Four simple steps to your next delicious meal. No stress, no wahala!
          </p>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="relative text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-border to-transparent" />
                )}

                {/* Step Number */}
                <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>

                {/* Icon */}
                <div
                  className={`w-24 h-24 mx-auto rounded-2xl ${step.bg} flex items-center justify-center mb-6 transition-transform hover:scale-110`}
                >
                  <Icon className={`w-10 h-10 ${step.color}`} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-heading font-semibold mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
