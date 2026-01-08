/**
 * Компонент отображения состояния загрузки
 *
 * @param message - Сообщение загрузки (по умолчанию "Загрузка...")
 * @param className - Дополнительные классы для контейнера
 * @param size - Размер спиннера: 'sm' | 'md' | 'lg' (по умолчанию 'md')
 *
 * @example
 * <LoadingState message="Загрузка матчей..." />
 */
interface LoadingStateProps {
  message?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingState({
  message = 'Загрузка...',
  className = '',
  size = 'md',
}: LoadingStateProps) {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  return (
    <div className={`text-center py-12 ${className}`}>
      <div className="flex justify-center mb-4">
        <div
          className={`${sizes[size]} border-4 border-gray-200 border-t-kmff-blue rounded-full animate-spin`}
          role="status"
          aria-label="Loading"
        />
      </div>
      <p className="text-gray-500 text-sm">{message}</p>
    </div>
  );
}

/**
 * Компонент скелетона для загрузки (альтернатива LoadingState)
 * Используется для показа структуры контента во время загрузки
 *
 * @param type - Тип скелетона: 'card' | 'table' | 'text' | 'custom'
 * @param count - Количество элементов скелетона (по умолчанию 1)
 * @param className - Дополнительные классы
 *
 * @example
 * <SkeletonLoader type="card" count={3} />
 */
interface SkeletonLoaderProps {
  type?: 'card' | 'table' | 'text' | 'custom';
  count?: number;
  className?: string;
  children?: React.ReactNode; // For custom skeleton
}

export function SkeletonLoader({
  type = 'card',
  count = 1,
  className = '',
  children,
}: SkeletonLoaderProps) {
  const renderSkeleton = () => {
    if (type === 'custom' && children) {
      return children;
    }

    const skeletons: Record<string, JSX.Element> = {
      card: (
        <div className="bg-white rounded-xl p-6 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      ),
      table: (
        <div className="bg-white rounded-xl p-4 animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-3"></div>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-6 bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
      ),
      text: (
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>
      ),
    };

    return skeletons[type] || skeletons.card;
  };

  return (
    <div className={className}>
      {[...Array(count)].map((_, index) => (
        <div key={index} className={index > 0 ? 'mt-4' : ''}>
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
}
