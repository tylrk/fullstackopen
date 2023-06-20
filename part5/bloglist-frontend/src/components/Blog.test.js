import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("renders blog title and author", () => {
  const blog = {
    title: "Test Blog",
    author: "TK",
    url: "www.test.com",
    likes: 420,
    user: {
      name: "Tyler",
      username: "tylrk",
    },
  };

  render(<Blog blog={blog} />);

  const titleElement = screen.getByText(/Test Blog/);
  const authorElement = screen.getByText(/TK/);
  const urlElement = screen.queryByText(/www.test.com/);
  const likesElement = screen.queryByText(/420/);

  expect(titleElement).toBeDefined();
  expect(authorElement).toBeDefined();
  expect(urlElement).toBeNull();
  expect(likesElement).toBeNull();
});
