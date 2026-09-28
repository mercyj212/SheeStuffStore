import { NextResponse } from 'next/server';
import { PRODUCTS } from '../../../lib/products';
import { prisma } from '../../../lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const featured = searchParams.get('featured');

  try {
    let products = await prisma.product.findMany({
      include: { reviews: true },
      orderBy: { createdAt: 'desc' },
    });

    if (!products || products.length === 0) {
      return NextResponse.json({ products: PRODUCTS, source: 'seed' });
    }

    if (category && category !== 'All') {
      products = products.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }

    if (search) {
      const term = search.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term)
      );
    }

    if (featured === 'true') {
      products = products.filter((p) => p.isFeatured);
    }

    return NextResponse.json({ products, source: 'database' });
  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json({ products: PRODUCTS, source: 'fallback' });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const newProduct = await prisma.product.create({
      data: {
        name: body.name,
        tagline: body.tagline || 'Luxe Beauty Formula',
        category: body.category || 'Skincare',
        price: parseFloat(body.price),
        originalPrice: body.originalPrice ? parseFloat(body.originalPrice) : null,
        image: body.image,
        secondaryImage: body.secondaryImage || null,
        description: body.description,
        volume: body.volume || '50ml',
        badges: JSON.stringify(body.badges || ['NEW']),
        benefits: JSON.stringify(body.benefits || []),
        ingredients: JSON.stringify(body.ingredients || []),
        howToUse: body.howToUse || 'Apply as desired.',
        skinTypes: JSON.stringify(body.skinTypes || ['All Skin Types']),
        inStock: body.inStock ?? true,
        isFeatured: body.isFeatured ?? false,
      },
    });

    return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
