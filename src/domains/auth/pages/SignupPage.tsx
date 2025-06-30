import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Check, X, Phone, Mail, User, Lock, ArrowLeft, Smartphone } from 'lucide-react';
import { AuthApiService, UserRole, CreateUserByEmailRequest } from '../services/authApi';

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

export function SignupPage() {
  const navigate = useNavigate();
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1: 기본정보, 2: 핸드폰인증, 3: 완료

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

    setIsSubmitting(true);

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
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
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
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div className="max-w-md mx-auto">
        {/* 헤더 */}
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 text-gray-600 hover:text-orange-600 transition-all duration-300 hover:scale-110 active:scale-95 rounded-full hover:bg-orange-50"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900">회원가입</h1>
              <div className="flex items-center mt-2">
                <div className={`w-8 h-1 rounded-full transition-all duration-300 ${currentStep >= 1 ? 'bg-orange-500' : 'bg-gray-200'}`} />
                <div className={`w-8 h-1 rounded-full ml-1 transition-all duration-300 ${currentStep >= 2 ? 'bg-orange-500' : 'bg-gray-200'}`} />
                <div className={`w-8 h-1 rounded-full ml-1 transition-all duration-300 ${currentStep >= 3 ? 'bg-orange-500' : 'bg-gray-200'}`} />
              </div>
            </div>
          </div>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="px-6 py-8">
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right duration-500">
              {/* 역할 선택 */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">가입 유형</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, role: UserRole.BUYER }))}
                    className={`p-4 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 ${
                      formData.role === UserRole.BUYER
                        ? 'bg-orange-500 text-white shadow-lg'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <User className="w-5 h-5 mx-auto mb-2" />
                    <span className="text-sm font-medium">구매자</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, role: UserRole.SELLER }))}
                    className={`p-4 rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 ${
                      formData.role === UserRole.SELLER
                        ? 'bg-orange-500 text-white shadow-lg'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 mx-auto mb-2" />
                    <span className="text-sm font-medium">판매자</span>
                  </button>
                </div>
              </div>

              {/* 이메일 */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">이메일</label>
                <div className="relative">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, email: e.target.value }));
                      validateEmail(e.target.value);
                    }}
                    className="w-full px-4 py-3 pl-10 bg-gray-50 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all duration-300"
                    placeholder="이메일을 입력하세요"
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  {validation.email.isChecking && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-orange-300 border-t-orange-600 rounded-full animate-spin" />
                  )}
                  {!validation.email.isChecking && validation.email.message && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {validation.email.isValid ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <X className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  )}
                </div>
                {validation.email.message && (
                  <p className={`text-xs mt-1 ${validation.email.isValid ? 'text-green-600' : 'text-red-600'}`}>
                    {validation.email.message}
                  </p>
                )}
              </div>

              {/* 비밀번호 */}
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
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
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

              {/* 비밀번호 확인 */}
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
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
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

              {/* 이름 */}
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
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
                {validation.name.message && (
                  <p className={`text-xs mt-1 ${validation.name.isValid ? 'text-green-600' : 'text-red-600'}`}>
                    {validation.name.message}
                  </p>
                )}
              </div>

              {/* 닉네임 */}
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
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  {validation.nickname.isChecking && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-orange-300 border-t-orange-600 rounded-full animate-spin" />
                  )}
                  {!validation.nickname.isChecking && validation.nickname.message && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {validation.nickname.isValid ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <X className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  )}
                </div>
                {validation.nickname.message && (
                  <p className={`text-xs mt-1 ${validation.nickname.isValid ? 'text-green-600' : 'text-red-600'}`}>
                    {validation.nickname.message}
                  </p>
                )}
              </div>

              {/* 핸드폰 번호 */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">핸드폰 번호</label>
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
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
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

              {/* 다음 단계 버튼 */}
              <button
                onClick={() => setCurrentStep(2)}
                disabled={!canProceedToStep2()}
                className={`w-full py-4 rounded-2xl font-medium transition-all duration-300 ${
                  canProceedToStep2()
                    ? 'bg-orange-500 text-white hover:bg-orange-600 hover:scale-105 active:scale-95 hover:shadow-lg'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                핸드폰 인증하기
              </button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right duration-500">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-orange-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">핸드폰 인증</h2>
                <p className="text-gray-600">본인 확인을 위해 핸드폰 인증을 진행합니다</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">핸드폰 번호:</span> {formData.phoneNumber}
                </p>
              </div>

              {!phoneVerification.isRequested ? (
                <button
                  onClick={requestPhoneVerification}
                  className="w-full py-4 bg-orange-500 text-white rounded-2xl font-medium hover:bg-orange-600 transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg"
                >
                  인증번호 발송
                </button>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">인증번호</label>
                    <input
                      type="text"
                      value={phoneVerification.code}
                      onChange={(e) => setPhoneVerification(prev => ({ ...prev, code: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-50 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all duration-300"
                      placeholder="인증번호 6자리를 입력하세요"
                      maxLength={6}
                    />
                    {phoneVerification.timeLeft > 0 && (
                      <p className="text-xs text-orange-600 mt-1">
                        남은 시간: {formatTime(phoneVerification.timeLeft)}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={requestPhoneVerification}
                      disabled={phoneVerification.timeLeft > 0}
                      className={`py-3 rounded-2xl font-medium transition-all duration-300 ${
                        phoneVerification.timeLeft > 0
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105 active:scale-95'
                      }`}
                    >
                      재발송
                    </button>
                    <button
                      onClick={confirmPhoneVerification}
                      disabled={phoneVerification.isVerifying || !phoneVerification.code}
                      className={`py-3 rounded-2xl font-medium transition-all duration-300 ${
                        phoneVerification.isVerifying || !phoneVerification.code
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-orange-500 text-white hover:bg-orange-600 hover:scale-105 active:scale-95'
                      }`}
                    >
                      {phoneVerification.isVerifying ? '확인 중...' : '확인'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right duration-500">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">인증 완료</h2>
                <p className="text-gray-600">핸드폰 인증이 완료되었습니다</p>
              </div>

              {/* 약관 동의 */}
              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={(e) => setFormData(prev => ({ ...prev, agreeTerms: e.target.checked }))}
                    className="mt-1 w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700">
                    <span className="text-red-500">*</span> 이용약관에 동의합니다
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agreePrivacy}
                    onChange={(e) => setFormData(prev => ({ ...prev, agreePrivacy: e.target.checked }))}
                    className="mt-1 w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-700">
                    <span className="text-red-500">*</span> 개인정보처리방침에 동의합니다
                  </span>
                </label>
              </div>

              {/* 회원가입 완료 버튼 */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.agreeTerms || !formData.agreePrivacy}
                className={`w-full py-4 rounded-2xl font-medium transition-all duration-300 ${
                  isSubmitting || !formData.agreeTerms || !formData.agreePrivacy
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-orange-500 text-white hover:bg-orange-600 hover:scale-105 active:scale-95 hover:shadow-lg'
                }`}
              >
                {isSubmitting ? '가입 중...' : '회원가입 완료'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}