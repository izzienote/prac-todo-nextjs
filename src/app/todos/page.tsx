"use client";

import TodoForm from "@/components/TodoForm";
import List from "@/components/List";

const TodoListPage = () => {
  return (
    <div>
      <div>넥스트 투두리스트</div>
      <TodoForm />

      <List listFor="done" />
      <List listFor="todo" />
    </div>
  );
};

export default TodoListPage;
