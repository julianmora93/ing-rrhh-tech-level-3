import { AbstractControl, FormControl } from "@angular/forms";

export abstract class UtilControlValidator {

    public static isValid = (input: AbstractControl): boolean => (input.touched && input.invalid);

    public static shortenedString(text: string): string{
        if(text.length > 15){
            return `${text.substring(0, 15)}...`;
        }
        return text;
    }
}