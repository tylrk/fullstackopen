import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    // vote(state, action) {
    //   const id = action.payload;
    //   const anecdoteToChange = state.find((a) => a.id === id);
    //   const changedAnecdote = {
    //     ...anecdoteToChange,
    //     votes: anecdoteToChange.votes + 1,
    //   };
    //   return state.map((a) => (a.id !== id ? a : changedAnecdote));
    // },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const vote = (anecdote) => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    const anecdoteToChange = anecdotes.find((a) => a.id === anecdote.id);
    const votedAnecdote = { ...anecdoteToChange, votes: anecdote.votes + 1 };

    const updatedAnecdote = await anecdoteService.vote(
      anecdote.id,
      votedAnecdote
    );

    const updatedList = anecdotes.map((a) =>
      a.id !== anecdote.id ? a : updatedAnecdote
    );
    dispatch(setAnecdotes(updatedList));
  };
};

export default anecdoteSlice.reducer;
