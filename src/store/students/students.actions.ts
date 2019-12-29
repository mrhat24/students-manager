import {Action, Dispatch} from "redux";
import {IStudent} from "./students.models";
import studentsServices from "./students.services";

export enum ActionStudentTypes {
    Fetch = '[Students] Fetch',
    FetchSuccess = '[Students] Fetch Success',
    FetchError = '[Students] Fetch Error',
    Create = '[Students] Create',
    CreateSuccess = '[Students] Create Success',
    CreateError = '[Students] Create Error',
    Update = '[Students] Update',
    UpdateSuccess = '[Students] Update Success',
    UpdateError = '[Students] Update Error',
    Delete = '[Students] Delete',
    DeleteSuccess = '[Students] Delete Success',
    DeleteError = '[Students] Delete Error',

    StartEditModel = '[Student] Start Edit Model',
    ResetEditModel = '[Student] Reset Edit Model',
    ChangeEditModel = '[Student] Change Edit Model',
}

export interface IStudentUpdatePayload  {
    id: number,
    student: IStudent,
}

export interface IStudentActions extends Action {
    type: ActionStudentTypes;
}

export interface IActionStudentFetch extends IStudentActions {
    type: ActionStudentTypes.Fetch;
    payload?: any;
}

export interface IActionStudentFetchSuccess extends IStudentActions {
    type: ActionStudentTypes.FetchSuccess;
    payload: IStudent[];
}

export interface IActionStudentFetchError extends IStudentActions {
    type: ActionStudentTypes.FetchError;
    payload?: any;
}

export interface IActionStudentCreate extends IStudentActions {
    type: ActionStudentTypes.Create;
}

export interface IActionStudentCreateSuccess extends IStudentActions {
    type: ActionStudentTypes.CreateSuccess;
    payload: IStudent;
}

export interface IActionStudentCreateError extends IStudentActions {
    type: ActionStudentTypes.CreateError;
}

export interface IActionStudentUpdate extends IStudentActions {
    type: ActionStudentTypes.Update;
}

export interface IActionStudentUpdateSuccess extends IStudentActions {
    type: ActionStudentTypes.UpdateSuccess;
    payload: IStudent;
}

export interface IActionStudentUpdateError extends IStudentActions {
    type: ActionStudentTypes.UpdateError;
}

export interface IActionStudentDelete extends IStudentActions {
    type: ActionStudentTypes.Delete;
}

export interface IActionStudentDeleteSuccess extends IStudentActions {
    type: ActionStudentTypes.DeleteSuccess;
    payload: number;
}

export interface IActionStudentDeleteError extends IStudentActions {
    type: ActionStudentTypes.DeleteError;
}

export interface IActionStudentStartEditModel extends IStudentActions {
    type: ActionStudentTypes.StartEditModel;
    payload: IStudent;
}

export interface IActionStudentResetEditModel extends IStudentActions {
    type: ActionStudentTypes.ResetEditModel;
}

export interface IActionStudentChangeEditModel extends IStudentActions {
    type: ActionStudentTypes.ChangeEditModel;
    payload: {[key: string]: any};
}

export function studentsFetch(): IActionStudentFetch {
    return {
        type: ActionStudentTypes.Fetch,
    }
}

export function studentsFetchSuccess(data: IStudent[]): IActionStudentFetchSuccess {
    return {
        type: ActionStudentTypes.FetchSuccess,
        payload: data,
    }
}

export function studentsFetchError(): IActionStudentFetchError {
    return {
        type: ActionStudentTypes.FetchError,
    }
}

export function studentsFetchAsync() {
    return async (dispatch: Dispatch) => {
        dispatch(studentsFetch());
        try {
            const students = await studentsServices.fetchStudents();
            dispatch(studentsFetchSuccess(students));
        } catch (e) {
            dispatch(studentsFetchError());
        }
    }
}

export function studentsCreate(): IActionStudentCreate {
    return {
        type: ActionStudentTypes.Create,
    }
}

export function studentsCreateSuccess(data: IStudent): IActionStudentCreateSuccess {
    return {
        type: ActionStudentTypes.CreateSuccess,
        payload: data,
    }
}

export function studentsCreateError(): IActionStudentCreateError {
    return {
        type: ActionStudentTypes.CreateError,
    }
}

export function studentsCreateAsync(item: IStudent) {
    return async (dispatch: Dispatch) => {
        dispatch(studentsCreate());
        try {
            const createdStudent = await studentsServices.createStudent(item);
            console.log(createdStudent);
            dispatch(studentsCreateSuccess(createdStudent));
        } catch (e) {
            dispatch(studentsCreateError());
        }
    }
}

export function studentsUpdate(): IActionStudentUpdate {
    return {
        type: ActionStudentTypes.Update,
    }
}

export function studentsUpdateSuccess(data: IStudent): IActionStudentUpdateSuccess {
    return {
        type: ActionStudentTypes.UpdateSuccess,
        payload: data,
    }
}

export function studentsUpdateError(): IActionStudentUpdateError {
    return {
        type: ActionStudentTypes.UpdateError,
    }
}

export function studentsUpdateAsync(data: IStudentUpdatePayload) {
    return async (dispatch: Dispatch) => {
        dispatch(studentsUpdate());
        try {
            const updatedStudent = await studentsServices.updateStudent(data.id, data.student);
            dispatch(studentsUpdateSuccess(updatedStudent));
        } catch (e) {
            dispatch(studentsUpdateError());
        }
    }
}

export function studentsDelete(): IActionStudentDelete {
    return {
        type: ActionStudentTypes.Delete,
    }
}

export function studentsDeleteSuccess(id: number): IActionStudentDeleteSuccess {
    return {
        type: ActionStudentTypes.DeleteSuccess,
        payload: id,
    }
}

export function studentsDeleteError(): IActionStudentDeleteError {
    return {
        type: ActionStudentTypes.DeleteError,
    }
}

export function studentsDeleteAsync(id: number) {
    return async (dispatch: Dispatch) => {
        dispatch(studentsDelete());
        try {
            await studentsServices.deleteStudent(id);
            dispatch(studentsDeleteSuccess(id));
        } catch (e) {
            dispatch(studentsDeleteError());
        }
    }
}

export function studentStartEditModel(model: IStudent) {
    return {
        type: ActionStudentTypes.StartEditModel,
        payload: model,
    }
}

export function studentResetEditModel() {
    return {
        type: ActionStudentTypes.ResetEditModel,
    }
}

export function studentChangeEditModel(model: {[key: string]: any}) {
    return {
        type: ActionStudentTypes.ChangeEditModel,
        payload: model,
    }
}

export type StudentActions =
    | IActionStudentFetch
    | IActionStudentFetchSuccess
    | IActionStudentFetchError
    | IActionStudentCreate
    | IActionStudentCreateSuccess
    | IActionStudentCreateError
    | IActionStudentUpdate
    | IActionStudentUpdateSuccess
    | IActionStudentUpdateError
    | IActionStudentDelete
    | IActionStudentDeleteSuccess
    | IActionStudentDeleteError
    | IActionStudentStartEditModel
    | IActionStudentResetEditModel
    | IActionStudentChangeEditModel;
