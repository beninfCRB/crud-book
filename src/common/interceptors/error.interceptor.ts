import { Prisma } from '@prisma/client';
import {
    HttpException,
    CallHandler, ExecutionContext, Injectable, NestInterceptor, Logger, HttpStatus
} from "@nestjs/common";
import { catchError, Observable } from "rxjs";
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
    constructor(
        private readonly prismaService: PrismaService,
    ) {
    }
    private logger = new Logger('ErrorInterceptor');
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle()
            .pipe(catchError(error => {
                this.logger.error(error);
                if (error instanceof Prisma.PrismaClientKnownRequestError) {
                    throw new HttpException({
                        statusCode: error.code,
                        message: this.prismaService.getErrorMessage(error.code),
                    }, HttpStatus.UNPROCESSABLE_ENTITY)
                } else {
                    throw error;
                }
            }));
    }
}