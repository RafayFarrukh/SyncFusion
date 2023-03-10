import React, { useState, useEffect } from "react";
import axiosInstance from "../services/axiosInstance";
import { useNavigate, useLocation } from "react-router-dom";
const Details = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [course, setCourse] = useState();

  useEffect(() => {
    const split = location.pathname.split("/");
    const id = split[2];
    axiosInstance
      .get(`http://localhost:5000/api/course/teacher/showOneCourse/${id}`)
      .then((res) => {
        console.log(res.data.course);
        setCourse(res.data.course);
      });
  }, []);
  // const teacher = course.teacher;
  return (
    <>
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="py-3 px-6">
              Course Code
            </th>
            <th scope="col" class="py-3 px-6">
              CourseName
            </th>
            <th scope="col" class="py-3 px-6">
              CourseShortNam
            </th>
          </tr>
        </thead>
        {course != null ? (
          <>
            <tbody>
              <td className="py-4 px-6">{course.courseCode}</td>
              <td className="py-4 px-6">{course.courseName}</td>
              <td className="py-4 px-6">{course.courseShortName}</td>
              <td className="py-4 px-6">{course._id}</td>
            </tbody>
          </>
        ) : (
          <></>
        )}
      </table>
      {course != null ? (
        <div>
          <div className="dark:bg-gray-900 ">
            <div className="mt-9 mr-9 dark:bg-main-dark-bg  ">
              <div className="  md:right-52 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
                <div className="flex justify-between items-center">
                  <h1 className="font-extrabold">Teacher Name</h1>
                  {course.teacher.fullName}
                </div>
              </div>
            </div>
            <div className="mt-9 mr-9 dark:bg-main-dark-bg  ">
              <div className="  md:right-52 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
                <div className="flex justify-between items-center">
                  <h1 className="font-extrabold">Teacher Email</h1>
                  {course.teacher.email}
                </div>
              </div>
            </div>
          </div>
          <div className="dark:bg-gray-900 ">
            <div className="mt-9 mr-9 dark:bg-main-dark-bg  ">
              <div className="  md:right-52 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
                <div className="flex justify-right items-right">hi</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Details;
