'use client'
import {FaUserCircle} from 'react-icons/fa'
import Link from 'next/link';

const AdminSideBar = ({ customerName, activeOption }) => {
  return (
    <div className="w-80 p-1 h-screen bg-gradient-to-r from-blue-600 to-blue-400 text-white text-center fixed">
      <h2 className='text-xl font-bold mt-5'>Admin Dashboard</h2>
        <div className='flex justify-center mt-10 mb-5'><FaUserCircle className='w-32 h-32'/></div>
      <div ><h4>Welcome,</h4><h4 className='font-semibold my-2'>{"Chandu Bomma"}</h4></div>
      <hr className='mt-8 '/>
      <h5 className='text-sm text-gray-300 text-start mt-5'>Vehicle Enrollments</h5>
      <ul className="flex flex-col items-center text-center justify-center h-fit mt-8">
        <li className='w-56 hover:bg-white hover:text-blue-500 h-fit py-2 my-1'>
          <Link href="/admin" >
            Enrollments
          </Link>
        </li>
        <li className='w-56 hover:bg-white hover:text-blue-500 h-fit py-2 my-1'>
          <Link href="/admin/addvehicle" >
           Add Vehicle
          </Link>
        </li>
      </ul>
      <button className="mt-10 bg-white text-blue-500 w-56 h-fit py-2">Logout</button>
    </div>
  );
};

export default AdminSideBar;
