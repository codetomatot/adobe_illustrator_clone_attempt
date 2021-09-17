import { USER, USER_DOCUMENTS, DOCUMENT_DATA, CANVAS_DATA } from "../constants/index";

const INITIAL_STATE = {
    currentUser: null,
    userDocs: [],
    history: [],
    canvasData: [],
}

export const CU = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case USER:
            return {
                ...state,
                currentUser: action.currentUser,
            }
        case USER_DOCUMENTS:
            return {
                ...state,
                userDocs: action.userDocs,
            }
        case DOCUMENT_DATA:
            return {
                ...state,
                docData: action.docData,
            }
        case CANVAS_DATA:
            return {
                ...state,
                canvasData: action.canvasData,
            }
        default:
            return state;
    }
}
