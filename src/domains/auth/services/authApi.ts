import { apiClient } from '@/domains/common/services/api/client';

// 사용자 역할
export enum UserRole {
  BUYER = 'BUYER',
  SELLER = 'SELLER',
  ADMIN = 'ADMIN'
}

// 요청 타입들
export interface CreateUserByEmailRequest {
  email: string;
  password: string;
  name: string;
  nickname: string;
  phoneNumber: string;
  role: UserRole;
}

export interface CreateUserByProviderRequest {
  email: string;
  provider: string;
  providerId: string;
  name: string;
  nickname: string;
  phoneNumber: string;
  role: UserRole;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface PhoneVerificationRequest {
  phoneNumber: string;
}

export interface PhoneVerificationConfirmRequest {
  phoneNumber: string;
  verificationCode: string;
}

// 응답 타입들
export interface UserResponse {
  id: number;
  email: string;
  name: string;
  nickname: string;
  phoneNumber: string;
  role: UserRole;
  provider?: string;
  providerId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  code: string;
  message?: string;
}

export interface AuthTokenResponse {
  accessToken: string;
  refreshToken: string;
  user: UserResponse;
}

// Auth API 서비스
export class AuthApiService {
  // 이메일로 회원가입
  static async createUserByEmail(request: CreateUserByEmailRequest): Promise<ApiResponse<UserResponse>> {
    try {
      const response = await apiClient.post('/users/email', request);
      return response.data;
    } catch (error: any) {
      console.error('이메일 회원가입 실패:', error);
      throw new Error(error.response?.data?.message || '회원가입에 실패했습니다.');
    }
  }

  // 소셜 로그인으로 회원가입
  static async createUserByProvider(request: CreateUserByProviderRequest): Promise<ApiResponse<UserResponse>> {
    try {
      const response = await apiClient.post('/users/provider', request);
      return response.data;
    } catch (error: any) {
      console.error('소셜 회원가입 실패:', error);
      throw new Error(error.response?.data?.message || '소셜 회원가입에 실패했습니다.');
    }
  }

  // 사용자 정보 조회
  static async getUser(id: number): Promise<ApiResponse<UserResponse>> {
    try {
      const response = await apiClient.get(`/users/${id}`);
      return response.data;
    } catch (error: any) {
      console.error('사용자 정보 조회 실패:', error);
      throw new Error(error.response?.data?.message || '사용자 정보를 불러올 수 없습니다.');
    }
  }

  // 로그인
  static async login(request: LoginRequest): Promise<ApiResponse<AuthTokenResponse>> {
    try {
      const response = await apiClient.post('/auth/login', request);
      
      // 토큰을 localStorage에 저장
      if (response.data.success && response.data.data) {
        localStorage.setItem('accessToken', response.data.data.accessToken);
        localStorage.setItem('refreshToken', response.data.data.refreshToken);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
      }
      
      return response.data;
    } catch (error: any) {
      console.error('로그인 실패:', error);
      throw new Error(error.response?.data?.message || '로그인에 실패했습니다.');
    }
  }

  // 로그아웃
  static async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.error('로그아웃 요청 실패:', error);
    } finally {
      // 로컬 스토리지에서 토큰 제거
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    }
  }

  // 핸드폰 인증 요청
  static async requestPhoneVerification(request: PhoneVerificationRequest): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await apiClient.post('/auth/phone/verify', request);
      return response.data;
    } catch (error: any) {
      console.error('핸드폰 인증 요청 실패:', error);
      throw new Error(error.response?.data?.message || '인증번호 발송에 실패했습니다.');
    }
  }

  // 핸드폰 인증 확인
  static async confirmPhoneVerification(request: PhoneVerificationConfirmRequest): Promise<ApiResponse<{ verified: boolean }>> {
    try {
      const response = await apiClient.post('/auth/phone/confirm', request);
      return response.data;
    } catch (error: any) {
      console.error('핸드폰 인증 확인 실패:', error);
      throw new Error(error.response?.data?.message || '인증번호가 올바르지 않습니다.');
    }
  }

  // 토큰 갱신
  static async refreshToken(): Promise<ApiResponse<AuthTokenResponse>> {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('리프레시 토큰이 없습니다.');
      }

      const response = await apiClient.post('/auth/refresh', { refreshToken });
      
      // 새 토큰 저장
      if (response.data.success && response.data.data) {
        localStorage.setItem('accessToken', response.data.data.accessToken);
        localStorage.setItem('refreshToken', response.data.data.refreshToken);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
      }
      
      return response.data;
    } catch (error: any) {
      console.error('토큰 갱신 실패:', error);
      // 토큰 갱신 실패시 로그아웃 처리
      this.logout();
      throw new Error('세션이 만료되었습니다. 다시 로그인해주세요.');
    }
  }

  // 현재 로그인된 사용자 정보 가져오기
  static getCurrentUser(): UserResponse | null {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('사용자 정보 파싱 실패:', error);
      return null;
    }
  }

  // 로그인 상태 확인
  static isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }

  // 중복 확인 API들
  static async checkEmailExists(email: string): Promise<ApiResponse<{ exists: boolean }>> {
    try {
      const response = await apiClient.get(`/auth/check/email?email=${encodeURIComponent(email)}`);
      return response.data;
    } catch (error: any) {
      console.error('이메일 중복 확인 실패:', error);
      throw new Error(error.response?.data?.message || '이메일 중복 확인에 실패했습니다.');
    }
  }

  static async checkNicknameExists(nickname: string): Promise<ApiResponse<{ exists: boolean }>> {
    try {
      const response = await apiClient.get(`/auth/check/nickname?nickname=${encodeURIComponent(nickname)}`);
      return response.data;
    } catch (error: any) {
      console.error('닉네임 중복 확인 실패:', error);
      throw new Error(error.response?.data?.message || '닉네임 중복 확인에 실패했습니다.');
    }
  }

  static async checkPhoneExists(phoneNumber: string): Promise<ApiResponse<{ exists: boolean }>> {
    try {
      const response = await apiClient.get(`/auth/check/phone?phoneNumber=${encodeURIComponent(phoneNumber)}`);
      return response.data;
    } catch (error: any) {
      console.error('핸드폰 번호 중복 확인 실패:', error);
      throw new Error(error.response?.data?.message || '핸드폰 번호 중복 확인에 실패했습니다.');
    }
  }
} 