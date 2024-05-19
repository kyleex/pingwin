/**
 * Renders a login form component.
 * @returns The rendered login form component.
 */

"use client"; // Directive indicating that the following code is client-side.

import z, { set } from "zod"; // Importing zod library for schema validation.

import { useState, useTransition } from "react"; // Importing useTransition from react for transitions.
import { useForm } from "react-hook-form"; // Importing useForm from react-hook-form for form handling.
import { zodResolver } from "@hookform/resolvers/zod"; // Importing zodResolver from @hookform/resolvers/zod to integrate zod with react-hook-form.
import { loginSchema } from "@/schemas"; // Importing loginSchema which is a zod schema defining the structure of login data.

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
import { login } from "@/actions/login";
import { start } from "repl";

// LoginForm component definition.
export const LoginForm = () => {
  const [error, setError] = useState<string | undefined>(""); // Initializing an error state.
  const [success, setSuccess] = useState<string | undefined>(""); // Initializing an error state.
  const [isPending, startTransition] = useTransition(); // Initializing a transition.
  // Using useForm hook to create a form object that handles the form state.
  // z.infer<typeof loginSchema> is used to infer the type of form data from loginSchema.
  // resolver: zodResolver(loginSchema) is used to validate form data using loginSchema.
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    setError(""); // Resetting the error state.
    setSuccess(""); // Resetting the success state.

    startTransition(() => {
      login(values) // Calling the login action with the form data.
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);
        });
    });
  };
  // Rendering the form inside a CardWrapper.
  return (
    <CardWrapper
      headerLabel="Welcome Back"
      backButtonLabel="Don't have an account"
      backButtonHref="/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* FormField component for rendering the email field. */}
            {/* // control={form.control} is used to connect the field to the form object. */}
            {/* // name="email" sets the name of the field. */}
            {/* // render={({ field }) => (...)} is used to render the actual input field. */}
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
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
