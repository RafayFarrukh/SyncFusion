import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import UserProfile from "./UserProfile";
import avatar from "../data/avatar.jpg";

import { useStateContext } from "../contexts/ContextProvider";
const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const navigate = useNavigate();

  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
  } = useStateContext();

  const User = JSON.parse(localStorage.getItem("User"));

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
      <NavButton
        title="Menu"
        customFunc={handleActiveMenu}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />
      <div className="flex">
        {localStorage.getItem("User") ? (
          <>
            <TooltipComponent content="Profile" position="BottomCenter">
              <div
                className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
                onClick={() => handleClick("userProfile")}
              >
                <img
                  className="rounded-full w-8 h-8"
                  src={avatar}
                  alt="user-profile"
                />
                <p>
                  <span className="text-gray-400 text-14">Hi,</span>{" "}
                  <span className="text-gray-400 font-bold ml-1 text-14">
                    {/* {User.name} */}
                  </span>
                </p>
                <MdKeyboardArrowDown className="text-gray-400  text-14" />
              </div>
            </TooltipComponent>
            {isClicked.userProfile && <UserProfile />}
          </>
        ) : localStorage.getItem("Teacher") ? (
          <>
            <TooltipComponent content="Profile" position="BottomCenter">
              <div
                className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
                onClick={() => handleClick("userProfile")}
              >
                <img
                  className="rounded-full w-8 h-8"
                  src={avatar}
                  alt="user-profile"
                />
                <p>
                  <span className="text-gray-400 text-14">Hi,</span>{" "}
                  <span className="text-gray-400 font-bold ml-1 text-14">
                    {/* {User.name} */}
                  </span>
                </p>
                <MdKeyboardArrowDown className="text-gray-400  text-14" />
              </div>
            </TooltipComponent>
            {isClicked.userProfile && <UserProfile />}
          </>
        ) : (
          <>
            <div className="flex align-center justify-between gap-x-2.5">
              <Link
                to="/teacherlogin"
                className=" h-10
                        px-5
                        py-2

                        text-indigo-100
                        bg-sky-600
                        rounded-lg
                        transition-colors
                        duration-150
                        focus:shadow-outline
                        hover:bg-sky-300
                        text-black"
              >
                Teacher Login
              </Link>
              <Link
                to="/teachersignup"
                className=" h-10
                        px-5
                        py-2

                        text-indigo-100
                        bg-sky-600
                        rounded-lg
                        transition-colors
                        duration-150
                        focus:shadow-outline
                        hover:bg-sky-300
                        text-black"
              >
                Teacher Signup
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
