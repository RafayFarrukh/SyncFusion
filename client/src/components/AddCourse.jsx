import { React } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthCheck from "../Authorization/AuthCheck";
import { useFormik } from "formik";
import axiosInstance from "../services/axiosInstance";
import * as yup from "yup";

const StudentLogin = () => {
  const navigate = useNavigate();

  const { handleSubmit, getFieldProps, touched, errors } = useFormik({
    initialValues: {
      courseCode: "",
      courseShortName: "",
      courseName: "",
    },
    validationSchema: yup.object({
      courseCode: yup.string().required("courseCode is Required!"),

      courseShortName: yup
        .string()
        .required("courseShortName is Required")
        .matches(/[A-Z]+/, "One uppercase character"),

      courseName: yup.string().required("course Name is Required"),
    }),
    onSubmit: (values) => {
      axiosInstance
        .post("http://localhost:5000/api/course/teacher/addCourse", {
          // .post("/users/login", {
          courseCode: values.courseCode,
          courseShortName: values.courseShortName,
          courseName: values.courseName,
        })
        .then((resp) => {
          navigate("/home");

          toast.success("Successfully Logged in", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });
        })
        .catch((res) => {
          console.log(res);
          if (res.response.data.success == false) {
            toast.error(res.response.data.error, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2000,
            });
          }
        });
    },
  });

  return (
    <>
      <AuthCheck>
        <div className="">
          <div className="mt-24 ">
            <div className="w-full md:w-96 md:max-w-full mx-auto shadow-lg">
              <div className="p-6  border-gray-300 sm:rounded-md">
                <h1 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800 mb-12 mr-20">
                  Add Course
                </h1>

                <form method="POST" action="" onSubmit={handleSubmit}>
                  <label className="block mb-2">
                    <span className="text-gray-800  ml-2 mt-8 font-bold flex items-center gap-x-3">
                      Course Code
                    </span>
                    <input
                      name="courseCode"
                      {...getFieldProps("courseCode")}
                      type="text"
                      placeholder="Course Code"
                      required
                    />
                  </label>
                  {touched.courseCode && errors.courseCode ? (
                    <small>{errors.courseCode}</small>
                  ) : null}
                  <label className="block mb-2">
                    <span className="text-gray-800  ml-2 mt-8 font-bold flex items-center gap-x-3">
                      Course Short Name
                    </span>
                    <input
                      name="courseShortName"
                      type="text"
                      {...getFieldProps("courseShortName")}
                      placeholder="courseShortName"
                      required
                    />
                  </label>
                  {touched.courseShortName && errors.courseShortName ? (
                    <small>{errors.courseShortName}</small>
                  ) : null}
                  <label className="block mb-2">
                    <span className="text-gray-800  ml-2 mt-8 font-bold flex items-center gap-x-3">
                      Course Name
                    </span>
                    <input
                      name="courseName"
                      type="text"
                      {...getFieldProps("courseName")}
                      placeholder="Course Name"
                      required
                    />
                  </label>
                  {touched.courseName && errors.courseName ? (
                    <small>{errors.courseName}</small>
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
                      Add Course
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </AuthCheck>
    </>
  );
};

export default StudentLogin;
