import Registration from "./Registration";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [Message, setMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState("");
  const [logoutMsg, setLogoutMsg] = useState("");

  useEffect(() => {
    const msg = localStorage.getItem("logoutMessage");
    if (msg) {
      setLogoutMsg(msg);
      localStorage.removeItem("logoutMessage"); // clean up
    }
  }, []);
  useEffect(() => {
    if (location.state?.successMessage) {
      setSuccessMessage(location.state.successMessage);
    }
  }, [location]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const { email, password } = formData;
    if (!email || !password) {
      setErrorMessage("Please enter your credentials");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("https://whatsappclonebackend.azurewebsites.net/whatsapp/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Login Response:", data); // Helpful debug log

      if (res.ok && data.token) {
        localStorage.setItem("jwt", data.token);

        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "/whatsapp";
      } else {
        setErrorMessage(data.message || "Invalid credentials");
        setLogoutMsg("")
      }
    } catch (err) {
      console.error("Login error: ", err);
      setErrorMessage("An error occurred while logging in. " + err);
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
    },
    formContainer: {
      backgroundColor: "black",
      borderRadius: "8px",
      padding: "24px",
    },
    inputContainer: {
      marginBottom: "16px",
    },
    input: {
      width: "100%",
      padding: "12px",
      border: "1px solid #dddfe2",
      borderRadius: "6px",
      fontSize: "14px",
      backgroundColor: "#f5f6f7",
      outline: "none",
      transition: "all 0.2s ease",
      boxSizing: "border-box",
    },
    inputFocus: {
      backgroundColor: "white",
      borderColor: "#25D366",
      boxShadow: "0 0 0 2px rgba(37, 211, 102, 0.2)",
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
    },
    buttonHover: {
      backgroundColor: "#20b358",
    },
    buttonDisabled: {
      opacity: 0.5,
      cursor: "not-allowed",
    },
    forgotPassword: {
      marginTop: "16px",
      textAlign: "center",
    },
    link: {
      color: "#25D366",
      textDecoration: "none",
      fontSize: "14px",
      fontWeight: "500",
    },
    signupContainer: {
      marginTop: "24px",
      backgroundColor: "black",
      borderRadius: "8px",
      padding: "24px",
      border: "1px solid #dddfe2",

      textAlign: "center",
    },
    signupText: {
      fontSize: "14px",
      color: "#65676b",
      margin: 0,
    },
    downloadSection: {
      marginTop: "24px",
      textAlign: "center",
    },
    downloadText: {
      fontSize: "14px",
      color: "#65676b",
      marginBottom: "16px",
    },
    downloadButtons: {
      display: "flex",
      justifyContent: "center",
      gap: "12px",
      flexWrap: "wrap",
    },
    downloadButton: {
      height: "40px",
      backgroundColor: "#000",
      color: "white",
      padding: "8px 16px",
      borderRadius: "4px",
      textDecoration: "none",
      display: "flex",
      alignItems: "center",
      fontSize: "12px",
      fontWeight: "500",
      minWidth: "120px",
      justifyContent: "center",
    },
    footer: {
      marginTop: "48px",
      textAlign: "center",
    },
    footerLinks: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "16px",
      fontSize: "12px",
      color: "#65676b",
      marginBottom: "16px",
    },
    footerLink: {
      color: "#65676b",
      textDecoration: "none",
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
          <h1 style={styles.title}>WhatsApp</h1>
          <p style={styles.subtitle}>Sign in to continue messaging</p>
        </div>
        {errorMessage && (
          <p
            style={{ color: "red", textAlign: "center", marginBottom: "10px" }}
          >
            {errorMessage}
          </p>
        )}
        {successMessage && (
          <div style={{ ...styles.messageText, ...styles.successText }}>
            {successMessage}
          </div>
        )}
        {logoutMsg && (
          <div style={{ color: "green", textAlign: "center", marginBottom: "10px" }}>{logoutMsg}</div>
        )}

        {/* Login Form */}
        <div style={styles.formContainer}>
          <div>
            {/* Phone Number Input */}
            <div style={styles.inputContainer}>
              <input
                type="tel"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                style={styles.input}
                onFocus={(e) =>
                  Object.assign(e.target.style, styles.inputFocus)
                }
                onBlur={(e) => Object.assign(e.target.style, styles.input)}
                required
              />
            </div>

            {/* Password Input */}
            <div style={styles.inputContainer}>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                style={styles.input}
                onFocus={(e) =>
                  Object.assign(e.target.style, styles.inputFocus)
                }
                onBlur={(e) => Object.assign(e.target.style, styles.input)}
                required
              />
            </div>

            {/* Login Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              style={{
                ...styles.button,
                ...(isLoading ? styles.buttonDisabled : {}),
              }}
              onMouseEnter={(e) =>
                !isLoading && Object.assign(e.target.style, styles.buttonHover)
              }
              onMouseLeave={(e) =>
                !isLoading && Object.assign(e.target.style, styles.button)
              }
            >
              {isLoading ? (
                <>
                  <div style={styles.spinner}></div>
                  Signing in...
                </>
              ) : (
                "Log In"
              )}
            </button>
          </div>

          {/* Forgot Password */}
          <div style={styles.forgotPassword}>
            <a href="#" style={styles.link}>
              Forgot password?
            </a>
          </div>
        </div>

        {/* Sign Up Section */}
        <div style={styles.signupContainer}>
          <p style={styles.signupText}>
            Don't have an account?{" "}
            <Link to="/register" style={styles.link}>
              Sign up
            </Link>
          </p>
        </div>

        {/* Download App Section */}
        <div style={styles.downloadSection}>
          <p style={styles.downloadText}>Get the app.</p>
        </div>
      </div>
      <footer>
        <p style={styles.copyright}>© 2024 WhatsApp - Clone</p>
      </footer>
    </div>
  );
}
