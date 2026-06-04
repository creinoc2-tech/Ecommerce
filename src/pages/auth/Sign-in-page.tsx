import React from "react";
import { Link } from "react-router";
import { AuthForm } from "../../components/container/auth/auth-form";

export const SignInPage = () => {
    
  return (
    <div className="mx-auto w-full max-w-lg px-4 py-8">
      <div className="space-y-2 text-center">
        <h1 className="font-semibold text-2xl text-white">Sign in to your account</h1>
        <p className="text-muted-foreground text-sm text-white">
          Welcome back. Please enter your details.
        </p>
      </div>
      <div className="mt-6">
         <AuthForm
          mode="sign-in"
         />
      </div>
      <p className="mt-4 text-center text-muted-foreground text-sm text-neutral-400">
        Don't have an account?{" "}
        <Link to="/auth/sign-up" className="underline">
          Sign up
        </Link>
      </p>
    </div>
  );
};
