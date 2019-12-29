import React from "react";
import {IStudent, ProgressDictionary} from "../store/students/students.models";


interface IStudentRowProps {
    model?: IStudent;
    delete?: () => void;
    update?: (model: IStudent) => void;
}

export const StudentRow: React.FC<IStudentRowProps> = (props) => {

    function deleteButtonHandler() {
        if (props.delete !== undefined) {
            props.delete();
        }
    }

    function startEditButtonHandler() {
        props.update(props.model);
    }

    // eslint-disable-next-line eqeqeq
    const progress = ProgressDictionary.find(item => item.id == props.model.progress);
    return <React.Fragment>
        <td>
            {props.model.id}
        </td>
        <td>
            {props.model.fullName}
        </td>
        <td>
            {props.model.birthday}
        </td>
        <td>
            {progress ? progress.value : ''}
        </td>
        <td>
            <div className="btn-group">
                <button className="btn btn-warning" onClick={() => startEditButtonHandler()}>edit</button>
                {props.delete ?
                    <button className="btn btn-danger" onClick={() => deleteButtonHandler()}>delete</button> : ""}
            </div>
        </td>
    </React.Fragment>
};
