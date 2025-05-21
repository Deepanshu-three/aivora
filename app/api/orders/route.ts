import { NextRequest, NextResponse } from 'next/server';

type Order = {
  id: string;
  customerName: string;
  productName: string;
  quantity: number;
  status: string;
  createdAt: string;
};

// Dummy data (replace with your DB)
const orders: Order[] = Array.from({ length: 27 }).map((_, i) => ({
  id: (i + 1).toString(),
  customerName: `Customer ${i + 1}`,
  productName: `Product ${((i % 5) + 1)}`,
  quantity: Math.floor(Math.random() * 5) + 1,
  status: ['Pending', 'In Progress', 'Completed'][i % 3],
  createdAt: new Date(Date.now() - i * 1000 * 60 * 60 * 24).toISOString(),
}));

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const limit = parseInt(searchParams.get('limit') ?? '5', 10);

  const start = (page - 1) * limit;
  const end = start + limit;

  const paginatedOrders = orders.slice(start, end);

  return NextResponse.json({
    orders: paginatedOrders,
    total: orders.length,
  });
}
