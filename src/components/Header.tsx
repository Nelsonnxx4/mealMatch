import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/Button";

const Header = () => {
  const { user, profile, signOut, setShowCountryModal } = useAuthStore();

  const handleSignOut = async () => {
    await signOut();
  };

  const handleChangeCountry = () => {
    setShowCountryModal(true);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo and Country */}
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-main-300">MealMatch</h1>

            {profile?.country_name && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full">
                <span className="text-xl">{profile.country_flag}</span>
                <span className="text-sm font-medium text-gray-700">
                  {profile.country_name}
                </span>
              </div>
            )}
          </div>

          {/* Right side - User info and actions */}
          <div className="flex items-center gap-4">
            {profile?.country_name && (
              <button
                className="text-sm text-gray-600 hover:text-main-300 transition-colors underline"
                onClick={handleChangeCountry}
              >
                Change Country
              </button>
            )}

            <div className="flex flex-col items-end">
              <span className="text-sm font-medium text-gray-700">
                {user?.email}
              </span>
              {profile?.currency && (
                <span className="text-xs text-gray-500">
                  Currency: {profile.currency}
                </span>
              )}
            </div>

            <Button size="sm" variant="secondary" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
