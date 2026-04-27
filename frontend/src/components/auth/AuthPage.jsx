import React, { useState } from "react";
import { useAuth } from "../../context/UserContext";

const AuthPage = ({ mode }) => {
  const isRegister = mode === "register";
  const { login, register, loading, error } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const setField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const switchMode = () => {
    window.history.pushState({}, "", isRegister ? "/login" : "/register");
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (isRegister) {
        await register(form);
      } else {
        await login({ email: form.email, password: form.password });
      }

      window.history.pushState({}, "", "/desktop");
      window.dispatchEvent(new PopStateEvent("popstate"));
    } catch {
      return;
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[url('/background.jpg')] bg-cover bg-center px-4 text-white">
      <section className="w-full max-w-md rounded-2xl border border-white/15 bg-black/45 p-6 shadow-2xl backdrop-blur-2xl">
        <div className="mb-6 flex items-center gap-3">
          <img src="/apple.svg" alt="" className="h-7 w-7" />
          <div>
            <h1 className="text-xl font-semibold">
              {isRegister ? "Create your desktop" : "Welcome back"}
            </h1>
            <p className="text-sm text-white/50">
              {isRegister ? "Start your macOS portfolio." : "Open your portfolio workspace."}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <label className="flex flex-col gap-1 text-xs text-white/60">
              Name
              <input
                value={form.name}
                onChange={(e) => setField("name", e.target.value)}
                className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none focus:border-cyan-300"
                required
              />
            </label>
          )}

          <label className="flex flex-col gap-1 text-xs text-white/60">
            Email
            <input
              type="email"
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
              className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none focus:border-cyan-300"
              required
            />
          </label>

          <label className="flex flex-col gap-1 text-xs text-white/60">
            Password
            <input
              type="password"
              value={form.password}
              onChange={(e) => setField("password", e.target.value)}
              className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none focus:border-cyan-300"
              minLength={8}
              required
            />
          </label>

          {error && <p className="text-sm text-red-300">{error}</p>}

          <button
            disabled={loading}
            className="w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-zinc-950 transition cursor-pointer hover:bg-cyan-100 disabled:opacity-60"
          >
            {loading ? "Please wait..." : isRegister ? "Register" : "Login"}
          </button>
        </form>

        <button
          onClick={switchMode}
          className="mt-4 w-full text-center text-sm text-cyan-200 hover:text-cyan-100"
        >
          {isRegister ? "Already have an account? Login" : "Need an account? Register"}
        </button>
      </section>
    </main>
  );
};

export default AuthPage;
