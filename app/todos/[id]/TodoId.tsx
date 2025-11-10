"use client";
import { useGetTodoById } from "../../../services/GetTodoById";
import { TodoResponse } from "@/types/todos/todo.type";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const TodoDetail = ({ id }: { id: string }) => {
  const {
    data: todoById,
    isLoading: fetchTodoByIdLoading,
    isError: fetchTodoByIdError,
  } = useGetTodoById({
    id,
    queryConfig: {
      enabled: !!id,
    },
  });

  const todo = todoById?.data as TodoResponse;

  return (
    <div className="flex justify-center items-center p-8 flex-col">
      <h1 className="font-bold text-2xl">Todo Detail</h1>
      {fetchTodoByIdLoading ? (
        <p>Loading...</p>
      ) : fetchTodoByIdError ? (
        <p>Failed to get todo detail</p>
      ) : (
        <div className="flex flex-col gap-3">
          <Button>
            <Link href={"/todos"}>Back</Link>
          </Button>
          {todo?.title} - {todo?.description}
        </div>
      )}
    </div>
  );
};

export default TodoDetail;
