'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Sparkles, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.success) {
        router.push('/');
        router.refresh();
      } else {
        setError('Mot de passe incorrect');
        setPassword('');
      }
    } catch {
      setError('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-success-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-2xl border border-void-100 overflow-hidden"
      >
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-8 text-white text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-10 h-10" />
            <h1 className="text-2xl font-bold">QréativeLab Inc.</h1>
          </div>
          <p className="text-primary-100">Legal Document Builder</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-primary-600" />
            </div>
            <h2 className="text-xl font-semibold text-void-800">Accès Protégé</h2>
            <p className="text-void-500 text-sm mt-2">
              Entrez le mot de passe pour accéder au document builder
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 p-3 bg-error-50 border border-error-200 rounded-lg text-error-700 text-sm"
            >
              <AlertCircle className="w-4 h-4" />
              {error}
            </motion.div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-medium text-void-700">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-void-50 border border-void-200 rounded-lg text-void-900 placeholder-void-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
              placeholder="••••••••••••"
              required
              autoFocus
            />
          </div>

          <motion.button
            type="submit"
            disabled={loading || !password}
            className="w-full py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-lg hover:from-primary-400 hover:to-primary-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? 'Vérification...' : 'Accéder'}
          </motion.button>

          <p className="text-center text-xs text-void-400">
            Documents confidentiels pour incorporation
          </p>
        </form>
      </motion.div>
    </div>
  );
}
