import React from "react";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import classes from "./home.module.css";
import * as yup from "yup";
import BaseURL from "../services/baseUrl";

const TeacherSignup = () => {
  const navigate = useNavigate();

  const { handleSubmit, getFieldProps, touched, errors } = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      fullName: yup
        .string()
        .required("Username is Required")
        .min(5, "Username must be more then 5 characters"),
      email: yup
        .string()
        .required("E-mail is Required!")
        .email("E-mail Invalid"),

      password: yup
        .string()
        .required("Password is Required")
        .matches(/(?=[a-zA-Z])/, "A Password Must contain atleast 1 Character")

        .min(5, "Password must be atleast 5 characters"),
    }),
    onSubmit: (values) => {
      axios
        // .post("http://localhost:5000/api/auth/teacher/register", {
        .post(`${BaseURL}/api/auth/teacher/register`, {
          fullName: values.fullName,
          email: values.email,
          password: values.password,
        })
        .then((resp) => {
          toast.success("Successfully SignedUp", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });
          navigate("/login");
          console.log(resp.values);
        })
        .catch((res) => {
          console.log(res);
          toast.error(res.response.data.error, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });
        });
    },
  });

  return (
    <>
      <div className="">
        <div className="mt-24 ">
          <div className="w-full md:w-96 md:max-w-full mx-auto shadow-lg">
            <div className="p-6  border-gray-300 sm:rounded-md">
              <h1 className="text-center font-semibold  lg:text-3xl text-gray-800 mb-12 mr-20">
                Student Signup
              </h1>
              <form method="POST" action="" onSubmit={handleSubmit}>
                <label className="block mb-2">
                  <span className="text-gray-800  ml-2 mt-8 font-bold flex items-center gap-x-3">
                    <FaUser />
                    User Name
                  </span>

                  <input
                    name="fullName"
                    type="text"
                    className={classes.inputsignup}
                    {...getFieldProps("fullName")}
                    minlength="5"
                    placeholder="fullName"
                  />
                </label>

                {touched.fullName && errors.fullName ? (
                  <small>{errors.fullName}</small>
                ) : null}
                <label className="block mb-3">
                  {/* <EmailIcon /> */}
                  <span className="text-gray-800  ml-2 mt-8 font-bold flex items-center gap-x-3">
                    <MdEmail />
                    Email
                  </span>
                  <input
                    name="email"
                    className={classes.inputsignup}
                    type="email"
                    {...getFieldProps("email")}
                    placeholder="Email"
                  />
                </label>

                {touched.email && errors.email ? (
                  <small>{errors.email}</small>
                ) : null}

                <label className="block mb-3">
                  <span className="text-gray-800  ml-2 mt-8 font-bold flex items-center gap-x-3">
                    <RiLockPasswordFill />
                    Password
                  </span>
                  <input
                    name="password"
                    type="password"
                    {...getFieldProps("password")}
                    className={classes.inputsignup}
                    minlength="5"
                    placeholder="Password"
                  />
                </label>
                {touched.password && errors.password ? (
                  <small>{errors.password}</small>
                ) : null}

                <div className="mb-6">
                  <button
                    type="submit"
                    className="
            h-10
            px-5
            text-indigo-100
            bg-sky-600
            rounded-lg
            transition-colors
            duration-150
            focus:shadow-outline
            hover:bg-sky-300
            text-black
          "
                  >
                    Sign Up
                  </button>
                </div>
                <div></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherSignup;
