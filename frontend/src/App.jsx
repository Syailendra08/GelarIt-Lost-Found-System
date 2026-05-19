import { useEffect, useState } from "react";
import axios from "axios";

import HeroSection from "./components/HeroSection";
import HowItWorks from "./components/HowItWorks";
import ItemList from "./components/ItemList";
import NavbarComp from "./components/NavbarComp";
import TrustedSection from "./components/TrustedSection";

export default function App() {

  const [items, setItems] = useState([]);

  async function getItems() {
    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:3000/items",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setItems(response.data.data.data);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getItems();
  }, []);

  return (
    <>
      <NavbarComp />

      <div>

        <section className="bg-[#eef0ff]">

          <HeroSection />

          <ItemList data={items} />

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