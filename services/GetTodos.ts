import { axiosInstance } from "@/lib/axios";
import { QueryConfig } from "@/lib/query-client";
import { BaseResponse } from "@/types/baseResponse";
import { TodoResponse } from "@/types/todos/todo.type";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getTodos = async () => {
  const res = await axiosInstance.get<BaseResponse<TodoResponse[]>>(
    "/api/todos"
  );
  return res.data;
};

export const getTodosQueryKey = () => ["todos"];

const getTodosQueryOptions = () => {
  return queryOptions({
    queryKey: getTodosQueryKey(),
    queryFn: getTodos,
  });
};
type UseGetTodosParams = {
  queryConfig?: QueryConfig<typeof getTodosQueryOptions>;
};
export const useGetTodos = (params: UseGetTodosParams = {}) => {
  return useQuery({
    ...getTodosQueryOptions(),
    ...params.queryConfig,
  });
};
