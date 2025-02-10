import React from 'react'
import{useFormik } from 'formik';
import "./register.css"
import { signUpSchema } from '../schemas/indax';
import {useNavigate } from 'react-router-dom';
import axios from 'axios'





// ....................thi pag is formik for regiser pag
const initialValues={
    name:"",
    email:"",
    password:"",
    confirm_Password:""
     
}


const Register = () => {
const navigate = useNavigate();
 const {values,errors,touched,handleBlur,handleChange,handleSubmit,resetForm } = useFormik({
      initialValues: initialValues,
      validationSchema:signUpSchema,
     
        
       
   onSubmit: async (values)=>{
    try {
     const rseposh =  await axios.post('http://localhost:3005/users',values)

     console.log(rseposh);
     
     
     if(rseposh.status===200 || rseposh.status===201 ){
      console.log(rseposh.data);
      localStorage.setItem("user-loininfo",JSON.stringify(rseposh.data))
      alert("sucsefull add deta")  
      resetForm();
       navigate('/Loginpag');
     }          
    } catch (error) {
      console.error('Registration Error:', error);
      alert("tray 2minet letar")
    }
   },
 
  
    })
   
    
  
  return (
    <div className="form-container">
      <h1>Create an Account</h1>
      <form  onSubmit={handleSubmit}>
        {/* Full Name */}
        <div>
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          { errors.name && touched.name ? <p>{errors.name}</p> :null }
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && touched.email ? <p>{errors.email}</p> : null}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password && touched.password ? <p>{errors.password}</p> : null}
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirm_Password">Confirm Password:</label>
          <input
            type="password"
            name="confirm_Password"
            value={values.confirm_Password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.confirm_Password && touched.confirm_Password ? <p>{errors.confirm_Password}</p> : null}
        </div>

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>
    </div>

  )
}

export default Register