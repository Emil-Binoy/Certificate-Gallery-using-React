import React from 'react';

const AdminLoginForm = ({ handleLogin, email, setEmail, password, setPassword }) => (
  <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
    <form onSubmit={handleLogin} className="bg-gray-800 p-8 rounded-xl border border-gray-700 w-full max-w-md">
      <h2 className="text-2xl text-white font-bold mb-6 text-center">Admin Login</h2>
      <input 
        type="email" placeholder="Admin Email" 
        className="w-full mb-4 p-3 bg-gray-700 text-white rounded" 
        value={email} onChange={e => setEmail(e.target.value)} 
      />
      <input 
        type="password" placeholder="Password" 
        className="w-full mb-6 p-3 bg-gray-700 text-white rounded" 
        value={password} onChange={e => setPassword(e.target.value)} 
      />
      <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-500 font-bold">
        Login
      </button>
    </form>
  </div>
);

export default AdminLoginForm;