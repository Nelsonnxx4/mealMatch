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
import ProfileCard from "@/components/ProfileCard";

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

  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  const handleOpenProfile = () => {
    setIsProfileOpen(true);
  };

  const handleCloseProfile = () => {
    setIsProfileOpen(false);
  };

  if (profileLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner label="Loading your profile..." size="lg" />
      </div>
    );
  }

  return (
    <main
      className={`h-full w-full lg:w-[70%] lg:m-auto ${isProfileOpen ? "overflow-hidden" : ""}`}
    >
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <Header
        isProfileOpen={isProfileOpen}
        onCloseProfile={handleCloseProfile}
        onOpenProfile={handleOpenProfile}
      />

      {isProfileOpen && <ProfileCard onClose={handleCloseProfile} />}

      <div className="pt-20 px-4 z-10">
        <CountrySelectionModal
          countries={countries}
          isOpen={showCountryModal}
          onClose={handleCloseModal}
          onSelectCountry={handleSelectCountry}
        />

        <section className="my-8 xl:mt-20 flex flex-col justify-center items-center">
          <span className="bg-orange-200 border border-orange-300 rounded-full p-2 text-gray-600 font-medium">
            what meal do you want to match?
          </span>
          <h1 className="my-4 text-2xl text-gray-800 font-normal">
            Find your perfect meal
          </h1>
          <p className="leading-5 ">
            Select your budget and meal type, and we&apos;ll recommend the
            perfect meal for you
          </p>
        </section>

        <section className="flex flex-col justify-center items-center space-y-4">
          <div className="flex justify-between items-center gap-4 italic">
            <div className="flex justify-center items-center bg-orange-200 border border-orange-300 h-10 w-10  rounded-full">
              <span>1</span>
            </div>
            <h2 className="text-gray-800 font-medium text-medium leading-4">
              How much do you have in mind?
            </h2>
          </div>

          {budgetTiers.map((budget) => {
            const bgColor =
              budget.id === 1
                ? "bg-red-300 border border-red-500/80 hover:bg-red-200 focus:bg-red-400"
                : budget.id === 2
                  ? "bg-orange-300 border border-orange-500/80 hover:bg-orange-200 focus:bg-orange-400"
                  : budget.id === 3
                    ? "bg-green-300 border border-green-500/80 hover:bg-green-200 focus:bg-green-400"
                    : "bg-gray-500";

            return (
              <div
                key={budget.id}
                className={`${bgColor} min-w-[70%] xl:min-w-[40%] flex flex-col p-4 rounded-lg text-gray-800 font-medium text-medium cursor-pointer`}
              >
                <h3 className="underline">{budget.name}</h3>
                <span>{budget.range}</span>
                <span>{budget.desc}</span>
              </div>
            );
          })}
        </section>

        <section className="flex flex-col justify-start items-start md:justify-center md:items-center space-y-4 my-16">
          <div className="flex justify-between items-center gap-4 italic">
            <div className="flex justify-center items-center bg-orange-200 border border-orange-300 h-10 w-10  rounded-full">
              <span>2</span>
            </div>
            <h2 className="text-gray-800 font-medium text-medium text-center leading-4">
              What meal is this?
            </h2>
          </div>

          <div className="w-full flex flex-col justify-between items-center gap-2">
            {mealTimes.map((mealTime) => (
              <div
                key={mealTime.id}
                className="min-w-[70%] xl:min-w-[40%] bg-gray-50 border border-gray-300 rounded-lg p-4 cursor-pointer"
              >
                <div>{mealTime.icon}</div>
                <h3 className="text-gray-700 font-medium">{mealTime.name}</h3>
                <span>{mealTime.desc}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="flex justify-center items-center pb-8">
          <Button type="button">show match</Button>
        </div>

        <div className="flex justify-center items-center pb-8">
          <span className="underline text-orange-600 font-medium">History</span>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
