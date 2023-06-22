import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("BlogForm calls event handler when a new blog is created", async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();

  render(<BlogForm createBlog={createBlog} />);

  const titleInput = screen.getByPlaceholderText("Enter Title");
  const authorInput = screen.getByPlaceholderText("Enter Author");
  const urlInput = screen.getByPlaceholderText("Enter URL");
  const button = screen.getByText("Create");

  await user.type(titleInput, "Form Test");
  await user.type(authorInput, "TK");
  await user.type(urlInput, "www.test.com");
  await user.click(button);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: "Form Test",
    author: "TK",
    url: "www.test.com",
  });
});
