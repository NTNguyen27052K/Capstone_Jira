import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectCategory } from "../../Redux/slices/projectCategorySlice";
import { useFormik } from "formik";
import { Input } from "antd";
import "./createProject.scss";
import { Editor } from "@tinymce/tinymce-react";
import { projectServ } from "../../Services/projectServices";

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
      projectServ
        .createProject({
          ...values,
          description: editorRef.current.getContent(),
          alias: values.projectName,
        })
        .then((result) => {
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });
  const editorRef = useRef(null);

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
        <div className="my-3">
          <Editor
            className="h-10"
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue=""
            init={{
              height: 300,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | " +
                "bold italic backcolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        </div>
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
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-3"
        >
          Create project
        </button>
      </div>
    </form>
  );
};

export default CreateProject;
