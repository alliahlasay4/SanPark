import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Car,
  Check,
  CheckCircle2,
  Clock3,
  Eye,
  EyeOff,
  Hash,
  HelpCircle,
  KeyRound,
  LockKeyhole,
  Mail,
  Radio,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  User,
  Zap,
} from "lucide-react";
import { DEMO_ACCOUNTS, useApp } from "../context/AppContext";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-[#111111] py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-red-500 focus:ring-2 focus:ring-red-500/20";

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-600 shadow-lg shadow-red-950/50">
        <Car className="h-5 w-5 text-white" />
      </div>
      <div className="flex items-baseline gap-1 font-headline-sm text-xl font-extrabold tracking-tight">
        <span>San</span>
        <span className="text-red-500">Park</span>
        <span className="ml-2 rounded-full border border-red-800/60 bg-red-950/50 px-2 py-0.5 text-[9px] uppercase tracking-widest text-red-300">
          Auth Suite
        </span>
      </div>
    </div>
  );
}

function ParkingPreview() {
  const bays = [
    ["B1-01", "OCCUPIED", "red"],
    ["B1-02", "VACANT", "green"],
    ["B1-03", "EV 60kW", "cyan"],
    ["B1-04", "VIP HELD", "red"],
  ];
  return (
    <section className="relative hidden overflow-hidden rounded-2xl border border-white/10 bg-[#171717]/90 p-8 shadow-2xl lg:col-span-5 lg:flex lg:flex-col lg:justify-between">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-red-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-emerald-600/10 blur-3xl" />
      <div className="relative">
        <div className="mb-5 flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider">
          <span className="flex items-center gap-2 rounded-full border border-red-800/50 bg-red-950/50 px-3 py-1.5 text-red-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
            Live Smart Parking System
          </span>
          <span className="font-mono text-white/40">SM MEGAMALL B • L1</span>
        </div>
        <h2 className="max-w-md text-3xl font-black leading-tight tracking-tight text-white">
          Autonomous urban access.
          <br />
          <span className="text-red-500">Zero wait. Zero stalls.</span>
        </h2>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-white/50">
          Instant license plate recognition, contactless barrier lifting, and EV
          bay reservations across prime Manila hubs.
        </p>
      </div>
      <div className="relative my-8 rounded-xl border border-white/10 bg-[#0c0c0c]/90 p-4 shadow-inner">
        <div className="mb-4 flex items-center justify-between border-b border-white/5 pb-3 text-[10px] font-mono text-white/50">
          <span className="flex items-center gap-2">
            <Radio className="h-3.5 w-3.5 text-red-500" />
            RADAR MATRIX: SECTOR B1
          </span>
          <span className="text-emerald-400">92% OCCUPIED</span>
        </div>
        <div className="grid grid-cols-4 gap-2 text-center font-mono text-[9px]">
          {bays.map(([bay, status, color]) => (
            <div
              key={bay}
              className={`rounded-lg border p-2 ${color === "green" ? "border-emerald-500/60 bg-emerald-950/40 text-emerald-400" : color === "cyan" ? "border-cyan-500/60 bg-cyan-950/30 text-cyan-300" : "border-red-700/50 bg-red-950/30 text-red-400"}`}
            >
              <div className="font-bold">{bay}</div>
              <div className="mt-1 text-[8px] text-white/50">{status}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/5 pt-3 text-center">
          <div>
            <div className="text-[9px] text-white/40">Barrier Response</div>
            <strong className="text-xs">180 ms</strong>
          </div>
          <div>
            <div className="text-[9px] text-white/40">Active Turnovers</div>
            <strong className="text-xs text-emerald-400">342 / hr</strong>
          </div>
          <div>
            <div className="text-[9px] text-white/40">Superchargers</div>
            <strong className="text-xs text-cyan-400">15 / 16</strong>
          </div>
        </div>
      </div>
      <div className="relative flex items-center gap-3 border-t border-white/10 pt-4 text-xs text-white/60">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-red-500/40 bg-red-950/40 text-red-400">
          <LockKeyhole className="h-4 w-4" />
        </div>
        <div>
          <strong className="text-white">
            Bank-grade 256-bit TLS security
          </strong>
          <p className="mt-0.5 text-[11px] text-white/40">
            ANPR plate tokens are signed and stored on private edge hardware.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { signIn } = useApp();
  const [view, setView] = useState("login");
  const [role, setRole] = useState("driver");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState(["1", "2", "3", "4", "5", "6"]);
  const [otpError, setOtpError] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("driver@sanpark.ph");
  const [toast, setToast] = useState("");

  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2800);
  };
  const handleLoginSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const expectedAccount = role === "host" ? DEMO_ACCOUNTS.admin : DEMO_ACCOUNTS.user;

    if (email.trim().toLowerCase() !== expectedAccount.email || password !== expectedAccount.password || !signIn(email, password)) {
      notify(`Use the ${role === "host" ? "admin" : "user"} demo credentials shown below`);
      return;
    }

    navigate(role === "host" ? "/mall-manager" : "/");
  };
  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setRegisteredEmail(formData.get("email") || "driver@sanpark.ph");
    setView("otp");
    notify("Security challenge dispatched");
  };
  const updateOtp = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    setOtp((current) =>
      current.map((item, itemIndex) => (itemIndex === index ? digit : item)),
    );
    setOtpError(false);
  };
  const verifyOtp = () => {
    if (otp.join("") !== "123456") {
      setOtpError(true);
      return;
    }
    setView("success");
    window.setTimeout(() => navigate("/"), 1200);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_rgba(127,29,29,0.28),_#101010_45%,_#0a0a0a)] font-body-md text-white selection:bg-red-600 selection:text-white">
      <header className="border-b border-white/5 bg-[#121212]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Brand />
          <div className="hidden items-center gap-3 md:flex">
            <span className="flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-950/30 px-3 py-1 font-mono text-[10px] text-emerald-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              ANPR MESH 99.98%
            </span>
            <button
              type="button"
              onClick={() => notify("SanPark Concierge is online")}
              className="rounded-lg p-2 text-white/50 transition hover:bg-white/5 hover:text-white"
              aria-label="Get help"
            >
              <HelpCircle className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>
      {toast && (
        <div className="fixed right-5 top-20 z-50 flex items-center gap-3 rounded-xl border border-white/10 bg-[#1e1e1e] px-4 py-3 text-xs shadow-2xl">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          {toast}
        </div>
      )}
      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-8 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-12">
        <ParkingPreview />
        <section className="lg:col-span-7 lg:flex lg:flex-col lg:justify-center">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex rounded-xl border border-white/10 bg-[#121212] p-1 text-[11px]">
              <button
                type="button"
                onClick={() => setView("login")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 font-semibold transition ${view === "login" ? "bg-red-600 text-white shadow-lg shadow-red-950/50" : "text-white/50 hover:text-white"}`}
              >
                <LockKeyhole className="h-3.5 w-3.5" />
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setView("register")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 font-semibold transition ${view === "register" ? "bg-red-600 text-white shadow-lg shadow-red-950/50" : "text-white/50 hover:text-white"}`}
              >
                <User className="h-3.5 w-3.5" />
                Create Account
              </button>
            </div>
            <span className="hidden text-[10px] font-mono text-white/30 sm:block">
              v4.8.2 FASTPASS
            </span>
          </div>
          {view === "login" && (
            <div className="rounded-2xl border border-white/10 bg-[#181818]/90 p-6 shadow-2xl backdrop-blur-xl sm:p-8 lg:p-10">
              <div className="mb-6 flex items-center justify-between border-b border-white/5 pb-5">
                <div className="flex rounded-xl border border-white/10 bg-[#111111] p-1 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setRole("driver")}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-2 font-semibold ${role === "driver" ? "bg-red-600 text-white" : "text-white/50"}`}
                  >
                    <Car className="h-3.5 w-3.5" />
                    Park as Driver
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("host")}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-2 font-semibold ${role === "host" ? "bg-red-600 text-white" : "text-white/50"}`}
                  >
                    <Building2 className="h-3.5 w-3.5" />
                    Mall Manager
                  </button>
                </div>
              </div>
              <div className="mb-5 rounded-xl border border-white/10 bg-[#111111] px-3 py-2 text-[11px] text-white/50">
                Demo {role === "host" ? "admin" : "user"} account: <span className="font-mono text-white/80">{role === "host" ? DEMO_ACCOUNTS.admin.email : DEMO_ACCOUNTS.user.email}</span> / <span className="font-mono text-white/80">{role === "host" ? DEMO_ACCOUNTS.admin.password : DEMO_ACCOUNTS.user.password}</span>
              </div>
              <h1 className="text-3xl font-black tracking-tight">
                Welcome back
              </h1>
              <p className="mt-2 text-sm text-white/50">
                Sign in to access reserved stalls, wallet balance, and barrier
                passes.
              </p>
              <div className="my-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() =>
                    notify("Google sign-in is ready for integration")
                  }
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-xs font-semibold transition hover:border-white/20 hover:bg-white/10"
                >
                  Continue with Google
                </button>
                <button
                  type="button"
                  onClick={() =>
                    notify("Apple sign-in is ready for integration")
                  }
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-xs font-semibold transition hover:border-white/20 hover:bg-white/10"
                >
                  Continue with Apple
                </button>
              </div>
              <div className="mb-5 flex items-center gap-3 text-[10px] uppercase tracking-widest text-white/30">
                <span className="h-px flex-1 bg-white/10" />
                Or use credentials
                <span className="h-px flex-1 bg-white/10" />
              </div>
              <form key={role} onSubmit={handleLoginSubmit} className="space-y-4">
                <label className="block text-xs font-semibold text-white/75">
                  Email or Philippine mobile
                  <div className="relative mt-2">
                    <Mail className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-white/35" />
                    <input
                      name="email"
                      type="text"
                      required
                      defaultValue={role === "host" ? DEMO_ACCOUNTS.admin.email : DEMO_ACCOUNTS.user.email}
                      className={`${inputClass} pl-10 pr-3`}
                      placeholder="name@email.com or +63 9XX XXX XXXX"
                    />
                  </div>
                </label>
                <label className="block text-xs font-semibold text-white/75">
                  <span className="flex justify-between">
                    Password{" "}
                    <button
                      type="button"
                      onClick={() =>
                        notify("Password reset instructions requested")
                      }
                      className="font-medium text-red-400 hover:text-red-300"
                    >
                      Forgot password?
                    </button>
                  </span>
                  <div className="relative mt-2">
                    <LockKeyhole className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-white/35" />
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      defaultValue={role === "host" ? DEMO_ACCOUNTS.admin.password : DEMO_ACCOUNTS.user.password}
                      className={`${inputClass} pl-10 pr-10 font-mono`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      className="absolute right-3 top-3.5 text-white/40 hover:text-white"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </label>
                <label className="flex items-center gap-2 text-xs text-white/60">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 accent-red-600"
                  />
                  Remember this device for 30 days
                </label>
                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3.5 text-sm font-bold shadow-lg shadow-red-950/60 transition hover:bg-red-500"
                >
                  Sign In to SanPark{" "}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </button>
              </form>
              <p className="mt-6 border-t border-white/10 pt-5 text-center text-xs text-white/50">
                New to SanPark?{" "}
                <button
                  type="button"
                  onClick={() => setView("register")}
                  className="font-semibold text-red-400 hover:text-red-300"
                >
                  Create an account
                </button>
              </p>
            </div>
          )}
          {view === "register" && (
            <div className="rounded-2xl border border-white/10 bg-[#181818]/90 p-6 shadow-2xl backdrop-blur-xl sm:p-8 lg:p-10">
              <div className="mb-6">
                <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-red-800/40 bg-red-950/60 px-2.5 py-1 text-[10px] font-semibold text-red-300">
                  <Sparkles className="h-3 w-3" />
                  Instant FastPass Activation
                </span>
                <h1 className="text-3xl font-black tracking-tight">
                  Create your account
                </h1>
                <p className="mt-2 text-sm text-white/50">
                  Reserve stalls, link vehicle plates, and tap out in under 3
                  seconds.
                </p>
              </div>
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="text-xs font-semibold text-white/75">
                    Full legal name
                    <div className="relative mt-2">
                      <User className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-white/35" />
                      <input
                        name="name"
                        required
                        className={`${inputClass} pl-10 pr-3`}
                        placeholder="Maria Santos"
                      />
                    </div>
                  </label>
                  <label className="text-xs font-semibold text-white/75">
                    Mobile number
                    <div className="relative mt-2">
                      <input
                        name="phone"
                        required
                        className={`${inputClass} px-3 font-mono`}
                        placeholder="+63 917 555 0192"
                      />
                    </div>
                  </label>
                </div>
                <label className="block text-xs font-semibold text-white/75">
                  Email address
                  <div className="relative mt-2">
                    <Mail className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-white/35" />
                    <input
                      name="email"
                      type="email"
                      required
                      defaultValue="maria.santos@sanpark.ph"
                      className={`${inputClass} pl-10 pr-3`}
                    />
                  </div>
                </label>
                <label className="block text-xs font-semibold text-white/75">
                  Vehicle plate number{" "}
                  <span className="font-normal text-white/35">(optional)</span>
                  <div className="relative mt-2">
                    <Hash className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-white/35" />
                    <input
                      name="plate"
                      className={`${inputClass} pl-10 pr-3 font-mono uppercase`}
                      placeholder="ABC 1234"
                    />
                  </div>
                </label>
                <div>
                  <div className="mb-2 flex items-center justify-between text-xs font-semibold text-white/75">
                    <span>Primary vehicle</span>
                    <span className="text-amber-400">Medium strength</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      ["sedan", Car],
                      ["SUV", Car],
                      ["EV", Zap],
                      ["bike", Radio],
                    ].map(([label, Icon], index) => (
                      <button
                        key={label}
                        type="button"
                        className={`flex flex-col items-center gap-1 rounded-xl border py-2 text-[10px] ${index === 0 ? "border-red-500 bg-red-600 text-white" : "border-white/10 bg-[#111111] text-white/50 hover:text-white"}`}
                      >
                        <Icon className="h-4 w-4" />
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                <label className="block text-xs font-semibold text-white/75">
                  Secure password
                  <div className="relative mt-2">
                    <LockKeyhole className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-white/35" />
                    <input
                      name="password"
                      type="password"
                      required
                      className={`${inputClass} pl-10 pr-3`}
                      placeholder="8+ characters with numbers and symbols"
                    />
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#111111]">
                    <div className="h-full w-2/3 bg-amber-500" />
                  </div>
                  <div className="mt-1.5 flex gap-3 text-[10px] text-emerald-400">
                    <span>
                      <Check className="mr-1 inline h-2.5 w-2.5" />
                      8+ chars
                    </span>
                    <span>
                      <Check className="mr-1 inline h-2.5 w-2.5" />1 number
                    </span>
                    <span>
                      <Check className="mr-1 inline h-2.5 w-2.5" />1 symbol
                    </span>
                  </div>
                </label>
                <label className="flex items-start gap-2 text-xs leading-relaxed text-white/50">
                  <input
                    type="checkbox"
                    required
                    defaultChecked
                    className="mt-0.5 h-4 w-4 accent-red-600"
                  />
                  I agree to the SanPark Parking Terms and consent to ANPR
                  optical plate processing.
                </label>
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3.5 text-sm font-bold shadow-lg shadow-red-950/60 transition hover:bg-red-500"
                >
                  Create Account &amp; Verify{" "}
                  <ShieldCheck className="h-4 w-4" />
                </button>
              </form>
              <p className="mt-5 border-t border-white/10 pt-4 text-center text-xs text-white/50">
                Already have a profile?{" "}
                <button
                  type="button"
                  onClick={() => setView("login")}
                  className="font-semibold text-red-400 hover:text-red-300"
                >
                  Sign in
                </button>
              </p>
            </div>
          )}
          {view === "otp" && (
            <div className="rounded-2xl border border-white/10 bg-[#181818]/90 p-6 text-center shadow-2xl backdrop-blur-xl sm:p-10">
              <button
                type="button"
                onClick={() => setView("register")}
                className="mb-8 flex items-center gap-2 text-xs text-white/50 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to account setup
              </button>
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/40 bg-red-950/50 text-red-400">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
                Two-factor verification
              </h1>
              <p className="mx-auto mt-2 max-w-sm text-sm text-white/50">
                We dispatched a 6-digit token to{" "}
                <strong className="text-white">{registeredEmail}</strong>
              </p>
              <div className="my-8 flex justify-center gap-2 sm:gap-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    value={digit}
                    onChange={(event) => updateOtp(index, event.target.value)}
                    inputMode="numeric"
                    maxLength={1}
                    aria-label={`OTP digit ${index + 1}`}
                    className={`h-14 w-10 rounded-xl border bg-[#111111] text-center font-mono text-2xl font-black outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/20 sm:w-12 ${otpError ? "border-red-500" : "border-white/10"}`}
                  />
                ))}
              </div>
              {otpError && (
                <p className="mb-4 text-xs text-red-400">
                  Invalid token. For this demo, enter 123456.
                </p>
              )}
              <button
                type="button"
                onClick={() => setOtp(["1", "2", "3", "4", "5", "6"])}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-mono text-white/50 transition hover:text-emerald-400"
              >
                <KeyRound className="h-3 w-3 text-emerald-400" />
                Auto-fill valid OTP
              </button>
              <div className="mb-6 flex items-center justify-between rounded-xl border border-white/10 bg-[#111111] p-3 text-xs text-white/60">
                <span className="flex items-center gap-2">
                  <Clock3 className="h-4 w-4 text-red-500" />
                  Code expires in{" "}
                  <strong className="font-mono text-white">00:48</strong>
                </span>
                <button
                  type="button"
                  onClick={() => notify("A new code has been sent")}
                  className="flex items-center gap-1 font-semibold text-red-400 hover:text-red-300"
                >
                  <RefreshCw className="h-3 w-3" />
                  Resend
                </button>
              </div>
              <button
                type="button"
                onClick={verifyOtp}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3.5 text-sm font-bold shadow-lg shadow-red-950/60 transition hover:bg-red-500"
              >
                Verify &amp; Access Dashboard <ArrowRight className="h-4 w-4" />
              </button>
              <p className="mt-6 border-t border-white/10 pt-4 text-xs text-white/40">
                Having trouble?{" "}
                <button
                  type="button"
                  onClick={() => notify("Concierge support pinged")}
                  className="text-red-400 hover:text-red-300"
                >
                  Contact Concierge
                </button>
              </p>
            </div>
          )}
          {view === "success" && (
            <div className="flex min-h-[430px] flex-col items-center justify-center rounded-2xl border border-emerald-500/20 bg-[#181818]/90 p-8 text-center shadow-2xl">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/60 bg-emerald-950/60 text-emerald-400">
                <Check className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold">Identity confirmed</h2>
              <p className="mt-2 max-w-xs text-sm text-white/50">
                Session token verified with ANPR FastPass nodes. Opening your
                parking dashboard.
              </p>
              <div className="mt-6 h-1.5 w-48 overflow-hidden rounded-full bg-[#111111]">
                <div className="h-full w-full animate-pulse bg-emerald-500" />
              </div>
            </div>
          )}
        </section>
      </main>
      <footer className="border-t border-white/5 bg-[#0e0e0e]/80 px-4 py-4 text-center text-[11px] text-white/35 sm:flex sm:items-center sm:justify-between sm:px-8">
        <span className="flex items-center justify-center gap-2 sm:justify-start">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          SanPark Production Architecture • TLS 1.3 Edge Node #MNL-04
        </span>
        <span className="mt-2 block sm:mt-0">
          Privacy Policy&nbsp;&nbsp;&nbsp; Terms of Service&nbsp;&nbsp;&nbsp;
          Support
        </span>
      </footer>
    </div>
  );
}
