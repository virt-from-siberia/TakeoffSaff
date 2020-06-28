import axios from "axios";

let data = JSON.parse(localStorage.getItem("userData"));

if (data) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + data.token;
}

export default axios;
