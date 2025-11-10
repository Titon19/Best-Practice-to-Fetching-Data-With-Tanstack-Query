import { axiosInstance } from "@/lib/axios";
import { QueryConfig } from "@/lib/query-client";
import { BaseResponse } from "@/types/baseResponse";
import { TodoResponse } from "@/types/todos/todo.type";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { queryGetTodoKey } from "./GetTodoById";

export const getEditTodo = async (id: string) => {
  const res = await axiosInstance.get<BaseResponse<TodoResponse>>(
    `/api/todos/${id}/edit`
  );

  return res.data;
};

const queryGetTodoEditKey = (id: string) => ["todo-edit", id];

const getEditTodoQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: queryGetTodoEditKey(id),
    queryFn: () => getEditTodo(id),
  });
};
type useGetEditTodoParams = {
  queryConfig?: QueryConfig<typeof getEditTodoQueryOptions>;
  id: string;
};
export const useGetEditTodo = (params: useGetEditTodoParams) => {
  return useQuery({
    ...getEditTodoQueryOptions(params.id),
    ...params.queryConfig,
  });
};
