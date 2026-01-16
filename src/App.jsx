import { useState } from "react"
import Gallery from "./components/Gallery"
import CertificateDetails from "./components/CertificateDetails"
import { certificates } from "./data/certificates"


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
