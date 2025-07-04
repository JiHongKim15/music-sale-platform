import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { AuthApiService, UserRole, CreateUserByEmailRequest } from '../services/authApi';
import { Button } from '@/components/ui/button';
import { AuthButtons } from '@/domains/auth/components/AuthButtons';
import { CommonHeader } from '@/components/organisms/Header/CommonHeader';
import { Eye, EyeOff, Check, X, Music } from 'lucide-react';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  nickname: string;
  phoneNumber: string;
  role: UserRole;
  agreeTerms: boolean;
  agreePrivacy: boolean;
  storeName?: string;
  storeAddress?: string;
  storePhone?: string;
}

interface ValidationState {
  email: { isValid: boolean; message: string; isChecking: boolean; };
  password: { isValid: boolean; message: string; };
  confirmPassword: { isValid: boolean; message: string; };
  name: { isValid: boolean; message: string; };
  nickname: { isValid: boolean; message: string; isChecking: boolean; };
  phoneNumber: { isValid: boolean; message: string; isChecking: boolean; };
}

interface PhoneVerification {
  isRequested: boolean;
  isVerified: boolean;
  code: string;
  timeLeft: number;
  isVerifying: boolean;
}

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isSeller = searchParams.get('type') === 'seller';
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    nickname: '',
    phoneNumber: '',
    role: UserRole.BUYER,
    agreeTerms: false,
    agreePrivacy: false,
  });

  const [validation, setValidation] = useState<ValidationState>({
    email: { isValid: false, message: '', isChecking: false },
    password: { isValid: false, message: '' },
    confirmPassword: { isValid: false, message: '' },
    name: { isValid: false, message: '' },
    nickname: { isValid: false, message: '', isChecking: false },
    phoneNumber: { isValid: false, message: '', isChecking: false },
  });

  const [phoneVerification, setPhoneVerification] = useState<PhoneVerification>({
    isRequested: false,
    isVerified: false,
    code: '',
    timeLeft: 0,
    isVerifying: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1: 기본정보, 2: 핸드폰인증, 3: 완료

  // isSeller 값이 바뀔 때(매장 판매자 등록 클릭 시) 애니메이션 트리거
  const [sellerTransition, setSellerTransition] = useState(false);
  useEffect(() => {
    setSellerTransition(true);
    const timer = setTimeout(() => setSellerTransition(false), 500);
    return () => clearTimeout(timer);
  }, [isSeller]);

  // 타이머 효과
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (phoneVerification.timeLeft > 0) {
      timer = setTimeout(() => {
        setPhoneVerification(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [phoneVerification.timeLeft]);

  // 이메일 유효성 검사 및 중복 확인
  const validateEmail = async (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
      setValidation(prev => ({
        ...prev,
        email: { isValid: false, message: '이메일을 입력해주세요.', isChecking: false }
      }));
      return;
    }

    if (!emailRegex.test(email)) {
      setValidation(prev => ({
        ...prev,
        email: { isValid: false, message: '올바른 이메일 형식이 아닙니다.', isChecking: false }
      }));
      return;
    }

    setValidation(prev => ({
      ...prev,
      email: { isValid: false, message: '중복 확인 중...', isChecking: true }
    }));

    try {
      const response = await AuthApiService.checkEmailExists(email);
      if (response.data?.exists) {
        setValidation(prev => ({
          ...prev,
          email: { isValid: false, message: '이미 사용 중인 이메일입니다.', isChecking: false }
        }));
      } else {
        setValidation(prev => ({
          ...prev,
          email: { isValid: true, message: '사용 가능한 이메일입니다.', isChecking: false }
        }));
      }
    } catch (error) {
      setValidation(prev => ({
        ...prev,
        email: { isValid: false, message: '이메일 확인 중 오류가 발생했습니다.', isChecking: false }
      }));
    }
  };

  // 닉네임 유효성 검사 및 중복 확인
  const validateNickname = async (nickname: string) => {
    if (!nickname) {
      setValidation(prev => ({
        ...prev,
        nickname: { isValid: false, message: '닉네임을 입력해주세요.', isChecking: false }
      }));
      return;
    }

    if (nickname.length < 2 || nickname.length > 10) {
      setValidation(prev => ({
        ...prev,
        nickname: { isValid: false, message: '닉네임은 2-10자 사이여야 합니다.', isChecking: false }
      }));
      return;
    }

    setValidation(prev => ({
      ...prev,
      nickname: { isValid: false, message: '중복 확인 중...', isChecking: true }
    }));

    try {
      const response = await AuthApiService.checkNicknameExists(nickname);
      if (response.data?.exists) {
        setValidation(prev => ({
          ...prev,
          nickname: { isValid: false, message: '이미 사용 중인 닉네임입니다.', isChecking: false }
        }));
      } else {
        setValidation(prev => ({
          ...prev,
          nickname: { isValid: true, message: '사용 가능한 닉네임입니다.', isChecking: false }
        }));
      }
    } catch (error) {
      setValidation(prev => ({
        ...prev,
        nickname: { isValid: false, message: '닉네임 확인 중 오류가 발생했습니다.', isChecking: false }
      }));
    }
  };

  // 핸드폰 번호 유효성 검사 및 중복 확인
  const validatePhoneNumber = async (phoneNumber: string) => {
    const phoneRegex = /^01[016789]-?[0-9]{3,4}-?[0-9]{4}$/;
    
    if (!phoneNumber) {
      setValidation(prev => ({
        ...prev,
        phoneNumber: { isValid: false, message: '핸드폰 번호를 입력해주세요.', isChecking: false }
      }));
      return;
    }

    if (!phoneRegex.test(phoneNumber.replace(/-/g, ''))) {
      setValidation(prev => ({
        ...prev,
        phoneNumber: { isValid: false, message: '올바른 핸드폰 번호 형식이 아닙니다.', isChecking: false }
      }));
      return;
    }

    setValidation(prev => ({
      ...prev,
      phoneNumber: { isValid: false, message: '중복 확인 중...', isChecking: true }
    }));

    try {
      const response = await AuthApiService.checkPhoneExists(phoneNumber);
      if (response.data?.exists) {
        setValidation(prev => ({
          ...prev,
          phoneNumber: { isValid: false, message: '이미 사용 중인 핸드폰 번호입니다.', isChecking: false }
        }));
      } else {
        setValidation(prev => ({
          ...prev,
          phoneNumber: { isValid: true, message: '사용 가능한 핸드폰 번호입니다.', isChecking: false }
        }));
      }
    } catch (error) {
      setValidation(prev => ({
        ...prev,
        phoneNumber: { isValid: false, message: '핸드폰 번호 확인 중 오류가 발생했습니다.', isChecking: false }
      }));
    }
  };

  // 비밀번호 유효성 검사
  const validatePassword = (password: string) => {
    if (!password) {
      setValidation(prev => ({
        ...prev,
        password: { isValid: false, message: '비밀번호를 입력해주세요.' }
      }));
      return;
    }

    if (password.length < 8) {
      setValidation(prev => ({
        ...prev,
        password: { isValid: false, message: '비밀번호는 8자 이상이어야 합니다.' }
      }));
      return;
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!(hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar)) {
      setValidation(prev => ({
        ...prev,
        password: { isValid: false, message: '대소문자, 숫자, 특수문자를 모두 포함해야 합니다.' }
      }));
      return;
    }

    setValidation(prev => ({
      ...prev,
      password: { isValid: true, message: '안전한 비밀번호입니다.' }
    }));
  };

  // 비밀번호 확인 검사
  const validateConfirmPassword = (confirmPassword: string) => {
    if (!confirmPassword) {
      setValidation(prev => ({
        ...prev,
        confirmPassword: { isValid: false, message: '비밀번호 확인을 입력해주세요.' }
      }));
      return;
    }

    if (confirmPassword !== formData.password) {
      setValidation(prev => ({
        ...prev,
        confirmPassword: { isValid: false, message: '비밀번호가 일치하지 않습니다.' }
      }));
      return;
    }

    setValidation(prev => ({
      ...prev,
      confirmPassword: { isValid: true, message: '비밀번호가 일치합니다.' }
    }));
  };

  // 이름 유효성 검사
  const validateName = (name: string) => {
    if (!name) {
      setValidation(prev => ({
        ...prev,
        name: { isValid: false, message: '이름을 입력해주세요.' }
      }));
      return;
    }

    if (name.length < 2) {
      setValidation(prev => ({
        ...prev,
        name: { isValid: false, message: '이름은 2자 이상이어야 합니다.' }
      }));
      return;
    }

    setValidation(prev => ({
      ...prev,
      name: { isValid: true, message: '올바른 이름입니다.' }
    }));
  };

  // 핸드폰 인증 요청
  const requestPhoneVerification = async () => {
    if (!validation.phoneNumber.isValid) {
      alert('올바른 핸드폰 번호를 입력해주세요.');
      return;
    }

    try {
      await AuthApiService.requestPhoneVerification({ phoneNumber: formData.phoneNumber });
      setPhoneVerification(prev => ({
        ...prev,
        isRequested: true,
        timeLeft: 180, // 3분
      }));
      alert('인증번호가 발송되었습니다.');
    } catch (error) {
      alert('인증번호 발송에 실패했습니다.');
    }
  };

  // 핸드폰 인증 확인
  const confirmPhoneVerification = async () => {
    if (!phoneVerification.code) {
      alert('인증번호를 입력해주세요.');
      return;
    }

    setPhoneVerification(prev => ({ ...prev, isVerifying: true }));

    try {
      const response = await AuthApiService.confirmPhoneVerification({
        phoneNumber: formData.phoneNumber,
        verificationCode: phoneVerification.code,
      });

      if (response.data?.verified) {
        setPhoneVerification(prev => ({ ...prev, isVerified: true, isVerifying: false }));
        setCurrentStep(3);
      } else {
        alert('인증번호가 올바르지 않습니다.');
        setPhoneVerification(prev => ({ ...prev, isVerifying: false }));
      }
    } catch (error) {
      alert('인증 확인에 실패했습니다.');
      setPhoneVerification(prev => ({ ...prev, isVerifying: false }));
    }
  };

  // 매장 판매자 등록 상태 관리
  const [showSellerForm, setShowSellerForm] = useState(false);
  const [storeVerification, setStoreVerification] = useState({
    isRequested: false,
    isVerified: false,
    code: '',
    timeLeft: 0,
    isVerifying: false,
  });

  // 매장 인증 타이머
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (storeVerification.timeLeft > 0) {
      timer = setTimeout(() => {
        setStoreVerification(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [storeVerification.timeLeft]);

  const requestStoreVerification = async () => {
    if (!formData.storePhone) {
      alert('매장 전화번호를 입력해주세요.');
      return;
    }
    // TODO: 실제 인증 API 연동
    setStoreVerification(prev => ({ ...prev, isRequested: true, timeLeft: 180 }));
    alert('매장 인증번호가 발송되었습니다.');
  };

  const confirmStoreVerification = async () => {
    if (!storeVerification.code) {
      alert('인증번호를 입력해주세요.');
      return;
    }
    // TODO: 실제 인증 API 연동
    setStoreVerification(prev => ({ ...prev, isVerified: true }));
    alert('매장 인증이 완료되었습니다!');
  };

  // 회원가입 처리
  const handleSubmit = async () => {
    if (!phoneVerification.isVerified) {
      alert('핸드폰 인증을 완료해주세요.');
      return;
    }

    if (!formData.agreeTerms || !formData.agreePrivacy) {
      alert('이용약관과 개인정보처리방침에 동의해주세요.');
      return;
    }

    try {
      const request: CreateUserByEmailRequest = {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        nickname: formData.nickname,
        phoneNumber: formData.phoneNumber,
        role: formData.role,
      };

      await AuthApiService.createUserByEmail(request);
      alert('회원가입이 완료되었습니다!');
      navigate('/');
    } catch (error) {
      alert('회원가입에 실패했습니다.');
    }
  };

  const canProceedToStep2 = () => {
    return validation.email.isValid &&
           validation.password.isValid &&
           validation.confirmPassword.isValid &&
           validation.name.isValid &&
           validation.nickname.isValid &&
           validation.phoneNumber.isValid;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5 flex flex-col">
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md px-6 py-10 mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="mb-10 flex flex-col items-center">
            <Music className="w-12 h-12 text-primary mb-2" />
            <h2 className="text-3xl font-bold text-text-primary text-center tracking-tight">회원가입</h2>
          </div>
          <div className="flex flex-col gap-3 mb-8">
            <AuthButtons
              onGoogle={() => alert('구글 회원가입')}
              onNaver={() => alert('네이버 회원가입')}
              onKakao={() => alert('카카오 회원가입')}
            />
          </div>
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="mx-4 text-sm text-text-secondary">또는 이메일로 회원가입</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right duration-500">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">휴대폰 번호</label>
                <div className="relative">
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, phoneNumber: e.target.value }));
                      validatePhoneNumber(e.target.value);
                    }}
                    className="w-full px-4 py-3 pl-10 bg-gray-50 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all duration-300"
                    placeholder="010-1234-5678"
                  />
                  {validation.phoneNumber.isChecking && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-orange-300 border-t-orange-600 rounded-full animate-spin" />
                  )}
                  {!validation.phoneNumber.isChecking && validation.phoneNumber.message && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {validation.phoneNumber.isValid ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <X className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  )}
                </div>
                {validation.phoneNumber.message && (
                  <p className={`text-xs mt-1 ${validation.phoneNumber.isValid ? 'text-green-600' : 'text-red-600'}`}>
                    {validation.phoneNumber.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">비밀번호</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, password: e.target.value }));
                      validatePassword(e.target.value);
                    }}
                    className="w-full px-4 py-3 pl-10 pr-10 bg-gray-50 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all duration-300"
                    placeholder="비밀번호를 입력하세요"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {validation.password.message && (
                  <p className={`text-xs mt-1 ${validation.password.isValid ? 'text-green-600' : 'text-red-600'}`}>
                    {validation.password.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">비밀번호 확인</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, confirmPassword: e.target.value }));
                      validateConfirmPassword(e.target.value);
                    }}
                    className="w-full px-4 py-3 pl-10 pr-10 bg-gray-50 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all duration-300"
                    placeholder="비밀번호를 다시 입력하세요"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {validation.confirmPassword.message && (
                  <p className={`text-xs mt-1 ${validation.confirmPassword.isValid ? 'text-green-600' : 'text-red-600'}`}>
                    {validation.confirmPassword.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">이름</label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, name: e.target.value }));
                      validateName(e.target.value);
                    }}
                    className="w-full px-4 py-3 pl-10 bg-gray-50 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all duration-300"
                    placeholder="이름을 입력하세요"
                  />
                </div>
                {validation.name.message && (
                  <p className={`text-xs mt-1 ${validation.name.isValid ? 'text-green-600' : 'text-red-600'}`}>
                    {validation.name.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">이메일(선택)</label>
                <div className="relative">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, email: e.target.value }));
                      validateEmail(e.target.value);
                    }}
                    className="w-full px-4 py-3 pl-10 bg-gray-50 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all duration-300"
                    placeholder="이메일을 입력하세요 (선택)"
                  />
                </div>
                {validation.email.message && (
                  <p className={`text-xs mt-1 ${validation.email.isValid ? 'text-green-600' : 'text-red-600'}`}>
                    {validation.email.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">닉네임</label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.nickname}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, nickname: e.target.value }));
                      validateNickname(e.target.value);
                    }}
                    className="w-full px-4 py-3 pl-10 bg-gray-50 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all duration-300"
                    placeholder="닉네임을 입력하세요"
                  />
                </div>
                {validation.nickname.message && (
                  <p className={`text-xs mt-1 ${validation.nickname.isValid ? 'text-green-600' : 'text-red-600'}`}>
                    {validation.nickname.message}
                  </p>
                )}
              </div>
              <Button
                size="lg"
                onClick={() => setCurrentStep(2)}
                disabled={!canProceedToStep2()}
                className="w-full py-4 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                인증번호 받기
              </Button>
            </div>
          )}
          <div className="mt-8 flex flex-col items-center">
            {!showSellerForm && (
              <button
                type="button"
                onClick={() => setShowSellerForm(true)}
                className="w-full max-w-md py-3 rounded-xl bg-orange-50 text-orange-600 font-semibold hover:bg-orange-100 transition-colors duration-200 shadow-sm border border-orange-200"
              >
                + 매장 판매자 등록
              </button>
            )}
          </div>
          {showSellerForm && (
            <div className="mt-6 w-full max-w-md animate-in fade-in slide-in-from-bottom duration-500">
              <div className="bg-orange-50 border border-orange-200 rounded-2xl shadow-md p-6">
                <h3 className="text-base font-bold text-orange-800 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                  매장 정보
                </h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={formData.storeName || ''}
                    onChange={e => setFormData(prev => ({ ...prev, storeName: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-orange-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all"
                    placeholder="매장명"
                    required
                  />
                  <input
                    type="text"
                    value={formData.storeAddress || ''}
                    onChange={e => setFormData(prev => ({ ...prev, storeAddress: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-orange-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all"
                    placeholder="매장 위치(주소)"
                    required
                  />
                  <input
                    type="text"
                    value={formData.storePhone || ''}
                    onChange={e => setFormData(prev => ({ ...prev, storePhone: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-orange-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all"
                    placeholder="매장 전화번호"
                    required
                  />
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={storeVerification.code}
                      onChange={e => setStoreVerification(prev => ({ ...prev, code: e.target.value }))}
                      className="flex-1 px-4 py-3 rounded-xl border border-orange-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all"
                      placeholder="인증번호 입력"
                      disabled={!storeVerification.isRequested}
                    />
                    <button
                      type="button"
                      onClick={requestStoreVerification}
                      className="px-4 py-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors disabled:bg-gray-300"
                      disabled={storeVerification.isRequested && storeVerification.timeLeft > 0}
                    >
                      {storeVerification.isRequested && storeVerification.timeLeft > 0
                        ? `재전송 (${Math.floor(storeVerification.timeLeft / 60)}:${(storeVerification.timeLeft % 60).toString().padStart(2, '0')})`
                        : '인증번호 받기'}
                    </button>
                    <button
                      type="button"
                      onClick={confirmStoreVerification}
                      className="px-4 py-3 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors disabled:bg-gray-300"
                      disabled={!storeVerification.isRequested || storeVerification.isVerified}
                    >
                      인증확인
                    </button>
                  </div>
                  {storeVerification.isVerified && (
                    <div className="text-green-600 text-sm font-semibold mt-2">매장 인증이 완료되었습니다!</div>
                  )}
                </div>
              </div>
            </div>
          )}
          <Button
            size="lg"
            onClick={handleSubmit}
            disabled={!canProceedToStep2() || (showSellerForm && !storeVerification.isVerified) || !phoneVerification.isVerified}
            className="w-full max-w-md mt-8 py-4 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] bg-orange-400 text-white font-bold text-lg rounded-2xl shadow-md"
          >
            회원가입 완료
          </Button>
        </div>
      </main>
    </div>
  );
};