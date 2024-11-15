import { Outlet } from "react-router-dom";
import { Header } from "../components/header";

export const DefaultLayout = () => {
  return (
   <>
    <div>
     <Header/>
     <Outlet/>
    </div>
   </>
  )
}