/**
 * Renders a login form component.
 * @returns The rendered login form component.
 */

"use client"; // Directive indicating that the following code is client-side.

import z, { set } from "zod"; // Importing zod library for schema validation.

import { useState, useTransition } from "react"; // Importing useTransition from react for transitions.
import { useForm } from "react-hook-form"; // Importing useForm from react-hook-form for form handling.
import { zodResolver } from "@hookform/resolvers/zod"; // Importing zodResolver from @hookform/resolvers/zod to integrate zod with react-hook-form.
import { registerSchema } from "@/schemas"; // Importing registerSchema which is a zod schema defining the structure of login data.

// Importing various components for building the form.
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { register } from "@/actions/register";
import { start } from "repl";

// LoginForm component definition.
export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>(""); // Initializing an error state.
  const [success, setSuccess] = useState<string | undefined>(""); // Initializing an error state.
  const [isPending, startTransition] = useTransition(); // Initializing a transition.
  // Using useForm hook to create a form object that handles the form state.
  // z.infer<typeof registerSchema> is used to infer the type of form data from registerSchema.
  // resolver: zodResolver(registerSchema) is used to validate form data using registerSchema.
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    setError(""); // Resetting the error state.
    setSuccess(""); // Resetting the success state.

    startTransition(() => {
      register(values) // Calling the login action with the form data.
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);
        });
    });
  };
  // Rendering the form inside a CardWrapper.
  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonLabel="Already have an account? Login here"
      backButtonHref="/login"
      showSocial
      className="bg-white h-fit p-8 rounded-lg shadow-md w-full max-w-sm md:max-w-md lg:max-w-md xl:max-w-md"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4 w-full">
            {/* FormField component for rendering the email field. */}
            {/* // control={form.control} is used to connect the field to the form object. */}
            {/* // name="email" sets the name of the field. */}
            {/* // render={({ field }) => (...)} is used to render the actual input field. */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="John Doe"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="john.doe@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="*********"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} /> {/* Invalid credentials ! */}
          <FormSuccess message={success} /> {/* Login successful! */}
          <Button
            disabled={isPending}
            type="submit"
            size="lg"
            className="w-full"
          >
            Create an account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
