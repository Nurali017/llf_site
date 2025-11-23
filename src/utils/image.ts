import { SyntheticEvent } from 'react';

export function getImageUrl(path: string | null | undefined): string {
    if (!path) return '/kmff-logo.jpg';

    // If it's already a full URL, return it
    if (path.startsWith('http')) return path;

    // If it's a data URL, return it
    if (path.startsWith('data:')) return path;

    // If it's a local asset (starts with / but NOT /images/)
    // This assumes /images/ is reserved for backend uploads
    if (path.startsWith('/') && !path.startsWith('/images/')) {
        return path;
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

    // Ensure path starts with /
    const cleanPath = path.startsWith('/') ? path : `/${path}`;

    // If path already contains /images/, just prepend API URL
    if (cleanPath.startsWith('/images/')) {
        return `${apiUrl}${cleanPath}`;
    }

    // Otherwise assume it needs /images/ prefix (legacy support)
    return `${apiUrl}/images${cleanPath}`;
}

export const handleImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = '/kmff-logo.jpg';
};
