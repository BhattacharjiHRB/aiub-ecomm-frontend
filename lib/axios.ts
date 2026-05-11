import axios from "axios";

export const baseImageUrl = "https://api.shongzog.online";

export const storageToken =
  typeof window !== "undefined" ? window.localStorage.getItem("data") : null;

export const axiosFetch = axios.create({
  baseURL: "https://dealz-three.vercel.app/api/dealz/",
  headers: {
    "Content-Type": "application/json",
    Authorization: storageToken,
  },
});

export const axiosPost = axios.create({
  baseURL: "https://dealz-three.vercel.app/api/dealz/",
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: storageToken,
  },
});

export const axiosAuth = axios.create({
  baseURL: "http://localhost:4000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});
