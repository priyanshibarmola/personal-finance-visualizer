import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Transaction from '@/models/transaction';

export async function GET() {
  await connectDB();
  const transactions = await Transaction.find().sort({ date: -1 });
  return NextResponse.json(transactions);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const data = await req.json();

  // ✅ Validate required field
  if (!data.type || !['income', 'expense'].includes(data.type)) {
    return NextResponse.json(
      { error: 'Missing or invalid "type". Must be "income" or "expense".' },
      { status: 400 }
    );
  }

  try {
    const transaction = await Transaction.create(data);
    return NextResponse.json(transaction, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Transaction creation failed' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  await connectDB();
  const { id } = await req.json();
  await Transaction.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Deleted' });
}
