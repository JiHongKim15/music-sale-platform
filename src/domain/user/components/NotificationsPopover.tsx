import React from 'react';
import { Bell } from 'lucide-react';
import { useRecoilState } from 'recoil';
import { notificationsState } from '@/context/atoms';
import { Notification } from '@/types';

interface NotificationsPopoverProps {
  onNotificationClick: (notification: Notification) => void;
}

export function NotificationsPopover({ onNotificationClick }: NotificationsPopoverProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [notifications, setNotifications] = useRecoilState<Notification[]>(notificationsState);
  const unreadCount = notifications.filter((n: Notification) => !n.read).length;

  const handleNotificationClick = (notification: Notification) => {
    setNotifications((prev: Notification[]) =>
      prev.map((n: Notification) =>
        n.id === notification.id ? { ...n, read: true } : n
      )
    );
    onNotificationClick(notification);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 relative"
      >
        <Bell className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden z-50">
          <div className="p-4 border-b dark:border-gray-700">
            <h3 className="text-lg font-semibold dark:text-white">알림</h3>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                알림이 없습니다
              </div>
            ) : (
              <div className="divide-y dark:divide-gray-700">
                {notifications.map(notification => (
                  <button
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                    className={`w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                      !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                    }`}
                  >
                    <p className="font-medium text-gray-900 dark:text-white mb-1">
                      {notification.instrumentName}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {new Date(notification.createdAt).toLocaleString()}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}