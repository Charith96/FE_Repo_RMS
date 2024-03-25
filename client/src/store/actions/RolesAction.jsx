import { SET_USER } from "../../store/actions/ActionTypes";
export const SetUserAction = (payload) => {
    return {
        type: SET_USER,
        data: payload
    }
}