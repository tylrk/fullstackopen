import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAnecdotes, voteOnAnecdote } from "./requests";
import {
  NotifContextProvider,
  NotifContext,
  showNotif,
  hideNotif,
} from "./NotifContext";
import { useContext } from "react";

const App = () => {
  const queryClient = useQueryClient();
  const { notifDispatch } = useContext(NotifContext);

  const voteMutation = useMutation(voteOnAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });
  const handleVote = (anecdote) => {
    voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    showNotif(notifDispatch, `You voted for anecdote '${anecdote.content}'`);
    setTimeout(() => hideNotif(notifDispatch), 5000);
  };

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 1,
  });

  if (result.isError) {
    return <div>Anecdote service is unavailable due to server issues</div>;
  }

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
