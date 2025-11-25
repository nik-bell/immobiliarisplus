import HeroHomepage from "../sections/HeroHomepage";
import PercheSceglierci from "../sections/PercheSceglierci";
import ComeFunzionaHomepage from "../sections/ComeFunzionaHomepage";
import NostriValori from "../sections/NostriValori";
import ComeFunzionaSection from "../sections/ComeFunzionaSection";


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
    </>
  );
};

export default HomePage;
