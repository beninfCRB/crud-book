import { NODE_ENV } from "src/statics/node.statics"

export function isProduction() {
    return process.env.NODE_ENV === NODE_ENV.Production
}

export function databaseType() {
    switch (process.env.DATABASE_TYPE) {
        case 'mssql':
            return 'mssql'
        case 'postgres':
            return 'postgres'
        default:
            return 'mysql'
    }
}