import dbConnect from '@/lib/dbConnect';
import MMY from '@/models/MMY';
import { NextResponse } from 'next/server';

export const GET = async(req)=> {
  try {
    // Connect to the database
    await dbConnect();
   
    // Fetch all MMY data from the database
    const mmys = await MMY.find({});
    console.log(mmys)
    // Return the fetched MMY data as a JSON response using NextResponse
    return NextResponse.json({ data: mmys });
  } catch (error) {
    console.error('Error fetching MMY data:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
