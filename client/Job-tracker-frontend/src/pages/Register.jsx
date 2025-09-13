import React, { use, useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import API from "../Services/api.js"

export default function RegisterPage() {

    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async() => {

    try {
    
    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }

        const {data} = await API.post('/v1/auth/register',formData)
        localStorage.setItem("token",data.token)
        alert(`User Registered Succesfully : ${data.user.name}`)
    navigate('/login')
    } catch (error) {
        console.log(error)
        alert(error.response?.data?.message || "Registration failed")
    }
    
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleRegister();
    }
  };

  return (
<div className="fixed inset-0 w-full h-full bg-gradient-to-b from-teal-800 to-teal-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Dark Container Box */}
       <div className="bg-gray-800 bg-opacity-95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-600 border-opacity-50">
          <div className="text-center mb-10">
            <h1 className="text-white text-3xl font-bold tracking-wide">
              USER REGISTER
            </h1>
          </div>
          
          <div className="space-y-5">
            {/* Username Field */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2.5 z-10">
                <User className="w-5 h-5 text-gray-600" />
              </div>
              <input
                type="text"
                name="name"
                placeholder="Username"
                value={formData.name}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="w-full bg-gray-600 bg-opacity-80 text-white placeholder-gray-300 rounded-full py-4 pl-16 pr-6 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all"
              />
            </div>

            {/* Email Field */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2.5 z-10">
                <Mail className="w-5 h-5 text-gray-600" />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="w-full bg-gray-600 bg-opacity-80 text-white placeholder-gray-300 rounded-full py-4 pl-16 pr-6 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2.5 z-10">
                <Lock className="w-5 h-5 text-gray-600" />
              </div>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2.5 z-10">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-600" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-600" />
                  )}
                </button>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="w-full bg-gray-600 bg-opacity-80 text-white placeholder-gray-300 rounded-full py-4 pl-16 pr-16 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-all"
              />
            </div>
            {/* Register Button */}
            <div className="pt-6">
              <button
                onClick={handleRegister}
                className="w-full bg-white text-gray-800 font-semibold text-lg py-4 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-30 transition-all transform hover:scale-105"
              >
                REGISTER
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center pt-4">
              <p className="text-gray-300 text-sm">
                Already have an account?{' '}
                <button className="text-white font-semibold hover:underline focus:outline-none" onClick={()=>{
                    navigate('/login')
                }}>
                  Login here
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}