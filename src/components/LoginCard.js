import React from 'react'
import Link from 'next/link';

const LoginCard = ({ img, typeOfUser, subText, link }) => {
  

  return (
    <div className='max-w-[400px] min-h-[460px] p-6 shadow-xl rounded-md'>
      <div className='my-2'>
        <img src={img} className='w-full' alt='' />
      </div>
      <div className='text-center'>
        <p className='text-bold text-xl font-semibold text-slate-800 my-2'>{typeOfUser}</p>
        <p className='text-light text-slate-500 my-2'>{subText}</p>
      </div>
      <div className='text-center mt-5'>
        <Link
          href={link}
          className='text-center w-2/3 mx-auto px-4 py-2 border-1 bg-blue-400 text-white my-2 rounded-md shadow-lg transition-colors duration-300 hover:bg-blue-600 hover:cursor-pointer'
        >
          {`Continue as ${typeOfUser}`}
        </Link>
      </div>
    </div>
  );
};

export default LoginCard;

