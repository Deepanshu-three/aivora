import { NextRequest, NextResponse } from 'next/server';

type Order = {
  id: string;
  customerName: string;
  productName: string;
  quantity: number;
  status: string;
  createdAt: string;
};

// Dummy data (same as above, but in real you’ll have shared DB)
let orders: Order[] = Array.from({ length: 27 }).map((_, i) => ({
  id: (i + 1).toString(),
  customerName: `Customer ${i + 1}`,
  productName: `Product ${((i % 5) + 1)}`,
  quantity: Math.floor(Math.random() * 5) + 1,
  status: ['Pending', 'In Progress', 'Completed'][i % 3],
  createdAt: new Date(Date.now() - i * 1000 * 60 * 60 * 24).toISOString(),
}));

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await request.json();
  const { status } = body;

  if (!status || typeof status !== 'string') {
    return NextResponse.json({ error: 'Status is required and must be a string' }, { status: 400 });
  }

  const orderIndex = orders.findIndex(order => order.id === id);
  if (orderIndex === -1) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  orders[orderIndex].status = status;

  return NextResponse.json({ message: 'Status updated', order: orders[orderIndex] });
}
