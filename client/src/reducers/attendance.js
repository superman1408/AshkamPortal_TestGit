import { ATTEND_ALL } from "../constants/actionTypes";


// eslint-disable-next-line import/no-anonymous-default-export
export default (attend = [], action) => {
    switch (action.type) {
        case ATTEND_ALL:
          return action.payload;
        
        default:
        return attend;
    }
};