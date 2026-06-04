import React from "react";
import { Link } from "react-router";
import { AuthForm } from "../../components/container/auth/auth-form";

const SignUpPage = () => {
  return (
    <div className="mx-auto w-full max-w-lg px-4 py-8">
      <div className="space-y-2 text-center">
        <h1 className="font-semibold text-2xl text-white ">Create your account</h1>
        <p className="text-muted-foreground text-sm text-white">Sign up to get started.</p>
      </div>
      <div className="mt-6">
        <AuthForm mode="sign-up" />
      </div>
      <p className="mt-4 text-center text-muted-foreground text-sm text-white">
        Already have an account?{" "}
        <Link to="/auth/sign-in" className="underline">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default SignUpPage;
