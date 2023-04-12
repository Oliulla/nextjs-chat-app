"use client";

import { FC, useState } from "react";
import Button from "./ui/Button";
import { addFriendValidator } from "@/lib/validations/add-friend";
import axios, { AxiosError } from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface AddFriendButtonProps {}

type FormData = z.infer<typeof addFriendValidator>;

const AddFriendButton: FC<AddFriendButtonProps> = ({}) => {
  const [showSuccessState, setShowSuccessState] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(addFriendValidator),
  });

  const addFriend = async (email: string) => {
    try {
      const validatedEmail = addFriendValidator.parse({ email });

      await axios.post("/api/friends/add", {
        email: validatedEmail,
      });

      setShowSuccessState(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError("email", { message: error.message });
        return;
      }

      if (error instanceof AxiosError) {
        setError("email", { message: error.response?.data });
        return;
      }
      setError("email", { message: "something went wrong!!!" });
    }
  };

  const onSubmit = (data: FormData) => {
    addFriend(data.email);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm">
      <label
        htmlFor="email"
        className="block text-sm font-medium leading-6 text-gray-800"
      >
        Add friend by E-mail
      </label>
      <div className="mt-2 flex gap-4">
        <input
          {...register("email")}
          type="text"
          className="block w-auto rounded-md border-0 py-1.5
           text-gray-800 shadow-lg ring-1 ring-inset ring-gray-400 
           placeholder:text-gray-600 focus:ring-2 focus:ring-inset 
           focus:ring-indigo-800 sm:text-sm sm:leading-6"
          placeholder="example@example.com"
          required
        />
        <Button className="max-w-sm mx-auto w-auto">Add Friend</Button>
      </div>
      <p className="mt-1 text-sm text-red-700">{errors.email?.message}</p>
      {showSuccessState ? (
        <p className="mt-1 text-sm text-green-500">Friend Request Sent!</p>
      ) : null}
    </form>
  );
};

export default AddFriendButton;
