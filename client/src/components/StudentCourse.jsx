import React, { useState, useEffect } from "react";
import axiosInstance from "../services/axiosInstance";
import { useNavigate, useLocation } from "react-router-dom";
const token = localStorage.getItem("Token");

const StudentCourse = () => {
  const navigate = useNavigate();
  const [courses, setCourse] = useState();

  useEffect(() => {
    axiosInstance
      .get(`http://localhost:5000/api/course/student/showCourseList`, {
        headers: { "x-auth-token": token },
      })
      .then((res) => {
        console.log(res.data.courseList);
        setCourse(res.data.courseList);
      });
  }, []);
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
        <tbody>
          {/* {courses !== null ? (
            courses.map?.((course, key) => (
              <tr key={course._id}>
                <td className="py-4 px-6">{course.courseCode}</td>
                <td className="py-4 px-6">{course.courseName}</td>
                <td className="py-4 px-6">{course.courseShortName}</td>
                <td className="py-4 px-6">{course._id}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No courses</td>
            </tr>
          )} */}
        </tbody>
      </table>
    </>
  );
};

export default StudentCourse;
