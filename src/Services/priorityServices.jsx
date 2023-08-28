import { https } from "./config";

export const prioritySer = {
  getStatus: (data) => {
    return https.get(`/api/Priority/getAll?id=${data}`);
  },
};
