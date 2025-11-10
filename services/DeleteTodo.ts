import { axiosInstance } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/query-client";
import { useMutation } from "@tanstack/react-query";
import { getTodosQueryKey } from "./GetTodos";

export const deleteTodoData = async (id: string) => {
  const res = await axiosInstance.delete(`/api/todos/${id}`);
  return res.data;
};

type useDeleteTodoParams = {
  id: string;
  mutationConfig?: MutationConfig<typeof deleteTodoData>;
};

export const useDeleteTodo = (params: useDeleteTodoParams) => {
  return useMutation({
    mutationFn: () => deleteTodoData(params.id),
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
