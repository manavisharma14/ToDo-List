import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try{
        const tasks = await prisma.todo.findMany();
        return NextResponse.json(tasks, {status: 200});
    } catch(error){
        console.error("Error fetching tasks:", error);
        return NextResponse.json({message: "Internal Server Error"}, {status: 500});
    }
}
export async function POST( request: NextRequest ){
    try{
        const {title} = await request.json();
        if(!title){
            return NextResponse.json({message: "Title is required"}, {status: 400});
        }
        // create a new task in db
        const newTask = await prisma.todo.create({
            data: {
                title: title,
                completed: false
            }
        })
        return NextResponse.json(newTask, {status: 201});
    } catch(error){
        console.error("Error creating task:", error);
        return NextResponse.json({message: "Internal Server Error"}, {status: 500});
    }
}
export async function DELETE( request: NextRequest ){
    const id = request.nextUrl.searchParams.get("id");

    try{
        if (!id) {
            return NextResponse.json({ message: "ID is required" }, { status: 400 });
        }
        // delete the task from the database

        await prisma.todo.delete({
            where :{
                id: id
            }
        })
        return NextResponse.json({message: "Task deleted successfully"}, {status: 200})

    }catch(error){
        console.error("Error deleting task:", error);
        return NextResponse.json({message: "Internal Server Error"}, {status: 500});
    }
}