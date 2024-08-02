import React from 'react';
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

let renderCount = 0;

type FormValues = {
  name: string;
  email: string;
  message: string;
};

export const ContactForm = () => {
  const form = useForm<FormValues>();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted", data);
  };

  renderCount++;
  return (
    <div>
      <h1>Contact Form ({(renderCount / 2)})</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            {...register("name", {
              required: "Please insert your name"
            })}
          />
          <br />
          <br />
          <p className="error">{errors.name?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            {...register("email", {
              required: "Please enter your email", // Correct placement of required rule
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Please enter a valid email address",
              }
            })}
          />
          <br />
          <br />
          <p className="error">{errors.email?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="message">Message</label>
          <input
            id="message"
            {...register("message", {
              required: {
                value: true,
                message: "Please enter a message",
              }
            })}
          />
          <br />
          <br />
          <p className="error">{errors.message?.message}</p>
        </div>
        <button type="submit">Submit</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};
