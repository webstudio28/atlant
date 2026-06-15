import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";

export const metadata = {
  title: "Login – Atlant Admin",
};

export default async function LoginPage() {
  const session = await auth();
  if (session?.user && (session.user as { role?: string }).role === "admin") {
    redirect("/admin/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "#F4F4F2" }}>
      <div className="w-full max-w-[420px]">
        {/* Logo / brand */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
            style={{ background: "linear-gradient(135deg, #F26A21 0%, #d45a18 100%)" }}
          >
            <svg width="28" height="28" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1
            className="font-['Sofia_Sans_Condensed',sans-serif] text-[28px] font-[800] tracking-[0.04em]"
            style={{ color: "#1a1e21" }}
          >
            Atlant Админ
          </h1>
          <p className="text-[16px] mt-1" style={{ color: "#52595D" }}>
            Влезте за управление на сайта
          </p>
        </div>

        {/* Login card */}
        <div className="bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.09)] border border-[rgba(82,89,93,0.08)] p-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
