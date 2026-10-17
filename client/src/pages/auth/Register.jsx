import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { HOBBIES } from "../../constants/design";
import { useAuth } from "../../hooks/useAuth";

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    location: "Bangalore, India",
    bio: "",
    hobbies: ["sports", "trekking"],
  });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const toggle = (hobby) => {
    setForm((current) => ({
      ...current,
      hobbies: current.hobbies.includes(hobby)
        ? current.hobbies.filter((item) => item !== hobby)
        : [...current.hobbies, hobby],
    }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setError("");

    if (form.name.trim().length < 2) {
      setError("Name must be at least 2 characters.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (!form.location.trim()) {
      setError("Location is required.");
      return;
    }

    if (form.hobbies.length < 1) {
      setError("Choose at least one hobby.");
      return;
    }

    setBusy(true);

    try {
      await register(form);
      nav("/dashboard", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#101010] p-6 text-white">
      <div className="mx-auto max-w-xl py-8">
        <Link to="/" className="text-2xl font-black">
          Circle<span className="text-[#10B981]">-Up</span>
        </Link>

        <h1 className="mt-8 text-3xl font-black">Create Account</h1>
        <p className="mt-2 text-gray-500">
          Join a community that shares your passions.
        </p>

        <form onSubmit={submit} className="mt-8 space-y-4">
          {error && (
            <p className="rounded-xl bg-red-500/10 p-3 text-red-400">
              {error}
            </p>
          )}

          <Input
            label="Full Name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="John Doe"
          />

          <Input
            label="Email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="john@example.com"
          />

          <Input
            label="Password"
            type="password"
            required
            minLength="8"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Minimum 8 characters"
          />

          <Input
            label="Location"
            required
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            placeholder="Bangalore, India"
          />

          <Input
            label="Bio (optional)"
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            placeholder="Explorer. Reader. Runner."
          />

          <div>
            <label className="mb-2 block text-sm text-gray-400">
              Select Hobbies
            </label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {HOBBIES.map((hobby) => (
                <button
                  type="button"
                  key={hobby.key}
                  onClick={() => toggle(hobby.key)}
                  className={`rounded-xl border p-4 text-sm transition ${
                    form.hobbies.includes(hobby.key)
                      ? "border-[#1B4332] bg-[#1B4332]"
                      : "border-[#2A2A2E] bg-[#1B1B1D] hover:border-[#10B981]"
                  }`}
                >
                  {hobby.icon}
                  <br />
                  {hobby.label}
                </button>
              ))}
            </div>
          </div>

          <Button className="w-full" disabled={busy}>
            {busy ? "Creating..." : "Sign Up"}
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link className="text-[#10B981]" to="/login">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
