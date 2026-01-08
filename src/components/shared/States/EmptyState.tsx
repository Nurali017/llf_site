/**
 * Компонент отображения пустого состояния (нет данных)
 *
 * @param title - Заголовок (по умолчанию "Нет данных")
 * @param message - Сообщение (опционально)
 * @param icon - Пользовательская иконка React компонент
 * @param className - Дополнительные классы для контейнера
 *
 * @example
 * <EmptyState
 *   title="Матчи не запланированы"
 *   message="На данный момент нет запланированных матчей"
 * />
 */
interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title = 'Нет данных',
  message,
  icon,
  className = '',
}: EmptyStateProps) {
  const defaultIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-8 h-8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
      />
    </svg>
  );

  return (
    <div className={`text-center py-12 ${className}`}>
      <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
        {icon || defaultIcon}
      </div>
      <p className="text-gray-700 font-medium mb-2">{title}</p>
      {message && <p className="text-gray-500 text-sm">{message}</p>}
    </div>
  );
}
