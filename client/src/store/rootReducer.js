import { combineReducers } from "redux";
import { loginReducer } from "./Login/reducers";
import { registrationReducer } from "./Registration/reducers";
import { userGetInfoReducer } from "./User/reducers";
import { CreateContacts } from "./Create/reducers";
import { GetContact } from "./Edit/reducers";

export default combineReducers({
    login: loginReducer,
    registration: registrationReducer,
    user: userGetInfoReducer,
    create: CreateContacts,
    edit: GetContact,
});
