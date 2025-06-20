import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function OTPVerification() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("OTP sent. Please check your spam for the email.");
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();

  const inputRefs = useRef([]);

  useEffect(() => {

    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleInputChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple characters
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const digits = pastedData.replace(/\D/g, "").slice(0, 6);

    const newOtp = [...otp];
    for (let i = 0; i < 6; i++) {
      newOtp[i] = digits[i] || "";
    }
    setOtp(newOtp);

    // Focus the next empty input or the last one
    const nextEmptyIndex = newOtp.findIndex((digit) => !digit);
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleSubmit = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setErrorMessage("Please enter all 6 digits");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
        
      const res = await fetch("https://whatsappclonebackend.azurewebsites.net/api/enterotp", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          email: localStorage.getItem("email"), // Assuming email is saved earlier
          otp: otpString,
          
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMessage("Account verified successfully!");
        navigate("/pic");
        
      } else {
        setErrorMessage(data.message || "Invalid OTP");
      }
    } catch (err) {
      setErrorMessage("An error occurred during verification: " + err.message);
      setSuccessMessage("")
    }

    setIsLoading(false);
  };

  const handleResendOTP = async () => {
    if (!canResend) return;

    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("A new OTP has been sent to your email");

    try {
      const res = await fetch("https://localhost:7285/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        setSuccessMessage("OTP sent successfully!");
        setResendTimer(30);
        setCanResend(false);
      } else {
        setErrorMessage("Failed to resend OTP");
        setSuccessMessage("");
      }
    } catch (err) {
      setErrorMessage("An error occurred: " + err.message);
    }

    setIsLoading(false);
  };

  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: "black",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "16px",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    },
    mainContainer: {
      width: "100%",
      maxWidth: "400px",
    },
    logoContainer: {
      textAlign: "center",
      marginBottom: "32px",
    },
    logoCircle: {
      backgroundColor: "#25D366",
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 16px",
      boxShadow: "0 4px 12px rgba(37, 211, 102, 0.3)",
    },
    logoIcon: {
      width: "48px",
      height: "48px",
      color: "white",
    },
    title: {
      fontSize: "28px",
      fontWeight: "600",
      color: "white",
      marginBottom: "8px",
      margin: 0,
    },
    subtitle: {
      color: "#65676b",
      fontSize: "14px",
      margin: 0,
      lineHeight: "20px",
    },
    formContainer: {
      backgroundColor: "black",
      borderRadius: "8px",
      padding: "24px",
    },
    otpContainer: {
      display: "flex",
      justifyContent: "space-between",
      gap: "8px",
      marginBottom: "24px",
    },
    otpInput: {
      width: "48px",
      height: "48px",
      border: "1px solid #dddfe2",
      borderRadius: "6px",
      fontSize: "18px",
      fontWeight: "600",
      backgroundColor: "#f5f6f7",
      outline: "none",
      textAlign: "center",
      transition: "all 0.2s ease",
      boxSizing: "border-box",
    },
    otpInputFocus: {
      backgroundColor: "white",
      borderColor: "#25D366",
      boxShadow: "0 0 0 2px rgba(37, 211, 102, 0.2)",
    },
    otpInputFilled: {
      backgroundColor: "white",
      borderColor: "#25D366",
    },
    button: {
      width: "100%",
      backgroundColor: "#25D366",
      color: "white",
      padding: "12px 16px",
      border: "none",
      borderRadius: "6px",
      fontSize: "14px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "background-color 0.2s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "16px",
    },
    buttonHover: {
      backgroundColor: "#20b358",
    },
    buttonDisabled: {
      opacity: 0.5,
      cursor: "not-allowed",
    },
    resendContainer: {
      textAlign: "center",
      marginBottom: "20px",
    },
    resendText: {
      fontSize: "14px",
      color: "#65676b",
      marginBottom: "8px",
    },
    resendButton: {
      background: "none",
      border: "none",
      color: "#25D366",
      fontSize: "14px",
      fontWeight: "600",
      cursor: "pointer",
      textDecoration: "underline",
    },
    resendButtonDisabled: {
      color: "#65676b",
      cursor: "not-allowed",
      textDecoration: "none",
    },
    termsText: {
      fontSize: "12px",
      color: "#65676b",
      textAlign: "center",
      marginBottom: "20px",
      lineHeight: "16px",
    },
    link: {
      color: "#25D366",
      textDecoration: "none",
      fontSize: "14px",
      fontWeight: "500",
    },
    loginContainer: {
      marginTop: "24px",
      backgroundColor: "black",
      borderRadius: "8px",
      padding: "24px",
      border: "1px solid #dddfe2",
      textAlign: "center",
    },
    loginText: {
      fontSize: "14px",
      color: "#65676b",
      margin: 0,
    },
    footer: {
      marginTop: "48px",
      textAlign: "center",
    },
    copyright: {
      fontSize: "12px",
      color: "#8a8d91",
      margin: 0,
    },
    spinner: {
      width: "16px",
      height: "16px",
      border: "2px solid #ffffff40",
      borderTop: "2px solid #ffffff",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
      marginRight: "8px",
    },
    messageText: {
      textAlign: "center",
      marginBottom: "16px",
      fontSize: "14px",
      fontWeight: "500",
    },
    errorText: {
      color: "#ff4444",
    },
    successText: {
      color: "#25D366",
    },
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>

      <div style={styles.mainContainer}>
        {/* Logo and Title */}
        <div style={styles.logoContainer}>
          <div style={styles.logoCircle}>
            <svg
              style={styles.logoIcon}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
            </svg>
          </div>
          <h1 style={styles.title}>Verify Your Account</h1>
          <p style={styles.subtitle}>
            Enter the 6-digit code sent to your email address
          </p>
        </div>

        {/* Error/Success Messages */}
        {errorMessage && (
          <div style={{ ...styles.messageText, ...styles.errorText }}>
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div style={{ ...styles.messageText, ...styles.successText }}>
            {successMessage}
          </div>
        )}

        {/* OTP Form */}
        <div style={styles.formContainer}>
          <div>
            {/* OTP Input Boxes */}
            <div style={styles.otpContainer} onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  style={{
                    ...styles.otpInput,
                    ...(digit ? styles.otpInputFilled : {}),
                  }}
                  onFocus={(e) =>
                    Object.assign(e.target.style, styles.otpInputFocus)
                  }
                  onBlur={(e) =>
                    Object.assign(
                      e.target.style,
                      digit ? styles.otpInputFilled : styles.otpInput
                    )
                  }
                />
              ))}
            </div>

            {/* Verify Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading || otp.join("").length !== 6}
              style={{
                ...styles.button,
                ...(isLoading || otp.join("").length !== 6
                  ? styles.buttonDisabled
                  : {}),
              }}
              onMouseEnter={(e) =>
                !isLoading &&
                otp.join("").length === 6 &&
                Object.assign(e.target.style, styles.buttonHover)
              }
              onMouseLeave={(e) =>
                !isLoading && Object.assign(e.target.style, styles.button)
              }
            >
              {isLoading ? (
                <>
                  <div style={styles.spinner}></div>
                  Verifying...
                </>
              ) : (
                "Verify Account"
              )}
            </button>

            {/* Resend OTP Section */}
            <div style={styles.resendContainer}>
              <p style={styles.resendText}>Didn't receive the code?</p>
              <button
                onClick={handleResendOTP}
                disabled={!canResend || isLoading}
                style={{
                  ...styles.resendButton,
                  ...(!canResend || isLoading
                    ? styles.resendButtonDisabled
                    : {}),
                }}
              >
                {canResend ? "Resend OTP" : `Resend in ${resendTimer}s`}
              </button>
            </div>
          </div>
        </div>

        {/* Back to Login Section */}
        <div style={styles.loginContainer}>
          <p style={styles.loginText}>
            Want to use a different account?{" "}
            <Link
              to="/"
              style={{
                color: "#25D366",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              Go back to login
            </Link>
          </p>
        </div>
      </div>

      <footer style={styles.footer}>
        <p style={styles.copyright}>© 2024 WhatsApp - Clone</p>
      </footer>
    </div>
  );
}
