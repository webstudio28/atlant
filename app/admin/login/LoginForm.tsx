"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const data = new FormData(e.currentTarget);
    const result = await signIn("credentials", {
      email: data.get("email") as string,
      password: data.get("password") as string,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Невалиден имейл или парола.");
    } else {
      router.push("/admin/dashboard");
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label
          htmlFor="email"
          className="block font-['Sofia_Sans_Condensed',sans-serif] text-[13px] font-[700] tracking-[0.12em] uppercase mb-1.5"
          style={{ color: "#52595D" }}
        >
          Имейл
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          autoComplete="email"
          className="w-full p-3 text-[16px] rounded-xl border-[1.5px] bg-[#F4F4F2] transition-all focus:outline-none"
          style={{
            borderColor: "rgba(82,89,93,0.16)",
            color: "#1a1e21",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "rgba(242,106,33,0.55)";
            e.target.style.background = "white";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "rgba(82,89,93,0.16)";
            e.target.style.background = "#F4F4F2";
          }}
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block font-['Sofia_Sans_Condensed',sans-serif] text-[13px] font-[700] tracking-[0.12em] uppercase mb-1.5"
          style={{ color: "#52595D" }}
        >
          Парола
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          autoComplete="current-password"
          className="w-full p-3 text-[16px] rounded-xl border-[1.5px] bg-[#F4F4F2] transition-all focus:outline-none"
          style={{
            borderColor: "rgba(82,89,93,0.16)",
            color: "#1a1e21",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "rgba(242,106,33,0.55)";
            e.target.style.background = "white";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "rgba(82,89,93,0.16)";
            e.target.style.background = "#F4F4F2";
          }}
        />
      </div>

      {error && (
        <div
          className="text-[14px] text-center px-4 py-2.5 rounded-xl"
          style={{
            background: "rgba(220,38,38,0.08)",
            color: "#dc2626",
            border: "1px solid rgba(220,38,38,0.2)",
          }}
        >
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full font-['Sofia_Sans_Condensed',sans-serif] text-[17px] font-[700] tracking-[0.08em] uppercase p-3.5 rounded-xl border-2 text-white cursor-pointer transition-all disabled:opacity-70"
        style={{
          background: "#F26A21",
          borderColor: "#F26A21",
          boxShadow: "0 3px 16px rgba(242,106,33,0.28)",
        }}
      >
        {loading ? "Влизане…" : "Вход"}
      </button>
    </form>
  );
}
