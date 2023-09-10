'use client'
import React, { useState, useEffect } from 'react';

const EnrollmentForm = () => {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    vin: '',
    licensePlate: '',
  });

  const [filteredModelOptions, setFilteredModelOptions] = useState([]);
  const [filteredYearOptions, setFilteredYearOptions] = useState([]);

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // When "Make" is selected, filter the "Model" options
    if (formData.make) {
      // Implement your logic to filter models based on user input here
      // For example, you can filter models from an API based on the selected make
      // Update filteredModelOptions accordingly
    } else {
      setFilteredModelOptions([]);
    }
  }, [formData.make]);

  useEffect(() => {
    // When "Make" and "Model" are selected, filter the "Year" options
    if (formData.make && formData.model) {
      // Implement your logic to filter years based on user input here
      // For example, you can filter years from an API based on the selected make and model
      // Update filteredYearOptions accordingly
    } else {
      setFilteredYearOptions([]);
    }
  }, [formData.make, formData.model]);

  // Auto-populate the VIN field based on selected Make, Model, and Year
  useEffect(() => {
    if (formData.make && formData.model && formData.year) {
      // Implement your logic to auto-populate the VIN field based on user input here
      // For example, you can generate the VIN prefix based on the selected make, model, and year
      // Update the formData accordingly
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

    // if (!formData.vin) {
    //   newErrors.vin = 'VIN is required';
    // } else if (!/^[A-HJ-NPR-Z0-9]{8}$/i.test(formData.vin)) {
    //   newErrors.vin = 'VIN must be a 17-character alphanumeric string';
    // }

    if (!formData.licensePlate) {
      newErrors.licensePlate = 'License Plate is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Handle form submission here
      // You can send the formData to your API for processing

      // Reset the form and set submitted to true
      setFormData({
        make: '',
        model: '',
        year: '',
        vin: '',
        licensePlate: '',
      });
      setSubmitted(true);
    }
  };

  return (
    <div className="w-full mx-auto mt-8 p-4">
      <h2 className="text-2xl font-semibold mb-8 ml-5">Add Vehicle MMY</h2>
      <div className='w-fit ml-40 mt-10'>
      
        {submitted ? (
          <p className="text-green-500">Vehicle MMY Added Successfully.</p>
        ) : (
          <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-x-20 '>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Make</label>
              <input
                type="text"
                name="make"
                value={formData.make}
                onChange={handleInputChange}
                className={`form-input ${errors.make ? 'border-red-500' : ''} w-80 h-fit border-2 border-blue-500 p-4 m-3 rounded-sm focus:outline-none`}
              />
              {errors.make && <p className="text-red-500 text-sm">{errors.make}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Model</label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                className={`form-input ${errors.model ? 'border-red-500' : ''} w-80 h-fit border-2 border-blue-500 p-4 m-3 rounded-sm focus:outline-none`}
              />
              {errors.model && <p className="text-red-500 text-sm">{errors.model}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Year</label>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                className={`form-input ${errors.year ? 'border-red-500' : ''} w-80 h-fit border-2 border-blue-500 p-4 m-3 rounded-sm focus:outline-none`}
              />
              {errors.year && <p className="text-red-500 text-sm">{errors.year}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">VIN</label>
              <input
                type="text"
                name="vin"
                value={formData.vin}
                onChange={handleInputChange}
                readOnly
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
            {/* Repeat similar code for other form fields */}
            <div className="mb-4 col-span-2 flex justify-center mt-16">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 w-80"
              >
                Add Vehicle
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EnrollmentForm;
