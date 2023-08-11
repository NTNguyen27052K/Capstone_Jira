import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectCategory } from "../../Redux/slices/projectCategorySlice";
import { useFormik } from "formik";
import { Input } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { projectServ } from "../../Services/projectServices";
import { useParams } from "react-router-dom";
import { getProjectDetail } from "../../Redux/slices/projectSliece";

const UpdateProject = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const projectDetail = useSelector((state) => state.project.projectDetail);
  const [producState, setpPoducState] = useState([]);

  useEffect(() => {
    // console.log("test1");
    dispatch(getProjectDetail(params.id));
    formik.setValues({
      ...projectDetail,
      categoryId: projectDetail?.projectCategory.id,
    });
    // console.log(params.id);
    // projectServ
    //   .getProjectDetail(params.id)
    //   .then((result) => {
    //     console.log(result);
    //     // formik.setValues({
    //     //   ...projectDetail,
    //     //   categoryId: projectDetail?.projectCategory.id,
    //     // });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, []);

  const formik = useFormik({
    initialValues: {
      projectName: "",
      description: "",
      categoryId: "",
      alias: "",
    },
    onSubmit: (values) => {},
  });
  const editorRef = useRef(null);

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    touched,
    values,
    setValues,
  } = formik;
  return (
    <form onSubmit={handleSubmit} className="">
      <h2 className="text-xl font-bold mb-3">Edit project</h2>

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
          value={values.projectName}
        />
        <div className="my-3">
          <Editor
            name="description"
            value={values.description}
            className="h-10"
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue={values.description}
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
          value={values.categoryId}
        >
          <option value="DEFAULT">Select project name</option>
          <option value="1">Dự án web</option>
          <option value="2">Dự án phần mềm</option>
          <option value="3">Dự án di động</option>
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

export default UpdateProject;
