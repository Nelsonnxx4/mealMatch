import * as React from "react";

import Header from "@/components/Header";

interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
  return (
    <main>
      <Header />
    </main>
  );
};

export default HomePage;
