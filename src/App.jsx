import { useState } from "react"
import Gallery from "./components/Gallery"
import CertificateDetails from "./components/CertificateDetails"


function App() {
  const [selectedCert, setSelectedCert] = useState(null)

  return (
    <div className="p-2">
      
      <Gallery onSelect={setSelectedCert}/>
      
      {selectedCert && (
        <CertificateDetails 
          certificate={selectedCert}
          onClose={()=>setSelectedCert(null)}
        />
      )}
      
    </div>
  )
}

export default App
