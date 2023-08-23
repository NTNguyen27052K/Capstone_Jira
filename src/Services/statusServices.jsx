import { https } from "./config";

export const statusSer = {
  getStatus: (data) => {
    return https.get("/api/Status/getAll", data);
  },
};
