import { dev } from "$app/environment"

import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle"
import { Lucia, TimeSpan } from "lucia"

import { db } from "./db"
import {  UsersTable, sessionsTable } from "./schema"


const adapter = new DrizzlePostgreSQLAdapter(db, sessionsTable, UsersTable) // lucia drizzle adapter


export const lucia = new Lucia(
    adapter, {
    sessionCookie: {
        attributes: {
            secure: !dev // set to `true` when using HTTPS
        }
    },
    sessionExpiresIn: new TimeSpan(1, "h"), //1 hour

    getUserAttributes: (attributes) => {
        return{
            fullname: attributes.fullname,
            email: attributes.email,
            role: attributes.role,
            isEmailVerified: attributes.isEmailVerified
        }
    }
})

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia
        DatabaseUserAttributes:{
            fullname:string,
            email:string,
            role:string,
            isEmailVerified:boolean
        }
    }
}