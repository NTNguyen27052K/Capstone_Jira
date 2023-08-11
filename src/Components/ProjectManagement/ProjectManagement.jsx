import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProject,
  getProjectDetail,
} from "../../Redux/slices/projectSliece";
import { Space, Table, Tag } from "antd";
import ColumnGroup from "antd/es/table/ColumnGroup";
import { projectServ } from "../../Services/projectServices";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";

const ProjectManagement = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProject());
  }, []);

  const { listProject } = useSelector((state) => state.project);
  // console.log(listProject);
  const formik = useFormik({
    initialValues: {
      projectName: "",
      description: "",
      categoryId: "",
      alias: "",
    },
    onSubmit: (values) => {},
  });
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (text, index) => <p key={index}>{text}</p>,
      sorter: (a, b) => {
        return a.id - b.id;
      },
      sorterDirections: ["descend"],
    },
    {
      title: "Project name",
      dataIndex: "projectName",
      key: "projectName",
      render: (text, index) => <p key={index}>{text}</p>,
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Creator",
      dataIndex: "creator",
      key: "creator",
      // <Tag color="geekblue">geekblue</Tag>
      render: (text, index) => (
        <Tag color="green" key={index}>
          {text.name}
        </Tag>
      ),
    },
    {
      title: "Members",
      dataIndex: "members",
      key: "members",
      render: (text, index) => {
        return (
          <span key={index}>
            {text.map((item, index) => {
              return (
                <img
                  key={index}
                  className="w-10 h-10 rounded-full"
                  src={item.avatar}
                  alt=""
                />
              );
            })}
          </span>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record, index) => (
        <Space size="middle" key={index}>
          <div className="flex justify-between">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={() => {
                projectServ
                  .deleteProject(record.id)
                  .then((result) => {
                    console.log(result);
                    dispatch(getAllProject());
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }}
            >
              <i className="fa-solid fa-trash"></i>
            </button>
            <NavLink to={`edit/${record.id}`}>
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                // onClick={showModal}
                onClick={() => {}}
              >
                <i className="fa-solid fa-pen"></i>
              </button>
            </NavLink>
            {/* Form */}
          </div>
        </Space>
      ),
    },
  ];
  const userList = listProject?.map((item, index) => {
    return {
      ...item,
      key: index,
    };
  });
  return (
    <Table
      columns={columns}
      dataSource={userList}
      pagination={{
        pageSize: 5,
      }}
    />
  );
};

export default ProjectManagement;
