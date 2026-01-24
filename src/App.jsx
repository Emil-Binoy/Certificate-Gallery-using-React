import React from "react";
import { Routes, Route } from "react-router-dom"; // Import Router components

// Import Pages
import Gallery from "./components/Gallery";
import AdminPanel from "./components/AdminPanel"; // Make sure path is correct

function App() {
  return (
    <div>
      <Routes>
        {/* Home Route (Gallery) */}
        <Route path="/" element={<Gallery />} />
        
        {/* Admin Route (Upload Panel) */}
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </div>
  );
}

export default App;