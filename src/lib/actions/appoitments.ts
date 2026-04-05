"use server";
import {prisma} from "../prisma"


export async function getAppoitments(){
    try {
        const appoitments=await prisma.appoitment.findMany({
            include:{
                user:{
                    select:{
                        firstName:true,
                        lastName:true,
                        email:true,
                    }
                },
                doctor:{select:{name:true,imageUrl:true}},
            },
            orderBy:{createdAt:"desc"}
        })
    } catch (error) {
           console.log("Error fetching appoitments: ",error);
           throw new Error("Failed to fetch appoitments")
    }
}