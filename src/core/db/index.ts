import log from "@core/log";

export default class DB {
    public client: any

    constructor() {
        log.title("# Database")
        if(
            process.env.DATABASE_CLIENT !== undefined
            && process.env.DATABASE_HOST !== undefined
            && process.env.DATABASE_NAME !== undefined
            && process.env.DATABASE_USER !== undefined
            && process.env.DATABASE_PASSWORD !== undefined
        ) {
            log.info("[db] Database credentials found !")

            this.client = require('knex')({
                client: process.env.DATABASE_CLIENT,
                connection: {
                    host : process.env.DATABASE_HOST,
                    user : process.env.DATABASE_USER,
                    password : process.env.DATABASE_PASSWORD,
                    database : process.env.DATABASE_NAME
                }
            });
        } else {
            log.info("[db] Database credentials not found")
        }
    }

}