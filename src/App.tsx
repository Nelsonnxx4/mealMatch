// src/App.tsx
import { RouterProvider } from "react-router-dom";
import { HeroUIProvider } from "@heroui/system";
import { useHref } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { router } from "./router";
import { queryClient } from "./config/queryClient";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <HeroUIProvider useHref={useHref}>
          <RouterProvider router={router} />
        </HeroUIProvider>
      </AuthProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}

export default App;
