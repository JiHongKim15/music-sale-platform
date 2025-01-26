import React, { useState } from 'react';
import { User, Edit, Trash2, Shield, ShieldOff } from 'lucide-react';
import { User as UserType } from '@/types/auth';

// 임시 사용자 데이터
const mockUsers: UserType[] = [
  {
    id: '1',
    name: '판매자',
    email: 'seller@example.com',
    is_seller: true,
    favoriteInstruments: []
  },
  {
    id: '2',
    name: '구매자',
    email: 'buyer@example.com',
    is_seller: false,
    favoriteInstruments: ['1', '2']
  }
];

export function UserManagementPage() {
  const [users, setUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<'all' | 'seller' | 'buyer'>('all');
  const [editingUser, setEditingUser] = useState<UserType | null>(null);

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = 
      selectedRole === 'all' ||
      (selectedRole === 'seller' && user.is_seller) ||
      (selectedRole === 'buyer' && !user.is_seller);

    return matchesSearch && matchesRole;
  });

  const handleDeleteUser = (userId: string) => {
    if (window.confirm('정말 이 사용자를 삭제하시겠습니까?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleToggleRole = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId
        ? { ...user, is_seller: !user.is_seller }
        : user
    ));
  };

  const handleUpdateUser = (updatedUser: UserType) => {
    setUsers(users.map(user =>
      user.id === updatedUser.id ? updatedUser : user
    ));
    setEditingUser(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">사용자 관리</h1>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="이름 또는 이메일로 검색"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border border-gray-300 rounded-md"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value as 'all' | 'seller' | 'buyer')}
          >
            <option value="all">전체</option>
            <option value="seller">판매자</option>
            <option value="buyer">구매자</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  사용자
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  이메일
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  역할
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  가입일
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  작업
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {user.image ? (
                          <img
                            className="h-10 w-10 rounded-full"
                            src={user.image}
                            alt={user.name}
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <User className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.is_seller
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.is_seller ? '판매자' : '구매자'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    2024-01-15
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleToggleRole(user.id)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                      title={user.is_seller ? '판매자 권한 해제' : '판매자 권한 부여'}
                    >
                      {user.is_seller ? (
                        <ShieldOff className="h-5 w-5" />
                      ) : (
                        <Shield className="h-5 w-5" />
                      )}
                    </button>
                    <button
                      onClick={() => setEditingUser(user)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 사용자 편집 모달 */}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">사용자 정보 수정</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleUpdateUser({
                ...editingUser,
                name: formData.get('name') as string,
                email: formData.get('email') as string
              });
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    이름
                  </label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={editingUser.name}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    이메일
                  </label>
                  <input
                    type="email"
                    name="email"
                    defaultValue={editingUser.email}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  저장
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}