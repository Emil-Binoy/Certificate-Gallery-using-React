import React from 'react'
import { certificates } from '../data/certificates'
import CertificateCard from './CertificateCard'

const Gallery = ({onSelect}) => {
  return (
    <div 
        className="min-h-screen bg-cover bg-center bg-fixed relative font-sans antialiased"
        style={{ backgroundImage: "url('public/images/bg-pattern.png')" }}
    >
        <div className="absolute inset-0 bg-linear-to-b from-gray-900/30 via-gray-900/90 to-gray-950/95"></div>
        <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
            <header className="text-center mb-12">
                <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-4 drop-shadow-lg">
                    Certificate Gallery
                </h1>   
            </header>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>
                {certificates.map(certificate => (
                    <CertificateCard 
                        key={certificate.id} 
                        certificate={certificate}
                        onClick={()=>onSelect(certificate)} 
                    />
                ))}
            </div>
        </div>
    </div>
  )
}

export default Gallery