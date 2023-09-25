// import { CloseCircleOutlined } from "@ant-design/icons";
// import React from "react";
// import { Space, Tag } from "antd";
// const log = (e) => {
//   console.log(e);
// };
// const preventDefault = (e) => {
//   e.preventDefault();
//   console.log("Clicked! But prevent default.");
// };

// const Test = () => {
//   <Space size={[0, 8]} wrap>
//     <Tag>Tag 1</Tag>
//     <Tag>
//       <a href="https://github.com/ant-design/ant-design/issues/1862">Link</a>
//     </Tag>
//     <Tag closeIcon onClose={preventDefault}>
//       Prevent Default
//     </Tag>
//     <Tag closeIcon={<CloseCircleOutlined />} onClose={log}>
//       Tag 2
//     </Tag>
//   </Space>;
// };
// export default Test;
// import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import ReactHtmlParser from "react-html-parser";
// import { Progress, Tag, Modal, Select, Button, Space } from "antd";
// import "./task.scss";
// import { TweenOneGroup } from "rc-tween-one";
// import { getProjectDetail, getTask } from "../../Redux/slices/projectSliece";
// import { CloseCircleOutlined } from "@ant-design/icons";
// import { Editor } from "@tinymce/tinymce-react";
// import { taskServ } from "../../Services/taskServices";
// import ColumnGroup from "antd/es/table/ColumnGroup";

// const Task = (props) => {
//   const { task, projectDetail } = useSelector((state) => state.project);
//   const { status } = useSelector((state) => state.status);
//   const { priority } = useSelector((state) => state.priority);
//   const { taskType } = useSelector((state) => state.task);

//   const [taskUseState, setTaskUseState] = useState(task);
//   // console.log(taskUseState);
//   const dispatch = useDispatch();
//   // console.log(task.assigness);
//   // console.log(taskType);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const showModal = () => {
//     setIsModalOpen(true);
//   };
//   const handleOk = () => {
//     setIsModalOpen(false);
//   };
//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };
//   //! timeTracking
//   const { timeTrackingRemaining, timeTrackingSpent } = task;
//   let timeTracking = Number(timeTrackingRemaining) + Number(timeTrackingSpent);
//   let percentTimeTracking = Math.round(
//     (timeTrackingSpent / timeTracking) * 100
//   );
//   //! description
//   const editorRef = useRef(null);
//   const handleChange = (event) => {
//     const { name, value } = event?.target;
//     console.log({ name, value });
//     console.log({
//       ...task,
//       [name]: value,
//       listUserAsign: [],
//       description: editorRef.current?.getContent(),
//     });

//     setTaskUseState({
//       ...task,
//       [name]: value,
//       priorityTask: name,
//       listUserAsign: [],
//       description: editorRef.current?.getContent(),
//     });

//     taskServ
//       .updateTask({
//         ...task,
//         [name]: value,
//         listUserAsign: [],
//         description: editorRef.current?.getContent(),
//       })
//       .then((result) => {
//         dispatch(getTask(task?.taskId));
//         dispatch(getProjectDetail(task?.projectId));
//         // console.log(result);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const [visibleEditer, setVisibleEditer] = useState(props.visEditer);

//   //! Select ASSIGNEES
//   // const [assignessed, setAssignessed] = useState([]);
//   // console.log(assignessed);
//   const [selectedItems, setSelectedItems] = useState([]);

//   useEffect(() => {
//     // selectedIt();
//     const selectedIt = task?.assigness.map((item, index) => {
//       // console.log(item.name);
//       return item?.name;
//     });

//     setSelectedItems(selectedIt);
//   }, [task?.assigness]);

//   const OPTIONS = projectDetail?.members.map((item, index) => {
//     return item?.name;
//   });
//   // console.log(selectedItems);
//   const filteredOptions = OPTIONS.filter((o) => !selectedItems?.includes(o));
//   const preventDefault = (e) => {
//     e.preventDefault();
//     console.log("Clicked! But prevent default.");
//   };
//   return (
//     <div className="task grid grid-cols-2 gap-4">
//       <div className="task__left">
//         <div className="task__title">
//           <select
//             className="focusVisibleOutline border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  block  p-2.5  dark:border-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500 my-3 "
//             name="typeId"
//             value={taskUseState.typeId?.id}
//             onChange={(event) => {
//               handleChange(event);
//             }}
//           >
//             {/* console.log(taskUseState.typeId?.id); */}
//             {taskType.map((item, index) => {
//               return (
//                 <option key={index} value={item?.id}>
//                   {item?.taskType}
//                 </option>
//               );
//             })}
//           </select>
//         </div>
//         <div>{task?.alias}</div>

