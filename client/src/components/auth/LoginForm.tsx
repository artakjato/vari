import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../lib/api";
import { useMapStore } from "../../stores/mapStore";

export function LoginForm({ onSwitch }: { onSwitch: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const { data } = await login({ email, password });
      localStorage.setItem("vari_token", data.token);
      useMapStore.setState({ currentUser: data.user });
      navigate("/map");
    } catch {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
      <div className="space-y-1.5">
        <h2 className="text-[1.45rem] leading-tight text-foreground sm:text-2xl">Sign in</h2>
        <p className="text-[13px] text-muted-foreground sm:text-sm">Continue your saved roadmap progress.</p>
      </div>

      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className="h-10 rounded-xl border-[#e3c7ab] sm:h-11"
      />

      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        className="h-10 rounded-xl border-[#e3c7ab] sm:h-11"
      />

      {error && <p className="text-[13px] text-destructive sm:text-sm">{error}</p>}

      <Button type="submit" className="h-10 w-full rounded-full text-[13px] sm:h-11 sm:text-sm">
        Sign in
      </Button>

      <p className="text-[13px] text-muted-foreground sm:text-sm">
        No account yet?{" "}
        <button type="button" onClick={onSwitch} className="font-medium text-foreground hover:underline">
          Register
        </button>
      </p>
    </form>
  );
}
