'use client';

import React from 'react';

interface Props {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
        // TODO: Send to Sentry when connected
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
                    <div className="text-center bg-white p-8 rounded-xl shadow-lg border border-gray-100 max-w-md w-full">
                        <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold mb-2 text-gray-900">Что-то пошло не так</h2>
                        <p className="text-gray-600 mb-6">
                            Произошла ошибка при загрузке компонента. Пожалуйста, попробуйте перезагрузить страницу.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-kmff-blue text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium w-full"
                        >
                            Перезагрузить страницу
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
