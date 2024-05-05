import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../features/auth/authSlice";

const validationSchema = yup.object({
  username: yup.string().required("Username is required"),
  email: yup.string().required("Email is required"),
  password: yup.string().required("Password is required"),
});
const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(register(values));
    },
  });
  const signUser = useSelector((state) => state.auth);
  const { user,isError, isSuccess,isLoading,message } = signUser;
  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [user, isError, isLoading, isSuccess, navigate]);
  return (
    <div className="container">
      <form className="form-container" onSubmit={formik.handleSubmit}>
        <h1>SignUp</h1>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.username && formik.errors.username ? (
          <div className="error">{formik.errors.username}</div>
        ) : null}
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="error">{formik.errors.email}</div>
        ) : null}
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="error">{formik.errors.password}</div>
        ) : null}
        <button type="submit" className="button">SignUp</button>
        {isLoading && <div>Loading...</div>}
      </form>
    </div>
  );
};

export default Signup;
