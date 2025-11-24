import { describe, it, expect } from 'vitest';
import { getImageUrl } from '../image';

describe('getImageUrl', () => {
    it('should return full URL for relative paths', () => {
        const result = getImageUrl('/images/logo.png');
        expect(result).toContain('1sportkz.com');
    });

    it('should return original URL if already absolute', () => {
        const url = 'https://example.com/logo.png';
        const result = getImageUrl(url);
        expect(result).toBe(url);
    });
});
