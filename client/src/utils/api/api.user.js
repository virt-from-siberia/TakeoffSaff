import axios from "./axios";

//get info
const apiUserGetInfo = () => axios.get("/api/front/user");

const user = { apiUserGetInfo };

export default user;
