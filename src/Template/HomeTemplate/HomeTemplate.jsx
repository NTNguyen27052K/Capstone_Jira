import React, { useState } from "react";
import { Layout, Menu, Item, theme, Breadcrumb } from "antd";

import logoCyber from "./../../Assets/Imgage/iconCyber.png";
import { NavLink, Outlet } from "react-router-dom";
import "./homeTemplate.scss";

const { Header, Sider, Content } = Layout;

const HomeTemplate = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [breadcrumb, setBreadcrumb] = useState("Create Project");
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
            className="px-2 min-h-screen"
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
        >
          <Breadcrumb style={{ margin: "16px 0" }}>
            {/* <Breadcrumb.Item>Home</Breadcrumb.Item> */}
            {/* <Breadcrumb.Item>List</Breadcrumb.Item> */}
            {/* <Breadcrumb.Item>{breadcrumb}</Breadcrumb.Item> */}
          </Breadcrumb>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
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
