import { axiosInstance } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/query-client";
import { BaseResponse } from "@/types/baseResponse";
import { TodoResponse } from "@/types/todos/todo.type";
import { useMutation } from "@tanstack/react-query";
import { getTodosQueryKey } from "./GetTodos";
import { TodoForm } from "./CreateTodo";

export const updateTodoData = async (data: TodoForm, id: string) => {
  const res = await axiosInstance.put<BaseResponse<TodoResponse>>(
    `/api/todos/${id}`,
    data
  );

  return res.data;
};

type useUpdateTodoParams = {
  id: string;
  mutationConfig?: MutationConfig<typeof updateTodoData>;
};

// (data: TodoForm, id: string) => Promise<BaseResponse<TodoResponse>>

export const useUpdateTodo = (params: useUpdateTodoParams) => {
  return useMutation({
    mutationFn: (data: TodoForm) => updateTodoData(data, params.id),
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
