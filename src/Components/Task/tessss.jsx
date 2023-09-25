import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import { Progress, Tag, Modal, Select, Button } from "antd";
import "./task.scss";
import { TweenOneGroup } from "rc-tween-one";
import { getProjectDetail, getTask } from "../../Redux/slices/projectSliece";

import { Editor } from "@tinymce/tinymce-react";
import { taskServ } from "../../Services/taskServices";

const Task = (props) => {
  const { task, projectDetail } = useSelector((state) => state.project);
  // console.log(task);

  const [taskUseState, setTaskUseState] = useState(task);

  const dispatch = useDispatch();

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
    setTaskUseState({ ...task, [name]: value, priorityTask: name });

    taskServ
      .updateTask({ ...task, [name]: value })
      .then((result) => {
        dispatch(getTask(task.taskId));
        dispatch(getProjectDetail(task.projectId));
        // console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const editorRef = useRef(null);

  const [visibleEditer, setVisibleEditer] = useState(props.visEditer);

  // console.log("props", props.visEditer);
  // console.log("visibleEditer", visibleEditer);
  // const forMap = (tag) => {
  //   const tagElem = (
  //     <Tag
  //       closable
  //       // onClose={(e) => {
  //       //   e.preventDefault();
  //       //   handleClose(tag);
  //       // }}
  //     >
  //       {tag}
  //     </Tag>
  //   );
  //   return (
  //     <span
  //       key={tag}
  //       style={{
  //         display: "inline-block",
  //       }}
  //     >
  //       {tagElem}
  //     </span>
  //   );
  // };
  // const tagChild = taskUseState?.assigness.map(forMap);

  // const OPTIONS = taskUseState?.assigness;
  //! Select ASSIGNEES
  const OPTIONS = projectDetail?.members.map((item, index) => {
    return item.name;
  });

  const selectedIt = task?.assigness.map((item, index) => {
    return item.name;
  });
  useEffect(() => {
    // selectedIt();

    setSelectedItems(selectedIt);
  }, [task?.assigness]);

  const [selectedItems, setSelectedItems] = useState([]);

  // const filteredOptions = OPTIONS.filter((o) => !selectedItems?.includes(o));
  const filteredOptions = OPTIONS.filter((o) => {
    console.log(o);
    return !selectedItems?.includes(o);
  });

  return (
    <div className="task grid grid-cols-2 gap-4">
      <div className="task__left">
        <div className="task__title">
          <select
            className="focusVisibleOutline border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  block  p-2.5  dark:border-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500 my-3 "
            name="taskType"
            value={taskUseState.taskTypeDetail?.id}
            onChange={(event) => {
              handleChange(event);
            }}
          >
            {taskType.map((item, index) => {
              return (
                <option key={index} value={item?.id}>
                  {item?.taskType}
                </option>
              );
            })}
          </select>
        </div>
        <div>{task?.alias}</div>

        <h1 className="font-bold text-lg mb-3">Description</h1>
        {visibleEditer ? (
          <div>
            <Editor
              className="h-10"
              name="description"
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue={task?.description}
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
            <div className="mt-3">
              <Button
                type="primary"
                className="mr-3"
                onClick={(event) => {
                  // console.log(editorRef.current.getContent());
                  handleChange(event);
                }}
              >
                Save
              </Button>
              <Button onClick={() => setVisibleEditer(false)}>Cancel</Button>
            </div>
          </div>
        ) : (
          <div onClick={() => setVisibleEditer(true)}>
            {ReactHtmlParser(task?.description)}
          </div>
        )}
      </div>
      <div className="task__right ">
        <h1>Status</h1>
        <select
          className="focusVisibleOutline border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  block  p-2.5  dark:border-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500 my-3 w-[100%]"
          name="statusId"
          value={taskUseState?.statusId}
          onChange={(event) => {
            // console.log(event.target.name);
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
          <Select
            name="selectedItems"
            mode="multiple"
            value={selectedItems}
            defaultValue={["gold", "cyan"]}
            onChange={(event) => {
              // handleChange(event);
              // handleChange(value);
              console.log(event.target.name);
              // console.log(value);
              setSelectedItems(event);
            }}
            style={{
              width: "100%",
            }}
            options={filteredOptions.map((item) => ({
              value: item,
              label: item,
            }))}
          />
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
              {/* taskUseState?.timeTrackingRemaining? taskUseState?.timeTrackingRemaining : taskUseState?.originalEstimate */}
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
        onCancel={() => {
          // setVisibleEditer(false);
          handleCancel();
        }}
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
              value={taskUseState?.timeTrackingRemaining}
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
