// import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from '../../slicecomponet/Slice';


export const Loginpag = () => {

  const [name,setname]=useState("")
  const [password,setpassword]=useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { user, status, error } = useSelector((state) => state.users);
 


  const submitEvent = async (e) => {
    e.preventDefault();
    dispatch(loginUser({ name, password }))
      .unwrap()
      .then(() => {
        alert("Login Successful");
        navigate("/Home");
      })
      .catch(() => {
        alert("Invalid username or password");
      });
  };



 



  return (
    <div>
          
         <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={submitEvent}   >
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
                onChange={e=>setname(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={e=>setpassword(e.target.value)}
             
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={status === "loading"}>
              {status === "loading" ? "Logging in..." : "Login"}
            </button>
        </form>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        <div className="text-center mt-3">
          <small>
            Don't have an account? <a  onClick={()=>{navigate("/Register")}} >Register</a>
          </small>
        </div>
      </div>
    </div>
    </div>
  )
}
export default Loginpag;
