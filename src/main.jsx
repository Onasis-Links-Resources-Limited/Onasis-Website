import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
// import { AuthProvider } from "./context/AuthContext.jsx";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <StrictMode>
      {/* <AuthProvider> */}
      <App />
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            icon: "✅",
          },
          error: {
            duration: 4000,
            icon: "❌",
          },
        }}
      />
      {/* </AuthProvider> */}
    </StrictMode>
  </HelmetProvider>
);
