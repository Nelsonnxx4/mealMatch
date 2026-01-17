import { useRef, useEffect } from "react";
import { Avatar } from "@heroui/avatar";

import { Button } from "./ui/Button";

import { useAuthStore } from "@/stores/authStore";

interface ProfileCardProps {
  onClose: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ onClose }) => {
  const { user, profile, signOut } = useAuthStore();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleSignOut = async () => {
    await signOut();
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

  // Close card on Escape key press
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
        className="flex flex-col justify-center items-center bg-white rounded-md shadow-md w-[90%] max-w-md p-4 relative animate-in fade-in-0 zoom-in-95 duration-200"
      >
        <div>
          {/* <img
            alt={user?.user_metadata.name}
            className="rounded-full w-12 h-12"
            src={user?.user_metadata.picture}
          /> */}

          <Avatar
            isBordered
            color="default"
            radius="full"
            size="sm"
            src={user?.user_metadata.picture}
          />
        </div>

        {/* text details */}

        <div className="flex flex-col justify-center items-center">
          <span>{user?.user_metadata.name}</span>
          <span>{user?.email}</span>
        </div>

        <div>
          <img
            alt={profile?.country_name ?? ""}
            src={profile?.country_flag ?? undefined}
          />

          <span>{profile?.country_name}</span>
          <span>{profile?.currency}</span>
          <span>{profile?.currency_symbol}</span>
        </div>

        <Button onClick={handleSignOut}>sign out</Button>
      </section>
    </main>
  );
};

export default ProfileCard;
