import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Mail, CheckCircle, Send, ArrowLeft, AlertCircle } from 'lucide-react';
import AuthLayout from './components/AuthLayout';
import Button from '../../components/common/Button';
import { api } from '../../api/client';

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState(() => location.state?.email || '');
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [error, setError] = useState('');
  const [verificationStatus, setVerificationStatus] = useState(null); // 'success', 'error', 'idle'

  // Get token from URL query params
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  // Check if we have an email from location state (for resend)
  const stateEmail = location.state?.email;
  const needsVerification = location.state?.needsVerification || false;

  const verifyEmail = useCallback(async (verificationToken) => {
    setVerifying(true);
    setError('');

    try {
      const response = await api.get(`/auth/verify-email/${verificationToken}`);
      setVerificationStatus('success');
      setEmail(response.data?.email || stateEmail || '');
    } catch (err) {
      setVerificationStatus('error');
      setError(err.response?.data?.message || 'Invalid or expired verification token');
    } finally {
      setVerifying(false);
    }
  }, [stateEmail]);

  useEffect(() => {
    // If we have a token, verify the email
    if (token) {
      // Defer the state updates performed by verification until after the effect.
      const verificationTimer = setTimeout(() => verifyEmail(token), 0);
      return () => clearTimeout(verificationTimer);
    } else if (!stateEmail && !needsVerification) {
      // No token and no email state - redirect to signup
      navigate('/signup');
    }
  }, [token, stateEmail, needsVerification, navigate, verifyEmail]);

  const handleResend = async () => {
    setLoading(true);
    setError('');
    setResendSuccess(false);

    try {
      await api.post('/auth/resend-verification', { email });
      setResendSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend verification email');
    }
    setLoading(false);
  };

  // Show loading state while verifying
  if (verifying && token) {
    return (
      <AuthLayout 
        title="Verifying Your Email"
        subtitle="Please wait while we verify your account"
      >
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto border-4 border-[#C3110C] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400">Verifying your email address...</p>
        </div>
      </AuthLayout>
    );
  }

  // Show verification result
  if (verificationStatus === 'success') {
    return (
      <AuthLayout 
        title="Email Verified!"
        subtitle="Your account has been successfully verified"
      >
        <div className="text-center py-6">
          <div className="w-20 h-20 mx-auto bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Verification Successful!
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Your email has been verified. You can now sign in to your account.
          </p>

          <Button
            variant="primary"
            onClick={() => navigate('/login')}
            className="w-full"
          >
            <ArrowLeft className="w-4 h-4" />
            Sign In Now
          </Button>
        </div>
      </AuthLayout>
    );
  }

  if (verificationStatus === 'error') {
    return (
      <AuthLayout 
        title="Verification Failed"
        subtitle="Unable to verify your email address"
      >
        <div className="text-center py-6">
          <div className="w-20 h-20 mx-auto bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
          </div>

          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Invalid or Expired Link
          </h3>

          <p className="text-sm text-red-500 dark:text-red-400 mb-4">
            {error}
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Please request a new verification link below.
          </p>

          {email && (
            <Button
              variant="primary"
              onClick={handleResend}
              loading={loading}
              disabled={loading}
              className="w-full"
            >
              <Send className="w-4 h-4" />
              Resend Verification Email
            </Button>
          )}

          <div className="mt-4">
            <Link
              to="/login"
              className="text-sm text-[#C3110C] dark:text-[#E6501B] hover:underline font-medium"
            >
              Back to Sign In
            </Link>
          </div>
        </div>
      </AuthLayout>
    );
  }

  // Default view - show verification prompt with resend option
  return (
    <AuthLayout 
      title="Verify Your Email"
      subtitle={needsVerification ? 'Please verify your email to continue' : 'Check your inbox for the verification link'}
    >
      <div className="text-center py-6">
        {/* Icon */}
        <div className="w-20 h-20 mx-auto bg-[#C3110C]/10 dark:bg-[#E6501B]/10 rounded-full flex items-center justify-center mb-4">
          {resendSuccess ? (
            <CheckCircle className="w-10 h-10 text-green-500" />
          ) : (
            <Mail className="w-10 h-10 text-[#C3110C] dark:text-[#E6501B]" />
          )}
        </div>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {resendSuccess ? 'Verification Email Sent!' : 'Verify Your Email Address'}
        </h3>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          {resendSuccess ? (
            `We've sent a verification link to ${email}`
          ) : (
            <>
              We've sent a verification link to <strong className="text-gray-700 dark:text-gray-300">{email}</strong>
              <br />
              Please check your inbox and click the link to verify your account.
            </>
          )}
        </p>

        {/* Resend Section */}
        {!resendSuccess && (
          <div className="space-y-4">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Didn't receive the email? Check your spam folder or click below to resend.
            </p>

            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
                {error}
              </div>
            )}

            <Button
              variant="outline"
              onClick={handleResend}
              loading={loading}
              disabled={loading}
              className="w-full"
            >
              <Send className="w-4 h-4" />
              Resend Verification Email
            </Button>
          </div>
        )}

        {resendSuccess && (
          <Button
            variant="outline"
            onClick={() => navigate('/login')}
            className="w-full"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Sign In
          </Button>
        )}

        {/* Back to login */}
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Link
            to="/login"
            className="text-sm text-[#C3110C] dark:text-[#E6501B] hover:underline font-medium"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default VerifyEmail;