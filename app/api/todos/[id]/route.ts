import { apiHandler } from "@/lib/apiHandler";
import { prisma } from "@/lib/prisma";
import { todoSchema } from "@/services/CreateTodo";

export const GET = async (
  req: Request,
  context: { params: Promise<{ id: string }> }
) => {
  const { id } = await context.params; // <-- WAJIB pakai await di sini

  return apiHandler(req, async () => {
    const todoId = Number(id);

    if (isNaN(todoId)) {
      return Response.json(
        {
          success: false,
          message: "Invalid todo ID",
          data: null,
        },
        { status: 400 }
      );
    }

    const todo = await prisma.todos.findUnique({
      where: { id: todoId },
    });

    if (!todo) {
      return Response.json(
        {
          success: false,
          message: "Todo not found",
          data: null,
        },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Successfully retrieved todo",
        data: todo,
      },
      { status: 200 }
    );
  });
};

export const PUT = async (
  req: Request,
  context: { params: Promise<{ id: string }> }
) => {
  const { id } = await context.params;

  return apiHandler(req, async (req) => {
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

    // cari dlu idnya di database
    const todoId = Number(id);
    const existingTodo = await prisma.todos.findUnique({
      where: { id: todoId },
    });

    // cek ada kalo gaada kasih aja pesan
    if (!existingTodo) {
      return Response.json(
        { success: false, message: "Todo not found" },
        { status: 404 }
      );
    }

    // kalo ada update langsung
    const updated = await prisma.todos.update({
      where: { id: todoId },
      data: parsed.data,
    });

    return new Response(
      JSON.stringify({
        data: updated,
        message: "Successfully updated todo",
        success: true,
      }),
      { status: 201 }
    );
  });
};

export const DELETE = async (
  req: Request,
  context: { params: Promise<{ id: string }> }
) => {
  const { id } = await context.params;

  return apiHandler(req, async (req) => {
    const todoId = Number(id);
    const findDataById = await prisma.todos.findUnique({
      where: { id: todoId },
    });

    if (!findDataById) {
      return Response.json(
        { success: false, message: "Todo not found" },
        { status: 404 }
      );
    }

    const deleting = await prisma.todos.delete({
      where: { id: todoId },
    });

    return new Response(
      JSON.stringify({
        data: deleting,
        message: "Successfully deleted todo",
        success: true,
      }),
      { status: 201 }
    );
  });
};
