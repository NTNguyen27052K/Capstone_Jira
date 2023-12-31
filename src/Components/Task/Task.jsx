import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import { Progress, Tag, Modal, Select, Button, Space } from "antd";
import "./task.scss";
import { TweenOneGroup } from "rc-tween-one";
import { getProjectDetail, getTask } from "../../Redux/slices/projectSliece";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Editor } from "@tinymce/tinymce-react";
import { taskServ } from "../../Services/taskServices";
import ColumnGroup from "antd/es/table/ColumnGroup";

const Task = (props) => {
  const { task, projectDetail } = useSelector((state) => state.project);
  const { status } = useSelector((state) => state.status);
  const { priority } = useSelector((state) => state.priority);
  const { taskType } = useSelector((state) => state.task);

  const [taskUseState, setTaskUseState] = useState(task);
  // console.log(taskUseState);
  const dispatch = useDispatch();
  // console.log(task.assigness);
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
  //! timeTracking
  const { timeTrackingRemaining, timeTrackingSpent } = task;
  let timeTracking = Number(timeTrackingRemaining) + Number(timeTrackingSpent);
  let percentTimeTracking = Math.round(
    (timeTrackingSpent / timeTracking) * 100
  );
  //! description
  const editorRef = useRef(null);
  const [discContent, setDiscContent] = useState(task?.description);
  const [visibleEditer, setVisibleEditer] = useState(false);
  const [addDiscAction, setAddDiscAction] = useState(true);

  console.log(discContent);
  const handleChange = (event) => {
    const { name, value } = event?.target;

    console.log({ name, value });
    console.log({
      ...task,
      [name]: value,
      // priorityTask: name,
      description: discContent,
    });

    setTaskUseState({
      ...task,
      [name]: value,

      // priorityTask: name,
      description: discContent,
    });

    taskServ
      .updateTask({
        ...task,
        [name]: value,
        description: discContent,
      })
      .then((result) => {
        dispatch(getTask(task?.taskId));
        dispatch(getProjectDetail(task?.projectId));
        // console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //! Select ASSIGNEES
  // const [assignessed, setAssignessed] = useState([]);
  // console.log(assignessed);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    // selectedIt();
    // setDiscContent();
    const selectedIt = task?.assigness.map((item, index) => {
      // console.log(item.name);
      return item?.name;
    });

    setSelectedItems(selectedIt);
  }, [task?.assigness, task?.description]);

  const OPTIONS = projectDetail?.members.map((item, index) => {
    return item?.name;
  });
  // console.log(selectedItems);
  const filteredOptions = OPTIONS.filter((o) => !selectedItems?.includes(o));
  const preventDefault = (e) => {
    e.preventDefault();
    console.log("Clicked! But prevent default.");
  };
  // console.log(task.taskTypeDetail.id);
  return (
    <div className="task grid grid-cols-2 gap-4">
      <div className="task__left">
        <div className="task__title">
          <select
            className="focusVisibleOutline border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  block  p-2.5  dark:border-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500 my-3 "
            name="typeId"
            value={task.taskTypeDetail?.id}
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
        {task?.description === "" && addDiscAction === true ? (
          <div
            className="hover:bg-gray-200 rounded p-1 cursor-pointer"
            onClick={() => {
              console.log("visibleEditer");
              setVisibleEditer(true);
              setAddDiscAction(false);
            }}
          >
            Add Description...
          </div>
        ) : (
          <></>
        )}
        {/* <div>{ReactHtmlParser(task?.description)}</div> */}

        {/* <div>{ReactHtmlParser(task?.description)}</div> */}
        {visibleEditer ? (
          <div>
            <Editor
              className="h-10"
              name="description"
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue={discContent}
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
                  handleChange(event);
                  setVisibleEditer(false);
                  console.log(editorRef.current.getContent());
                  setDiscContent(editorRef.current?.getContent());
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
            // console.log(event.target);
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

        <div className="assignees">
          <Space size={[0, 8]} wrap>
            {task.assigness?.map((item, index) => {
              return (
                <Tag closeIcon onClose={preventDefault} key={index}>
                  {item?.name}
                </Tag>
              );
            })}

            <select
              className="focusVisibleOutline border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  block  p-2.5  dark:border-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500 my-3 "
              name="listUserAsign"
              value={task.assigness}
              onChange={(event) => {
                handleChange(event);
              }}
            >
              <option defaultValue>Add more</option>
              {filteredOptions.map((item, index) => {
                return (
                  <option key={index} value={item?.id}>
                    {item}
                  </option>
                );
              })}
            </select>
          </Space>
        </div>
        <h1 className="mt-3">PRIORITY</h1>
        <select
          className=" focusVisibleOutline border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  block  p-2.5  dark:border-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500 my-3 w-[100%]"
          name="priorityId"
          value={task.priorityTask?.priorityId}
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
