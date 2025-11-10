"use client";

import { Button } from "@/components/ui/button";
import { Todo } from "@/types/todos/todo.type";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import Action from "./action";
import { Eye } from "lucide-react";

export const columns: ColumnDef<Todo>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Desc",
  },
  {
    accessorKey: "action",
    cell: ({ row }) => {
      const todo = row.original;
      return (
        <div className="flex gap-2">
          <Button value={todo.id} size={"icon"} className="rounded-full">
            <Link href={`todos/${todo.id}`}>
              <Eye />
            </Link>
          </Button>

          <Action id={todo.id} />
        </div>
      );
    },
  },
];
