import axios from "axios";
import { getDataLocal } from "../Utils/localStore";

const BASE_URL = "https://jiranew.cybersoft.edu.vn";
const TokenCybersoft =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAwNyIsIkhldEhhblN0cmluZyI6IjI0LzEyLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTcwMzM3NjAwMDAwMCIsIm5iZiI6MTY3OTg1MDAwMCwiZXhwIjoxNzAzNTIzNjAwfQ.Y4r98sOezektJ3pcwJQL0l2d2jGgKiOD0K51MEFDbKE";

const tokenAuthorization = getDataLocal("userLocal");
// console.log(tokenAuthorization.accessToken);

const configHeaderAxios = () => {
  return {
    TokenCybersoft,
    Authorization: "Bearer " + tokenAuthorization?.accessToken,
  };
};
export const https = axios.create({
  baseURL: BASE_URL,
  headers: configHeaderAxios(),
});
