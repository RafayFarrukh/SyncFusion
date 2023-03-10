import { React } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axiosInstance from "../services/axiosInstance";
import * as yup from "yup";
const token = localStorage.getItem("Token");
const JoinCourse = () => {
  const navigate = useNavigate();

  const { handleSubmit, getFieldProps, touched, errors } = useFormik({
    initialValues: {
      courseCode: "",
    },
    validationSchema: yup.object({
      courseCode: yup.string().required("courseCode is Required!"),
    }),
    onSubmit: (values) => {
      const user = localStorage.getItem("User");
      const userid = JSON.parse(user);
      console.log(userid._id);
      axiosInstance
        .post(
          "http://localhost:5000/api/course/student/joinCourse",
          {
            courseCode: values.courseCode,
            _id: userid._id,
          },
          { headers: { "x-auth-token": token } }
        )
        .then((resp) => {
          navigate("/home");

          toast.success("Successfully Joined the course", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });
        })
        .catch((res) => {
          console.log(res);
          if (res.response.data.success == false) {
            toast.error(res.response.data.message, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2000,
            });
          }
        });
    },
  });

  return (
    <>
      <div className="">
        <div className="mt-24 ">
          <div className="w-full md:w-96 md:max-w-full mx-auto shadow-lg">
            <div className="p-6  border-gray-300 sm:rounded-md">
              <h1 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800 mb-12 mr-20">
                Join Course
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
                    Join Course
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JoinCourse;
