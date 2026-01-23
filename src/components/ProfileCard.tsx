import { useRef, useEffect } from "react";
import { Avatar } from "@heroui/avatar";

import { Button } from "./ui/Button";
import Spinner from "./ui/Spinner";

import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { useSignOut } from "@/hooks/useAuthMutation";

interface ProfileCardProps {
  onClose: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ onClose }) => {
  const { user } = useAuth();
  const { data: profile, isLoading } = useProfile();
  const signOutMutation = useSignOut();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleSignOut = () => {
    signOutMutation.mutate();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);

      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [onClose]);

  return (
    <main
      aria-labelledby="profile-dialog-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center sm:justify-end sm:items-start bg-black/40 backdrop-blur-sm"
      role="dialog"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
      }}
    >
      <section
        ref={cardRef}
        className="flex flex-col justify-center items-center  bg-white rounded-md shadow-md w-[90%] sm:w-[50%] md:w-[40%] lg:w-[30%] xl:w-[20%] p-6 sm:p-4 sm:mt-20 sm:mr-5 lg:mt-24 lg:mr-60 relative animate-in fade-in-0 zoom-in-95 duration-200"
      >
        {isLoading ? (
          <Spinner size="lg" />
        ) : (
          <>
            <div className="mb-4 md:mb-2">
              <Avatar
                isBordered
                color="default"
                radius="full"
                size="lg"
                src={profile.avatarUrl || user?.user_metadata.picture}
              />
            </div>

            <div className="flex flex-col justify-center items-center mb-4 md:mb-2 text-center">
              <h2 className="text-xl font-bold text-gray-800">
                {profile.name || user?.user_metadata.name || "User"}
              </h2>
              <p className="text-sm text-gray-600">{profile.email}</p>
            </div>

            {profile?.country_name && (
              <div className="w-full bg-gray-50 rounded-lg p-4 sm:p-2 md:py-1 mb-4">
                <div className="flex items-center gap-3 md:gap-2 mb-2">
                  <img
                    alt={profile.country_name}
                    className="w-8 h-8 rounded"
                    src={profile.country_flag ?? undefined}
                  />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {profile.country_name}
                    </p>

                    <div className="flex justify-between items-center gap-1">
                      <p className="text-sm text-gray-600">
                        {profile.currency_symbol}
                      </p>

                      <p className="text-sm text-gray-600">
                        ({profile.currency})
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <Button
              fullWidth
              isLoading={signOutMutation.isPending}
              variant="outline"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </>
        )}
      </section>
    </main>
  );
};

export default ProfileCard;
