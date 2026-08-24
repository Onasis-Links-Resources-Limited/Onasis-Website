import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import AuthLayout from './components/AuthLayout';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { api } from '../../api/client';

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Please enter a valid email';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      await api.post('/auth/forgot-password', { email });
      setSubmitted(true);
    } catch (error) {
      setErrors({ 
        general: error.response?.data?.message || 'Something went wrong. Please try again.' 
      });
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <AuthLayout 
        title="Check Your Email"
        subtitle="We've sent you a password reset link"
      >
        <div className="text-center py-6">
          <div className="w-20 h-20 mx-auto bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
            <Send className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Reset Link Sent!
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            We've sent a password reset link to <strong className="text-gray-700 dark:text-gray-300">{email}</strong>
            <br />
            Please check your inbox and follow the instructions.
          </p>
          <Link
            to="/login"
            className="text-[#C3110C] dark:text-[#E6501B] hover:underline font-medium text-sm"
          >
            Back to Sign In
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout 
      title="Forgot Password"
      subtitle="Enter your email to receive a reset link"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.general && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
            {errors.general}
          </div>
        )}

        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          placeholder="you@company.com"
          required
        />

        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={loading}
          disabled={loading}
        >
          <Send className="w-4 h-4" />
          Send Reset Link
        </Button>

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

export default ForgotPassword;