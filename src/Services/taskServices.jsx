import { https } from "./config";

export const taskServ = {
  getTaskDetail: (data) => {
    return https.get(`/api/Project/getTaskDetail?taskId=${data}`);
  },
  getTaskType: () => {
    return https.get("/api/TaskType/getAll");
  },
  updateTask: (data) => {
    return https.post("/api/Project/updateTask", data);
  },
  createTask: (data) => {
    return https.post("/api/Project/createTask", data);
  },
};
