import HeroHomepage from "../sections/HeroHomepage";
import PercheSceglierci from "../sections/PercheSceglierci";
import ComeFunzionaHomepage from "../sections/ComeFunzionaHomepage";

const HomePage = () => {
  return (
    <>
      <HeroHomepage />
      <div className="container">
        <PercheSceglierci />
      </div>
        <ComeFunzionaHomepage />
    </>
  );
};

export default HomePage;
