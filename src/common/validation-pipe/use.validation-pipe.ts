import { ValidationError } from "@nestjs/common";
import { UseException } from "../exceptions/use.exception";

export const ValidationPipeMessage = {
    transform: true,
    whitelist: true,
    exceptionFactory: (ValidationErrors: ValidationError[] = []) => {
        const errorMessages = {};
        ValidationErrors.forEach(error => {
            errorMessages[error.property] = Object.values(error.constraints).join(', ').trim();
        })
        return new UseException(errorMessages)
    }
}