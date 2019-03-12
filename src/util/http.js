import axios from "axios";
import { Constants } from "expo";

const UID = encodeURIComponent(Constants.deviceId);
const HOSTNAME = "phi.ics.uci.edu"; // "192.168.1.129";
// eslint-disable-next-line no-undef
const BASE_URL =  `http://${HOSTNAME}:8000/users/${UID}`;

const http  = axios.create({
    baseURL: BASE_URL
});
export { BASE_URL };
export default http;