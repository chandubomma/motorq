'use client'
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ChartComponent = ({ data }) => {
    
  return (
    <BarChart width={600} height={400} data={data} suppressHydrationWarning >
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="enrollments" fill="#8884d8" name="Enrollments" />
      <Bar dataKey="customers" fill="#82ca9d" name="Customers" />
    </BarChart>
  );
};

export default ChartComponent;

