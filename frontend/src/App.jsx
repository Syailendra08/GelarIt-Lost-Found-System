import HeroSection from "./components/HeroSection";
import HowItWorks from "./components/HowItWorks";
import ItemCard from "./components/ItemCard";
import ItemList from "./components/ItemList";
import NavbarComp from "./components/NavbarComp";
import TrustedSection from "./components/TrustedSection";


export default function App() {
  return (
    <>
      <NavbarComp />
      <div>

        <section className="bg-[#eef0ff]">
          <HeroSection />


          <ItemList />


        </section>

        <div className="pb-20">
          <section className="bg-white ">
            <HowItWorks />
          </section>
        </div>

      <section className="bg-[#eef0ff]">
        <TrustedSection />
      </section>

      </div>
    </>
  );
}