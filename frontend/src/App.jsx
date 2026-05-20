import { useEffect, useState } from "react";
import axios from "axios";

import HeroSection from "./components/HeroSection";
import HowItWorks from "./components/HowItWorks";
import ItemList from "./components/ItemList";
import NavbarComp from "./components/NavbarComp";
import TrustedSection from "./components/TrustedSection";
import { Spinner } from "flowbite-react";

export default function App() {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setLoading (false);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getItems();
  }, []);

  if (loading) {
  return (
    <div className="flex justify-center mt-90" size="s">
      <Spinner aria-label="Default status example" />
      Sedang mengambil data...
    </div>
  )
}

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