//         <h1 className="font-bold text-lg mb-3">Description</h1>
//         {visibleEditer ? (
//           <div>
//             <Editor
//               className="h-10"
//               name="description"
//               onInit={(evt, editor) => (editorRef.current = editor)}
//               initialValue={task?.description}
//               init={{
//                 height: 300,
//                 menubar: false,
//                 plugins: [
//                   "advlist autolink lists link image charmap print preview anchor",
//                   "searchreplace visualblocks code fullscreen",
//                   "insertdatetime media table paste code help wordcount",
//                 ],
//                 toolbar:
//                   "undo redo | formatselect | " +
//                   "bold italic backcolor | alignleft aligncenter " +
//                   "alignright alignjustify | bullist numlist outdent indent | " +
//                   "removeformat | help",
//                 content_style:
//                   "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
//               }}
//             />
//             <div className="mt-3">
//               <Button
//                 type="primary"
//                 className="mr-3"
//                 onClick={(event) => {
//                   // console.log(editorRef.current.getContent());
//                   handleChange(event);
//                 }}
//               >
//                 Save
//               </Button>
//               <Button onClick={() => setVisibleEditer(false)}>Cancel</Button>
//             </div>
//           </div>
//         ) : (
//           <div onClick={() => setVisibleEditer(true)}>
//             {ReactHtmlParser(task?.description)}
//           </div>
//         )}
//       </div>
//       <div className="task__right ">
//         <h1>Status</h1>
//         <select
//           className="focusVisibleOutline border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  block  p-2.5  dark:border-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500 my-3 w-[100%]"
//           name="statusId"
//           value={taskUseState?.statusId}
//           onChange={(event) => {
//             // console.log(event.target);
//             handleChange(event);
//           }}
//         >
//           {status.map((item, index) => {
//             return (
//               <option key={index} value={item?.statusId}>
//                 {item?.statusName}
//               </option>
//             );
//           })}
//         </select>

//         <h1 className="mb-3">ASSIGNEES</h1>

//         <div className="assignees">
//           <Space size={[0, 8]} wrap>
//             {task.assigness?.map((item, index) => {
//               return (
//                 <Tag closeIcon onClose={preventDefault} key={index}>
//                   {item?.name}
//                 </Tag>
//               );
//             })}

//             <select
//               className="focusVisibleOutline border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  block  p-2.5  dark:border-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500 my-3 "
//               name="listUserAsign"
//               // value={task.taskTypeDetail?.id}
//               // onChange={(event) => {
//               //   handleChange(event);
//               // }}
//             >
//               <option defaultValue>Add more</option>
//               {filteredOptions.map((item, index) => {
//                 return (
//                   <option key={index} value={item?.id}>
//                     {item}
//                   </option>
//                 );
//               })}
//             </select>
//           </Space>
//         </div>
//         <h1 className="mt-3">PRIORITY</h1>
//         <select
//           className=" focusVisibleOutline border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  block  p-2.5  dark:border-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500 my-3 w-[100%]"
//           name="priorityId"
//           value={taskUseState.priorityTask?.priorityId}
//           onChange={(event) => {
//             handleChange(event);
//           }}
//         >
//           {priority.map((item, index) => {
//             return (
//               <option key={index} value={item?.priorityId}>
//                 {item?.priority}
//               </option>
//             );
//           })}
//         </select>
//         <h1 className="my-3">ORIGINAL ESTIMATE (HOURS)</h1>
//         <input
//           type="text"
//           name="originalEstimate"
//           value={taskUseState?.originalEstimate}
//           // onChange={(event) => {
//           //   handleChange(event);
//           // }}
//           onChange={handleChange}
//           className="focusVisibleOutline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 mb-3"
//         />

