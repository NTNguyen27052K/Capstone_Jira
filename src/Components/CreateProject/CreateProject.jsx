import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectCategory } from "../../Redux/slices/projectCategorySlice";
import { useFormik } from "formik";
import { Input } from "antd";
import "./createProject.scss";

const CreateProject = () => {
  const dispatch = useDispatch();
  const { projectCategory } = useSelector((state) => state.projectCategory);
  console.log(projectCategory);
  useEffect(() => {
    dispatch(getProjectCategory());
  }, []);

  const formik = useFormik({
    initialValues: {
      projectName: "",
      description: "",
      categoryId: "",
      alias: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const { handleSubmit, handleChange, handleBlur, errors, touched } = formik;
  return (
    <form onSubmit={handleSubmit} className="">
      <h2 className="text-xl font-bold mb-3">Create project</h2>
      {/* Tài khoảng */}
      <div className="mb-3">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Project Name
        </label>
        <Input
          type="text"
          name="projectName"
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="Project name input"
          className="py-2"
        />
        <select
          className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  block  p-2.5  dark:border-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-3"
          name="categoryId"
          id="selectCategory"
          onChange={handleChange}
          // value={values.maLoaiNguoiDung}
        >
          <option value="DEFAULT">Select project name</option>
          {projectCategory.map((item, index) => {
            return (
              <option key={index} value={item.id}>
                {item.projectCategoryName}
              </option>
            );
          })}
        </select>
      </div>
    </form>
  );
};

export default CreateProject;
