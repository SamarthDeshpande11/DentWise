"use client";

import { useQuery } from "@tanstack/react-query";
import { getAppoitments } from "@/lib/actions/appoitments";

export function useGetAppointments(){
    const result=useQuery({
        queryKey:["getAppointments"],
        queryFn:getAppoitments,
    });
    return result;
}