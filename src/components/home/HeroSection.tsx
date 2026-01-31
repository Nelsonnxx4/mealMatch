import { Button } from "@/components/ui/Button";
import { heroImages } from "@/constants/images";

const HeroSection = () => {
  return (
    <section className="pt-24 px-2">
      <span className="p-2 bg-orange-200 border  border-orange-300 rounded-full">
        Made for Africa
      </span>

      <h1 className="text-2xl py-6 text-black font-medium leading-6">
        Don&apos;t know what meal to Match? stress less we got you
      </h1>

      <p className="pb-4 text-medium">
        From
        <span className="text-red-500 font-medium italic"> Sapa </span>
        to
        <span className="text-green-500 font-medium italic"> Baller </span>
        level, we recommend the perfect meal based on your budget. No more food
        indecision!
      </p>

      <Button className="shadow-sm " type="button" variant="outline">
        Match your meal
      </Button>

      <div className="w-full flex justify-between items-start py-6 gap-6 leading-5">
        <div className="flex flex-col ">
          <span className="text-2xl text-black/80 font-semibold">50+</span>
          <span>African Dishes</span>
        </div>

        <div className="flex flex-col">
          <span className="text-2xl text-black/80 font-semibold">10+</span>
          <span>Countries</span>
        </div>

        <div className="flex flex-col ">
          <span className="text-2xl text-black/80 font-semibold">24/7</span>
          <span>Recommendations</span>
        </div>
      </div>

      <div className="w-[1500px] relative overflow-hidden mt-8 py-4">
        {/* Gradient overlays */}
        <div className="hidden md:block absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="hidden md:block  absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-white via-white/50 to-transparent z-10" />

        {/* Sliding container */}
        <div className="flex gap-4 animate-scroll">
          {/* First set of images */}
          {heroImages.map((image) => (
            <div
              key={`first-${image.id}`}
              className="relative flex-shrink-0 overflow-hidden rounded-xl w-60 h-44"
            >
              <img
                alt={image.alt}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
                loading="lazy"
                src={image.src}
              />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {heroImages.map((image) => (
            <div
              key={`second-${image.id}`}
              className="relative flex-shrink-0 overflow-hidden rounded-xl w-60 h-44"
            >
              <img
                alt={image.alt}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-2000"
                loading="lazy"
                src={image.src}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
