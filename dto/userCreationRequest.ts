import z from "zod";

const UserRegistrationRequestSchema = z.object(
    {
        email: z.email({
            error : "Invalid email address"
        }),
        firstName: z.string({
            error : "Invalid first name"
        }).min(1, {
            error : "First name cannot be empty"
        }).max(25, {
            error : "First name cannot be longer than 25 characters"
        }),
        lastName: z.string({
            error : "Invalid last name"
        }).min(1, {
            error : "Last name cannot be empty"
        }).max(25, {
            error : "Last name cannot be longer than 25 characters"
        }),
        password: z.string({
            error : "Invalid password"
        }).min(8, {
            error : "Password cannot be shorter than 8 characters"     
        })
    }
)

export default UserRegistrationRequestSchema
