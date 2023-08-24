import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import { Progress, Tag } from "antd";
import "./task.scss";
import { statusSer } from "../../Services/statusServices";
import { getProjectDetail, getTask } from "../../Redux/slices/projectSliece";

const Task = () => {
  const { task } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.status);
  const { priority } = useSelector((state) => state.priority);

  useEffect(() => {
    // console.log(status);
    // console.log(task);
  }, [task?.taskId]);
  const { timeTrackingRemaining, timeTrackingSpent } = task;
  let timeTracking = Number(timeTrackingRemaining) + Number(timeTrackingSpent);
  let percentTimeTracking = Math.round(
    (timeTrackingSpent / timeTracking) * 100
  );
  return (
    <div className="task grid grid-cols-2 gap-2 ">
      <div className="task__left">
        <div className="task__title">
          <i
            className={
              task.taskTypeDetail?.taskType === "bug"
                ? "fa-solid fa-bug mr-2 text-red-600"
                : "fa-solid fa-bookmark mr-2"
            }
          ></i>
          <span>{task.taskTypeDetail?.taskType}</span>
        </div>
        <h1 className="font-bold text-lg">Description</h1>
        <div>{ReactHtmlParser(task?.description)}</div>
      </div>
      <div className="task__right ">
        <h1>Status</h1>
        <select
          className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  block  p-2.5  dark:border-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500 my-3 w-[100%]"
          value={task?.statusId}
          onChange={(event) => {
            console.log({
              taskId: task?.taskId,
              statusId: event.target.value,
            });
            statusSer
              .updateStatus({
                taskId: task?.taskId,
                statusId: event.target.value,
              })
              .then((result) => {
                dispatch(getProjectDetail(task?.projectId));
                console.log(result);
              })
              .catch((error) => {
                console.log(error);
              });
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
        <h1>ASSIGNEES</h1>

        <div className="assignees grid grid-cols-3 gap-2">
          {task?.assigness.map((item, index) => {
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
            <p className="hover:underline hover:underline-offset-4 transition duration-700 ease-in-out">
              Add more
            </p>
          </span>
        </div>
        <h1>PRIORITY</h1>
        <select
          className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  block  p-2.5  dark:border-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500 my-3 w-[100%]"
          value={task.priorityTask?.priorityId}
          onChange={(e) => {}}
        >
          {priority.map((item, index) => {
            return (
              <option key={index} value={item?.priorityId}>
                {item?.priority}
              </option>
            );
          })}
        </select>
        <h1>ORIGINAL ESTIMATE (HOURS)</h1>
        <input
          type="text"
          value={task?.originalEstimate}
          onChange={(e) => {}}
        />
        <h1 className="mb-3">TIME TRACKING</h1>
        <div className="timeTracking flex gap-3">
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

        {/* <div className="timeTracking flex justify-between items-center">
          <i className="fa-solid fa-stopwatch fa-xl flex justify-center items-center m-0 w-1/12"></i>
          <div className="w-11/12 ">
            <Progress
              className="w-full m-0 "
              format={(percent) => ``}
              percent={percentTimeTracking}
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="w-1/12"></div>
          <div className="w-11/12 flex  justify-between">
            <span>{timeTrackingSpent}h logged</span>
            <span>{timeTrackingRemaining}h remaining</span>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Task;
