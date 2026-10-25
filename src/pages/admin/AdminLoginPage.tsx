import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../../services/api';
import { Shield, ArrowRight, Lock, User } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await api.login(username, password);
    setLoading(false);

    if (res.success && res.token) {
      sessionStorage.setItem('atelier_token', res.token);
      navigate('/admin/dashboard');
    } else {
      setError(res.message || 'Invalid username or credentials');
    }
  };

  return (
    <div className="min-h-screen bg-atelier-ivory flex flex-col justify-center items-center px-6 py-12">
      <div className="w-full max-w-md bg-atelier-cream border border-atelier-charcoal/15 p-8 md:p-10 shadow-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-atelier-charcoal text-atelier-ivory rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-6 h-6 stroke-[1.2]" />
          </div>
          <span className="font-serif tracking-[0.24em] text-xl font-normal block">
            ATELIER
          </span>
          <span className="text-[10px] tracking-editorial uppercase text-atelier-muted">
            Internal Studio Portal
          </span>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-[11px] tracking-editorial uppercase text-atelier-charcoal mb-2 font-medium">
              Studio User ID
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-atelier-muted">
                <User className="w-4 h-4" />
              </span>
              <input
                type="text"
                required
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-atelier-ivory border border-atelier-charcoal/20 text-sm focus:outline-none focus:border-atelier-charcoal"
                autoComplete="off"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] tracking-editorial uppercase text-atelier-charcoal mb-2 font-medium">
              Access Key
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-atelier-muted">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-atelier-ivory border border-atelier-charcoal/20 text-sm focus:outline-none focus:border-atelier-charcoal"
                autoComplete="off"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-atelier-charcoal text-atelier-ivory text-[12px] tracking-editorial uppercase hover:bg-atelier-dark transition-all disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            <span>{loading ? 'Authenticating...' : 'Enter Studio Portal'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-atelier-charcoal/10 text-center">
          <Link
            to="/"
            className="text-[11px] tracking-editorial uppercase text-atelier-muted hover:text-atelier-charcoal underline"
          >
            ← Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
};
