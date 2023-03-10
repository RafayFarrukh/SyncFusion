import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AuthCheck = (props) => {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!localStorage.getItem("Token")) {
      
      navigate("/login");
      toast.warning("You need to Login First", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      })
    }
  },[]);
  
  return <>
  {props.children}

  </>;
};

export default AuthCheck;