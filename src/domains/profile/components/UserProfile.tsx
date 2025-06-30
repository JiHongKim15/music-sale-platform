import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/atoms';

export function UserProfile() {
  const navigate = useNavigate();

  return (
    <div className="...">
      {/* ... 기존 프로필 UI ... */}
      <div className="flex justify-end mb-4">
        <Button
          variant="primary"
          size="md"
          onClick={() => navigate('/store/register')}
        >
          매장 판매자 등록
        </Button>
      </div>
      {/* ... 나머지 프로필 UI ... */}
    </div>
  );
} 