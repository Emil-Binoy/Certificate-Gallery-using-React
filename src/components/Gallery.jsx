import React from 'react'
import { certificates } from '../data/certificates'
import CertificateCard from './CertificateCard'

const Gallery = ({onSelect}) => {
  return (
    <div className='p-5'>
        <nav className='my-10 flex items-center justify-center'>
            <h1 className=' text-6xl font-bold -mt-5 text-shadow-lg/20'>Certificate Gallery</h1>
        </nav>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
            {certificates.map(certificate => (
                <CertificateCard 
                    key={certificate.id} 
                    certificate={certificate}
                    onClick={()=>onSelect(certificate)}
                />
            ))}
        </div>
    </div>
  )
}

export default Gallery