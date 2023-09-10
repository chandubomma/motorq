'use client'

import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
const enrollmentRequestData = [
    {
      id:'EN001',
      customerId:'',
      makeId: '',
      modelId:'',
      yearId: '',
      vin: 'ABC123456789XYZ',
      licensePlate: 'AB123CD',
      status: 'Pending',
      adminComment: '',
      enrollmentTimestamp: new Date('2023-09-15T10:00:00Z'),
      verdictTimestamp: null,
    },
    {
        id:'EN002',
      customerId:'',
      makeId: '',
      modelId: '',
      yearId: '',
      vin: 'XYZ987654321ABC',
      licensePlate: 'CD456EF',
      status: 'Accepted',
      adminComment: 'Approved for enrollment.',
      enrollmentTimestamp: new Date('2023-09-10T15:30:00Z'),
      verdictTimestamp: new Date('2023-09-11T09:15:00Z'),
    },
    // Add more enrollment request objects as needed
  ];
  


const EnrollmentsPage = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [expandedEnrollments, setExpandedEnrollments] = useState({});
  const [filterStatus, setFilterStatus] = useState(''); // Filter by enrollment status
  const [sortBy, setSortBy] = useState('enrollmentTimestamp'); // Sort by enrollment timestamp by default
  const [searchVin, setSearchVin] = useState(''); // Search option for VIN

  // Fetch enrollments for the current customer (you need to implement this)
  useEffect(() => {
    // // Make an API request to retrieve the customer's enrollments and update the 'enrollments' state.
    // // Replace this with your actual API request logic.
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch('/api/enrollments'); // Example API endpoint
    //     const data = await response.json();
    //     setEnrollments(data);
    //   } catch (error) {
    //     console.error('Error fetching enrollments:', error);
    //   }
    // };

    // fetchData();
    setEnrollments(enrollmentRequestData)
  }, []);

  const handleToggleDetails = (enrollmentId) => {
    // Toggle the expanded state for the clicked enrollment card
    setExpandedEnrollments((prevExpanded) => ({
      ...prevExpanded,
      [enrollmentId]: !prevExpanded[enrollmentId],
    }));
  };

  const filteredEnrollments = enrollments
    .filter((enrollment) => {
      // Apply filter by enrollment status
      if (filterStatus && enrollment.status !== filterStatus) {
        return false;
      }
      // Apply search filter for VIN
      if (searchVin && !enrollment.vin.includes(searchVin)) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      // Sort by the selected sorting option
      if (sortBy === 'enrollmentTimestamp') {
        return new Date(b.enrollmentTimestamp) - new Date(a.enrollmentTimestamp);
      }
      if (sortBy === 'verdictTimestamp') {
        return new Date(b.verdictTimestamp) - new Date(a.verdictTimestamp);
      }
      // Add other sorting options as needed
      return 0;
    });

  return (
    <div className="max-w-3xl mx-auto mt-8 p-4">
        <div className='grid grid-cols-2'>
            {/* Filters */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Filter by Status</label>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="form-select w-80 h-fit border-2 border-blue-500 p-4 m-3 rounded-sm focus:outline-none"
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Sort by</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="form-select w-80 h-fit border-2 border-blue-500 p-4 m-3 rounded-sm focus:outline-none"
        >
          <option value="enrollmentTimestamp">Date added</option>
          <option value="verdictTimestamp">Verdict Timestamp</option>
          {/* Add other sorting options as needed */}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Search by VIN</label>
        <input
          type="text"
          value={searchVin}
          onChange={(e) => setSearchVin(e.target.value)}
          className="form-input w-80 h-fit border-2 border-blue-500 p-3.5 m-3 rounded-sm focus:outline-none"
        />
      </div>
        </div>
      <h2 className="text-2xl font-semibold my-4">Your Enrollments</h2>
      
      {/* List of enrollments */}
      {filteredEnrollments.map((enrollment) => (
        <div key={enrollment.id} className="bg-white rounded-lg shadow-lg p-4 mb-4">
          <div className="flex justify-between">
            <div>
              <p className="text-lg font-semibold">Enrollment ID: {enrollment.id}</p>
              <p>Status: {enrollment.status}</p>
              <p>Timestamp: {format(enrollment.enrollmentTimestamp, 'yyyy-MM-dd HH:mm:ss')}</p>
            </div>
            <div>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                onClick={() => handleToggleDetails(enrollment.id)}
              >
                {expandedEnrollments[enrollment.id] ? 'Hide Details' : 'View Details'}
              </button>
            </div>
          </div>
          {/* View Details section */}
          {expandedEnrollments[enrollment.id] && (
            <div className="mt-4">
              {/* Display additional enrollment details here */}
              {/* Example: Vehicle details */}
              <p>Vehicle Make: {enrollment.make}</p>
              <p>Vehicle Model: {enrollment.model}</p>
              <p>Vehicle Year: {enrollment.year}</p>
              {/* Add more details as needed */}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default EnrollmentsPage;
