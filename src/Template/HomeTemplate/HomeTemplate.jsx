import React, { useState } from "react";
import { Layout, Menu, Item, theme, Breadcrumb } from "antd";

import logoCyber from "./../../Assets/Imgage/iconCyber.png";
import { NavLink, Outlet } from "react-router-dom";
import "./homeTemplate.scss";
import { useSelector } from "react-redux";

const { Header, Sider, Content } = Layout;

const HomeTemplate = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [breadcrumb, setBreadcrumb] = useState("Create Project");
  const { name } = useSelector((state) => state.users);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className="min-h-screen">
      <div className="relative min-h-screen pl-[80px]">
        <Sider
          trigger={null}
          collapsible
          collapsed={false}
          className="px-2 min-h-screen"
          id="siderMain"
          theme="light"
        >
          {/* mb-[24px] */}
          <div className="demo-logo-vertical" />
          <div className="h-[64px] flex justify-center items-center  flex-col mt-2 mb-3">
            <h1 className=" text-lg font-bold object-center">NTN</h1>
            <h1 className="">Report bugs</h1>
          </div>
          <Menu
            id="siderMain"
            theme="light"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <i className="fa-solid fa-clapperboard"></i>,
                label: <NavLink to={"test"}>Cyber Board</NavLink>,
                onClick: () => {
                  setBreadcrumb("Test");
                },
              },
              {
                key: "2",
                icon: <i className="fa-solid fa-gear"></i>,
                label: <NavLink to={"createProject"}>Create project</NavLink>,
                onClick: () => {
                  setBreadcrumb("Create Project");
                },
              },
              {
                key: "3",
                icon: <i className="fa-solid fa-table-list"></i>,
                label: (
                  <NavLink to={"projectManagement"}>Project management</NavLink>
                ),
                onClick: () => {
                  setBreadcrumb("Project management");
                },
              },
              {
                key: "4",
                icon: <i className="fa-solid fa-plus"></i>,
                label: "Create project",
              },
              {
                key: "5",
                icon: <i className="fa-solid fa-magnifying-glass"></i>,
                label: "Releases",
              },
              {
                key: "6",
                icon: <i className="fa-solid fa-magnifying-glass"></i>,
                label: "Issues and filters",
              },
              {
                key: "7",
                icon: <i className="fa-solid fa-magnifying-glass"></i>,
                label: "Pages",
              },
              {
                key: "8",
                icon: <i className="fa-solid fa-magnifying-glass"></i>,
                label: "Reports",
              },
              {
                key: "9",
                icon: <i className="fa-solid fa-magnifying-glass"></i>,
                label: "Components",
              },
            ]}
          />
        </Sider>
        <div className="absolute top-0 left-0">
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            onMouseOver={() => {
              setCollapsed(false);
            }}
            onMouseOut={() => {
              setCollapsed(true);
            }}
            className="px-2 min-h-screen hover:transition-all hover:duration-300"
          >
            <div className="demo-logo-vertical" />
            <div className="h-[64px] flex justify-center items-center mb-[24px]">
              <img
                src={logoCyber}
                className=" w-12 h-12 object-center"
                alt=""
              />
            </div>
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["1"]}
              items={[
                {
                  key: "1",
                  icon: <i className="fa-solid fa-plus"></i>,
                  label: "Create task",
                },
                {
                  key: "2",
                  icon: <i className="fa-solid fa-magnifying-glass"></i>,
                  label: "Search",
                },
              ]}
            />
          </Sider>
        </div>
      </div>
      <Layout>
        <Header
          style={{
            padding: 0,
            paddingLeft: 20,
            background: colorBgContainer,
          }}
          className="flex items-center  justify-between"
        >
          <Breadcrumb
            style={{ margin: "18px 0" }}
            items={[
              {
                title: "Home",
              },
              {
                title: breadcrumb,
              },
            ]}
          />
          <div className="infoUser flex items-center mr-[16px]">
            <i className="fa-solid fa-gear"></i>
            <img
              className="ml-2 rounded-full w-8 h-8"
              src={name.avatar}
              alt=""
            />
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            paddingTop: 24,
            paddingLeft: 24,
            paddingRight: 24,
            paddingButton: 0,

            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomeTemplate;
