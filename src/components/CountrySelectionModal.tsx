import { X } from "lucide-react";
import { useState } from "react";

import { Button } from "./ui/Button";

import { Country } from "@/types/countryType";
import { countries } from "@/data/countryData";

interface ICountrySelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCountry: (country: Country) => void;
  countries: Country[];
}

const CountrySelectionModal = ({
  isOpen,
  onClose,
  onSelectCountry,
}: ICountrySelectionModalProps) => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (selectedCountry) {
      onSelectCountry(selectedCountry);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-[90%] max-w-md p-4 relative animate-in fade-in-0 zoom-in-95 duration-200">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          onClick={onClose}
        >
          <X className="text-black" size={20} />
        </button>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 leading-6">
            Welcome to MealMatch!
          </h2>
          <p className="text-base text-gray-600 leading-5">
            Please select your country to get personalized food recommendations
          </p>
        </div>

        <div className="space-y-2 mb-4 max-h-[400px] overflow-y-scroll scrollbar-hide">
          {countries.map((country) => (
            <button
              key={country.code}
              className={`w-full p-3 rounded-md border transition-all duration-200 text-left ${
                selectedCountry?.code === country.code
                  ? "border-orange-500 bg-orange-100"
                  : "border-gray-300 hover:border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => setSelectedCountry(country)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    alt={`${country.name} flag`}
                    className="w-8 h-8 rounded-md object-cover"
                    src={country.flag}
                  />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {country.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      Currency: {country.currency}
                    </p>
                  </div>
                </div>
                {selectedCountry?.code === country.code && (
                  <div className="w-5 h-5 rounded-full bg-main-300 flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M5 13l4 4L19 7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                      />
                    </svg>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        <Button fullWidth disabled={!selectedCountry} onClick={handleSubmit}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default CountrySelectionModal;
