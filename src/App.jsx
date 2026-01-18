import { useState } from "react"
import Gallery from "./components/Gallery"

import { certificates } from "./data/certificates"
import CertificateDetails from "./components/CertificateDetails/CertificateDetails"


function App() {
  const [selectedCert, setSelectedCert] = useState(null)

  return (
    <div >
      
      <Gallery onSelect={setSelectedCert}/>
      
      {selectedCert && (
        <CertificateDetails 
          certificate={selectedCert}
          certificates={certificates}
          onClose={()=>setSelectedCert(null)}
          onChange={setSelectedCert}
        />
      )}
      
    </div>
  )
}

export default App
