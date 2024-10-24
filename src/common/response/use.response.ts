import { ResCode } from "./code.response";
import { ResponseAPI } from "./response";

export default function UseResponse(status: string, data: null | object | Array<object> | any, desc?: string): ResponseAPI {
    let statusCode: number = 500;
    let message: string = 'Bad Gateway';
    let meta: string = desc ? desc : ''
    switch (status) {
        case ResCode.Created:
            statusCode = 201;
            message = 'create data successfully!'
            break;
        case ResCode.Updated:
            statusCode = 202;
            message = 'updated data successfully!'
            break;
        case ResCode.Deleted:
            statusCode = 201;
            message = 'deleted data successfully!'
            break;
        case ResCode.Get:
            statusCode = 200;
            message = 'get data successfully!'
            break;
        default:
            statusCode = 500
            message = 'Bad Gateway!'
            break;
    }
    return {
        data,
        statusCode,
        message,
        meta
    }
}