import { SIGNUP_FAILD, SIGNUP_SUCESS } from "../types/signup";


const initialState = {
};

const signupReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP_SUCESS:
            return {
                ...state,
                data: action.payload,
                error: null,
            };

        case SIGNUP_FAILD:
            return {
                ...state,
                data: action.payload,
                error: true,
            };

        default:
            return state;
    }
};

export default signupReducer;
