import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthButtons } from '../components/AuthButtons';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Music } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // TODO: 실제 로그인 로직 연결
    setTimeout(() => {
      setLoading(false);
      alert('이메일 로그인 시도!');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5 flex flex-col">
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md px-6 py-10 mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="mb-10 flex flex-col items-center">
            <Music className="w-12 h-12 text-primary mb-2" />
            <h2 className="text-3xl font-bold text-text-primary text-center tracking-tight">로그인</h2>
          </div>
          <div className="flex flex-col gap-3 mb-8">
            <AuthButtons
              onGoogle={() => alert('구글 로그인')}
              onNaver={() => alert('네이버 로그인')}
              onKakao={() => alert('카카오 로그인')}
            />
          </div>
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="mx-4 text-sm text-text-secondary">또는 이메일로 로그인</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <form onSubmit={handleEmailLogin} className="flex flex-col gap-4">
            <Input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            {error && <div className="text-red-500 text-sm text-center mt-2 animate-shake">{error}</div>}
            <Button type="submit" size="lg" className="w-full mt-2" loading={loading}>
              {loading ? '로그인 중...' : '로그인'}
            </Button>
          </form>
          <div className="mt-8 text-center text-base text-text-secondary">
            아직 회원이 아니신가요?{' '}
            <Link to="/signup" className="text-primary font-semibold hover:underline">회원가입</Link>
          </div>
        </div>
      </main>
    </div>
  );
} 