import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProject } from "../../Redux/slices/projectSliece";
import { Input, Progress, Modal, Select, message, Space, Button } from "antd";
import { getAllStatus } from "../../Redux/slices/statusSliece";
import { getAllPriority } from "../../Redux/slices/prioritySliece";
import { getTaskType } from "../../Redux/slices/taskSlice";
import { getListUserAssigners } from "../../Redux/slices/userSlice";
import { Editor } from "@tinymce/tinymce-react";
import { useFormik } from "formik";
import ColumnGroup from "antd/es/table/ColumnGroup";
import { taskServ } from "../../Services/taskServices";
const CreateTask = () => {
  const dispatch = useDispatch();

  const { listProject } = useSelector((state) => state.project);
  const { status } = useSelector((state) => state.status);
  const { priority } = useSelector((state) => state.priority);
  const { taskType } = useSelector((state) => state.task);
  const { listUserAssigners } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAllProject());
    dispatch(getAllStatus());
    dispatch(getAllPriority(0));
    dispatch(getTaskType());
    // dispatch(getListUserAssigners(13361));
  }, []);
  const [messageApi, contextHolder] = message.useMessage();
  const success = (content, type) => {
    messageApi.open({
      type,
      content: content,
    });
  };
  const [listAssigners, setListAssigners] = useState([]);
  const editorRef = useRef(null);
  const formik = useFormik({
    initialValues: {
      listUserAsign: [],
      taskName: "",
      description: "",
      statusId: "",
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      projectId: 0,
      typeId: 0,
      priorityId: 0,
    },
    onSubmit: (values) => {
      console.log({
        ...values,
        // listUserAsign: listAssigners,
        description: editorRef.current.getContent(),
      });
      taskServ
        .createTask({
          ...values,
          // listUserAsign: listAssigners,
          description: editorRef.current.getContent(),
        })
        .then((result) => {
          console.log(result);
          success(result.data.message, "success");
        })
        .catch((error) => {
          console.log(error);
          success(error.response.data.message, "error");
        });
    },
  });
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    touched,
    setFieldValue,
  } = formik;
  //! timeTracking
  const [timeSpent, setTimeSpent] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  // const { timeTrackingRemaining, timeTrackingSpent } = task;
  let timeTracking = Number(timeRemaining) + Number(timeSpent);
  let percentTimeTracking = Math.round((timeSpent / timeTracking) * 100);
  //! ---------------------------------------------------------------------------
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

  const options = listUserAssigners?.map((item, index) => {
    return {
      ...item,
      value: item?.userId,
      label: item?.name,
      key: index,
    };
  });
  return (
    <form className="mt-5" onSubmit={handleSubmit}>
      {contextHolder}
      {/*//! ---------- Project ----------- */}
      <div className="createTask__project">
        <h1 className="mb-3 text-sm font-medium text-gray-900">Project</h1>
        <select
          className="focusVisibleOutline border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  block  p-2.5  dark:border-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500 my-3 w-full "
          name="projectId"
          //   value={task.taskTypeDetail?.id}
          onChange={(e) => {
            handleChange(e);
            dispatch(getListUserAssigners(e.target.value));
          }}
        >
          {listProject?.map((item, index) => {
            return (
              <option key={index} value={item?.id}>
                {item?.projectName}
              </option>
            );
          })}
        </select>
      </div>
      {/*//! Task Name */}
      <div className="mb-3 createTask__taskName">
        <h1 className=" mb-3 text-sm font-medium text-gray-900">Task Name</h1>
        <Input
          type="text"
          name="taskName"
          //   onBlur={handleBlur}
          onChange={handleChange}
          //   status={touched.email && errors.email ? "error" : null}
          placeholder=""
          className="py-2 border-blue-500"
        />

        {/* {touched.email && errors.email ? (
          <p className="text-red-500">{errors.email}</p>
        ) : null} */}
      </div>
      <div className="createTask__status">
        <h1 className=" mb-3 text-sm font-medium text-gray-900">Status</h1>
        <select
          className="focusVisibleOutline border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  block  p-2.5  dark:border-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500 my-3 w-full "
          name="statusId"
          //   value={task.taskTypeDetail?.id}
          onChange={(e) => {
            // console.log(e);
            handleChange(e);
          }}
        >
          {status?.map((item, index) => {
            return (
              <option key={index} value={item?.statusId}>
                {item?.statusName}
              </option>
            );
          })}
        </select>
      </div>
      <div className="grid gap-4 grid-cols-2 ">
        <div className="createTask_priority">
          <h1 className=" mb-3 text-sm font-medium text-gray-900">Priority</h1>
          <select
            className="focusVisibleOutline border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  block  p-2.5  dark:border-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500 my-3 w-full "
            name="priorityId"
            //   value={task.taskTypeDetail?.id}
            onChange={handleChange}
          >
            {priority?.map((item, index) => {
              return (
                <option key={index} value={item?.priorityId}>
                  {item?.priority}
                </option>
              );
            })}
          </select>
        </div>

        {/*//! Task Type */}
        <div className="createTask__taskType">
          <h1 className=" mb-3 text-sm font-medium text-gray-900">Task Type</h1>
          <select
            className="focusVisibleOutline border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  block  p-2.5  dark:border-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500 my-3 w-full "
            name="typeId"
            //   value={task.taskTypeDetail?.id}
            onChange={handleChange}
          >
            {taskType?.map((item, index) => {
              return (
                <option key={index} value={item?.id}>
                  {item?.taskType === "bug" ? "Bug" : "New Task"}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      {/*//! Assigners */}
      <div className="createTask__Assigners">
        <h1 className=" mb-3 text-sm font-medium text-gray-900">Assigners</h1>
        {/*//! ----------------------------------------------- */}
        <Select
          mode="multiple"
          name="listUserAsign"
          optionFilterProp="label"
          onChange={(value, option) => {
            // console.log(value);
            // console.log(option);
            // setListAssigners(option);
            // handleChange(option);
            setFieldValue("listUserAsign", value);
          }}
          // value={task.taskTypeDetail?.id}
          style={{
            width: "100%",
          }}
          options={options}
        />
        {/* {console.log(options)} */}
      </div>
      {/*//! ORIGINAL ESTIMATE */}
      <div className="createTask__OriginalEstimate">
        <h1 className="my-3">ORIGINAL ESTIMATE</h1>
        <input
          type="text"
          name="originalEstimate"
          // value={taskUseState?.originalEstimate}
          onChange={handleChange}
          className="focusVisibleOutline border border-blue-500 text-gray-900 text-sm rounded-lg w-full p-2.5 mb-3"
        />
      </div>
      {/*//! TimeTracking */}
      <div className="createTask__TimeTracking mb-3">
        <h1 className="mb-3">TIME TRACKING</h1>
        <div
          className="timeTracking flex hover:bg-[#ebecf0]"
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
              <span>{timeSpent}h logged</span>
              <span>{timeRemaining}h remaining</span>
              {/* taskUseState?.timeTrackingRemaining? taskUseState?.timeTrackingRemaining : taskUseState?.originalEstimate */}
            </div>
          </div>
        </div>
        <Modal
          title="TIME TRACKING"
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
                <span>{timeSpent}h logged</span>
                <span>{timeRemaining}h remaining</span>
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
                // value={taskUseState?.timeTrackingSpent}
                name="timeTrackingSpent"
                onChange={(e) => {
                  handleChange(e);
                  setTimeSpent(e.target.value);
                }}
              />
            </div>
            <div className="editorTimeTracking__right">
              <p className="mb-2">Time remaining (hours)</p>
              <input
                type="text"
                className="focusVisibleOutline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
                placeholder="Number"
                // value={taskUseState?.timeTrackingRemaining}
                name="timeTrackingRemaining"
                onChange={(e) => {
                  handleChange(e);
                  setTimeRemaining(e.target.value);
                }}
              />
            </div>
          </div>
        </Modal>
      </div>
      {/*//! Description */}
      <h1 className="mb-3">Description</h1>
      <div className="createTask__Description mt-5">
        <Editor
          className="h-10"
          onInit={(evt, editor) => (editorRef.current = editor)}
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
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-3"
      >
        Create task
      </button>
    </form>
  );
};

export default CreateTask;
