import React, {useState} from "react";
import {IStudent, ProgressDictionary} from "../store/students/students.models";
import {ModelValidationResult, validateModel, ValidatorRequired} from "../lib/form/validations";
import {FormError} from "./FormError";

export interface StudentFormProps {
    isNew?: boolean;
    model?: IStudent;
    submit?: (isNew: boolean, model: IStudent) => void;
    reset?: () => void;
    change?: (data: {[key: string]: any}) => void;
}

export const StudentForm: React.FC<StudentFormProps> = (props: StudentFormProps) => {

    const [state, setState] = useState<{showErrors: boolean}>({
        showErrors: false,
    });

    function formChange(name: string, value: string) {
        props.change({[name]: value});
    }

    function formSubmit() {
        props.submit(props.isNew, props.model);
    }

    function formReset() {
        props.reset();
    }

    function showErrors(v: boolean = !state.showErrors) {
        setState({
            showErrors: v,
        });
    }

    const validationResult: ModelValidationResult = validateModel(props.model, [
        {
            field: 'fullName',
            validators: [
                ValidatorRequired,
            ],
        },
        {
            field: 'birthday',
            validators: [
                ValidatorRequired,
            ],
        },
        {
            field: 'progress',
            validators: [
                ValidatorRequired,
            ],
        },
    ]);

    return <React.Fragment>
        <form>
            <div className="form-group">
                <label htmlFor="student-fullName">FullName</label>
                <input type="text" className="form-control" id="student-fullName" name="fullName" value={props.model.fullName}
                     required  onChange={(event => formChange(event.target.name, event.target.value))}/>
                <FormError field="fullName" validation={validationResult} showError={state.showErrors}/>
            </div>
            <div className="form-group">
                <label htmlFor="student-birthday">Birthday</label>
                <input name="birthday" type="date" className="form-control" value={props.model.birthday} required
                       onChange={(event => formChange(event.target.name, event.target.value))}/>
                <FormError field="birthday" validation={validationResult} showError={state.showErrors}/>
            </div>
            <div className="form-group">
                <label htmlFor="student-progress">Progress</label>
                <select name="progress" className="form-control" value={props.model.progress} required
                        onChange={(event => formChange(event.target.name, event.target.value))}>
                    {ProgressDictionary.map(item => {
                        return <React.Fragment key={item.id}>
                            <option value={item.id}>{item.value}</option>
                        </React.Fragment>
                    })}
                </select>
                <FormError field="progress" validation={validationResult} showError={state.showErrors}/>
            </div>
            <div className="btn-group">
                {props.isNew &&
                <button type="button" className="btn btn-success" onClick={() => {
                    if (validationResult.valid) {
                        formSubmit();
                        showErrors(false);
                    } else {
                        showErrors(true);
                    }
                }}>
                    Create
                </button>}
                {!props.isNew &&
                <button type="button" className="btn btn-primary" onClick={() => {
                    if (validationResult.valid) {
                        formSubmit();
                        showErrors(false);
                    } else {
                        showErrors(true);
                    }
                }}>
                    Update
                </button>}
                {<button type="button" className="btn btn-danger" onClick={() => {
                    formReset();
                    showErrors(false);
                }}>
                    Reset
                </button>}
            </div>
        </form>
    </React.Fragment>
};

StudentForm.defaultProps = {
    isNew: true,
    model: undefined,
};
