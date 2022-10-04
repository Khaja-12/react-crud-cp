import React from 'react'
import {useFormik} from 'formik'
import * as yup from 'yup'
import "./Form.css"
function Formik() {
  const formik = useFormik({
    initialValues:{
         name:"",
         email:'',
         password:''
    },
    validationSchema: yup.object({
      name : yup.string().max(15,'must be 15 characters or less').required("required"),
      email : yup.string().email("invalid email address").required("required"),
      password : yup.string().min(8,'must be 8 characters or more').required("required"),
    }),
    onSubmit: (values) => {
         console.log(values)
    }
  })

  // console.log(formik.touched)
  // console.log(formik.values)

  // yup is a validation library from formik to validate the form
  return (
    <>
    <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
      <div className='input-container'>
      <input type="text" name='name' value={formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder='Enter Your Name' />
      { formik.touched.name && formik.errors.name?<p>{formik.errors.name}</p>:null}
      </div><br/>
      <div className='input-container'>
      <input type="text" name='email' value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder='Enter Your Email' />
      { formik.touched.email && formik.errors.email?<p>{formik.errors.email}</p>:null}
      </div><br/>
      <div className='input-container'>
      <input type="text" name='password' value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder='Enter Your Password' />
      { formik.touched.password && formik.errors.password?<p>{formik.errors.password}</p>:null}
      <div className='btn'>
      <input type="submit" value="Submit"/>
      <input type="reset" value="Reset"/>
      </div>
      </div><br/>
    </form>
    </>
  )
}

export default Formik
