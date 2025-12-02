import HeroHomepage from "../sections/HeroHomepage";
import PercheSceglierci from "../sections/PercheSceglierci";
import ComeFunzionaHomepage from "../sections/ComeFunzionaHomepage";
import NostriValori from "../sections/NostriValori";
import ComeFunzionaSection from "../sections/ComeFunzionaSection";
import ChiSiamo from "../sections/ChiSiamo";


const HomePage = () => {
  return (
    <>
      <HeroHomepage />
      <div className="container">
        <PercheSceglierci />
      </div>
      <NostriValori />
        <ComeFunzionaHomepage />
        <ComeFunzionaSection />
        <ChiSiamo />
    </>
  );
};

export default HomePage;
