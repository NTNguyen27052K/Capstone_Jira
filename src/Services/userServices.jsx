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
};
