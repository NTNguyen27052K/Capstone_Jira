import { AntDesignOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import { Avatar, Tooltip } from "antd";

const Test = () => {
  return (
    <>
      <Avatar.Group
        maxCount={2}
        maxStyle={{
          color: "#f56a00",
          backgroundColor: "#fde3cf",
        }}
      >
        <Tooltip placement="top" title={"ntn"}>
          <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2" />
        </Tooltip>

        <Avatar
          style={{
            backgroundColor: "#f56a00",
          }}
        >
          K
        </Avatar>
        <Tooltip title="Ant User" placement="top">
          <Avatar
            style={{
              backgroundColor: "#87d068",
            }}
            icon={<UserOutlined />}
          />
        </Tooltip>
        <Avatar
          style={{
            backgroundColor: "#1677ff",
          }}
          icon={<AntDesignOutlined />}
        />
      </Avatar.Group>
    </>
  );
};

export default Test;
