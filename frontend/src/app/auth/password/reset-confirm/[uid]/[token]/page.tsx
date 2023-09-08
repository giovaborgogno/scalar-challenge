import React from "react";
import Link from "next/link";
import ResetForm from "./ConfirmForm";

interface Props {
  params: { uid: string; token: string };
}

const PageForgotPass = ({params}: Props) => {
  return (
    <div className="container mb-24 lg:mb-32">
      <header className="text-center max-w-2xl mx-auto - mb-14 sm:mb-16 lg:mb-20">
        <h2 className="mt-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Olvidaste tu contraseña?
        </h2>
        <span className="block text-sm mt-4 text-neutral-700 sm:text-base dark:text-neutral-200">
          Te enviaremos un email para que puedas cambiarla!
        </span>
      </header>

      <div className="max-w-md mx-auto space-y-6">
        {/* FORM */}
       <ResetForm params={params}/>

        {/* ==== */}
        <span className="block text-center text-neutral-700 dark:text-neutral-300">
          Go back for {` `}
          <Link href="/auth/login" className="text-green-600">
            Sign in
          </Link>
          {` / `}
          <Link href="/auth/signup" className="text-green-600">
            Sign up
          </Link>
        </span>
      </div>
    </div>
  );
};

export default PageForgotPass;
