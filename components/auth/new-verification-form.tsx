"use client";

import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";

import { newVerification } from "@/actions/new-verification";
import { CardWrapper } from "./card-wrapper";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const OnSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      SetError: "Missing token!";
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success || "");
        setError(data.error || "");
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, success, error]);

  useEffect(() => {
    OnSubmit();
  }, [OnSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/login"
      className="bg-white h-fit p-8 rounded-lg shadow-md w-full max-w-sm md:max-w-md lg:max-w-md xl:max-w-md"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success || ""} />
        {!success && <FormError message={error || ""} />}
      </div>
    </CardWrapper>
  );
};
