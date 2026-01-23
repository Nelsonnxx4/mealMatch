import { useEffect, useState } from "react";
import { Avatar } from "@heroui/avatar";

import ProfileCard from "./ProfileCard";

import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";

interface HeaderProps {
  isProfileOpen: boolean;
  onOpenProfile: () => void;
  onCloseProfile?: () => void;
}

const Header = ({ isProfileOpen, onOpenProfile }: HeaderProps) => {
  const { user } = useAuth();
  const { data: profile } = useProfile();

  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full lg:w-[70%] bg-white flex justify-between items-center fixed top-0 left-0 right-0 lg:m-auto lg:mt-5 lg:rounded-xl px-4 z-50 transition-all duration-300  ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-3"
      }`}
    >
      <div>
        <h1 className="text-xl font-normal text-black/80">MealMatch</h1>
      </div>

      <div>
        <button onClick={onOpenProfile}>
          <Avatar
            isBordered
            color="default"
            radius="full"
            size="sm"
            src={profile.avatarUrl || user?.user_metadata.picture}
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
