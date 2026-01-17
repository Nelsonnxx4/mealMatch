import { Link } from "react-router-dom";

interface ILandingPageProps {}

const LandingPage: React.FunctionComponent<ILandingPageProps> = () => {
  return (
    <main>
      <h1>helgglo</h1>

      <div>
        <Link className="underline text-blue-400" to="/auth">
          Login
        </Link>
      </div>
    </main>
  );
};

export default LandingPage;
