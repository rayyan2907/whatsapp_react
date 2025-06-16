import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function ProfilePic() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(
    "Account created. Set profile photo"
  );
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileSelect = (file) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select a valid image file");
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("Image size should be less than 5MB");
      return;
    }

    setErrorMessage("");
    setSelectedImage(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleSetAsDP = async () => {
    if (!selectedImage) {
      setErrorMessage("Please select an image first");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const formData = new FormData();
    formData.append("file", selectedImage);
    const email = localStorage.getItem("email");
    formData.append("email", email);
    console.log(email)

    try {
      const res = await fetch("https://localhost:7285/api/setdp", {
        method: "POST",
        body: formData,
      });

      const data = await res.json(); 
      console.log(data)
      if (res.ok) {
        setSuccessMessage(data.message);
      } else {
        setErrorMessage(data.message || "Failed to set profile picture");
      }
    } catch (err) {
      setErrorMessage("An error occurred: " + err.message);
    }
    setIsLoading(false);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setErrorMessage("");
    setSuccessMessage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSkip = () => {
    // Navigate to next page or complete profile setup
    console.log("Skipping profile photo upload");
    navigate("/");
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
      textAlign: "center",
    },
    formContainer: {
      backgroundColor: "black",
      borderRadius: "8px",
      padding: "24px",
    },
    uploadArea: {
      border: "2px dashed #dddfe2",
      borderRadius: "12px",
      padding: "32px 16px",
      textAlign: "center",
      marginBottom: "24px",
      transition: "all 0.3s ease",
      cursor: "pointer",
      backgroundColor: "#f5f6f7",
    },
    uploadAreaActive: {
      borderColor: "#25D366",
      backgroundColor: "rgba(37, 211, 102, 0.05)",
    },
    uploadAreaHover: {
      borderColor: "#25D366",
      backgroundColor: "rgba(37, 211, 102, 0.02)",
    },
    uploadIcon: {
      width: "48px",
      height: "48px",
      color: "#65676b",
      margin: "0 auto 16px",
    },
    uploadText: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#1c1e21",
      marginBottom: "8px",
    },
    uploadSubtext: {
      fontSize: "14px",
      color: "#65676b",
      marginBottom: "16px",
    },
    browseLink: {
      color: "#25D366",
      textDecoration: "none",
      fontWeight: "600",
      fontSize: "14px",
    },
    previewContainer: {
      textAlign: "center",
      marginBottom: "24px",
    },
    previewImage: {
      width: "200px",
      height: "200px",
      borderRadius: "50%",
      objectFit: "cover",
      border: "4px solid #25D366",
      marginBottom: "16px",
      boxShadow: "0 8px 24px rgba(37, 211, 102, 0.3)",
      display: "block",
      margin: "0 auto 16px",
    },
    previewText: {
      fontSize: "14px",
      color: "#65676b",
      marginBottom: "8px",
    },
    removeButton: {
      background: "none",
      border: "none",
      color: "#ff4444",
      fontSize: "14px",
      fontWeight: "600",
      cursor: "pointer",
      textDecoration: "underline",
    },
    hiddenInput: {
      display: "none",
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
      marginBottom: "12px",
    },
    buttonSecondary: {
      backgroundColor: "transparent",
      color: "#65676b",
      border: "1px solid #dddfe2",
    },
    buttonHover: {
      backgroundColor: "#20b358",
    },
    buttonSecondaryHover: {
      backgroundColor: "#f5f6f7",
      color: "#1c1e21",
    },
    buttonDisabled: {
      opacity: 0.5,
      cursor: "not-allowed",
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
    infoText: {
      fontSize: "12px",
      color: "#65676b",
      textAlign: "center",
      marginBottom: "20px",
      lineHeight: "16px",
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
          <h1 style={styles.title}>Set Profile Picture</h1>
          <p style={styles.subtitle}>
            Choose a photo that represents you - it will be displayed as a
            circle
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

        {/* Upload Form */}
        <div style={styles.formContainer}>
          <div>
            {/* Image Preview or Upload Area */}
            {imagePreview ? (
              <div style={styles.previewContainer}>
                <img
                  src={imagePreview}
                  alt="Profile preview"
                  style={styles.previewImage}
                />
                <div style={styles.previewText}>
                  Preview: {selectedImage?.name}
                </div>
                <div
                  style={{
                    ...styles.previewText,
                    color: "#25D366",
                    fontWeight: "600",
                    marginBottom: "12px",
                  }}
                >
                  Perfect! This will be your profile picture
                </div>
                <button onClick={handleRemoveImage} style={styles.removeButton}>
                  Remove photo
                </button>
              </div>
            ) : (
              <div
                style={{
                  ...styles.uploadArea,
                  ...(isDragOver ? styles.uploadAreaActive : {}),
                }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                onMouseEnter={(e) =>
                  !isDragOver &&
                  Object.assign(e.target.style, styles.uploadAreaHover)
                }
                onMouseLeave={(e) =>
                  !isDragOver &&
                  Object.assign(e.target.style, styles.uploadArea)
                }
              >
                <svg
                  style={styles.uploadIcon}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11Z" />
                </svg>
                <div style={styles.uploadText}>
                  Drag and drop your photo here
                </div>
                <div style={styles.uploadSubtext}>
                  or{" "}
                  <span
                    style={styles.browseLink}
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                  >
                    browse files
                  </span>
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={styles.hiddenInput}
            />

            {/* Info Text */}
            <p style={styles.infoText}>
              Supported formats: JPG, PNG, GIF. Maximum size: 5MB
            </p>

            {/* Set as DP Button */}
            <button
              onClick={handleSetAsDP}
              disabled={isLoading || !selectedImage}
              style={{
                ...styles.button,
                ...(isLoading || !selectedImage ? styles.buttonDisabled : {}),
              }}
              onMouseEnter={(e) =>
                !isLoading &&
                selectedImage &&
                Object.assign(e.target.style, styles.buttonHover)
              }
              onMouseLeave={(e) =>
                !isLoading && Object.assign(e.target.style, styles.button)
              }
            >
              {isLoading ? (
                <>
                  <div style={styles.spinner}></div>
                  Setting as DP...
                </>
              ) : (
                "Set as Profile Picture"
              )}
            </button>

            {/* Skip Button */}
            <button
              onClick={handleSkip}
              disabled={isLoading}
              style={{
                ...styles.button,
                ...styles.buttonSecondary,
                ...(isLoading ? styles.buttonDisabled : {}),
              }}
              onMouseEnter={(e) =>
                !isLoading &&
                Object.assign(e.target.style, styles.buttonSecondaryHover)
              }
              onMouseLeave={(e) =>
                !isLoading &&
                Object.assign(e.target.style, {
                  ...styles.button,
                  ...styles.buttonSecondary,
                })
              }
            >
              Skip for now
            </button>
          </div>
        </div>

        {/* Navigation Section */}
        <div style={styles.loginContainer}>
          <p style={styles.loginText}>
            Want to change your account?{" "}
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
