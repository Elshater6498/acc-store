import axios from "axios";
export const BASE_URL = "http://localhost:4000";
export const BASE_URL_Img = "http://localhost:4000/";
export const FETCHER = (url) => axios.get(url).then((res) => res.data);
export const options = {
  IN_RESTAURANT: "in_restaurant",
  DELIVER_HOME: "deliver_home",
  FROM_STORE: "from_store",
};

export const axiosBase = axios.create({
  baseURL: BASE_URL,
  // headers: {
  //   'ngrok-skip-browser-warning': 'true',
  // },
});
