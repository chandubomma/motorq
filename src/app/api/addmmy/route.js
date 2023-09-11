import dbConnect from '@/lib/dbConnect';
import MMY from '@/models/MMY';
import { NextResponse } from 'next/server';

export  const POST = async(req, res) =>{
  
    try {
      // Connect to the database
      await dbConnect();
        console.log(req.body);
      // Extract MMY data from the request body
      let { make, model, year } = await req.json();

      // Check if an MMY document with the same 'make' already exists
      const existingMMY = await MMY.findOne({ make });

      if (existingMMY) {
        // If 'make' already exists, check if 'model' exists in the 'models' array
        const existingModel = existingMMY.models.find((m) => m.name === model);

        if (existingModel) {
          // If 'model' exists, add the 'year' to the 'years' array
          existingModel.years.push({ year });
        } else {
          // If 'model' doesn't exist, create a new 'model' entry with 'year'
          existingMMY.models.push({ name: model, years: [{ year }] });
        }

        // Save the updated MMY document
        await existingMMY.save();

        // MMY data saved successfully
        return NextResponse.json({ message: 'MMY data added/updated successfully' });
      } else {
        // If 'make' doesn't exist, create a new MMY document
        const newMMY = new MMY({
          make,
          models: [{ name: model, years: [{ year }] }],
        });

        // Save the new MMY document to the database
        await newMMY.save();

        // MMY data saved successfully
        return NextResponse.json({ message: 'MMY data added successfully' });
      }
    } catch (error) {
      console.error('Error adding MMY data:', error);
      return NextResponse.error('Internal server error', 500);
    }
  
}