//         <h1 className="mb-3">TIME TRACKING</h1>
//         <div
//           className="timeTracking flex gap-3 hover:bg-[#ebecf0]"
//           onClick={showModal}
//         >
//           <div className="w-1/12 flex justify-center items-center ">
//             <i className="fa-solid fa-stopwatch fa-2xl "></i>
//           </div>
//           <div className="w-11/12">
//             <Progress
//               className="w-full m-0 "
//               format={(percent) => ``}
//               percent={percentTimeTracking}
//             />
//             <div className=" flex justify-between">
//               <span>{timeTrackingSpent}h logged</span>
//               <span>{timeTrackingRemaining}h remaining</span>
//               {/* taskUseState?.timeTrackingRemaining? taskUseState?.timeTrackingRemaining : taskUseState?.originalEstimate */}
//             </div>
//           </div>
//         </div>
//       </div>
//       <Modal
//         title="Basic Modal"
//         open={isModalOpen}
//         onOk={handleOk}
//         // okText: "Done",
//         okText="Done"
//         onCancel={() => {
//           // setVisibleEditer(false);
//           handleCancel();
//         }}
//         cancelButtonProps={{ style: { display: "none" } }}
//       >
//         <div
//           className="timeTracking flex gap-3 hover:bg-[#ebecf0]"
//           onClick={showModal}
//         >
//           <div className="w-1/12 flex justify-center items-center ">
//             <i className="fa-solid fa-stopwatch fa-2xl "></i>
//           </div>
//           <div className="w-11/12">
//             <Progress
//               className="w-full m-0 "
//               format={(percent) => ``}
//               percent={percentTimeTracking}
//             />
//             <div className=" flex justify-between">
//               <span>{timeTrackingSpent}h logged</span>
//               <span>{timeTrackingRemaining}h remaining</span>
//             </div>
//           </div>
//         </div>
//         <div className="editorTimeTracking grid grid-cols-2 gap-2 mt-5">
//           <div className="editorTimeTracking__left">
//             <p className="mb-2">Time spent (hours)</p>
//             <input
//               type="text"
//               className="focusVisibleOutline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
//               placeholder="Number"
//               value={taskUseState?.timeTrackingSpent}
//               name="timeTrackingSpent"
//               onChange={handleChange}
//             />
//           </div>
//           <div className="editorTimeTracking__right">
//             <p className="mb-2">Time remaining (hours)</p>
//             <input
//               type="text"
//               className="focusVisibleOutline bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
//               placeholder="Number"
//               value={taskUseState?.timeTrackingRemaining}
//               name="timeTrackingRemaining"
//               onChange={handleChange}
//             />
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default Task;
import ColumnGroup from "antd/es/table/ColumnGroup";
import React, { useState } from "react";
const defaultValue = [
  { id: 1, taskName: "Task 1" },
  { id: 2, taskName: "Task 2" },
  { id: 3, taskName: "Task 3" },
  { id: 4, taskName: "Task 4" },
  { id: 5, taskName: "Task 5" },
];

const Test = () => {
  const [taskList, setTaskList] = useState(defaultValue);
  const [styleOnDragStart, setStyleOnDragStart] = useState("border-rose-500");
  const handleDragStart = (e, index, item) => {
    console.log(e.target);
    console.log(item);

    // setStyleOnDragStart("border-yellow-500");

    e.currentTarget.className += " text-red-500";
  };
  const handleDragOver = (e) => {
    // console.log(e.target);
  };
  const handleDrop = (e) => {
    console.log(e.target);
  };
  const handleDragEnter = (e, item) => {
    console.log(e.target);
    console.log(item);
  };
  return (
    <div className="grid grid-cols-4">
      <ul className=" bg-gray-500 p-2">
        {taskList.map((item, index) => (
          <li
            className={`bg-gray-200 p-3 m-3 rounded-sm text-center border-8 ${styleOnDragStart}`}
            key={index}
            draggable="true"
            //! onDragEnter
            onDragEnter={(e) => {
              handleDragEnter(e, item);
            }}
            // onDragEnd={(e) => {
            //   setStyleOnDragStart("border-rose-500");
            // }}
            // onDragOver={handleDragOver}
          >
            {item.taskName}
          </li>
        ))}
      </ul>
      <ul className=" bg-gray-500 ml-2" draggable="true" onDrop={handleDrop}>
        aaaaa
      </ul>
    </div>
  );
};

export default Test;
