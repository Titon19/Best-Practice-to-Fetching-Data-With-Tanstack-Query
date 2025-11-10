import { axiosInstance } from "@/lib/axios";
import { QueryConfig } from "@/lib/query-client";
import { BaseResponse } from "@/types/baseResponse";
import { TodoResponse } from "@/types/todos/todo.type";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getTodoById = async (id: string) => {
  const res = await axiosInstance.get<BaseResponse<TodoResponse>>(
    `/api/todos/${id}`
  );

  return res.data;
};

export const queryGetTodoKey = (id: string) => ["todo", id];

const getTodoByIdQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: queryGetTodoKey(id),
    queryFn: () => getTodoById(id),
  });
};
type UseGetTodoParams = {
  queryConfig?: QueryConfig<typeof getTodoByIdQueryOptions>;
  id: string;
};
export const useGetTodoById = (params: UseGetTodoParams) => {
  return useQuery({
    ...getTodoByIdQueryOptions(params.id),
    ...params.queryConfig,
  });
};
