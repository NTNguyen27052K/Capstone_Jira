import { https } from "./config";

export const projectServ = {
  getAllProject: () => {
    return https.get("/api/Project/getAllProject");
  },
  getProjectDetail: (data) => {
    return https.get(`/api/Project/getProjectDetail?id=${data}`);
  },
  createProject: (data) => {
    return https.post("/api/Project/createProjectAuthorize", data);
  },
  deleteProject: (data) => {
    return https.delete(`/api/Project/deleteProject?projectId=${data}`);
  },
};
