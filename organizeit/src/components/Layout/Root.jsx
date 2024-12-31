import React, { useEffect } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import SideNavBar from "./SideNavBar/SideNavBar";
import NoteTool from "../NoteTool/NoteTool";
import Modal from "../UI/Modal/Modal";
// import { useSelector } from "react-redux";
// import SpinnerLoader from "../UI/Spinner/SpinnerLoader";
// import store from "../../store";
// import { addtolocalStorage } from "../../services/localStorage";

function Layout(props) {
//   const { showCart } = useSelector((state) => state.ui);
  return (
      <>
          <div className="w-100 h-[100vh] bg-gradient-to-r from-cyan-400 to-blue-500">
            <Header />
                <SideNavBar/>
                <main className="main-body w-[calc(100%-80px)] relative left-[80px]"> {props.children}</main>
                <NoteTool/>
                {/* <Modal/> */}
            {/* <Footer /> */}
          </div>
    </>
  );
}

export default Layout;