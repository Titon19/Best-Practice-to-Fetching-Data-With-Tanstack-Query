"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TodoForm, todoSchema, useCreateTodo } from "@/services/CreateTodo";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const CreateTodo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoForm>({
    resolver: zodResolver(todoSchema),
  });

  const { mutateAsync: createTodoData, isPending: isPendingCreateTodo } =
    useCreateTodo();

  const Router = useRouter();
  const onSubmit = (data: TodoForm) => {
    try {
      Router.push("/todos");
      return createTodoData(data);
    } catch (error) {
      console.log(error);
    }
  };

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
        <Button type="submit" disabled={isPendingCreateTodo}>
          {isPendingCreateTodo ? "Saving..." : "Save"}
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

export default CreateTodo;
