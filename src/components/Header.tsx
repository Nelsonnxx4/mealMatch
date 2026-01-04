import * as React from "react";

import { useAuthStore } from "@/stores/authStore";

interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  const { user } = useAuthStore();

  return (
    <main>
      <h1>hello form header</h1>
      <span>{user?.email}</span>
    </main>
  );
};

export default Header;
