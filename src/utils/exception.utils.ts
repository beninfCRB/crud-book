import { HttpException, HttpStatus } from "@nestjs/common";

export class UseException extends HttpException {
    constructor(objectOrError?: string | object | any) {
        super(
            HttpException.createBody(objectOrError),
            HttpStatus.FORBIDDEN
        );
    }
}