import React, { useEffect, useState } from "react";
import "./dtailBoard.scss";
import { projectServ } from "../../Services/projectServices";
import { useParams } from "react-router-dom";

import { Avatar, Tag, Popover, Tooltip, Modal } from "antd";
import Task from "../Task/Task";
import { useDispatch } from "react-redux";
import { getTask } from "../../Redux/slices/projectSliece";
import ColumnGroup from "antd/es/table/ColumnGroup";
import { getAllStatus } from "../../Redux/slices/statusSliece";
import { getAllPriority } from "../../Redux/slices/prioritySliece";

const DetailBoard = () => {
  const [projetMembers, setProjetMember] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllStatus());
    dispatch(getAllPriority(0));
    projectServ
      .getProjectDetail(id)
      .then((result) => {
        // console.log(result);
        setProjetMember(result.data.content);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      {/* {console.log(projetMembers)} */}
      <h1 className="text-2xl font-bold mb-[34px]">Detail Board</h1>
      <div className="flex">
        <form className="mr-5">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              id="default-search"
              className="block  p-3 pl-10 text-sm rounded-lg border text-gray-900 border-gray-600 focus:border-blue-500"
              placeholder="Search"
            />
          </div>
        </form>
        <Avatar.Group
          maxCount={2}
          size="large"
          maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
        >
          {projetMembers.members?.map((item, index) => {
            return (
              <Tooltip placement="top" key={index} title={item.name}>
                <Avatar
                  className="hover:-translate-y-1 overflow-hidden"
                  style={{ translate: "all 0.5s" }}
                  src={item.avatar}
                />
              </Tooltip>
            );
          })}
        </Avatar.Group>
      </div>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={900}
      >
        <Task />
      </Modal>
      <div className="dragDrop grid grid-cols-4 gap-4 mt-10">
        {projetMembers.lstTask?.map((item, index) => {
          {
            /* console.log(item); */
          }
          return (
            <div key={index} className="card bg-gray-200 h-auto rounded-md">
              <Tag
                color={
                  item.statusName === "BACKLOG"
                    ? ""
                    : item.statusName === "SELECTED FOR DEVELOPMENT"
                    ? "magenta"
                    : item.statusName === "DONE"
                    ? "green"
                    : "orange"
                }
                className="card__header ml-5 mt-5"
              >
                {item.statusName}
              </Tag>
              {/* <div className="card__header ml-5 mt-5">{item.statusName}</div> */}
              <ul className="card__listTask">
                {item.lstTaskDeTail?.map((item, index) => {
                  return (
                    <li
                      key={index}
                      className="task hover:bg-[#ebecf0] m-5 transition-all duration-700  bg-white rounded-md p-3 shadow-md"
                      onClick={() => {
                        // showModal();
                        dispatch(getTask(item.taskId))
                          .then((result) => {
                            showModal();
                          })
                          .catch((error) => {
                            console.log(error);
                          });
                      }}
                    >
                      {/* {console.log(item)} */}
                      <p className="comment">{item.taskName}</p>
                      <div className="flex justify-between items-center">
                        <div className="priority">
                          <p className="priorityTask">
                            {item.taskTypeDetail?.taskType}{" "}
                            {item.priorityTask?.priority}
                          </p>
                        </div>
                        <div className="assigness">
                          <Avatar.Group
                            key={index}
                            className="text-center"
                            maxCount={2}
                            maxStyle={{
                              color: "#f56a00",
                              backgroundColor: "#fde3cf",
                            }}
                          >
                            {item.assigness.map((item, index) => {
                              return (
                                <Avatar
                                  key={index}
                                  type="primary"
                                  src={item.avatar}
                                />
                              );
                            })}
                          </Avatar.Group>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DetailBoard;
