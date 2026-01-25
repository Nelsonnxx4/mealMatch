import { useState, useEffect } from "react";

import { countries } from "@/data/countryData";
import CountrySelectionModal from "@/components/CountrySelectionModal";
import Header from "@/components/layout/Header";
import { usePopToast } from "@/hooks/useToast";
import { ToastContainer } from "@/components/Toast";
import { Country } from "@/types/countryType";
import { useProfile, useUpdateCountry } from "@/hooks/useProfile";
import Spinner from "@/components/ui/Spinner";
import { budgetTiers } from "@/data/budgetData";
import { mealTimes } from "@/data/mealTimesData";
import { Button } from "@/components/ui/Button";
import ProfileCard from "@/components/ProfileCard";
import { getRandomFood, getFilteredFoods } from "@/utils/foodFilter";
import { Food } from "@/types/foodType";

const HomePage = () => {
  const { data: profile, isLoading: profileLoading } = useProfile();
  const updateCountryMutation = useUpdateCountry();
  const { toasts, removeToast, addToast } = usePopToast();

  const [showCountryModal, setShowCountryModal] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const [selectedMealType, setSelectedMealType] = useState<string | null>(null);

  const [matchedFood, setMatchedFood] = useState<Food | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);

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

  const handleOpenProfile = () => {
    setIsProfileOpen(true);
  };

  const handleCloseProfile = () => {
    setIsProfileOpen(false);
  };

  const handleBudgetSelect = (budgetId: string) => {
    setSelectedBudget(budgetId === selectedBudget ? null : budgetId);
    setShowResult(false);
  };

  const handleMealTypeSelect = (mealId: string) => {
    setSelectedMealType(mealId === selectedMealType ? null : mealId);
    setShowResult(false);
  };

  const handleShowMatch = () => {
    if (!selectedBudget || !selectedMealType) {
      addToast({
        title: "Missing Selection",
        description: "Please select both a budget tier and meal type",
        variant: "warning",
      });

      return;
    }

    if (!profile?.country_code) {
      addToast({
        title: "No Country Selected",
        description: "Please select your country first",
        variant: "warning",
      });

      return;
    }

    const countryMap: Record<string, string> = {
      NG: "nigeria",
      GH: "ghana",
      KE: "kenya",
      ZA: "south africa",
      EG: "egypt",
      RW: "rwanda",
    };

    const countryName = countryMap[profile.country_code];

    const budgetTier = budgetTiers.find(
      (b) => b.id.toString() === selectedBudget
    );

    if (!countryName || !budgetTier) {
      addToast({
        title: "Error",
        description: "Unable to process your selection",
        variant: "error",
      });

      return;
    }

    const food = getRandomFood({
      country: countryName,
      budget: budgetTier.name.toLowerCase(),
      mealType: selectedMealType,
    });

    if (!food) {
      const alternatives = getFilteredFoods({
        country: countryName,
        mealType: selectedMealType,
      });

      if (alternatives.length > 0) {
        setMatchedFood(alternatives[0]);
        addToast({
          title: "No Exact Match",
          description: "We found an alternative meal for you!",
          variant: "info",
        });
      } else {
        addToast({
          title: "No Matches Found",
          description:
            "Sorry, we couldn't find any meals matching your criteria",
          variant: "info",
        });

        return;
      }
    } else {
      setMatchedFood(food);
      addToast({
        title: "Match Found!",
        description: `We found the perfect meal for you`,
        variant: "success",
      });
    }

    setShowResult(true);
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
          <p className="leading-5 text-center">
            Select your budget and meal type, and we&apos;ll recommend the
            perfect meal for you
          </p>
        </section>

        {/* Budget Selection */}
        <section className="flex flex-col justify-center items-center space-y-4">
          <div className="flex justify-between items-center gap-4 italic">
            <div className="flex justify-center items-center bg-orange-200 border border-orange-300 h-10 w-10 rounded-full">
              <span>1</span>
            </div>
            <h2 className="text-gray-800 font-medium text-medium leading-4">
              How much do you have in mind?
            </h2>
          </div>

          {budgetTiers.map((budget) => {
            const isSelected = selectedBudget === budget.id.toString();
            const bgColor = isSelected
              ? "bg-orange-400 border-orange-600"
              : budget.id === 1
                ? "bg-red-300 border-red-500/80 hover:bg-red-200"
                : budget.id === 2
                  ? "bg-orange-300 border-orange-500/80 hover:bg-orange-200"
                  : "bg-green-300 border-green-500/80 hover:bg-green-200";

            return (
              <div
                key={budget.id}
                aria-pressed={isSelected}
                className={`${bgColor} min-w-[70%] xl:min-w-[40%] flex flex-col p-4 rounded-lg text-gray-800 font-medium text-medium cursor-pointer transition-all ${isSelected ? "ring-2 ring-orange-600 scale-105" : ""}`}
                role="button"
                tabIndex={0}
                onClick={() => handleBudgetSelect(budget.id.toString())}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleBudgetSelect(budget.id.toString());
                  }
                }}
              >
                <h3 className="underline">{budget.name}</h3>
                <span>{budget.range}</span>
                <span>{budget.desc}</span>
              </div>
            );
          })}
        </section>

        {/* Meal Type Selection */}
        <section className="flex flex-col justify-start items-start md:justify-center md:items-center space-y-4 my-16">
          <div className="flex justify-between items-center gap-4 italic">
            <div className="flex justify-center items-center bg-orange-200 border border-orange-300 h-10 w-10 rounded-full">
              <span>2</span>
            </div>
            <h2 className="text-gray-800 font-medium text-medium text-center leading-4">
              What meal is this?
            </h2>
          </div>

          <div className="w-full flex flex-col justify-between items-center gap-2">
            {mealTimes.map((mealTime) => {
              const isSelected = selectedMealType === mealTime.id;

              return (
                <div
                  key={mealTime.id}
                  aria-pressed={isSelected}
                  className={`min-w-[70%] xl:min-w-[40%] bg-gray-50 border rounded-lg p-4 cursor-pointer transition-all ${
                    isSelected
                      ? "border-orange-500 bg-orange-50 ring-2 ring-orange-500 scale-105"
                      : "border-gray-300 hover:bg-gray-100"
                  }`}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleMealTypeSelect(mealTime.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleMealTypeSelect(mealTime.id);
                    }
                  }}
                >
                  <div>{mealTime.icon}</div>
                  <h3 className="text-gray-700 font-medium">{mealTime.name}</h3>
                  <span className="text-gray-600">{mealTime.desc}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Match Button */}
        <div className="flex justify-center items-center pb-8">
          <Button
            disabled={!selectedBudget || !selectedMealType}
            type="button"
            onClick={handleShowMatch}
          >
            Show Match
          </Button>
        </div>

        {/* Match Result */}
        {showResult && matchedFood && (
          <section className="mb-8 flex justify-center">
            <div className="min-w-[70%] xl:min-w-[40%] bg-white border-2 border-orange-500 rounded-lg p-6 shadow-lg">
              <div className="text-center mb-4">
                <span className="text-6xl">{matchedFood.image}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 text-center mb-2">
                {matchedFood.name}
              </h3>
              <p className="text-gray-600 text-center mb-4">
                {matchedFood.description}
              </p>
              <div className="flex justify-between items-center bg-orange-50 rounded-lg p-4">
                <span className="text-gray-700 font-medium">Price:</span>
                <span className="text-xl font-bold text-orange-600">
                  {profile?.currency_symbol}
                  {matchedFood.price.toLocaleString()}
                </span>
              </div>
            </div>
          </section>
        )}

        <div className="flex justify-center items-center pb-8">
          <span
            aria-pressed="false"
            className="underline text-orange-600 font-medium cursor-pointer"
            role="button"
            tabIndex={0}
            onClick={() => {
              // TODO: Implement history click handler
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                // TODO: Implement history click handler
              }
            }}
          >
            History
          </span>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
