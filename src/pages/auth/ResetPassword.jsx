import { useState, useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Lock,
  Eye,
  EyeOff,
  Check,
  X,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import AuthLayout from "./components/AuthLayout";
import Button from "../../components/common/Button";
import { api } from "../../api/client";
import { Helmet } from "react-helmet-async";

const PasswordRequirement = ({ met, text }) => (
  <div
    className={`flex items-center gap-2 text-xs transition-colors duration-300 ${
      met
        ? "text-green-600 dark:text-green-400"
        : "text-gray-400 dark:text-gray-500"
    }`}
  >
    {met ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
    <span>{text}</span>
  </div>
);

const ResetPassword = () => {
  const { token } = useParams();

  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [validToken, setValidToken] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Password requirements
  const passwordChecks = useMemo(() => {
    const password = formData.password;

    return {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      match: password === formData.confirmPassword && password.length > 0,
    };
  }, [formData.password, formData.confirmPassword]);

  // Verify token on mount
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setValidToken(false);
        setVerifying(false);
        return;
      }

      try {
        // Optional: Add a backend endpoint to verify token
        // For now, we'll just assume token exists and let the backend validate on submit
        setValidToken(true);
      } catch {
        setValidToken(false);
      } finally {
        setVerifying(false);
      }
    };

    verifyToken();
  }, [token]);

  const validate = () => {
    const newErrors = {};
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Min 8 characters";
    else if (!/[A-Z]/.test(formData.password))
      newErrors.password = "Must include an uppercase letter";
    else if (!/[a-z]/.test(formData.password))
      newErrors.password = "Must include a lowercase letter";
    else if (!/[0-9]/.test(formData.password))
      newErrors.password = "Must include a number";
    else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password))
      newErrors.password = "Must include a special character";

    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors({});

    try {
      // ✅ Match your backend's expected field name
      const response = await api.post(`/auth/reset-password/${token}`, {
        new_password: formData.password,
      });

      if (response.data.success) {
        setSubmitted(true);
      } else {
        setErrors({
          general: response.data.message || "Failed to reset password.",
        });
      }
    } catch (error) {
      setErrors({
        general:
          error.response?.data?.message ||
          "Failed to reset password. The link may have expired.",
      });
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // LOADING STATE
  // ============================================================
  if (verifying) {
    return (
      <AuthLayout title="Verifying Link" subtitle="Please wait...">
        <div className="text-center py-12">
          <Loader2 className="w-12 h-12 text-[#C3110C] dark:text-[#E6501B] animate-spin mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            Verifying your reset link...
          </p>
        </div>
      </AuthLayout>
    );
  }

  // ============================================================
  // INVALID TOKEN STATE
  // ============================================================
  if (!validToken) {
    return (
      <AuthLayout
        title="Invalid Link"
        subtitle="This password reset link is invalid or expired"
      >
        <div className="text-center py-6">
          <div className="w-20 h-20 mx-auto bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Link Expired or Invalid
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            The password reset link is invalid or has expired. Please request a
            new one.
          </p>
          <Link to="/forgot-password">
            <Button variant="primary" className="w-full">
              Request New Link
            </Button>
          </Link>
        </div>
      </AuthLayout>
    );
  }

  // ============================================================
  // SUCCESS STATE
  // ============================================================
  if (submitted) {
    return (
      <AuthLayout
        title="Password Reset!"
        subtitle="Your password has been updated successfully"
      >
        <div className="text-center py-6">
          <div className="w-20 h-20 mx-auto bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Password Reset Successfully
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Your password has been changed. You can now sign in with your new
            password.
          </p>
          <Link to="/login">
            <Button variant="primary" className="w-full">
              <ArrowLeft className="w-4 h-4" />
              Back to Sign In
            </Button>
          </Link>
        </div>
      </AuthLayout>
    );
  }

  // ============================================================
  // FORM STATE
  // ============================================================
  return (
    <AuthLayout title="Reset Password" subtitle="Enter your new password below">
      <Helmet>
        <title>Reset Password | Onasis Links Resources Limited</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.general && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errors.general}</span>
          </div>
        )}

        {/* New Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            New Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Lock
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                errors.password ? "text-red-500" : "text-gray-400"
              }`}
            />
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Enter new password"
              className={`w-full pl-10 pr-10 py-2.5 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 dark:border-[#2A2A2A] bg-white dark:bg-[#1A1A1A] text-gray-900 dark:text-white focus:border-[#C3110C] dark:focus:border-[#E6501B]"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.password}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Lock
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                errors.confirmPassword ? "text-red-500" : "text-gray-400"
              }`}
            />
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              placeholder="Confirm new password"
              className={`w-full pl-10 pr-10 py-2.5 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 ${
                errors.confirmPassword
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 dark:border-[#2A2A2A] bg-white dark:bg-[#1A1A1A] text-gray-900 dark:text-white focus:border-[#C3110C] dark:focus:border-[#E6501B]"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Password Requirements */}
        {formData.password && (
          <div className="p-4 bg-gray-50 dark:bg-[#1A1A1A] rounded-lg space-y-1.5 border border-gray-200 dark:border-[#2A2A2A]">
            <p className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-2">
              Password must contain:
            </p>
            <PasswordRequirement
              met={passwordChecks.minLength}
              text="At least 8 characters"
            />
            <PasswordRequirement
              met={passwordChecks.hasUppercase}
              text="At least one uppercase letter"
            />
            <PasswordRequirement
              met={passwordChecks.hasLowercase}
              text="At least one lowercase letter"
            />
            <PasswordRequirement
              met={passwordChecks.hasNumber}
              text="At least one number"
            />
            <PasswordRequirement
              met={passwordChecks.hasSpecial}
              text="At least one special character"
            />
            {formData.confirmPassword && (
              <PasswordRequirement
                met={passwordChecks.match}
                text="Passwords match"
              />
            )}
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={loading}
          disabled={loading}
        >
          <Lock className="w-4 h-4" />
          Reset Password
        </Button>

        {/* Back to Login */}
        <div className="text-center">
          <Link
            to="/login"
            className="text-sm text-[#C3110C] dark:text-[#E6501B] hover:underline font-medium inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Sign In
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ResetPassword;
