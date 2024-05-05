import "../index.css";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import Spinner from 'react-bootstrap/Spinner';

const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });
  const loginUser = useSelector((state) => state.auth);
  const { user,isError, isSuccess,isLoading } = loginUser;
  useEffect(() => {
    if (isSuccess) {
      navigate("/todo");
    }
  }, [user, isError, isLoading, isSuccess, navigate]);
  return (
    <div className="container">
      <form className="form-container" onSubmit={formik.handleSubmit}>
        <h1>Login</h1>
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
        {isLoading ? <button type="submit" className="button"><Spinner animation="border" variant="warning" /></button> :  <button type="submit" className="button">Login</button>}
        <Link to={'/signup'} className="button link">SignUp</Link>
      </form>
    </div>
  );
};

export default Login;
