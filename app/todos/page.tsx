"use client";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useGetTodos } from "../../services/GetTodos";
import { TodoResponse } from "@/types/todos/todo.type";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Home, PlusCircle } from "lucide-react";

const TodosPage = () => {
  const {
    data: todos,
    isLoading: fetchTodoLoading,
    isError: fetchTodoError,
  } = useGetTodos();

  return (
    <div className="container mx-auto py-10 max-w-3xl flex flex-col gap-3">
      <h1 className="font-bold text-lg">Todos Fetching Best Practice</h1>
      <div className="flex gap-2">
        <Link href={"todos/create"}>
          <Button className="rounded-full">
            <PlusCircle />
          </Button>
        </Link>
        <Link href={"/"}>
          <Button className="rounded-full">
            <Home />
          </Button>
        </Link>
      </div>

      {fetchTodoLoading ? (
        <p>Loading...</p>
      ) : fetchTodoError ? (
        <p>Failed to fetch todos</p>
      ) : (
        <DataTable columns={columns} data={todos?.data as TodoResponse[]} />
      )}
    </div>
  );
};

export default TodosPage;
