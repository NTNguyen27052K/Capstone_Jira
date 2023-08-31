import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import { Progress, Tag, Modal, Dropdown, Button } from "antd";
import "./task.scss";

import { getProjectDetail, getTask } from "../../Redux/slices/projectSliece";

import { Editor } from "@tinymce/tinymce-react";
import { taskServ } from "../../Services/taskServices";
import ColumnGroup from "antd/es/table/ColumnGroup";

const Task = () => {
  const { task } = useSelector((state) => state.project);
// console.log(task);
  const [taskUseState, setTaskUseState] = useState(task);

  const dispatch = useDispatch();
  
// useEffect(() => {
//   setTaskUseState(task);
// }, [])

  const { status } = useSelector((state) => state.status);
  const { priority } = useSelector((state) => state.priority);
  const { taskType } = useSelector((state) => state.task);

  // console.log(taskType);
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

  const { timeTrackingRemaining, timeTrackingSpent } = task;
  let timeTracking = Number(timeTrackingRemaining) + Number(timeTrackingSpent);
  let percentTimeTracking = Math.round(
    (timeTrackingSpent / timeTracking) * 100
  );

  const handleChange = (event) => {
    const { name, value } = event.target; 
    console.log({ name, value });
    // console.log({ ...task, [name]: value, listUserAsign: [] , priorityTask : name });
  

    setTaskUseState({ ...task, [name]: value, listUserAsign: [], priorityTask : name });

    taskServ
      .updateTask({ ...task, [name]: value, listUserAsign: [] })
      .then((result) => {
        dispatch(getTask(task.taskId));
        dispatch(getProjectDetail(task.projectId));
        // console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item
        </a>
      ),
    },
  ];

  // const taskTypeList = taskType?.map((item, index) => {
  //   console.log(item);
  //   return {
  //     ...item,
  //     key: item.id,
  //     label: item.taskType,
  //   };
  // });
  // console.log(taskType);
  // const initialState = {
  //   key: "1",
  //   label: (
  //     <a
  //       target="_blank"
  //       rel="noopener noreferrer"
  //       href="https://www.antgroup.com"
  //     >
  //       1st menu item
  //     </a>
  //   ),
  // };
  const taskTypeList = taskType?.map((item, index) => {
    // console.log({
    //   key: `${item.id}`,
    //   label: item.taskType,
    // });
   
    // console.log({
    //   key: `${item.id}`,
    //   label:item.taskType,
    // });
    const a = [];
    return a.push({
      key: `${item.id}`,
      label: <p>{item.taskType}</p>,
    });
  });
  return (
    
    <div className="task grid grid-cols-2 gap-2 ">
{/* {console.log(taskUseState)} */}
      <div className="task__left">
        <div className="task__title">
          {/* <i
            className={
              task.taskTypeDetail?.taskType === "bug"
                ? "fa-solid fa-bug mr-2 text-red-600"
                : "fa-solid fa-bookmark mr-2"
            }
          ></i>
          <span>{task.taskTypeDetail?.taskType}</span> */}
          <Dropdown
            menu={{ items }}
            placement="bottomLeft"
            trigger={["click"]}
            onChange={taskTypeList}
          >
            <Button>bottomLeft</Button>
          </Dropdown>

          {/* <select
            className="focusVisibleOutline border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  block  p-2.5  dark:border-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500 my-3 "
            name="taskType"
            value={task.taskTypeDetail?.id}
            onChange={(event) => {
              // handleChange(event);
            }}
          >
            {taskType.map((item, index) => {
              return (
                <option key={index} value={item?.id}>
                  {item?.taskType}
                </option>
              );
            })}
          </select> */}
        </div>
        <div>{task?.alias}</div>
        <h1 className="font-bold text-lg">Description</h1>
        <div>{ReactHtmlParser(task?.description)}</div>
        <Editor
          className="h-10"
          // onInit={(evt, editor) => (editorRef.current = editor)}
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
      <div className="task__right ">
        <h1>Status</h1>
        <select
          className="focusVisibleOutline border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  block  p-2.5  dark:border-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500 my-3 w-[100%]"
          name="statusId"
          value={taskUseState?.statusId}
          onChange={(event) => {
            handleChange(event);
          }}
        >
          {status.map((item, index) => {
            return (
              <option key={index} value={item?.statusId}>
                {item?.statusName}
              </option>
            );
          })}
        </select>
        <h1 className="mb-3">ASSIGNEES</h1>

        <div className="assignees grid grid-cols-3 gap-2">
          {taskUseState?.assigness.map((item, index) => {
            return (
              <Tag
                className="assignees__item flex justify-start items-center p-1 w-auto"
                key={index}
                onClose={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="assignees__avata w-auto">
                  <img
                    src={item?.avatar}
                    className="rounded-full w-6 h-6 mr-2"
                    alt=""
                  />
                </div>

                <div className="assignees__name mr-2 text-[12px] truncate ...">
                  {item?.name}
                </div>
                <i className="fa-solid fa-x"></i>
              </Tag>
            );
          })}
          <span className="addAssigness flex justify-start items-center text-blue-500">
            <i className="fa-solid fa-plus mr-2"></i>
            <p className="hover:underline hover:underline-offset-4 transition duration-700 ease-in-out ">
              Add more
            </p>
          </span>
        </div>
        <h1 className="mt-3">PRIORITY</h1>
        <select
          className=" focusVisibleOutline border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  block  p-2.5  dark:border-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500 my-3 w-[100%]"
          name="priorityId"
          value={taskUseState.priorityTask?.priorityId}
          onChange={(event) => {
            handleChange(event);
          }}
        >
          {priority.map((item, index) => {
            return (
              <option key={index} value={item?.priorityId}>
                {item?.priority}
              </option>
            );
          })}
        </select>
        <h1 className="my-3">ORIGINAL ESTIMATE (HOURS)</h1>
        <input
          type="text"
          name="originalEstimate"
          value={taskUseState?.originalEstimate}
          // onChange={(event) => {
          //   handleChange(event);
          // }}
          onChange={handleChange}
          className="focusVisibleOutline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 mb-3"
        />

        <h1 className="mb-3">TIME TRACKING</h1>
        <div
          className="timeTracking flex gap-3 hover:bg-[#ebecf0]"
          onClick={showModal}
        >
          <div className="w-1/12 flex justify-center items-center ">
            <i className="fa-solid fa-stopwatch fa-2xl "></i>
          </div>
          <div className="w-11/12">
            <Progress
              className="w-full m-0 "
              format={(percent) => ``}
              percent={percentTimeTracking}
            />
            <div className=" flex justify-between">
              <span>{timeTrackingSpent}h logged</span>
              <span>{timeTrackingRemaining}h remaining</span>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        // okText: "Done",
        okText="Done"
        onCancel={handleCancel}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <div
          className="timeTracking flex gap-3 hover:bg-[#ebecf0]"
          onClick={showModal}
        >
          <div className="w-1/12 flex justify-center items-center ">
            <i className="fa-solid fa-stopwatch fa-2xl "></i>
          </div>
          <div className="w-11/12">
            <Progress
              className="w-full m-0 "
              format={(percent) => ``}
              percent={percentTimeTracking}
            />
            <div className=" flex justify-between">
              <span>{timeTrackingSpent}h logged</span>
              <span>{timeTrackingRemaining}h remaining</span>
            </div>
          </div>
        </div>
        <div className="editorTimeTracking grid grid-cols-2 gap-2 mt-5">
          <div className="editorTimeTracking__left">
            <p className="mb-2">Time spent (hours)</p>
            <input
              type="text"
              className="focusVisibleOutline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
              placeholder="Number"
              value={taskUseState?.timeTrackingSpent}
              name="timeTrackingSpent"
              onChange={handleChange}
            />
          </div>
          <div className="editorTimeTracking__right">
            <p className="mb-2">Time remaining (hours)</p>
            <input
              type="text"
              className="focusVisibleOutline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
              placeholder="Number"
              value={taskUseState?.timeTrackingRemaining? taskUseState?.timeTrackingRemaining : taskUseState?.originalEstimate}
              name="timeTrackingRemaining"
              onChange={handleChange}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Task;
