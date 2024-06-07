/**
 * Renders a login form component.
 * @returns The rendered login form component.
 */

"use client"; // Directive indicating that the following code is client-side.

import z from "zod"; // Importing zod library for schema validation.

import { useForm } from "react-hook-form"; // Importing useForm from react-hook-form for form handling.
import { useState, useTransition } from "react"; // Importing useTransition from react for transitions.
import { zodResolver } from "@hookform/resolvers/zod"; // Importing zodResolver from @hookform/resolvers/zod to integrate zod with react-hook-form.

import { resetSchema } from "@/schemas"; // Importing resetSchema which is a zod schema defining the structure of login data.
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
import { resetPassword } from "@/actions/reset";

// LoginForm component definition.
export const ResetPasswordForm = () => {
  const [error, setError] = useState<string | undefined>(""); // Initializing an error state.
  const [success, setSuccess] = useState<string | undefined>(""); // Initializing an error state.
  const [isPending, startTransition] = useTransition(); // Initializing a transition.
  // Using useForm hook to create a form object that handles the form state.
  // z.infer<typeof resetSchema> is used to infer the type of form data from resetSchema.
  // resolver: zodResolver(resetSchema) is used to validate form data using resetSchema.
  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },  
  });

  const onSubmit = (values: z.infer<typeof resetSchema>) => {
    setError(""); // Resetting the error state.
    setSuccess(""); // Resetting the success state.

    startTransition(() => {
      resetPassword(values) // Calling the login action with the form data.
        .then((data?) => {
          setError(data?.error);
          setSuccess(data?.success);
        });
    });
  };
  // Rendering the form inside a CardWrapper.
  return (
    <CardWrapper
      headerLabel="Forgot your password"
      backButtonLabel="Back to login"
      backButtonHref="/login"
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
                  <FormLabel className="text-secondary">Email</FormLabel>
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
          </div>
          <FormError message={error} /> {/* Invalid credentials ! */}
          <FormSuccess message={success} /> {/* Login successful! */}
          <Button
            disabled={isPending}
            type="submit"
            size="lg"
            className="w-full text-seccondary text-transform: uppercase "
            variant="default"
          >
            Send reset email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
