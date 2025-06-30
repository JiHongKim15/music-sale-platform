import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthButtons } from '../components/AuthButtons';
import { Input } from '@/components/atoms/Input';
import { PrimaryButton } from '@/components/atoms/Button';
import { CommonHeader } from '@/components/organisms/Header/CommonHeader';

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
    <>
      <CommonHeader title="로그인" showBackButton showLogo showUserMenu={false} />
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">로그인</h2>
          {/* 소셜 로그인 버튼 */}
          <AuthButtons
            onGoogle={() => alert('구글 로그인')}
            onNaver={() => alert('네이버 로그인')}
            onKakao={() => alert('카카오 로그인')}
          />
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-400">또는 이메일로 로그인</span>
            </div>
          </div>
          <form onSubmit={handleEmailLogin} className="space-y-4">
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
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <PrimaryButton type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? '로그인 중...' : '로그인'}
            </PrimaryButton>
          </form>
          <div className="mt-6 text-center text-sm text-gray-600">
            아직 회원이 아니신가요?{' '}
            <Link to="/signup" className="text-orange-600 font-semibold hover:underline">회원가입</Link>
          </div>
        </div>
      </div>
    </>
  );
} 