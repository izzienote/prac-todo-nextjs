import { useAddTodo } from "@/hooks/mutation";
import React, { useState } from "react";

const TodoForm = () => {
  // 투두 추가하는 뮤테이션
  const addMutation = useAddTodo();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  //handleSubmit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addMutation.mutate({ title, content, isDone: false });
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-10 mt-10">
      <input
        type="text"
        placeholder="제목을 입력해주세요"
        className="border border-gray-200 rounded-xl px-3 py-2"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <input
        type="text"
        placeholder="내용을 입력해주세요"
        className="border border-gray-200 rounded-xl px-3 py-2"
        onChange={(e) => setContent(e.target.value)}
        value={content}
      />
      <button
        type="submit"
        className="bg-blue-400 px-3 py-2 rounded-md text-white"
      >
        추가
      </button>
    </form>
  );
};

export default TodoForm;
