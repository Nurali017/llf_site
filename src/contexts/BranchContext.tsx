"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Branch, BranchSlug, BRANCHES } from '@/lib/branches';

// Интерфейс контекста
interface BranchContextType {
    selectedBranch: Branch;
    setSelectedBranch: (branch: Branch) => void;
    branches: Branch[];
}

// Создаем контекст
const BranchContext = createContext<BranchContextType | undefined>(undefined);

// Provider
interface BranchProviderProps {
    children: ReactNode;
    initialBranch?: BranchSlug;
}

export const BranchProvider: React.FC<BranchProviderProps> = ({ children, initialBranch }) => {
    // Инициализация из prop или по умолчанию - Астана
    const initialBranchObject = initialBranch
        ? BRANCHES.find(b => b.slug === initialBranch) || BRANCHES[0]
        : BRANCHES[0];

    const [selectedBranch, setSelectedBranch] = useState<Branch>(initialBranchObject);

    return (
        <BranchContext.Provider
            value={{
                selectedBranch,
                setSelectedBranch,
                branches: BRANCHES,
            }}
        >
            {children}
        </BranchContext.Provider>
    );
};

// Hook для использования контекста
export const useBranch = (): BranchContextType => {
    const context = useContext(BranchContext);
    if (!context) {
        throw new Error('useBranch must be used within BranchProvider');
    }
    return context;
};
