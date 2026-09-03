import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { 
  User, Mail, Lock, Eye, EyeOff, AlertCircle,
  Building, Phone, Shield, Truck, Headphones,
} from 'lucide-react';

const SignUp = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '', email: '', password: '', confirmPassword: '', company: '', phone: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Min 8 characters';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!agreedToTerms) newErrors.terms = 'You must agree';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      localStorage.setItem('user', JSON.stringify({ name: formData.fullName, email: formData.email, company: formData.company, phone: formData.phone, registeredAt: new Date().toISOString() }));
      alert('Account created successfully! Welcome to Onasis Links Resources.');
      navigate('/');
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const benefits = [
    { icon: Shield, text: 'Secure account & data protection' },
    { icon: Truck, text: 'Priority shipping & tracking' },
    { icon: Headphones, text: '24/7 customer support' },
  ];

  return (
    <div className={`h-screen overflow-hidden flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="w-full max-w-6xl mx-auto px-4 py-4">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Side - Form */}
          <div className={`rounded-2xl p-6 shadow-sm ${isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
            <div className="mb-4">
              <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Create Account</h1>
              <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Join Onasis Links Resources Limited</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Full Name */}
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Full Name *</label>
                <div className="relative">
                  <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${errors.fullName ? 'text-red-500' : isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Your full name"
                    className={`w-full pl-10 pr-4 py-2 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 ${errors.fullName ? 'border-red-500 focus:ring-red-200' : isDark ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-[#E6501B]' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#C3110C]'}`} />
                </div>
                {errors.fullName && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.fullName}</p>}
              </div>

              {/* Email */}
              <div>
                <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Email Address *</label>
                <div className="relative">
                  <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${errors.email ? 'text-red-500' : isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com"
                    className={`w-full pl-10 pr-4 py-2 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-200' : isDark ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-[#E6501B]' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#C3110C]'}`} />
                </div>
                {errors.email && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
              </div>

              {/* Password & Confirm Password (Side by Side) */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Password *</label>
                  <div className="relative">
                    <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${errors.password ? 'text-red-500' : isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                    <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} placeholder="Min. 8 chars"
                      className={`w-full pl-10 pr-10 py-2 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500 focus:ring-red-200' : isDark ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-[#E6501B]' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#C3110C]'}`} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className={`absolute right-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-400' : 'text-gray-400'}`}>
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.password}</p>}
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Confirm Password *</label>
                  <div className="relative">
                    <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${errors.confirmPassword ? 'text-red-500' : isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                    <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm"
                      className={`w-full pl-10 pr-10 py-2 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 ${errors.confirmPassword ? 'border-red-500 focus:ring-red-200' : isDark ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-[#E6501B]' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#C3110C]'}`} />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className={`absolute right-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-400' : 'text-gray-400'}`}>
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.confirmPassword}</p>}
                </div>
              </div>

              {/* Company & Phone */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Company</label>
                  <div className="relative">
                    <Building className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                    <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Your company"
                      className={`w-full pl-10 pr-4 py-2 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 ${isDark ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-[#E6501B]' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#C3110C]'}`} />
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Phone</label>
                  <div className="relative">
                    <Phone className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+234 800 000 0000"
                      className={`w-full pl-10 pr-4 py-2 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 ${isDark ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-[#E6501B]' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#C3110C]'}`} />
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3">
                <input type="checkbox" checked={agreedToTerms} onChange={() => setAgreedToTerms(!agreedToTerms)} className="mt-1 w-4 h-4 rounded border-gray-300 text-[#C3110C] focus:ring-[#C3110C]" />
                <div>
                  <label className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    I agree to the <Link to="/terms" className="text-[#C3110C] hover:underline">Terms & Conditions</Link> and <Link to="/privacy" className="text-[#C3110C] hover:underline">Privacy Policy</Link>
                  </label>
                  {errors.terms && <p className="mt-1 text-xs text-red-500">{errors.terms}</p>}
                </div>
              </div>

              {/* Submit */}
              <button type="submit" disabled={isSubmitting}
                className="w-full py-2.5 bg-[#C3110C] hover:bg-[#E6501B] text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed">
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </button>

             <p className={`text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
  Already have an account?{' '}
  <Link to="/login" className="text-[#C3110C] hover:underline font-medium">
    Login
  </Link>
</p>
            </form>
          </div>

          {/* Right Side - Info */}
          <div className={`hidden md:flex flex-col justify-center rounded-2xl p-6 ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="text-center mb-6">
              <img src="/images/onasis-t-logo.png" alt="Onasis Logo" className="h-12 w-auto mx-auto mb-4 object-contain" />
              <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Welcome to Onasis Links</h2>
              <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Join our community of professionals</p>
            </div>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <benefit.icon className={`w-5 h-5 mt-0.5 text-[#C3110C]`} />
                  <div><p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{benefit.text}</p></div>
                </div>
              ))}
            </div>

            <div className={`mt-6 p-4 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">JD</div>
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">AK</div>
                  <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold">SM</div>
                </div>
                <div><p className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-700'}`}><span className="font-semibold">500+</span> professionals already joined</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;