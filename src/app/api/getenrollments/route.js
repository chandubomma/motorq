import dbConnect from '@/lib/dbConnect';
import EnrollmentRequest from '@/models/EnrollmentRequest';
import { NextResponse } from 'next/server';

export const GET = async(req)=> {
  try {
    // Connect to the database
    await dbConnect();
   
    // Fetch all MMY data from the database
    const enrollmentrequest = await EnrollmentRequest.find({});
    
    // Return the fetched MMY data as a JSON response using NextResponse
    return NextResponse.json({ data: enrollmentrequest });
  } catch (error) {
    console.error('Error fetching Enrollments data:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
