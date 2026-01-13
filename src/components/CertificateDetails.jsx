import React from 'react'
import { certificates } from '../data/certificates'
import { IoMdCloseCircleOutline } from "react-icons/io";

const CertificateDetails = ({certificate, onClose}) => {
  

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
      />
    <div className="fixed inset-0 z-50 flex  justify-center pointer-events-none">
      <div 
        className="max-w-3xl w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex justify-center'>
          <h1 className='text-4xl text-white font-bold mb-4 mt-2 text-shadow-lg/20 '>{certificate.title}</h1>
          <button
            onClick={onClose}
            className='absolute -right-10 top-4 text-white text-3xl'
          >
            <IoMdCloseCircleOutline />
          </button>
        </div>
        <img 
          src={certificate.image} 
          alt={certificate.title}
          className='w-full' 
        />
        
      </div>
    </div>
    </>
  )
}

export default CertificateDetails