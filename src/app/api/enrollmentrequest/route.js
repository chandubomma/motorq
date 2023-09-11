import dbConnect from '@/lib/dbConnect';
import EnrollmentRequest from '@/models/EnrollmentRequest';
import MMY from '@/models/MMY'; // Import the MMY model
import { NextResponse } from 'next/server';


export const POST = async(req, res) =>{
  
    try {
      // Connect to the database
      await dbConnect();
        
      // Get the enrollment request data from the request body
      const  {
        customerId,
        make,
        model,
        year,
        vin,
        licensePlate,
      } = await req.json();

       

//     let customerId= "chandu@gmail.com"
//   let make =  "Mercedes-Benz"
//   let model =  "SL"
//   let year =  "2022"
//   let vin = "MESL2022"
//   let licensePlate= "TSG1234"

      // Fetch all MMYs from the database
      const mmys = await MMY.find({});

      // Check if the current make, model, and year are present in MMYs
      const isMMYValid = mmys.some((mmy) => {
        return mmy.make === make && mmy.models.some(mod=>{return mod.name===model });
      });

      if (!isMMYValid) {
        // Make, model, or year not found in MMYs
           return NextResponse.json({ message: 'Invalid Make, Model, or Year' });
        
      }

      // Check if the first 8 characters of VIN match according to MMY
      // You should implement the logic to validate VIN based on MMY

      // Check if the VIN is not already enrolled in the system in Pending or Accepted state
      const existingEnrollment = await EnrollmentRequest.findOne({
        vin,
        status: { $in: ['Pending', 'Accepted'] },
      });

      if (existingEnrollment) {
        // Enrollment request with the same VIN already exists
        return NextResponse.json({ message: 'VIN already enrolled' });
      } else {
        // Create a new enrollment request
        const enrollment = new EnrollmentRequest({
          customerId,
          make,
          model,
          year,
          vin,
          licensePlate,
          status: 'Pending',
          enrollmentTimestamp: new Date(),
        });

        // Save the enrollment request to the database
        await enrollment.save();

        // Enrollment request created successfully
        return NextResponse.json({ message: 'Enrollment request created' });
      }
    } catch (error) {
      console.error('Error creating enrollment request:', error);
      return NextResponse.json({ message: 'Internal server error' });
    }
 
}
