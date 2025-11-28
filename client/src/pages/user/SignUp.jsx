import { useState } from "react";
import styles from "../../index";
import { Link, useNavigate } from "react-router-dom";
// import OAuth from "../../components/OAuth";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

//zod validation schema
const schema = z.object({
  username: z.string().min(3, { message: "minimum 3 characters required" }),
  email: z
    .string()
    .min(1, { message: "email required" })
    .refine((value) => /\S+@\S+\.\S+/.test(value), {
      message: "Invalid email address",
    }),
  password: z.string().min(4, { message: "minimum 4 characters required" }),
});

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (formData, e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setErrorMessage("");
    
    try {
      console.log("🚀 Sending signup request...", formData);
      console.log("📍 Request URL: /api/auth/signup");
      
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      console.log("📥 Response status:", res.status, res.statusText);
      
      const data = await res.json();
      console.log("📦 Signup response:", data);
      setLoading(false);

      if (!res.ok) {
        console.error("❌ Signup failed:", data);
        setError(true);
        setErrorMessage(data.message || "Registration failed");
        return;
      }

      console.log("✅ Signup successful!");
      setError(false);
      alert("✅ Account created successfully! Please sign in.");
      navigate("/signin");
    } catch (error) {
      console.error("💥 Signup error:", error);
      setLoading(false);
      setError(true);
      setErrorMessage("Network error: " + error.message);
    }
  };

  return (
    <>
      <div
        className={`pb-10 max-w-lg mx-auto mt-16  rounded-lg overflow-hidden  shadow-2xl`}
      >
        <div
          className={` green px-6 py-2   rounded-t-lg flex justify-between items-center`}
        >
          <h1 className={`${styles.heading2} text-[28px]`}>Sign Up</h1>
          <Link to={"/"}>
            <div className=" px-3  font-bold  hover:bg-green-300 rounded-md  shadow-inner">
              x
            </div>
          </Link>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 pt-10 px-5"
        >
          <div>
            <input
              type="text"
              id="username"
              className="text-black bg-slate-100 p-3 rounded-md w-full"
              placeholder="UserName"
              {...register("username")}
            />
            {errors.username && (
              <p className="text-red-500 text-[8px] pt-1">
                {" "}
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              id="email"
              className="text-black bg-slate-100 p-3 rounded-md w-full"
              placeholder="Email"
              {...register("email")}
            />

            {errors.email && (
              <p className="text-red-500 text-[8px] pt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              id="password"
              className="text-black bg-slate-100 p-3 rounded-md w-full"
              placeholder="Password"
              {...register("password", { required: true, minLength: 6 })}
            />
            {errors.password && (
              <p className="text-red-500 text-[8px] pt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            className={`${styles.button}  disabled:bg-slate-500 text-black disabled:text-white`}
            disabled={isLoading}
          >
            {isLoading ? "Loading ..." : "Register"}
          </button>
          <div className="flex justify-between">
            <p className="text-[10px]">
              Have a account?{" "}
              <span className="text-blue-600">
                {" "}
                <Link to={`/signin`}>Sign in</Link>
              </span>
            </p>
          </div>
          {isError && (
            <p className="text-[12px] text-red-600 mt-2 text-center">
              ❌ {errorMessage || "Something went wrong"}
            </p>
          )}
        </form>
        <div>
          <h3 className="text-center text-slate-700 pt-3 pb-3 text-[10px]">
            OR
          </h3>
          <div className="flex justify-center items-center gap-3 pb-6">
            <span className="bg-green-300 w-20 h-[.1px]"></span>
            <span className="text-[10px] sm:text-[12px] text-slate-500">
              Continue with social login (Coming Soon)
            </span>
            <span className="bg-green-300 w-20 h-[.1px]"> </span>
          </div>

          {/* <OAuth /> */}
          <div className="text-center text-gray-500 text-sm pb-6">
            Google Sign In requires Firebase configuration
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
