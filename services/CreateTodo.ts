import { axiosInstance } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/query-client";
import { BaseResponse } from "@/types/baseResponse";
import { TodoResponse } from "@/types/todos/todo.type";
import { useMutation } from "@tanstack/react-query";
import z from "zod";
import { getTodosQueryKey } from "./GetTodos";

export const todoSchema = z.object({
  title: z.string().min(3, "Title minimal 3 karakter"),
  description: z.string().min(5, "Deskripsi minimal 5 karakter"),
});

export type TodoForm = z.infer<typeof todoSchema>;

export const createTodoData = async (data: TodoForm) => {
  const res = await axiosInstance.post<BaseResponse<TodoResponse>>(
    "/api/todos",
    data
  );

  return res.data;
};

type useCreateTodoParams = {
  mutationConfig?: MutationConfig<typeof createTodoData>;
};

export const useCreateTodo = (params: useCreateTodoParams = {}) => {
  return useMutation({
    mutationFn: createTodoData,
    ...params.mutationConfig,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: getTodosQueryKey() });

      params.mutationConfig?.onSuccess?.(
        data,
        variables,
        onMutateResult,
        context
      );
    },
  });
};
