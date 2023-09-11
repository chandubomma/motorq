// pages/api/update-enrollment-status.js
import dbConnect from '@/lib/dbConnect';
import Enrollment from '@/models/EnrollmentRequest';
import { NextResponse } from 'next/server';
const mongoose = require('mongoose');

export const POST =  async (req, res) => {
  try {
    await dbConnect();

    if (req.method === 'POST') {
      const { enrollmentId, status } = await req.json();

      // Validate the enrollment ID and status
      if (!enrollmentId || !status) {
        return NextResponse.json({ message: 'Enrollment ID and status are required.' });
      }
      const validObjectId = mongoose.Types.ObjectId(enrollmentId);
      // Check if the enrollment with the provided ID exists
      const enrollment = await Enrollment.findOne({ _id: validObjectId });

      if (!enrollment) {
        return NextResponse.json({ message: 'Enrollment not found.' });
      }

      // Update the enrollment status
      enrollment.status = status;
      await enrollment.save();

      return NextResponse.json({ message: 'Enrollment status updated successfully.' });
    } else {
      return NextResponse.json({ message: 'Method not allowed.' });
    }
  } catch (error) {
    console.error('Error updating enrollment status:', error);
    return NextResponse.json({ message: 'Internal server error.' });
  }
};
