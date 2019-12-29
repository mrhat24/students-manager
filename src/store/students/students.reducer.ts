import {ActionStudentTypes, StudentActions} from "./students.actions";
import {defaultStudent, defaultStudentsState, IStudentsState} from "./students.models";

function studentsReducer(state: IStudentsState = defaultStudentsState, action: StudentActions) {
    switch (action.type) {
        case ActionStudentTypes.Fetch: {
            return {
                ...state,
                loading: true
            }
        }
        case ActionStudentTypes.FetchSuccess: {
            return {
                ...state,
                students: action.payload,
                loading: false
            }
        }
        case ActionStudentTypes.FetchError: {
            return {
                ...state,
                loading: false
            }
        }
        case ActionStudentTypes.Create: {
            return {
                ...state,
                loading: true
            }
        }
        case ActionStudentTypes.CreateSuccess: {
            return {
                ...state,
                students: [
                    ...state.students,
                    action.payload,
                ],
                loading: false
            }
        }
        case ActionStudentTypes.CreateError: {
            return {
                ...state,
                loading: false
            }
        }
        case ActionStudentTypes.Update: {
            return {
                ...state,
                loading: true
            }
        }
        case ActionStudentTypes.UpdateSuccess: {
            return {
                ...state,
                students: state.students.map(s => {
                    if (s.id === action.payload.id) {
                        return {
                            ...s,
                            ...action.payload,
                        }
                    }
                    return s;
                }),
                loading: false
            }
        }
        case ActionStudentTypes.UpdateError: {
            return {
                ...state,
                loading: false
            }
        }
        case ActionStudentTypes.Delete: {
            return {
                ...state,
                loading: true
            }
        }
        case ActionStudentTypes.DeleteSuccess: {
            return {
                ...state,
                students: state.students.filter(item => item.id !== action.payload),
                loading: false
            }
        }
        case ActionStudentTypes.DeleteError: {
            return {
                ...state,
                loading: false
            }
        }
        case ActionStudentTypes.StartEditModel: {
            return {
                ...state,
                form: {
                    ...state.form,
                    isNew: false,
                    model: action.payload,
                }
            }
        }
        case ActionStudentTypes.ResetEditModel: {
            return {
                ...state,
                form: {
                    ...state.form,
                    isNew: true,
                    model: defaultStudent,
                }
            }
        }
        case ActionStudentTypes.ChangeEditModel: {
            return {
                ...state,
                form: {
                    ...state.form,
                    model: {
                        ...state.form.model,
                        ...action.payload,
                    },
                }
            }
        }
        default: {
            return state;
        }
    }
}

export default studentsReducer;
