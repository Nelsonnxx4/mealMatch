import { useState, useEffect } from "react";

import { countries } from "@/data/countryData";
import CountrySelectionModal from "@/components/CountrySelectionModal";
import Header from "@/components/Header";
import { usePopToast } from "@/hooks/useToast";
import { ToastContainer } from "@/components/Toast";
import { Country } from "@/types/countryType";
import { useProfile, useUpdateCountry } from "@/hooks/useProfile";
import Spinner from "@/components/ui/Spinner";
import { budgetTiers } from "@/data/budgetData";
import { mealTimes } from "@/data/mealTimesData";
import { Button } from "@/components/ui/Button";

const HomePage = () => {
  const { data: profile, isLoading: profileLoading } = useProfile();
  const updateCountryMutation = useUpdateCountry();
  const { toasts, removeToast } = usePopToast();

  const [showCountryModal, setShowCountryModal] = useState(false);

  useEffect(() => {
    if (profile && !profile.country_code && !showCountryModal) {
      setShowCountryModal(true);
    }
  }, [profile, showCountryModal]);

  const handleSelectCountry = (country: Country) => {
    updateCountryMutation.mutate(country, {
      onSuccess: () => {
        setShowCountryModal(false);
      },
    });
  };

  const handleCloseModal = () => {
    if (profile?.country_code) {
      setShowCountryModal(false);
    }
  };

  if (profileLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner label="Loading your profile..." size="lg" />
      </div>
    );
  }

  return (
    <main className="h-screen w-full lg:w-[70%] lg:m-auto ">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <Header />

      <div className="pt-20 px-4">
        {/* <h1 className="text-2xl font-bold text-gray-800">
          Welcome to MealMatch
        </h1> */}

        {/* {profile?.country_name ? (
          <div className="mt-4 p-4 bg-white rounded-lg shadow">
            <p className="text-gray-600">
              Your Country: {profile.country_name}
            </p>
            <p className="text-gray-600">
              Currency: {profile.currency_symbol} {profile.currency}
            </p>
            <button
              className="mt-2 text-orange-500 underline"
              onClick={() => setShowCountryModal(true)}
            >
              Change Country
            </button>
          </div>
        ) : ( */}
        {/* <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
          <p className="text-orange-800">
            Please select your country to get started with personalized food
            recommendations.
          </p>
        </div> */}
        {/* )} */}
      </div>

      <CountrySelectionModal
        countries={countries}
        isOpen={showCountryModal}
        onClose={handleCloseModal}
        onSelectCountry={handleSelectCountry}
      />

      <section>
        <span>what meal do you want to match?</span>
        <h1>Find your perfect meal</h1>
        <p>
          Select your budget and meal type, and we&apos;ll recommend the perfect
          meal for you
        </p>
      </section>

      <section>
        <div>
          <div>1</div>
          <h2>How much do you have in mind?</h2>
        </div>

        <div>
          {budgetTiers.map((budget) => (
            <div key={budget.id} className={`bg-${budget.color}`}>
              <h3>{budget.name}</h3>
              <span>{budget.range}</span>
              <span>{budget.desc}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div>
          <div>1</div>
          <h2>How much do you have in mind?</h2>
        </div>

        <div>
          {mealTimes.map((mealTime) => (
            <div key={mealTime.id}>
              <div>{mealTime.icon}</div>
              <h3>{mealTime.name}</h3>
              <span>{mealTime.desc}</span>
            </div>
          ))}
        </div>
      </section>

      <div>
        <Button type="button">show match</Button>
      </div>
    </main>
  );
};

export default HomePage;
