import React from "react";
import { useFormik } from "formik";
import { Input } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { userSer } from "../../Services/userServices";
import { setLocal } from "../../Utils/localStore";
import { useDispatch } from "react-redux";
import { setDataName } from "../../Redux/slices/userSlice";

const FormSignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      passWord: "",
      name: "",
      phoneNumber: "",
    },
    onSubmit: (values) => {
      console.log(values);
      userSer
        .signUp(values)
        .then((result) => {
          console.log(result);
          setLocal("user", result.data.content);
          dispatch(setDataName(result.data.content));
          setTimeout(() => {
            navigate("/project");
          }, [2000]);
        })
        .catch((errors) => {
          console.log(errors);
        });
    },
  });
  const { handleSubmit, handleChange, handleBlur, errors, touched } = formik;
  return (
    <form onSubmit={handleSubmit} className="mt-5">
      <h2 className="text-center text-xl font-bold mb-1">Register CyberBugs</h2>
      {/* Họ và tên */}
      <div className="mb-3">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Họ và tên
        </label>
        <Input
          type="text"
          name="name"
          onBlur={handleBlur}
          onChange={handleChange}
          status={touched.name && errors.name ? "error" : null}
          placeholder="Nhập họ và tên"
          className="py-2"
        />

        {touched.name && errors.name ? (
          <p className="text-red-500">{errors.name}</p>
        ) : null}
      </div>
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
      {/* Phone */}
      <div className="mb-3">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Số điện thoại
        </label>
        <Input
          type="text"
          name="phoneNumber"
          onBlur={handleBlur}
          onChange={handleChange}
          status={touched.phoneNumber && errors.phoneNumber ? "error" : null}
          placeholder="Nhập tài khoản"
          className="py-2"
        />

        {touched.phoneNumber && errors.phoneNumber ? (
          <p className="text-red-500">{errors.phoneNumber}</p>
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
        <NavLink to={"/"} className="text-blue-500">
          Login now
        </NavLink>
      </p>
    </form>
  );
};

export default FormSignUp;
