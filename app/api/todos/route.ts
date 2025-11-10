import { apiHandler } from "@/lib/apiHandler";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
const todoSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(3),
});

export const GET = (req: Request) =>
  apiHandler(req, async () => {
    const todos = await prisma.todos.findMany({ orderBy: { id: "desc" } });
    return new Response(
      JSON.stringify({
        data: todos,
        success: true,
        message: "Successfully get todos",
      }),
      {
        status: 200,
      }
    );
  });

export const POST = (req: Request) =>
  apiHandler(req, async (req) => {
    const body = await req.json();
    const parsed = todoSchema.safeParse(body);

    if (!parsed.success) {
      return new Response(
        JSON.stringify({
          success: false,
          message: parsed.error.issues[0].message,
        }),
        { status: 400 }
      );
    }

    const newTodo = await prisma.todos.create({ data: parsed.data });

    return new Response(
      JSON.stringify({
        data: newTodo,
        message: "Successfully create todo",
        success: true,
      }),
      { status: 201 }
    );
  });
