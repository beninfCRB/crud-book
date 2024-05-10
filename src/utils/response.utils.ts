export default function ResponseData(data: object | Array<object> | any, message: string | any) {
    return {
        data,
        message
    }
}