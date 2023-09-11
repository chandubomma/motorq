'use client';
import React, { useState, useEffect } from 'react';

const EnrollmentForm = ({ mmys }) => {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    vin: '',
    licensePlate: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Auto-populate the VIN field based on selected Make, Model, and Year
    if (formData.make && formData.model && formData.year) {
      const vinPrefix = `${formData.make.split(' ').join('').substring(0, 2)}${formData.model.split(' ').join('').substring(0, 2)}${formData.year}`;
      setFormData({ ...formData, vin: vinPrefix });
    }
  }, [formData.make, formData.model, formData.year]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.make) {
      newErrors.make = 'Make is required';
    }

    if (!formData.model) {
      newErrors.model = 'Model is required';
    }

    if (!formData.year) {
      newErrors.year = 'Year is required';
    } else if (!/^\d{4}$/.test(formData.year)) {
      newErrors.year = 'Year must be a 4-digit number';
    }

    if (!formData.vin) {
      newErrors.vin = 'VIN is required';
    } else if (!/^[A-HJ-NPR-Z0-9]{17}$/i.test(formData.vin)) {
      newErrors.vin = 'VIN must be a 17-character alphanumeric string';
    }

    if (!formData.licensePlate) {
      newErrors.licensePlate = 'License Plate is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch('/api/enrollmentrequest', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...formData, customerId: 'chandu@gmail.com' }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setSubmitted(true);
        } else {
          console.error('Error submitting enrollment request');
          alert('Error submitting enrollment request');
        }
      } catch (error) {
        console.error('Error submitting enrollment request:', error);
        alert('Internal server error');
      }
    }
  };

  const makeOptions = Array.from(new Set(mmys.map((mmy) => mmy.make)));
const modelOptions = Array.from(
  new Set(
    [].concat(
      ...mmys
        .filter((mmy) => mmy.make === formData.make)
        .map((mmy) => mmy.models.map((model) => model.name))
    )
  )
);
const yearOptions = Array.from(
  new Set(
    [].concat(
      ...mmys
        .filter((mmy) => mmy.make === formData.make && mmy.models.some((model) => model.name === formData.model))
        .map((mmy) =>
          mmy.models
            .filter((model) => model.name === formData.model)
            .map((model) => model.years.map((year) => year.year))
        )
    )
  )
);
console.log(yearOptions)
  return (
    <div className="w-full mx-auto mt-8 p-4 ">
      <h2 className="text-2xl font-semibold mb-8 ml-5">Vehicle Enrollment Form</h2>
      <div className="w-fit ml-40 mt-10">
        {submitted ? (
          <p className="text-green-500">Enrollment request submitted successfully.</p>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-20 ">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Make</label>
              <select
                name="make"
                value={formData.make}
                onChange={handleInputChange}
                className={`form-select ${errors.make ? 'border-red-500' : ''} w-80 h-fit border-2 border-blue-500 p-4 m-3 rounded-sm focus:outline-none`}
              >
                <option value="" disabled>Select Make</option>
                {makeOptions.map((make) => (
                  <option key={make} value={make}>
                    {make}
                  </option>
                ))}
              </select>
              {errors.make && <p className="text-red-500 text-sm">{errors.make}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Model</label>
              <select
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                className={`form-select ${errors.model ? 'border-red-500' : ''} w-80 h-fit border-2 border-blue-500 p-4 m-3 rounded-sm focus:outline-none`}
              >
                <option value="" disabled>Select Model</option>
                {modelOptions.map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
              </select>
              {errors.model && <p className="text-red-500 text-sm">{errors.model}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Year</label>
              <select
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                className={`form-select ${errors.year ? 'border-red-500' : ''} w-80 h-fit border-2 border-blue-500 p-4 m-3 rounded-sm focus:outline-none`}
              >
                <option value="" disabled>Select Year</option>
                {yearOptions.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              {errors.year && <p className="text-red-500 text-sm">{errors.year}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">VIN</label>
              <input
                type="text"
                name="vin"
                value={formData.vin}
                onChange={handleInputChange}
                className={`form-input ${errors.vin ? 'border-red-500' : ''} w-80 h-fit border-2 border-blue-500 p-3.5 m-3 rounded-sm focus:outline-none`}
              />
              {errors.vin && <p className="text-red-500 text-sm">{errors.vin}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">License Plate</label>
              <input
                type="text"
                name="licensePlate"
                value={formData.licensePlate}
                onChange={handleInputChange}
                className={`form-input ${errors.licensePlate ? 'border-red-500' : ''} w-80 h-fit border-2 border-blue-500 p-3.5 m-3 rounded-sm focus:outline-none`}
              />
              {errors.licensePlate && (
                <p className="text-red-500 text-sm">{errors.licensePlate}</p>
              )}
            </div>
            <div className="mb-4 col-span-2 flex justify-center mt-16">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 w-80"
              >
                Enroll
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EnrollmentForm;
