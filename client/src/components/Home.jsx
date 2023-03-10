import { React, useState } from "react";
import AuthCheck from "../Authorization/AuthCheck";
import { useStateContext } from "../contexts/ContextProvider";

const Home = () => {
  const token = localStorage.getItem("Token");
  const { currentMode, activeMenu, themeSettings, setThemeSettings } =
    useStateContext();
  return (
    <>
      <AuthCheck>
        <div className="dark:bg-gray-900 ">
          <div className="mt-9 mr-9 dark:bg-main-dark-bg  ">
            <div className="  md:right-52 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
              <div className="flex justify-between items-center">
                <div className="flex gap-3">
                  <div>
                    <p className="font-bold text-gray-400 dark:text-white text-slate-900">
                      Hi i am Home
                    </p>
                    <p className="text-2xl dark:text-white">{token}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AuthCheck>
    </>
  );
};

export default Home;
