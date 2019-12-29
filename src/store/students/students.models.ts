import {BaseModel} from "../index";

export enum Progress {
    UNSATISFACTORY = 2,
    SATISFACTORY = 3,
    WELL = 4,
    EXCELLENT = 5,
}

export const ProgressDictionary: { id: number, value: string }[] = [
    {id: Progress.UNSATISFACTORY, value: 'Неуд'},
    {id: Progress.SATISFACTORY, value: 'Уд'},
    {id: Progress.WELL, value: 'Хор'},
    {id: Progress.EXCELLENT, value: 'Отл'},
];

export const defaultStudent: IStudent = {
    id: 0,
    fullName: '',
    birthday: '',
    progress: Progress.EXCELLENT,
};

export function createStudent(student: IStudent): IStudent {
    return {
        ...defaultStudent,
        ...student,
    }
}

export interface IStudentsState {
    loading: boolean;
    students: IStudent[];
    form: {
        model: IStudent;
        isNew: boolean;
    };
}

export const defaultStudentsState: IStudentsState = {
    loading: false,
    students: [],
    form: {
        isNew: true,
        model: defaultStudent,
    }
};

export interface IStudent extends BaseModel {
    fullName: string;
    birthday: string;
    progress: Progress;
}
