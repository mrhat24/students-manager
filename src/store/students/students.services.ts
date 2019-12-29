import {IStudent} from "./students.models";
import LocalStorageProvider from "../data.provider";

async function fetchStudents(): Promise<IStudent[]> {
    return await LocalStorageProvider.getModels<IStudent[]>('students');
}

async function createStudent(student: IStudent): Promise<IStudent> {
    return await LocalStorageProvider.createModel<IStudent>('students', student);
}

async function updateStudent(id: number, data: IStudent): Promise<IStudent> {
    return await LocalStorageProvider.updateModel<IStudent>('students', id, data);
}

async function deleteStudent(id: number): Promise<void> {
    return await LocalStorageProvider.delete('students', id);
}

const studentsServices = {
    fetchStudents,
    createStudent,
    updateStudent,
    deleteStudent,
};

export default studentsServices;

