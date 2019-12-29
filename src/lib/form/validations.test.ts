import {validateModel, ValidatorRequired} from "./validations";


describe("test validation function", function () {
    it('should return true', function () {
        const result = validateModel({}, [
            {
                field: 'name',
                validators: [
                    ValidatorRequired,
                ]
            }
        ]);
        expect(result.valid).toEqual(false);
    });
    it('should return errors', function () {
        const result = validateModel({}, [
            {
                field: 'name',
                validators: [
                    ValidatorRequired,
                ]
            }
        ]);
        expect(result.fields['name'].errors.length).toEqual(1);
    });
    it('should not return errors', function () {
        const result = validateModel({name: '123'}, [
            {
                field: 'name',
                validators: [
                    ValidatorRequired,
                ]
            }
        ]);
        expect(result.fields['name'].errors.length).toEqual(0);
    });

});
