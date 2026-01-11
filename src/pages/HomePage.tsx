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
    <main className="h-screen">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <Header />
      <CountrySelectionModal
        countries={countries}
        isOpen={showCountryModal}
        onClose={() => setShowCountryModal(false)}
        onSelectCountry={handleSelectCountry}
      />
    </main>
  );
};

export default HomePage;
