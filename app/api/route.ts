import UserRegistrationRequestSchema from "@/dto/userCreationRequest";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req : NextRequest){

    try {
    
const body = await req.json();

//safe validate and print error

const validatedBody = UserRegistrationRequestSchema.safeParse(body)

if(!validatedBody.success) {

    return NextResponse.json(
        { 
            message: validatedBody.error.issues[0].message
        },
        {
            status: 400
        }
    )
}

return NextResponse.json(
    { 
    message: "User created successfully" 
    }   
)


const existingUser = await prisma.user.findFirst({
    where: {
        email: body.email
    }
})

if(existingUser !== null   ){

return NextResponse.json(
    { 
    message: "User already exists" 
    },
    {
        status: 400
    }
)

}

//create a new user in the database in the request body

await prisma.user.create(
    {
        data: {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password: body.password,    
        }
    }
)

return NextResponse.json(
    
    { 
    message: "User created successfully" 
    }

    )
}

catch (error) {

    console.log(error)
    return NextResponse.json(
        { 
        message: "Error creating user",
        },

        {
            status: 500
        }
    )

}
}
