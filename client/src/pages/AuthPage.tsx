import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components/auth/LoginForm";
import { RegisterForm } from "../components/auth/RegisterForm";

export function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10 sm:px-6 sm:py-12 md:py-14">
      <div className="w-full max-w-[26rem] rounded-2xl border border-[#e8ceb2] bg-white/92 p-5 shadow-[0_18px_40px_rgba(67,40,17,0.14)] sm:rounded-[24px] sm:p-7 md:p-9">
        <button
          type="button"
          onClick={() => {
            if (window.history.length > 1) {
              navigate(-1);
              return;
            }
            navigate("/");
          }}
          className="mb-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#6f5a47] transition-colors hover:text-foreground sm:text-sm"
        >
          <ArrowLeft size={14} />
          Back
        </button>
        {mode === "login" ? (
          <LoginForm onSwitch={() => setMode("register")} />
        ) : (
          <RegisterForm onSwitch={() => setMode("login")} />
        )}
      </div>
    </div>
  );
}
