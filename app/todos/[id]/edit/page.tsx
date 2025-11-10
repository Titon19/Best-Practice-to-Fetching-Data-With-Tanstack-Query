"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TodoForm, todoSchema } from "@/services/CreateTodo";
import Link from "next/link";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useUpdateTodo } from "@/services/UpdateTodo";
import { TodoResponse } from "@/types/todos/todo.type";
import { useGetEditTodo } from "@/services/EditTodo";

const EditTodo = () => {
  const router = useRouter();
  const params = useParams();

  const id = params.id as string;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoForm>({
    resolver: zodResolver(todoSchema),
  });

  const { mutateAsync: UpdateTodoData, isPending: isPendingUpdateTodo } =
    useUpdateTodo({ id });

  const onSubmit = (data: TodoForm) => {
    try {
      router.push("/todos");
      return UpdateTodoData(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Get Edit Data
  const { data: getTodoEditData, isLoading: isLoadingTodoEditData } =
    useGetEditTodo({ id });

  const todoData = getTodoEditData?.data as TodoResponse | undefined;

  useEffect(() => {
    console.log("todoData:", todoData);

    if (!isLoadingTodoEditData && todoData) {
      reset(todoData);
    }
  }, [reset, todoData, isLoadingTodoEditData]);

  return (
    <div className="max-w-7xl flex flex-col gap-8 justify-center items-center p-4">
      <h1 className="font-bold text-2xl">Tambah Todo</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-96"
      >
        <Label className="flex flex-col items-start">
          Title
          <Input placeholder="title" {...register("title")}></Input>
        </Label>
        {errors.title && (
          <p className="text-red-600">{errors.title?.message}</p>
        )}
        <Label className="flex flex-col items-start">
          Description
          <Input placeholder="desc" {...register("description")}></Input>
        </Label>
        {errors.description && (
          <p className="text-red-600">{errors.description?.message}</p>
        )}
        <Button type="submit" disabled={isPendingUpdateTodo}>
          {isPendingUpdateTodo ? "Saving..." : "Save"}
        </Button>

        <Link href={"/todos"}>
          <Button variant="outline" className="w-full">
            Back
          </Button>
        </Link>
      </form>
    </div>
  );
};

export default EditTodo;
