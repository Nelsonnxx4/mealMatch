import { useState } from "react";
import { countries } from "@/data/countryData";
import CountrySelectionModal from "@/components/CountrySelectionModal";
import Header from "@/components/Header";
import { usePopToast } from "@/hooks/useToast";
import { ToastContainer } from "@/components/Toast";
import { Country } from "@/types/countryType";
import { useProfile, useUpdateCountry } from "@/hooks/useProfile";
import Spinner from "@/components/ui/Spinner";

const HomePage = () => {
  const { data: profile, isLoading: profileLoading } = useProfile();
  const updateCountryMutation = useUpdateCountry();
  const { toasts, removeToast } = usePopToast();

  const [showCountryModal, setShowCountryModal] = useState(false);

  // Show modal if profile exists but country is not set
  const shouldShowModal = profile && !profile.country_code;

  const handleSelectCountry = async (country: Country) => {
    updateCountryMutation.mutate(country, {
      onSuccess: () => {
        setShowCountryModal(false);
      },
    });
  };

  if (profileLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner size="lg" label="Loading your profile..." />
      </div>
    );
  }

  return (
    <main className="h-screen">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <Header />

      <div className="pt-20 px-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome to MealMatch
        </h1>

        {profile?.country_name && (
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
        )}
      </div>

      <CountrySelectionModal
        countries={countries}
        isOpen={shouldShowModal || showCountryModal}
        onClose={() => {
          if (!shouldShowModal) {
            setShowCountryModal(false);
          }
        }}
        onSelectCountry={handleSelectCountry}
      />
    </main>
  );
};

export default HomePage;
