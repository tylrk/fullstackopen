import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../requests";
import { useContext } from "react";
import { NotifContext, showNotif, hideNotif } from "../NotifContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const { notifDispatch } = useContext(NotifContext); // Get notifDispatch from context

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    },
    onError: (error) => {
      showNotif(notifDispatch, error.response.data.error);
      setTimeout(() => hideNotif(notifDispatch), 5000);
    },
  });

  const addAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, votes: 0 });
    showNotif(notifDispatch, `${content} has been added`);
    setTimeout(() => hideNotif(notifDispatch), 5000);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
