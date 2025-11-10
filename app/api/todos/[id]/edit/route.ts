import { apiHandler } from "@/lib/apiHandler";
import { prisma } from "@/lib/prisma";

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
        message: "Successfully retrieved todo edit",
        data: todo,
      },
      { status: 200 }
    );
  });
};
