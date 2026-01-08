/**
 * Компонент отображения ошибки загрузки данных
 *
 * @param title - Заголовок ошибки (по умолчанию "Ошибка загрузки")
 * @param message - Сообщение об ошибке (по умолчанию "Не удалось загрузить данные")
 * @param onRetry - Функция повторной попытки загрузки
 * @param className - Дополнительные классы для контейнера
 *
 * @example
 * <ErrorState
 *   title="Ошибка загрузки матчей"
 *   onRetry={handleRetry}
 * />
 */
interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = 'Ошибка загрузки',
  message = 'Не удалось загрузить данные',
  onRetry,
  className = '',
}: ErrorStateProps) {
  return (
    <div className={`text-center py-12 bg-red-50 rounded-xl border border-red-100 ${className}`}>
      <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
      </div>
      <p className="text-gray-700 font-medium mb-2">{title}</p>
      <p className="text-gray-500 text-sm mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-kmff-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Повторить
        </button>
      )}
    </div>
  );
}
