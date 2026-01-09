import { useAuthStore } from "@/stores/authStore";
import { countries } from "@/data/countryData";
import CountrySelectionModal from "@/components/CountrySelectionModal";
import Header from "@/components/Header";
import { usePopToast } from "@/hooks/useToast";
import { ToastContainer } from "@/components/Toast";
import { Country } from "@/types/countryType";

const HomePage = () => {
  const { showCountryModal, setShowCountryModal, updateCountry } =
    useAuthStore();
  const { toasts, addToast, removeToast } = usePopToast();

  const handleSelectCountry = async (country: Country) => {
    const { error } = await updateCountry(country);

    if (error) {
      addToast({
        title: "Error",
        description: "Failed to update country. Please try again.",
        variant: "error",
      });
    } else {
      addToast({
        title: "Success!",
        description: `Your country has been set to ${country.name}`,
        variant: "success",
      });
    }
  };

  return (
    <main>
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <Header />
      <CountrySelectionModal
        countries={countries}
        isOpen={showCountryModal}
        onClose={() => setShowCountryModal(false)}
        onSelectCountry={handleSelectCountry}
      />

      {/* Your main content will go here */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Welcome to MealMatch!
        </h2>
        <p className="text-gray-600">
          Your personalized food recommendation app is ready.
        </p>
      </div>
    </main>
  );
};

export default HomePage;
