"use server";
import {prisma} from "../prisma"
import {auth} from "@clerk/nextjs/server"

function transformAppointment(appointment: any) {
  return {
    ...appointment,
    patientName: `${appointment.user.firstName || ""} ${appointment.user.lastName || ""}`.trim(),
    patientEmail: appointment.user.email,
    doctorName: appointment.doctor.name,
    doctorImageUrl: appointment.doctor.imageUrl || "",
    date: appointment.date.toISOString().split("T")[0],
  };
}

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

export async function getUserAppoitmentStats(){
    try {
        const {userId}=await auth();
        if(!userId) throw new Error("You must be authenticated")

        const user=await prisma.user.findUnique({where:{clerkid:userId}})

        if(!user) throw new Error("User not Found")
        
        const [totalCount,completedCount]=await Promise.all([
            prisma.appoitment.count({
                where:{userId:user.id}
            }),
            prisma.appoitment.count({
                where:{
                    userId:user.id,
                    status:"COMPLETED"
                }
            })
        ]);
        return {
            totalAppointments: totalCount,
            completedAppointments: completedCount,
        };

    } catch (error) {
        console.error("Error fetching user appoitment stats:",error);
        return {totalAppoitments:0,completedAppoitments:0}
    }
}

export async function getUserAppoitments(){
    try {
        const {userId}=await auth();
        if(!userId) throw new Error("You must be logged in to view appoitments");

        const user=await prisma.user.findUnique({where:{clerkid:userId}})

        if(!user) throw new Error("User not found.Please ensure your account is properly setup")

        const appoitments=await prisma.appoitment.findMany({
            where:{userId:user.id},
            include:{
                user:{select:{firstName:true,lastName:true,email:true}},
                doctor:{select:{name:true,imageUrl:true}},
            },
            orderBy:[{date:"asc"},{time:"asc"}],
        });
        return appoitments.map(transformAppointment)
    } catch (error) {
        console.log("Error fetching user appoitments:",error);
        throw new Error("Failed to fetch user appoitments");
    }
}

