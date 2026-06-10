import { type FC } from "react";
import { LoginSchema, RegisterSchema } from "../../../schema/auth.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginUsuarioYSesionMutate } from "../../../stack/auth/iniciar-sesion.stack";
import { useCrearUsuarioYSesionMutate } from "../../../stack/auth/registrar.stack";
import { useLoginGoogleMutate } from "../../../stack/auth/login-google.stack";

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
export const AuthForm: FC<AuthFormProps> = ({ mode }) => {
  const { mutate: loginMutate, isPending: isLoginPending } =
    useLoginUsuarioYSesionMutate();
  const { mutate: registerMutate, isPending: isRegisterPending } =
    useCrearUsuarioYSesionMutate();
  const { mutate: loginGoogle, isPending } = useLoginGoogleMutate();

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
        loginMutate(data);
      } else {
        registerMutate(data);
      }
    } catch (error) {
      if (import.meta.env.DEV) console.error("Error al iniciar sesión:", error);
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

            <div className="flex flex-col gap-3 mt-6">
              <button
                type="submit"
                className="bg-[#bca789] text-black font-mono font-semibold text-lg py-3 rounded-xl w-full shadow-sm hover:bg-[#a68c6d] transition"
                disabled={isLoginPending}
              >
                {isLoginPending ? "Signing In..." : "Sign In"}
              </button>

              <button
                type="button"
                className="bg-[#bca789] text-black font-mono font-semibold text-lg py-3 rounded-xl w-full shadow-sm hover:bg-[#a68c6d] transition"
                onClick={() => loginGoogle()}
                disabled={isPending}
              >
                {isPending
                  ? "Signing In with Google..."
                  : "Sign in with Google"}
              </button>
            </div>
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
