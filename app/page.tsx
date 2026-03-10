"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async () => {
    setSubmitted(true);
    setEmailError("");
    setPasswordError("");

    let hasError = false;

    // Required checks
    if (!email.trim()) {
      setEmailError("Email is required");
      hasError = true;
    } else if (!emailRegex.test(email.trim())) {
      setEmailError("Enter a valid email address");
      hasError = true;
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      hasError = true;
    }

    if (hasError) return;

    // Simulate API call — replace with real auth later
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      if (res.ok) {
        window.location.href = "/dashboard/company-details";
        return;
      }

      const data = await res.json().catch(() => null);
      const code = data?.code || "";

      if (code === "no_account") {
        setEmailError("No account found with this email");
      } else {
        setEmailError("");
        setPasswordError("Incorrect email or password");
      }
    } catch {
      // If no backend yet, simulate "incorrect" for demo
      setPasswordError("Incorrect email or password");
    }
  };

  const emailHasError = !!emailError;
  const passwordHasError =
    !!passwordError ||
    (passwordError === "" && emailError === "" ? false : false);
  // When "Incorrect email or password", both fields get red border
  const bothFieldsError = passwordError === "Incorrect email or password";

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Wave background image */}
      <Image
        src="/auth/wave.jpg"
        alt=""
        fill
        className="object-cover"
        priority
        aria-hidden="true"
      />

      {/* Your Logo – top-right */}
      <div
        className="absolute top-6 right-8 z-10 font-medium"
        style={{ color: "#374151", fontSize: "15px" }}
      >
        Your Logo
      </div>

      {/* Centered login card */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div
          style={{
            width: "100%",
            maxWidth: "520px",
            borderRadius: "20px",
            boxShadow: "0 8px 40px rgba(0,0,0,0.06)",
            backgroundColor: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(8px)",
            padding: "48px 64px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Heading */}
          <h1
            className="text-center"
            style={{ fontSize: "24px", fontWeight: 700, color: "#1B3A4B", marginBottom: "24px" }}
          >
            Welcome to DataOnDeck
          </h1>

          {/* Sign in / Signup toggle */}
          <div
            className="flex rounded-full"
            style={{
              backgroundColor: "#DDEDF1",
              padding: "4px",
              width: "240px",
              marginBottom: "28px",
            }}
          >
            <button
              onClick={() => setActiveTab("signin")}
              className="flex-1 rounded-full transition-all"
              style={{
                padding: "8px 0",
                fontSize: "14px",
                fontWeight: 500,
                border: "none",
                cursor: "pointer",
                backgroundColor:
                  activeTab === "signin" ? "#75B5C6" : "transparent",
                color: activeTab === "signin" ? "#fff" : "#6b7280",
              }}
            >
              Sign in
            </button>
            <button
              onClick={() => router.push("/signup")}
              className="flex-1 rounded-full transition-all"
              style={{
                padding: "8px 0",
                fontSize: "14px",
                fontWeight: 500,
                border: "none",
                cursor: "pointer",
                backgroundColor: "transparent",
                color: "#6b7280",
              }}
            >
              Signup
            </button>
          </div>

          {/* Subtitle */}
          <p
            className="self-start"
            style={{
              fontSize: "14px",
              color: "#6b7280",
              marginBottom: "20px",
            }}
          >
            Sign in to your account to continue
          </p>

          {/* Email */}
          <div className="w-full" style={{ marginBottom: "16px" }}>
            <label
              className="block"
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#374151",
                marginBottom: "6px",
              }}
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (submitted) setEmailError("");
                if (submitted) setPasswordError("");
              }}
              style={{
                width: "100%",
                padding: "12px 14px",
                fontSize: "14px",
                color: "#374151",
                border: `1px solid ${
                  emailHasError || bothFieldsError ? "#EF4444" : "#d1d5db"
                }`,
                borderRadius: "8px",
                outline: "none",
                backgroundColor: "#fff",
              }}
              onFocus={(e) => {
                if (!emailHasError && !bothFieldsError)
                  e.currentTarget.style.borderColor = "#75B5C6";
              }}
              onBlur={(e) => {
                if (!emailHasError && !bothFieldsError)
                  e.currentTarget.style.borderColor = "#d1d5db";
              }}
            />
            {emailError && (
              <p style={{ fontSize: "13px", color: "#EF4444", marginTop: "6px" }}>
                {emailError}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="w-full" style={{ marginBottom: "24px" }}>
            <label
              className="block"
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#374151",
                marginBottom: "6px",
              }}
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (submitted) setPasswordError("");
                if (submitted) setEmailError("");
              }}
              style={{
                width: "100%",
                padding: "12px 14px",
                fontSize: "14px",
                color: "#374151",
                border: `1px solid ${
                  passwordHasError || bothFieldsError ? "#EF4444" : "#d1d5db"
                }`,
                borderRadius: "8px",
                outline: "none",
                backgroundColor: "#fff",
              }}
              onFocus={(e) => {
                if (!passwordHasError && !bothFieldsError)
                  e.currentTarget.style.borderColor = "#75B5C6";
              }}
              onBlur={(e) => {
                if (!passwordHasError && !bothFieldsError)
                  e.currentTarget.style.borderColor = "#d1d5db";
              }}
            />
            {passwordError && (
              <p style={{ fontSize: "13px", color: "#EF4444", marginTop: "6px" }}>
                {passwordError}
              </p>
            )}
          </div>

          {/* Don't have an account */}
          <p
            className="text-center"
            style={{
              fontSize: "14px",
              color: "#6b7280",
              marginBottom: "24px",
            }}
          >
            Don&apos;t have an account ?{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                router.push("/signup");
              }}
              style={{
                color: "#2F8F9D",
                fontWeight: 500,
                textDecoration: "underline",
              }}
            >
              Signup
            </a>
          </p>

          {/* Sign in button */}
          <div className="w-full flex justify-end">
            <button
              onClick={handleSubmit}
              style={{
                background:
                  "linear-gradient(180deg, #2F8F9D 0%, #3A7281 100%)",
                color: "#fff",
                fontSize: "15px",
                fontWeight: 500,
                padding: "12px 52px",
                borderRadius: "9999px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
