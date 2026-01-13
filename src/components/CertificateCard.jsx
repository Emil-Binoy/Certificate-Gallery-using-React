import React from 'react'

const CertificateCard = ({certificate, onClick}) => {
  return (
    <div 
      className='shadow-xl hover:shadow-2xl rounded-2xl hover:-translate-y-2 hover:scale-105 duration-200'
      onClick={onClick}
    >
        <img 
          src={certificate.image} 
          alt="certificate.title"
          className='object-cover rounded-t-2xl h-50 w-full' 
        />
        <div className='p-4'>
            <h1>{certificate.title}</h1>
            <h1>Issuer:{certificate.issuer}</h1>
        </div>
    </div>
  )
}

export default CertificateCard