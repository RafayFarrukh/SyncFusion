import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { Spinner, TooltipComponent } from "@syncfusion/ej2-react-popups";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import QRCode from "react-qr-code";
import TeacherLogin from "./pages/TeacherLogin";
import TeacherSignup from "./pages/TeacherSignup";
import ThemeSettings from "./components/ThemeSettings";
import { useStateContext } from "./contexts/ContextProvider";
import AllCourses from "./components/AllCourses";
import AddCourse from "./components/AddCourse";
import Qr_code from "./components/Qr_code";
import Details from "./components/Details";
import JoinCourse from "./components/JoinCourse";
import StudentCourse from "./components/StudentCourse";

function App() {
  const [qrText, setQrText] = useState("");
  const { currentMode, activeMenu, themeSettings, setThemeSettings } =
    useStateContext();

  return (
    <>
      <div className={currentMode === "Dark" ? "dark" : ""}>
        <BrowserRouter>
          <div className="flex relative dark:bg-main-dark-bg">
            <div
              className="fixed right-4 bottom-4 bg-blue-900"
              style={{ zIndex: "1000" }}
            >
              <TooltipComponent content="Settings" position="Top">
                <button
                  type="button"
                  onClick={() => setThemeSettings(true)}
                  className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                  style={{ borderRadius: "50%" }}
                >
                  <FiSettings />
                </button>
              </TooltipComponent>
            </div>
            {activeMenu ? (
              <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                <Sidebar />
              </div>
            ) : (
              <div className="w-0 dark:bg-secondary-dark-bg">
                <Sidebar />
              </div>
            )}
            <div
              className={
                activeMenu
                  ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                  : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
              }
            >
              <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                <Navbar />
              </div>
              {themeSettings && <ThemeSettings />}
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/allcourses" element={<AllCourses />} />
                <Route
                  path="/qrcode"
                  element={<Qr_code setQrText={setQrText} qrText={qrText} />}
                />

                <Route path="/studentcourses" element={<StudentCourse />} />
                <Route path="/joincourse" element={<JoinCourse />} />
                <Route path="/teacherlogin" element={<TeacherLogin />} />
                <Route path="/teachersignup" element={<TeacherSignup />} />
                <Route path="/addcourse" element={<AddCourse />} />
                <Route path="/onecourse/:id" element={<Details />} />
              </Routes>
            </div>
            {/* <Sidebar /> */}
          </div>
        </BrowserRouter>
        <ToastContainer position="top-right" />
      </div>
    </>
  );
}

export default App;
