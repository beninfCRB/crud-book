import { HttpException, HttpStatus } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PRISMA_ERRORS } from 'src/prisma/prisma.errors';

export class UseException extends HttpException {
    constructor(
        error: string | object | any
    ) {
        let message: string;
        let code: number;
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            code = parseInt(error.code);
            message = PRISMA_ERRORS[error.code];
        } else if (error instanceof error?.errno) {
            code = 0
            message = error?.sqlMessage;
        } else if (typeof error === 'string') {
            code = 0
            message = error
        } else {
            code = 0
            message = error.message;
        }
        super(
            HttpException.createBody(null, message, code || HttpStatus.BAD_GATEWAY),
            code || HttpStatus.BAD_GATEWAY
        );
    }
}
