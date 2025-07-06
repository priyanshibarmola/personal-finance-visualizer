import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Budget } from '@/models/budget';

export async function GET() {
  await connectDB();
  const budgets = await Budget.find();
  return NextResponse.json(budgets);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const data = await req.json();
  const budget = await Budget.create(data);
  return NextResponse.json(budget);
}
