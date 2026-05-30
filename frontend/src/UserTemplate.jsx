import { Outlet } from "react-router-dom";
import NavbarComp from "./components/NavbarComp";
import Footer from "./components/Footer";


export default function UserTemplate() {
    return (
        <>
      
         <NavbarComp />
        

         <Outlet />
        <Footer />
        </>
    )
}