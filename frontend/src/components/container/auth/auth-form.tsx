import React, { type FC } from "react";
import { LoginSchema, RegisterSchema } from "../../../schema/auth.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";
import { useLoginUsuarioYSesionMutate } from "../../../stack/auth/login-Stack";
import { useCrearUsuarioYSesionMutate } from "../../../stack/auth/register-Stack";

interface AuthFormProps {
  mode: "sign-in" | "sign-up";
  onSuccess?: () => void;
  redirectUrl?: string;
}

type AuthFormFields = {
  email: string;
  password: string;
  fullName?: string;
  phone?: string;
};
export const AuthForm: FC<AuthFormProps> = ({
  mode,
  onSuccess,
  redirectUrl,
}) => {
    
  const { mutate: loginMutate, isPending: isLoginPending } =
    useLoginUsuarioYSesionMutate();
  const { mutate: registerMutate, isPending: isRegisterPending } =
    useCrearUsuarioYSesionMutate();

  const isSignIn = mode === "sign-in";
  const schema = isSignIn ? LoginSchema : RegisterSchema;
  const defaultValues = isSignIn
    ? { email: "", password: "" }
    : { fullName: "", phone: "", email: "", password: "" };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormFields>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const form = handleSubmit((data: any) => {
    try {
      if (isSignIn) {
        console.log("Login data:", data.email, data.password);
        loginMutate(data);
      } else {
        registerMutate(data);
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  });

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <form className="space-y-6" noValidate onSubmit={form}>
        {mode === "sign-in" && (
          <>
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-white">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="border border-[#222] bg-[#181818] text-[#e5e5e5] px-5 py-3 placeholder:text-[#bcbcbc] text-base rounded-xl w-full focus:border-[#bca789] focus:ring-2 focus:ring-[#bca789] transition"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-white">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                placeholder="Your password"
                className="border border-[#222] bg-[#181818] text-[#e5e5e5] px-5 py-3 placeholder:text-[#bcbcbc] text-base rounded-xl w-full focus:border-[#bca789] focus:ring-2 focus:ring-[#bca789] transition"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="bg-[#bca789] text-black font-mono font-semibold text-lg py-3 rounded-xl mt-6 w-full shadow-sm hover:bg-[#a68c6d] transition"
              disabled={isLoginPending}
            >
              {isLoginPending ? "Signing In..." : "Sign In"}
            </button>
          </>
        )}

        {mode === "sign-up" && (
          <>
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-white">
                Nombre <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Tu nombre completo"
                className="border border-[#222] bg-[#181818] text-[#e5e5e5] px-5 py-3 placeholder:text-[#bcbcbc] text-base rounded-xl w-full focus:border-[#bca789] focus:ring-2 focus:ring-[#bca789] transition"
                {...register("fullName")}
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-white">
                Celular <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Tu celular"
                className="border border-[#222] bg-[#181818] text-[#e5e5e5] px-5 py-3 placeholder:text-[#bcbcbc] text-base rounded-xl w-full focus:border-[#bca789] focus:ring-2 focus:ring-[#bca789] transition"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-white">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="border border-[#222] bg-[#181818] text-[#e5e5e5] px-5 py-3 placeholder:text-[#bcbcbc] text-base rounded-xl w-full focus:border-[#bca789] focus:ring-2 focus:ring-[#bca789] transition"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-white">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                placeholder="Your password"
                className="border border-[#222] bg-[#181818] text-[#e5e5e5] px-5 py-3 placeholder:text-[#bcbcbc] text-base rounded-xl w-full focus:border-[#bca789] focus:ring-2 focus:ring-[#bca789] transition"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="bg-[#bca789] text-black font-mono font-semibold text-lg py-3 rounded-xl mt-6 w-full shadow-sm hover:bg-[#a68c6d] transition"
              disabled={isRegisterPending}
            >
              {isRegisterPending ? "Signing Up..." : "Sign Up"}
            </button>
          </>
        )}
      </form>
    </div>
  );
};
