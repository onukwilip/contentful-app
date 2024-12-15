"use client";
import { useModalContext } from "@/contexts/Modal.context";
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  Snackbar,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { TTodoItem } from "../../../types";
import Image from "next/image";
import add_todo from "../actions/AddTodo.action";
import useFetch from "@/hooks/useFetch.hook";
import { useTodoContext } from "@/contexts/Todos.context";

const AddItem = () => {
  const { open, closeModal } = useModalContext();
  const { addTodo } = useTodoContext();
  const { display_loading, display_error, display_success, ...add_state } =
    useFetch();
  const [form_state, setFormState] = useState<TTodoItem<"post">>({
    title: "",
    completed: false,
    coverImage: undefined,
    description: "",
  });

  const handleInputChange = (key: string, value: any) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageUpload: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { files, name },
  }) => {
    if (!files || !files[0]) return;

    const [file] = files;

    if (
      !["png", "jpg", "webp", "jpeg"].includes(file.name.split(".").pop() || "")
    )
      return;

    handleInputChange(name, file);
  };

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    try {
      e.preventDefault();

      display_loading();

      await add_todo(form_state);

      display_success("Todo added successfully");

      addTodo({
        ...form_state,
        ...(form_state.coverImage
          ? { coverImage: URL.createObjectURL(form_state.coverImage as Blob) }
          : {}),
      });

      closeModal();
    } catch (error: any) {
      display_error(error.message || error);
    }
  };

  useEffect(() => {
    setFormState({
      title: "",
      completed: false,
      coverImage: undefined,
      description: "",
    });
  }, [open]);

  return (
    <>
      <Dialog onClose={closeModal} open={open}>
        <DialogTitle>Add Todo</DialogTitle>
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col gap-4 py-2 px-4 min-w-[400px]"
        >
          {/* Image upload */}
          {form_state.coverImage ? (
            <>
              {/* Uploaded Image */}
              <label className="w-full h-[200px] rounded-md overflow-hidden cursor-pointer">
                <Image
                  width={300}
                  height={200}
                  src={URL.createObjectURL(form_state.coverImage as Blob)}
                  alt="Uploaded image"
                  className="w-full h-[200px] object-cover object-top"
                />
                <input
                  type="file"
                  name="coverImage"
                  id="upload_image"
                  onChange={handleImageUpload}
                  hidden
                />
              </label>
            </>
          ) : (
            <>
              {/* Upload Image */}
              <label
                className="w-full rounded-md bg-black/5 flex flex-col items-center justify-center h-[200px] cursor-pointer"
                htmlFor="upload_image"
              >
                <i className="fas fa-cloud-arrow-up text-6xl"></i>
                <span className="text-xl">Upload Image</span>
                <input
                  type="file"
                  name="coverImage"
                  id="upload_image"
                  onChange={handleImageUpload}
                  hidden
                />
              </label>
            </>
          )}
          <TextField
            name="title"
            value={form_state.title}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            placeholder="Enter todo title here..."
            label="Title"
            variant="standard"
            required
          />
          <TextField
            name="description"
            value={form_state.description}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            placeholder="Enter todo description here..."
            label="Description"
            variant="outlined"
            rows={4}
            multiline
          />
          <div className="w-full flex justify-end">
            <Button
              type="submit"
              className="flex justify-center items-center"
              disabled={add_state.loading}
            >
              {add_state.loading ? (
                <>
                  <CircularProgress size={"1rem"} />
                </>
              ) : (
                "Add Todo"
              )}
            </Button>
          </div>
        </form>
      </Dialog>
      {add_state.error && (
        <Snackbar
          open={add_state.error ? true : false}
          onClose={() => add_state.setError(undefined)}
        >
          <Alert color="error" onClose={() => add_state.setError(undefined)}>
            {add_state.error}
          </Alert>
        </Snackbar>
      )}
      {add_state.success && (
        <Snackbar
          open={add_state.success ? true : false}
          onClose={() => add_state.setSuccess(undefined)}
        >
          <Alert
            color="success"
            onClose={() => add_state.setSuccess(undefined)}
          >
            {add_state.success}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default AddItem;
