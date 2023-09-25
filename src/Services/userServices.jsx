import { https } from "./config";

export const userSer = {
  sigIn: (data) => {
    return https.post("/api/Users/signin", data);
  },
  signUp: (data) => {
    return https.post("/api/Users/signup", data);
  },
  editUser: (data) => {
    return https.put("/api/Users/editUser", data);
  },
  deteleUser: (data) => {
    return https.put("/api/Users/deleteUser", data);
  },
  getUser: (data) => {
    return https.get(`/api/Users/getUser?keyword=${data}`);
  },
  getUserByProjectId: (data) => {
    return https.get(`/api/Users/getUserByProjectId?idProject=${data}`);
  },
  assignUserProject: (data) => {
    return https.post("/api/Project/assignUserProject", data);
  },
};
