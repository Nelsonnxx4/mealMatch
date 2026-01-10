import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { HeroUIProvider } from "@heroui/system";
import { useHref } from "react-router-dom";

import { router } from "./router";

import { useAuthStore } from "@/stores/authStore";

function App() {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    const unsubscribe = initialize();

    return () => unsubscribe();
  }, [initialize]);

  // const navigate = useNavigate();

  return (
    <>
      <HeroUIProvider useHref={useHref}>
        <RouterProvider router={router} />
      </HeroUIProvider>
    </>
  );
}

export default App;
