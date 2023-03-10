import React from "react";
import { Link, NavLink } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import { FaHome } from "react-icons/fa";
import { BsPersonLinesFill } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { ImQrcode } from "react-icons/im";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useStateContext } from "../contexts/ContextProvider";
import { links } from "../data/dummy";
const Sidebar = () => {
  const { activeMenu, setActiveMenu } = useStateContext();
  const Teacher = localStorage.getItem("Teacher");
  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";
  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={() => {
                setActiveMenu(false);
              }}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <SiShopware /> <span>Attendence</span>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() =>
                  setActiveMenu((prevActionMenu) => !prevActionMenu)
                }
                className="text-xl  rounded-full p-3 hover:bg-light-gray mt-4 block "
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-10 ">
            {Teacher ? (
              <>
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  Course
                </p>
                <Link
                  to="/addcourse"
                  //  className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  className="text-gray-600    dark:text-gray-400 m-3 mt-4 uppercase flex mr-10 items-center"
                >
                  <FaHome className="dark:text-white text-slate-900" />
                  <span className="capitalize ml-4 dark:text-white text-slate-900 ">
                    Add Course
                  </span>
                </Link>
                <Link
                  to="/allcourses"
                  //  className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  className="text-gray-600    dark:text-gray-400 m-3 mt-4 uppercase flex mr-10 items-center"
                >
                  <FaHome className="dark:text-white text-slate-900" />
                  <span className="capitalize ml-4 dark:text-white text-slate-900 ">
                    Courses
                  </span>
                </Link>
                <Link
                  to="/home"
                  //  className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  className="text-gray-600    dark:text-gray-400 m-3 mt-4 uppercase flex mr-10 items-center"
                >
                  <FaHome className="dark:text-white text-slate-900" />
                  <span className="capitalize ml-4 dark:text-white text-slate-900 ">
                    Home
                  </span>
                </Link>
              </>
            ) : (
              <>
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  Course
                </p>
                <Link
                  to="/joincourse"
                  //  className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  className="text-gray-600    dark:text-gray-400 m-3 mt-4 uppercase flex mr-10 items-center"
                >
                  <FaHome className="dark:text-white text-slate-900" />
                  <span className="capitalize ml-4 dark:text-white text-slate-900 ">
                    Join Course
                  </span>
                </Link>
                <Link
                  to="/home"
                  //  className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  className="text-gray-600    dark:text-gray-400 m-3 mt-4 uppercase flex mr-10 items-center"
                >
                  <FaHome className="dark:text-white text-slate-900" />
                  <span className="capitalize ml-4 dark:text-white text-slate-900 ">
                    Home
                  </span>
                </Link>
                <Link
                  to="/studentcourses"
                  //  className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  className="text-gray-600    dark:text-gray-400 m-3 mt-4 uppercase flex mr-10 items-center"
                >
                  <FaHome className="dark:text-white text-slate-900" />
                  <span className="capitalize ml-4 dark:text-white text-slate-900 ">
                    Courses
                  </span>
                </Link>
              </>
            )}

            <p className="text-gray-400 dark:text-gray-400 dark:text-white text-slate-900 m-3 mt-4 uppercase">
              Pages
            </p>

            <Link
              to="/content"
              //  className={({ isActive }) => (isActive ? activeLink : normalLink)}
              className="text-gray-600 dark:text-gray-400 m-3 mt-4 uppercase flex mr-10 items-center "
            >
              <BsPersonLinesFill className="dark:text-white text-slate-900" />
              <span className="capitalize ml-4 dark:text-white text-slate-900">
                Contents
              </span>
            </Link>
            <Link
              to="/qrcode"
              //  className={({ isActive }) => (isActive ? activeLink : normalLink)}
              className="text-gray-600 dark:text-gray-400 m-3 mt-4 uppercase flex mr-10 items-center"
            >
              <ImQrcode className="dark:text-white text-slate-900" />
              <span className="capitalize ml-4 dark:text-white text-slate-900">
                Qr Code Scanner
              </span>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
