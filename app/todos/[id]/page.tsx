import React from "react";
import TodoDetail from "./TodoId";

const TodoIdPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <TodoDetail id={id} />;
};

export default TodoIdPage;
