import { Todo } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newTodo: {
      title: string;
      content: string;
      isDone: boolean;
    }) => {
      const res = await fetch("http://localhost:4000/todos", {
        method: "POST",
        body: JSON.stringify(newTodo),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
};

export const useSwitchTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      todoId,
      isDone,
    }: {
      todoId: number;
      isDone: boolean;
    }) => {
      const res = await fetch(`http://localhost:4000/todos/${todoId}`, {
        method: "PATCH",
        body: JSON.stringify({ isDone }),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (todoId: number) => {
      const res = await fetch(`http://localhost:4000/todos/${todoId}`, {
        method: "DELETE",
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
};
