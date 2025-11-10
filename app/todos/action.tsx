import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Edit2 } from "lucide-react";
import DeleteDialog from "@/components/delete-dialog";
import { useDeleteTodo } from "@/services/DeleteTodo";

type ActionProps = {
  id: string;
};

const Action = ({ id }: ActionProps) => {
  const { mutateAsync: deleteTodo, isPending: isPendingDeleteTodo } =
    useDeleteTodo({
      id,
    });

  const handleDelete = async (id: string) => {
    await deleteTodo(id);
  };

  return (
    <div className="flex gap-2">
      <Button asChild className="rounded-full" size={"icon"}>
        <Link href={`/todos/${id}/edit`}>
          <Edit2 />
        </Link>
      </Button>
      <DeleteDialog
        onDelete={handleDelete}
        id={id}
        isPending={isPendingDeleteTodo}
      />
    </div>
  );
};

export default Action;
