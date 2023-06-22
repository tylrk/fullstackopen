import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("testing Blog component", () => {
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

  const mockHandler = jest.fn();

  beforeEach(() => {
    render(<Blog blog={blog} like={mockHandler} />);
  });

  test("renders blog title and author", () => {
    const titleElement = screen.getByText(/Test Blog/);
    const authorElement = screen.getByText(/TK/);
    const urlElement = screen.queryByText(/www.test.com/);
    const likesElement = screen.queryByText(/420/);

    expect(titleElement).toBeDefined();
    expect(authorElement).toBeDefined();
    expect(urlElement).toBeNull();
    expect(likesElement).toBeNull();
  });

  test("when view button is clicked, the url and likes are shown", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("View");
    await user.click(button);

    const urlElement = screen.queryByText(/www.test.com/);
    const likesElement = screen.queryByText(/420/);

    expect(urlElement).toBeInTheDocument();
    expect(likesElement).toBeInTheDocument();
  });

  test("when like button is clicked twice, event handler is called twice", async () => {
    const user = userEvent.setup();
    const viewButton = screen.getByText("View");
    await user.click(viewButton);

    const likeButton = screen.getByText("Like");
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
