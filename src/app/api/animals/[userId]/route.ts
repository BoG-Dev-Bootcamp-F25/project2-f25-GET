// I STARTED THIS EUAN BUT DO WTV TO FIX - GIA

import { NextResponse } from 'next/server';
import connectDB from '../../../../../server/mongodb';
import Animal from '../../../../../server/mongodb/models/Animal';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId;
    if (!userId) {
      return NextResponse.json({ message: 'User ID not provided' }, { status: 400 });
    }

    await connectDB();
    const animals = await Animal.find({ owner: userId });

    return NextResponse.json(animals, { status: 200 });

  } catch (error) {
    console.error('Error fetching user animals:', error);
    return NextResponse.json({ message: 'Failed to fetch animals' }, { status: 500 });
  }
}