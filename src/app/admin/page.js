'use client'
import React, { useState, useEffect } from 'react';
import AdminEnrollments from '@/components/AdminEnrollments';
import ChartComponent from '@/components/ChartComponent';



const AdminPage = () => {
  // State for enrollment requests and selected enrollment
  const [enrollmentRequests, setEnrollmentRequests] = useState([]);
  
  const [enrollmentsData, setEnrollmentsData] = useState([]);
  
  // Fetch and format the data
  useEffect(() => {
    // Fetch enrollments and customers data from your API or source
    // Format the data into an array of objects with "name," "enrollments," and "customers" properties
    const formattedData = [
      { name: 'Jan', enrollments: 50, customers: 30 },
      { name: 'Feb', enrollments: 60, customers: 35 },
      { name: 'Mar', enrollments: 70, customers: 40 },
      { name: 'Apr', enrollments: 90, customers: 60 },
      // Add more data points as needed
    ];

    setEnrollmentsData(formattedData);
  }, []);

  useEffect(() => {
    // Fetch enrollment requests data from your API and update state
    // Replace with actual API call
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/getenrollments`);
        const data = await response.json();
        console.log(data)
        setEnrollmentRequests(data.data);
      } catch (error) {
        console.error('Error fetching enrollment requests:', error);
      }
    };

     fetchData();
  }, []);

  return (
    <div>
        <div className='ml-60 mt-5'>
            <h1 className='my-3 font-semibold'>Enrollments and Customers Chart</h1>
            <ChartComponent data={enrollmentsData} />
        </div>
        <AdminEnrollments enrollments={enrollmentRequests}/>
    </div>
  );
};

export default AdminPage;



