import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productId, author, rating, title, comment } = body;

    const review = await prisma.review.create({
      data: {
        productId: productId || 'shee-radiance-serum',
        author: author || 'Anonymous Customer',
        rating: Number(rating) || 5,
        title: title || 'Verified Customer Review',
        comment: comment || 'Loved this formula!',
        verified: true,
      },
    });

    return NextResponse.json({ success: true, review }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
