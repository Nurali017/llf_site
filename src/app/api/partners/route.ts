import { NextResponse } from 'next/server';
import { Partner } from '@/types/api';

const MOCK_PARTNERS: Partner[] = [
    {
        id: 1,
        name: 'General Partner 1',
        image: '/images/partners/general1.png',
        link: 'https://general1.com',
        is_general: true,
        sort_order: 1,
        active: true,
    },
    {
        id: 2,
        name: 'General Partner 2',
        image: '/images/partners/general2.png',
        link: 'https://general2.com',
        is_general: true,
        sort_order: 2,
        active: true,
    },
    {
        id: 3,
        name: 'Org 1 Partner',
        image: '/images/partners/org1.png',
        link: 'https://org1.com',
        is_general: false,
        sort_order: 1,
        organization_id: 1,
        active: true,
    },
    {
        id: 4,
        name: 'Org 2 Partner',
        image: '/images/partners/org2.png',
        link: 'https://org2.com',
        is_general: false,
        sort_order: 1,
        organization_id: 2,
        active: true,
    },
    {
        id: 5,
        name: 'Inactive Partner',
        image: '/images/partners/inactive.png',
        link: 'https://inactive.com',
        is_general: true,
        sort_order: 3,
        active: false,
    },
];

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const organizationParam = searchParams.get('organization');

    let partners = MOCK_PARTNERS.filter((p) => p.active);

    if (organizationParam) {
        const organizationId = parseInt(organizationParam, 10);
        if (!isNaN(organizationId)) {
            partners = partners.filter((p) => p.organization_id === organizationId);
        }
        // If organizationParam is invalid (NaN), we return ALL active partners (as per requirement 1)
    }

    // Sort by sort_order
    partners.sort((a, b) => a.sort_order - b.sort_order);

    return NextResponse.json(partners);
}
