import { useDeleteTodo, useSwitchTodo } from "@/hooks/mutation";
import { useTodos } from "@/hooks/queries";

const List = ({ listFor }: { listFor: "done" | "todo" }) => {
  // 투두 취소/완료 스위치 뮤테이션
  const switchMutation = useSwitchTodo();
  // 투두 삭제 뮤테이션
  const deleteMutation = useDeleteTodo();

  // [1] useQuery
  const { data: todos, isPending, isError } = useTodos();

  if (isPending) {
    return <div>로딩중입니다....</div>;
  }

  if (isError) {
    throw isError;
  }

  // [2] handleSwitch
  const handleSwitch = ({
    todoId,
    isDone,
  }: {
    todoId: number;
    isDone: boolean;
  }) => {
    switchMutation.mutate({
      todoId,
      isDone,
    });
  };

  // [3] handleDelete
  const handleDelete = (todoId: number) => {
    deleteMutation.mutate(todoId);
  };

  return (
    <div>
      <div className="text-pink-400">
        {listFor === "done" ? "완료 리스트" : "할일 리스트"}
      </div>
      {todos
        .filter((todo) => {
          if (listFor === "done") {
            return todo.isDone === true;
          } else {
            return todo.isDone === false;
          }
        })
        .map((todo) => {
          return (
            <div
              key={todo.id}
              className="border border-gray-200 p-4 rounded-md mb-4"
            >
              <h2>{todo.title}</h2>
              <p>{todo.content}</p>
              <div className="flex gap-4">
                <button
                  onClick={() =>
                    handleSwitch({
                      todoId: todo.id,
                      isDone: !todo.isDone,
                    })
                  }
                  className="bg-pink-300 px-3 py-1 rounded-md text-white"
                >
                  {listFor === "done" ? "취소" : "완료"}
                </button>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="bg-red-500 px-3 py-1 rounded-md text-white"
                >
                  삭제
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default List;
