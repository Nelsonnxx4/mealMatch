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

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      role="dialog"
    >
      <section
        ref={cardRef}
        className="flex flex-col justify-center items-center bg-white rounded-md shadow-md w-[90%] max-w-md p-6 relative animate-in fade-in-0 zoom-in-95 duration-200"
      >
        {isLoading ? (
          <Spinner size="lg" />
        ) : (
          <>
            <div className="mb-4">
              <Avatar
                isBordered
                color="default"
                radius="full"
                size="lg"
                src={user?.user_metadata.picture}
              />
            </div>

            <div className="flex flex-col justify-center items-center mb-4 text-center">
              <h2 className="text-xl font-bold text-gray-800">
                {user?.user_metadata.name || "User"}
              </h2>
              <p className="text-sm text-gray-600">{user?.email}</p>
            </div>

            {profile?.country_name && (
              <div className="w-full bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <img
                    alt={profile.country_name}
                    className="w-8 h-8 rounded"
                    src={profile.country_flag ?? undefined}
                  />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {profile.country_name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {profile.currency_symbol} {profile.currency}
                    </p>
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
