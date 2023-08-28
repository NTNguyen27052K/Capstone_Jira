import { https } from "./config";

export const projectCategoryServ = {
  getProjectCategory: () => {
    return https.get("/api/ProjectCategory");
  },
};
