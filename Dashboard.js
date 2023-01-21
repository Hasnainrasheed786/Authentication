import React, { useContext, useEffect, useState } from "react";
//import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./ContextProvider/Context";
import CircularProgress from "@mui/material/CircularProgress";
import { ToastContainer, toast } from "react-toastify";

import Box from "@mui/material/Box";

const Dashboard = () => {
  const { logindata, setLoginData } = useContext(LoginContext);

  const [inpval, setInpval] = useState({
    gender: "",
    dob: "",
    country: "",
  });

  const [data, setData] = useState(false);

  const setVal = (e) => {
    // console.log(e.target.value);
    const { value } = e.target;

    setInpval(() => {
      return {
        ...inpval,
        value,
      };
    });
  };
  const addForm = async (e) => {
    e.preventDefault();

    const { gender, dob, country } = inpval;
    const data = await fetch("http://localhost:8080/form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gender,
        dob,
        country,
      }),
    });

    const res = await data.json();
    console.log(res.status);
  };
  //addForm();
  const history = useNavigate();

  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");

    const res = await fetch("/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await res.json();

    if (data.status === 401 || !data) {
      history("*");
    } else {
      console.log("user verify");
      setLoginData(data);
      history("/dash");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      DashboardValid();

      setData(true);
    }, 2000);
  }, []);

  return (
    <>
      {data ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src="./man.png"
            style={{ width: "200px", marginTop: 20 }}
            alt=""
          />
          <h2>User Name:{logindata ? logindata.ValidUserOne.fname : ""}</h2>
          <br></br>
          <h3>User Email:{logindata ? logindata.ValidUserOne.email : ""}</h3>
        </div>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          Loading... &nbsp;
          <CircularProgress />
        </Box>
      )}

      <div>
        <section>
          <div className="form_data">
            <form>
              <div className="form_input">
                <label htmlFor="gender" onChange={setVal} value={inpval.gender}>
                  Gender
                </label>
                <input type="text" />
              </div>
              <div className="form_input">
                <label htmlFor="dob" onChange={setVal} value={inpval.dob}>
                  DOB
                </label>
                <input type="text" />
              </div>

              <div className="form_input">
                <label
                  htmlFor="country"
                  onChange={setVal}
                  value={inpval.country}
                >
                  Country
                </label>
                <input type="text" />
              </div>
              <button className="btn" onClick={addForm}>
                Save
              </button>
            </form>
            <ToastContainer />
          </div>
        </section>
      </div>
    </>
  );
};

export default Dashboard;
