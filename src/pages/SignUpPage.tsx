import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Loader2, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

type Props = {
  onNavigate: (page: string, params?: Record<string, string>) => void;
};

export default function SignUpPage({ onNavigate }: Props) {
  const { signUp } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await signUp(email, password, fullName);
    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-rose-50 pt-28 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 md:p-10 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-3">Account Created!</h1>
            <p className="text-slate-500 mb-6">
              We've sent a confirmation email to <strong className="text-slate-700">{email}</strong>
            </p>
            <p className="text-slate-400 text-sm mb-8">
              Please check your inbox and click the confirmation link to activate your account.
            </p>
            <button
              onClick={() => onNavigate('signin')}
              className="w-full bg-gradient-to-r from-orange-400 to-rose-500 text-white font-bold py-4 rounded-xl hover:shadow-lg transition-all"
            >
              Back to Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-rose-50 pt-28 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <User size={28} className="text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900">Create Account</h1>
            <p className="text-slate-500 mt-2">Join MartX and start shopping</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-300 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-300 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  required
                  minLength={6}
                  className="w-full pl-11 pr-12 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-300 focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-1">Minimum 6 characters</p>
            </div>

            <div className="flex items-start gap-2">
              <input type="checkbox" required className="w-4 h-4 mt-1 rounded border-slate-300 text-orange-500 focus:ring-orange-500" />
              <span className="text-sm text-slate-600">
                I agree to the{' '}
                <button type="button" className="text-orange-500 hover:text-orange-600 font-medium">Terms of Service</button>
                {' '}and{' '}
                <button type="button" className="text-orange-500 hover:text-orange-600 font-medium">Privacy Policy</button>
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-400 to-rose-500 text-white font-bold py-4 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : (
                <>
                  Create Account <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-600">
              Already have an account?{' '}
              <button
                onClick={() => onNavigate('signin')}
                className="text-orange-500 hover:text-orange-600 font-semibold"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
