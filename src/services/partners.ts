import { Partner } from '@/types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function getPartners(organizationId?: number): Promise<Partner[]> {
    try {
        const url = organizationId
            ? `${API_BASE_URL}/api/partners?organization=${organizationId}`
            : `${API_BASE_URL}/api/partners`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch partners');
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching partners:', error);
        return [];
    }
}
