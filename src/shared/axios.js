import axios from "axios";
import { MATTRESS_TOKEN } from "./types";

const BASE_URL = "  https://api.xr-matras.uz";
const TOKEN = localStorage.getItem(MATTRESS_TOKEN);

const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: TOKEN ? `Bearer ${TOKEN}` : "",
  },
});

export default httpClient;
