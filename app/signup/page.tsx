"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronDown, Check } from "lucide-react";

const industries = [
  "Technology",
  "Healthcare",
  "Financial Services",
  "Manufacturing",
  "Retail",
  "Real Estate",
  "Media & Entertainment",
  "Other",
];

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Step 1
  const [yourName, setYourName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyId, setCompanyId] = useState("");

  // Step 2
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordHint, setPasswordHint] = useState("");

  // Step 3
  const [industry, setIndustry] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [nextStepsOpen, setNextStepsOpen] = useState(false);

  // Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Each segment fills when its step's fields have values
  const step1Filled = yourName.trim() !== "" && workEmail.trim() !== "" && companyName.trim() !== "";
  const step2Filled = password !== "" && confirmPassword !== "";
  const step3Filled = industry !== "";
  const step4Filled = step === 4;
  const segmentsFilled = [step1Filled, step2Filled, step3Filled, step4Filled];

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!yourName.trim()) errs.yourName = "Name is required";
    if (!workEmail.trim()) errs.workEmail = "Work email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(workEmail.trim()))
      errs.workEmail = "Enter a valid email address";
    if (!companyName.trim()) errs.companyName = "Company name is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: Record<string, string> = {};
    if (!password) errs.password = "Password is required";
    else if (password.length < 8) {
      errs.password = "At least 8 Characters";
    }
    if (!confirmPassword) errs.confirmPassword = "Please confirm your password";
    else if (password !== confirmPassword)
      errs.confirmPassword = "Passwords do not match";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = () => {
    const errs: Record<string, string> = {};
    if (!industry) errs.industry = "Please select an industry";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleContinue = () => {
    if (step === 1 && validateStep1()) {
      // Generate a random company ID for display
      if (!companyId) setCompanyId(String(Math.floor(100000 + Math.random() * 900000)));
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    } else if (step === 3 && validateStep3()) {
      setStep(4);
    } else if (step === 4) {
      // Final step — create account and redirect
      router.push("/dashboard/company-details");
    }
  };

  const handleBack = () => {
    setErrors({});
    if (step > 1) setStep(step - 1);
  };

  const inputStyle = (field: string) => ({
    width: "100%",
    padding: "12px 14px",
    fontSize: "14px",
    color: "#374151",
    border: `1px solid ${errors[field] ? "#EF4444" : "#d1d5db"}`,
    borderRadius: "8px",
    outline: "none",
    backgroundColor: "#fff",
  });

  const labelStyle = {
    fontSize: "14px",
    fontWeight: 600 as const,
    color: "#374151",
    marginBottom: "6px",
    display: "block",
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white">
      <Image
        src="/auth/wave.jpg"
        alt=""
        fill
        className="object-cover"
        priority
        aria-hidden="true"
      />

      <div
        className="absolute top-6 right-8 z-10 font-medium"
        style={{ color: "#374151", fontSize: "15px" }}
      >
        Your Logo
      </div>

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
            style={{
              fontSize: "24px",
              fontWeight: 700,
              color: "#1B3A4B",
              marginBottom: "24px",
            }}
          >
            Create your account
          </h1>

          {/* Sign in / Signup toggle */}
          <div
            className="flex rounded-full"
            style={{
              backgroundColor: "#DDEDF1",
              padding: "4px",
              width: "240px",
              marginBottom: "8px",
            }}
          >
            <button
              onClick={() => router.push("/")}
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
              Sign in
            </button>
            <button
              className="flex-1 rounded-full transition-all"
              style={{
                padding: "8px 0",
                fontSize: "14px",
                fontWeight: 500,
                border: "none",
                cursor: "pointer",
                backgroundColor: "#75B5C6",
                color: "#fff",
              }}
            >
              Signup
            </button>
          </div>

          {/* Progress bar - 4 separate segments */}
          <div
            className="flex"
            style={{
              width: "100%",
              gap: "8px",
              marginBottom: "24px",
            }}
          >
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: "4px",
                  borderRadius: "2px",
                  backgroundColor: segmentsFilled[i] ? "#22C55E" : "#E5E7EB",
                  transition: "background-color 0.4s ease",
                }}
              />
            ))}
          </div>

          {/* Step content */}
          <div className="w-full">
            {/* ====== STEP 1: Account Info ====== */}
            {step === 1 && (
              <>
                {/* Account type badge */}
                <div
                  className="flex items-center gap-2"
                  style={{ marginBottom: "8px" }}
                >
                  <Check size={16} style={{ color: "#22C55E" }} />
                  <span style={{ fontSize: "13px", color: "#374151" }}>
                    Account Type:{" "}
                    <strong style={{ fontWeight: 600 }}>
                      Portfolio company
                    </strong>
                  </span>
                </div>
                <p
                  style={{
                    fontSize: "11px",
                    color: "#9CA3AF",
                    marginBottom: "24px",
                    lineHeight: "1.4",
                  }}
                >
                  Note: Stakeholders can give the teams the entity created by
                  their portfolio companies
                </p>

                {/* Your name */}
                <div style={{ marginBottom: "16px" }}>
                  <label style={labelStyle}>Your name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={yourName}
                    onChange={(e) => {
                      setYourName(e.target.value);
                      setErrors((p) => ({ ...p, yourName: "" }));
                    }}
                    style={inputStyle("yourName")}
                    onFocus={(e) => {
                      if (!errors.yourName)
                        e.currentTarget.style.borderColor = "#75B5C6";
                    }}
                    onBlur={(e) => {
                      if (!errors.yourName)
                        e.currentTarget.style.borderColor = "#d1d5db";
                    }}
                  />
                  {errors.yourName && (
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#EF4444",
                        marginTop: "4px",
                      }}
                    >
                      {errors.yourName}
                    </p>
                  )}
                </div>

                {/* Work email */}
                <div style={{ marginBottom: "16px" }}>
                  <label style={labelStyle}>Work email</label>
                  <input
                    type="email"
                    placeholder="Alex0412@Company.com"
                    value={workEmail}
                    onChange={(e) => {
                      setWorkEmail(e.target.value);
                      setErrors((p) => ({ ...p, workEmail: "" }));
                    }}
                    style={inputStyle("workEmail")}
                    onFocus={(e) => {
                      if (!errors.workEmail)
                        e.currentTarget.style.borderColor = "#75B5C6";
                    }}
                    onBlur={(e) => {
                      if (!errors.workEmail)
                        e.currentTarget.style.borderColor = "#d1d5db";
                    }}
                  />
                  {errors.workEmail && (
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#EF4444",
                        marginTop: "4px",
                      }}
                    >
                      {errors.workEmail}
                    </p>
                  )}
                </div>

                {/* Company Name */}
                <div style={{ marginBottom: "24px" }}>
                  <label style={labelStyle}>Company Name</label>
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={companyName}
                    onChange={(e) => {
                      setCompanyName(e.target.value);
                      setErrors((p) => ({ ...p, companyName: "" }));
                    }}
                    style={inputStyle("companyName")}
                    onFocus={(e) => {
                      if (!errors.companyName)
                        e.currentTarget.style.borderColor = "#75B5C6";
                    }}
                    onBlur={(e) => {
                      if (!errors.companyName)
                        e.currentTarget.style.borderColor = "#d1d5db";
                    }}
                  />
                  {errors.companyName && (
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#EF4444",
                        marginTop: "4px",
                      }}
                    >
                      {errors.companyName}
                    </p>
                  )}
                </div>
              </>
            )}

            {/* ====== STEP 2: Secure your account ====== */}
            {step === 2 && (
              <>
                <div
                  className="flex items-center gap-2"
                  style={{ marginBottom: "24px" }}
                >
                  <button
                    onClick={handleBack}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ChevronLeft size={18} style={{ color: "#5A7A8A" }} />
                  </button>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#374151",
                    }}
                  >
                    Secure your account
                  </span>
                </div>

                {/* Password */}
                <div style={{ marginBottom: "16px" }}>
                  <label style={labelStyle}>Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors((p) => ({ ...p, password: "" }));
                      if (e.target.value.length < 8 && e.target.value.length > 0)
                        setPasswordHint("At least 8 Characters");
                      else setPasswordHint("");
                    }}
                    style={inputStyle("password")}
                    onFocus={(e) => {
                      if (!errors.password)
                        e.currentTarget.style.borderColor = "#75B5C6";
                    }}
                    onBlur={(e) => {
                      if (!errors.password)
                        e.currentTarget.style.borderColor = "#d1d5db";
                    }}
                  />
                  {errors.password && (
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#EF4444",
                        marginTop: "4px",
                      }}
                    >
                      {errors.password}
                    </p>
                  )}
                  {!errors.password && passwordHint && (
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#9CA3AF",
                        marginTop: "4px",
                      }}
                    >
                      {passwordHint}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div style={{ marginBottom: "24px" }}>
                  <label style={labelStyle}>Confirm Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setErrors((p) => ({ ...p, confirmPassword: "" }));
                    }}
                    style={inputStyle("confirmPassword")}
                    onFocus={(e) => {
                      if (!errors.confirmPassword)
                        e.currentTarget.style.borderColor = "#75B5C6";
                    }}
                    onBlur={(e) => {
                      if (!errors.confirmPassword)
                        e.currentTarget.style.borderColor = "#d1d5db";
                    }}
                  />
                  {errors.confirmPassword && (
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#EF4444",
                        marginTop: "4px",
                      }}
                    >
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </>
            )}

            {/* ====== STEP 3: Organization ====== */}
            {step === 3 && (
              <>
                <div
                  className="flex items-center gap-2"
                  style={{ marginBottom: "24px" }}
                >
                  <button
                    onClick={handleBack}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ChevronLeft size={18} style={{ color: "#5A7A8A" }} />
                  </button>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#374151",
                    }}
                  >
                    Tell us about your organization
                  </span>
                </div>

                {/* Industry */}
                <div style={{ marginBottom: "16px", position: "relative" }}>
                  <label style={labelStyle}>Industry</label>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center justify-between"
                    style={{
                      width: "100%",
                      padding: "12px 14px",
                      fontSize: "14px",
                      color: industry ? "#374151" : "#9CA3AF",
                      border: `1px solid ${errors.industry ? "#EF4444" : "#d1d5db"}`,
                      borderRadius: "8px",
                      backgroundColor: "#fff",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <span>{industry || "Select Industry"}</span>
                    <ChevronDown size={16} style={{ color: "#9CA3AF" }} />
                  </button>

                  {/* Dropdown */}
                  {dropdownOpen && (
                    <div
                      style={{
                        position: "absolute",
                        top: "calc(100% + 4px)",
                        left: 0,
                        right: 0,
                        backgroundColor: "#fff",
                        border: "1px solid #E5E7EB",
                        borderRadius: "8px",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                        zIndex: 20,
                        overflow: "hidden",
                      }}
                    >
                      {industries.map((item) => (
                        <button
                          key={item}
                          onClick={() => {
                            setIndustry(item);
                            setDropdownOpen(false);
                            setErrors((p) => ({ ...p, industry: "" }));
                          }}
                          className="w-full text-left transition-colors"
                          style={{
                            padding: "10px 14px",
                            fontSize: "14px",
                            color: "#374151",
                            backgroundColor:
                              industry === item ? "#F0FDF4" : "#fff",
                            border: "none",
                            borderBottom: "1px solid #F3F4F6",
                            cursor: "pointer",
                            display: "block",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = "#F9FAFB")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor =
                              industry === item ? "#F0FDF4" : "#fff")
                          }
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}

                  {errors.industry && (
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#EF4444",
                        marginTop: "4px",
                      }}
                    >
                      {errors.industry}
                    </p>
                  )}
                </div>

                <p
                  style={{
                    fontSize: "11px",
                    color: "#9CA3AF",
                    marginBottom: "24px",
                    lineHeight: "1.5",
                  }}
                >
                  You can customize additional settings like fiscal year start,
                  reporting currency, and currency rate in organization settings
                </p>
              </>
            )}

            {/* ====== STEP 4: Ready to get started ====== */}
            {step === 4 && (
              <>
                <div
                  className="flex items-center gap-2"
                  style={{ marginBottom: "20px" }}
                >
                  <button
                    onClick={handleBack}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ChevronLeft size={18} style={{ color: "#5A7A8A" }} />
                  </button>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#374151",
                    }}
                  >
                    Ready to get started
                  </span>
                </div>

                {/* Organization summary */}
                <div
                  style={{
                    backgroundColor: "#F9FAFB",
                    borderRadius: "10px",
                    padding: "16px 20px",
                    marginBottom: "20px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#9CA3AF",
                      marginBottom: "6px",
                    }}
                  >
                    Organization
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#374151",
                      fontWeight: 500,
                      marginBottom: "2px",
                    }}
                  >
                    {companyId}
                  </p>
                  <p style={{ fontSize: "13px", color: "#6B7280" }}>
                    {industry || "Other"}
                  </p>
                </div>

                {/* Next steps dropdown */}
                <div style={{ marginBottom: "24px" }}>
                  <button
                    onClick={() => setNextStepsOpen(!nextStepsOpen)}
                    className="flex items-center justify-between w-full"
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#374151",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    <span className="flex items-center gap-1">
                      <ChevronDown
                        size={16}
                        style={{
                          color: "#6B7280",
                          transform: nextStepsOpen ? "rotate(0deg)" : "rotate(-90deg)",
                          transition: "transform 0.2s ease",
                        }}
                      />
                      Next steps
                    </span>
                  </button>
                  <div
                    style={{
                      maxHeight: nextStepsOpen ? "200px" : "0px",
                      overflow: "hidden",
                      transition: "max-height 0.35s ease, opacity 0.3s ease",
                      opacity: nextStepsOpen ? 1 : 0,
                    }}
                  >
                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                        marginTop: "10px",
                      }}
                    >
                      <li
                        style={{
                          fontSize: "13px",
                          color: "#6B7280",
                          paddingLeft: "16px",
                        }}
                      >
                        Upload your first filing/slip
                      </li>
                      <li
                        style={{
                          fontSize: "13px",
                          color: "#6B7280",
                          paddingLeft: "16px",
                        }}
                      >
                        Review your dashboards
                      </li>
                      <li
                        style={{
                          fontSize: "13px",
                          color: "#6B7280",
                          paddingLeft: "16px",
                        }}
                      >
                        Invite stakeholders to review your data
                      </li>
                    </ul>
                  </div>
                </div>

                <p
                  style={{
                    fontSize: "11px",
                    color: "#9CA3AF",
                    marginBottom: "24px",
                    lineHeight: "1.5",
                  }}
                >
                  Click &quot;Continue Setup&quot; to create your account and
                  access the platform
                </p>
              </>
            )}

            {/* Continue button */}
            <div className="w-full flex justify-end">
              <button
                onClick={handleContinue}
                style={{
                  background:
                    "linear-gradient(180deg, #2F8F9D 0%, #3A7281 100%)",
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: 500,
                  padding: "12px 44px",
                  borderRadius: "9999px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
