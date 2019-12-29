import React from "react";
import {ModelValidationResult} from "../lib/form/validations";

export const FormError: React.FC<{validation: ModelValidationResult, field: string, showError: boolean}> = (props) => {
    if (!props.showError) {
        return <div/>;
    }
    if (!props.validation || (props.validation.valid || props.validation.fields[props.field].valid)) {
        return <div/>;
    }
    return <div>
        {props.validation.fields[props.field].errors.map((err, index) => {
            return <small key={index} className="text-danger">
                {err}
            </small>
        })}
    </div>;
};
FormError.defaultProps = {
    validation: undefined,
    field: '',
    showError: true
};
