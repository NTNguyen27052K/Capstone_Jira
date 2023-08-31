import { https } from "./config";

export const projectServ = {
  getAllProject: () => {
    return https.get("/api/Project/getAllProject");
  },
  getProjectDetail: (data) => {
    return https.get(`/api/Project/getProjectDetail?id=${data}`);
  },
  // getProjectDetail: async (data) => {
  //   const http = await https.get(`/api/Project/getProjectDetail?id=${data}`);
  //   return http;
  // },
  createProject: (data) => {
    return https.post("/api/Project/createProjectAuthorize", data);
  },
  deleteProject: (data) => {
    return https.delete(`/api/Project/deleteProject?projectId=${data}`);
  },
  updateProject: (id, data) => {
    return https.put(`/api/Project/updateProject?projectId=${id}`, data);
  },
  // getTaskDetail: (data) => {
  //   return https.get(`/api/Project/getTaskDetail?taskId=${data}`);
  // },
  // updateTask: (data) => {
  //   return https.post("/api/Project/updateTask", data);
  // },
};
