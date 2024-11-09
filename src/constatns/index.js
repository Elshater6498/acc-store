import axios from "axios";
export const BASE_URL = "https://api.aboalezgrill.com";
export const BASE_URL_Img = "https://api.aboalezgrill.com/";
export const FETCHER = (url) => axios.get(url).then((res) => res.data);
export const options = {
  TAKEAWAY: "takeaway",
  INRESTAURANT: "inRestaurant",
};

export const axiosBase = axios.create({
  baseURL: BASE_URL,
  // headers: {
  //   'ngrok-skip-browser-warning': 'true',
  // },
});
