import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProject } from "../../Redux/slices/projectSliece";
import { projectServ } from "../../Services/projectServices";

import "./projectManagement.scss";
import { Avatar, Popover, Space, Table, Tag, AutoComplete } from "antd";
import { userSer } from "../../Services/userServices";
import { getListUser } from "../../Redux/slices/userSlice";
import { NavLink } from "react-router-dom";

const ProjectManagement = () => {
  const dispatch = useDispatch();

  const { listProject } = useSelector((state) => state.project);
  const { listUser } = useSelector((state) => state.users);
  // console.log(listUser);
  useEffect(() => {
    dispatch(getAllProject());
  }, []);

  const [options, setOptions] = useState("");
  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  const content = (id) => {
    return (
      <AutoComplete
        options={listUser.map((item, index) => {
          return { label: item.name, value: item.userId.toString() };
        })}
        style={{
          width: 200,
        }}
        value={options}
        onChange={(text) => {
          setOptions(text);
        }}
        onSelect={(value, option) => {
          setOptions(option.label);

          userSer
            .assignUserProject({
              projectId: id,
              userId: option.value,
            })
            .then((result) => {
              console.log(result);
              dispatch(getAllProject());
            })
            .catch((error) => {
              console.log(error);
            });
        }}
        onSearch={(text) => {
          dispatch(getListUser(text));
        }}
        placeholder="input here"
      />
    );
  };

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
      render: (text, record, index) => (
        <NavLink to={`board/${record.id}`}>
          <p key={index}>{text}</p>
        </NavLink>
      ),
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

      render: (text, record, index) => {
        return (
          <div className="flex justify-center">
            <Avatar.Group
              key={index}
              className="text-center"
              maxCount={2}
              maxStyle={{
                color: "#f56a00",
                backgroundColor: "#fde3cf",
              }}
            >
              {text.map((item, index) => {
                return (
                  <Popover
                    content={<button onClick={hide}>Close</button>}
                    title="Title"
                    trigger="click"
                    open={open}
                    onOpenChange={handleOpenChange}
                    key={index}
                  >
                    <Avatar type="primary" src={item.avatar} />
                  </Popover>
                );
              })}
            </Avatar.Group>
            <Popover
              placement="bottom"
              title={"Add members"}
              content={() => {
                return content(record.id);
              }}
              trigger="click"
            >
              <button>
                <Avatar
                  style={{ backgroundColor: "#D7D7D7" }}
                  className="opacity-100"
                  icon={<i className="fa-solid fa-plus "></i>}
                />
              </button>
            </Popover>
          </div>
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
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5   dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mr-1"
              onClick={() => {
                projectServ
                  .deleteProject(record.id)
                  .then((result) => {
                    console.log(result);
                    dispatch(getAllProject());
                  })
                  .catch((error) => {
                    console.log(error);
                    alert(error.response.data.content);
                  });
              }}
            >
              <i className="fa-solid fa-trash"></i>
            </button>
            <NavLink to={`edit/${record.id}`}>
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ml-1"
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
        pageSize: 6,
      }}
    />
  );
};

export default ProjectManagement;
