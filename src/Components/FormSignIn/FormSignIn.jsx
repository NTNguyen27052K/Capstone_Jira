import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { userSer } from "../../Services/userServices";
import { setLocal } from "../../Utils/localStore";
import { useDispatch } from "react-redux";
import { setDataName } from "../../Redux/slices/userSlice";

const FormSignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      passWord: "",
    },
    onSubmit: (values) => {
      //Check API
      console.log(values);
      userSer
        .sigIn(values)
        .then((result) => {
          console.log(result);
          setLocal("userLocal", result.data.content);
          dispatch(setDataName(result.data.content));
          setTimeout(() => {
            navigate("/project");
          }, [2000]);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .min(1, "Must be 1 characters or hight")
        .required("Empty"),
      passWord: Yup.string()
        .min(1, "Must be 1 characters or hight")
        .required("Empty"),
    }),
  });
  const { handleSubmit, handleChange, handleBlur, errors, touched } = formik;
  return (
    <div>
      <form onSubmit={handleSubmit} className="mt-5">
        <h2 className="text-center text-xl font-bold">Sign Up</h2>
        {/* Email */}
        <div className="mb-3 ">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Email
          </label>
          <Input
            type="text"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            status={touched.email && errors.email ? "error" : null}
            placeholder="Nhập email"
            className="py-2"
          />

          {touched.email && errors.email ? (
            <p className="text-red-500">{errors.email}</p>
          ) : null}
        </div>
        {/* Mật khẩu */}
        <div className="mb-3">
          <label className="block mb-2 text-sm font-medium text-gray-900 ">
            Mật khẩu
          </label>
          <Input
            type="password"
            name="passWord"
            onBlur={handleBlur}
            onChange={handleChange}
            status={touched.passWord && errors.passWord ? "error" : null}
            placeholder="Nhập mật khẩu"
            className="py-2"
          />

          {touched.passWord && errors.passWord ? (
            <p className="text-red-500">{errors.passWord}</p>
          ) : null}
        </div>

        <button
          // onClick={info}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-3"
        >
          SignUp
        </button>
        <p className="mb-3">
          Already have an account?
          <NavLink to={"/signup"} className="text-blue-500">
            Sign Up
          </NavLink>
        </p>
      </form>
    </div>
  );
};

export default FormSignIn;
