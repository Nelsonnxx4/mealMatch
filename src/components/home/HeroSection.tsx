import { Button } from "@/components/ui/Button";

const HeroSection = () => {
  return (
    <section>
      <span>Made for Africa</span>

      <h1>Don&apos;t know what meal to Match? stress less we got you</h1>

      <p>
        From Sapa to Baller level, we recommend the perfect meal based on your
        budget. No more food indecision!
      </p>

      <Button type="button">Match your meal</Button>

      <div>
        <div>
          <span>50+</span>
          <span>African Dishes</span>
        </div>

        <div>
          <span>10+</span>
          <span>Countries</span>
        </div>

        <div>
          <span>24/7</span>
          <span>Recommendations</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
