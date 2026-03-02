import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../lib/api";
import { useMapStore } from "../../stores/mapStore";

export function RegisterForm({ onSwitch }: { onSwitch: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const { data } = await register({ email, password, displayName });
      localStorage.setItem("vari_token", data.token);
      useMapStore.setState({ currentUser: data.user });
      navigate("/map");
    } catch {
      setError("Registration failed. Email might already be in use.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
      <div className="space-y-1.5">
        <h2 className="text-[1.45rem] leading-tight text-foreground sm:text-2xl">Create account</h2>
        <p className="text-[13px] text-muted-foreground sm:text-sm">Save pins and return to your selected paths.</p>
      </div>

      <Input
        type="text"
        placeholder="Display name"
        value={displayName}
        onChange={(event) => setDisplayName(event.target.value)}
        className="h-10 rounded-xl border-[#e3c7ab] sm:h-11"
      />

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
        Create account
      </Button>

      <p className="text-[13px] text-muted-foreground sm:text-sm">
        Already have an account?{" "}
        <button type="button" onClick={onSwitch} className="font-medium text-foreground hover:underline">
          Sign in
        </button>
      </p>
    </form>
  );
}
