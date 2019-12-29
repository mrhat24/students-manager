export interface ValidationResult {
    valid: boolean;
    errors?: string[];
}

export interface ModelValidationResult {
    valid: boolean;
    fields: {[key: string]: ValidationResult}
}

export type ValidationFunc = (model: {[key: string]: any}, key: string) => ValidationResult;

export interface ValidationRule {
    field: string;
    validators: ValidationFunc[]
}

export type ValidationRules = ValidationRule[];

export function ValidatorRequired(model: {[key: string]: any}, key: string): ValidationResult {
    let result = model.hasOwnProperty(key) && model[key] !== undefined;
    const errors = [];
    if (!result) {
        errors.push(`Property ${key} is undefined`);
    }
    if (result) {
        result = !!model[key];
        if (!result) {
            errors.push(`Property ${key} is required`);
        }
    }
    return {
        valid: result,
        errors: errors,
    };
}

export function validateModel(model: {[key: string]: any}, rules: ValidationRules): ModelValidationResult {
    const validation: {
        valid: boolean;
        fields: {[key: string]: ValidationResult}
    } = {
        valid: true,
        fields: {}
    };
    for (const rule of rules) {
       for (const validator of rule.validators) {
           const fieldValidationResult = validator(model, rule.field);
           validation.valid = validation.valid && fieldValidationResult.valid;
           validation.fields[rule.field] = fieldValidationResult;
       }
    }
    return validation;
}
