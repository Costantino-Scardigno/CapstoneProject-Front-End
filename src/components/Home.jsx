import Footer from "./Footer";
import MyHero from "./Hero";
import MyNavbar from "./Navbar";
import ReviewCarousel from "./ReviewCarousel";
import Mysection from "./Section";
import SectionHow from "./SectionHow";

function Home() {
  return (
    <>
      <div id="home">
        <MyNavbar />
        <MyHero />
        <Mysection />
        <SectionHow />
        <ReviewCarousel />
        <Footer />
      </div>
    </>
  );
}
export default Home;
