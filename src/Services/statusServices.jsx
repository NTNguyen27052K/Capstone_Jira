import { https } from "./config";

export const statusSer = {
  getStatus: (data) => {
    return https.get("/api/Status/getAll", data);
  },
  updateStatus: (data) => {
    return https.put("/api/Project/updateStatus", data);
  },
};
