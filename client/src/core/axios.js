import axios from "axios";

const data = JSON.parse(localStorage.getItem("userData"));

if (data) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + data.token;
} else {
    axios.defaults.headers.common["Authorization"] = null;
}

export default axios;
