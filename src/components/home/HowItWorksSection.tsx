import { MapPin, Coins, Utensils, Sparkles } from "lucide-react";

const steps = [
  {
    icon: MapPin,
    title: "Select Your Country",
    description:
      "Choose from 10+ African countries to get authentic local dish recommendations.",
    color: "text-primary",
    bg: "bg-violet-300",
    border: "border border-violet-500",
  },
  {
    icon: Coins,
    title: "Set Your Budget",
    description:
      "Pick your money status - Sapa, Guidance, or Baller. No judgment, just food!",
    color: "text-guidance",
    bg: "bg-green-300",
    border: "border border-green-500",
  },
  {
    icon: Utensils,
    title: "Pick Your Meal Type",
    description:
      "Breakfast, lunch, or dinner? We'll tailor recommendations to your time of day.",
    color: "text-baller",
    bg: "bg-red-300",
    border: "border border-red-500",
  },
  {
    icon: Sparkles,
    title: "Get Recommendations",
    description:
      "Receive personalized meal suggestions with prices and where to find them.",
    color: "text-sapa",
    bg: "bg-orange-300",
    border: "border border-orange-500",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-14 bg-white" id="how-it-works">
      <div className="container mx-auto px-4">
        <div className=" max-w-2xl mx-auto mb-16">
          <span className="text-gray-700 font-semibold text-medium ">
            Simple Process
          </span>
          <h2 className="text-2xl sm:text-3xl text-gray-700 font-bold my-2">
            How{" "}
            <span className="bg-gradient-to-br from-orange-600 to-pink-400 bg-clip-text text-transparent">
              mealMatch
            </span>{" "}
            Works
          </h2>
          <p className=" text-lg leading-5">
            Four simple steps to your next delicious meal. No stress, no more
            indecision
          </p>
        </div>

        {/* Steps */}
        <div>
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="relative text-center animate-fade-in mb-8"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-border to-transparent" />
                )}

                <div className="flex   items-start justify-between gap-10 ">
                  <div className=" w-12 h-9 px-3 rounded-full bg-orange-400 border border-orange-600 text-white flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>

                  <div className="flex flex-col justify-start items-start">
                    {/* Icon */}
                    <div
                      className={`w-24 h-24  rounded-2xl ${step.bg} ${step.border} flex items-center justify-center mb-6 transition-transform hover:scale-110`}
                    >
                      <Icon className="w-8 h-8 text-gray-50 " />
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-heading font-medium mb-1">
                      {step.title}
                    </h3>
                    <p className=" text-left leading-5 text-[16px]">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
