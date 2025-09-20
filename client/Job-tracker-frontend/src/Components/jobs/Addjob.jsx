
import React, { useState } from 'react';
import { 
  Building2, 
  User, 
  DollarSign, 
  MapPin, 
  Calendar,
  Clock,
  Briefcase,
  CheckCircle,
  X,
  Save
} from 'lucide-react';
import API from '../../Services/api';
import { useNavigate } from 'react-router-dom';

export default function Addjob() {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    salary: '',
    location: 'my city',
    status: 'applied',
    jobtype: 'full-time',
    applicationDate: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
    notes: ''
  });
  const navigate  = useNavigate();
  const [errors, setErrors] = useState({});

  const statusOptions = [
    { value: 'applied', label: 'Applied', color: 'text-blue-600' },
    { value: 'interview', label: 'Interview', color: 'text-yellow-600' },
    { value: 'offer', label: 'Offer', color: 'text-green-600' },
    { value: 'rejected', label: 'Rejected', color: 'text-red-600' }
  ];

  const jobtypeOptions = [
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'remote', label: 'Remote' },
    { value: 'internship', label: 'Internship' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }

    if (!formData.role.trim()) {
      newErrors.role = 'Job role is required';
    }

    if (!formData.salary || formData.salary <= 0) {
      newErrors.salary = 'Valid salary is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async() => {
    if (validateForm()) {
      console.log('Job Application Data:', {
        ...formData,
        salary: Number(formData.salary),
        applicationDate: new Date(formData.applicationDate),
        createdBy: 'user-id-here' // This would come from your auth context
      });
      try {
     // Api call to backend
     const {data} = await API.post('/v1/job/createjob',formData)
     console.log("job added:",data)
     alert('Job application added successfully!');
      navigate('/home')

      }catch(err){
        console.log(err)
      }
    }
  };

  

  const resetForm = () => {
    setFormData({
      company: '',
      role: '',
      salary: '',
      location: 'my city',
      status: 'applied',
      jobtype: 'full-time',
      applicationDate: new Date().toISOString().split('T')[0],
      notes: ''
    });
    setErrors({});
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit();
    }
  };

  return (
  <div className="fixed inset-0 min-h-screen w-full bg-gradient-to-br from-teal-800 to-teal-900 overflow-auto">
        <div className="w-full max-w-2xl mx-auto flex items-center justify-center min-h-screen p-4">
     <div className="bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-700 w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Add Job Application</h1>
            <p className="text-gray-300">Track your new job opportunity</p>
          </div>

          <div className="space-y-6">
            {/* Company & Role Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Company Field */}
              <div className="space-y-2">
                <label className="text-gray-300 text-sm font-medium">Company Name *</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2.5 z-10">
                    <Building2 className="w-5 h-5 text-gray-600" />
                  </div>
                  <input
                    type="text"
                    name="company"
                    placeholder="e.g. Google, Amazon"
                    value={formData.company}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    className={`w-full bg-gray-700 bg-opacity-80 text-white placeholder-gray-300 rounded-full py-4 pl-16 pr-6 focus:outline-none focus:ring-2 transition-all ${
                      errors.company ? 'focus:ring-red-500 ring-2 ring-red-500' : 'focus:ring-teal-500'
                    }`}
                  />
                </div>
                {errors.company && <p className="text-red-400 text-sm">{errors.company}</p>}
              </div>

              {/* Role Field */}
              <div className="space-y-2">
                <label className="text-gray-300 text-sm font-medium">Job Role *</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2.5 z-10">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <input
                    type="text"
                    name="role"
                    placeholder="e.g. Data Scientist"
                    value={formData.role}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    className={`w-full bg-gray-700 bg-opacity-80 text-white placeholder-gray-300 rounded-full py-4 pl-16 pr-6 focus:outline-none focus:ring-2 transition-all ${
                      errors.role ? 'focus:ring-red-500 ring-2 ring-red-500' : 'focus:ring-teal-500'
                    }`}
                  />
                </div>
                {errors.role && <p className="text-red-400 text-sm">{errors.role}</p>}
              </div>
            </div>

            {/* Salary & Location Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Salary Field */}
              <div className="space-y-2">
                <label className="text-gray-300 text-sm font-medium"> Salary *</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2.5 z-10">
                    <DollarSign className="w-5 h-5 text-gray-600" />
                  </div>
                  <input
                    type="number"
                    name="salary"
                    placeholder="e.g. 75000"
                    value={formData.salary}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    className={`w-full bg-gray-700 bg-opacity-80 text-white placeholder-gray-300 rounded-full py-4 pl-16 pr-6 focus:outline-none focus:ring-2 transition-all ${
                      errors.salary ? 'focus:ring-red-500 ring-2 ring-red-500' : 'focus:ring-teal-500'
                    }`}
                  />
                </div>
                {errors.salary && <p className="text-red-400 text-sm">{errors.salary}</p>}
              </div>

              {/* Location Field */}
              <div className="space-y-2">
                <label className="text-gray-300 text-sm font-medium">Location *</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2.5 z-10">
                    <MapPin className="w-5 h-5 text-gray-600" />
                  </div>
                  <input
                    type="text"
                    name="location"
                    placeholder="e.g. San Francisco, CA or Remote"
                    value={formData.location}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    className={`w-full bg-gray-700 bg-opacity-80 text-white placeholder-gray-300 rounded-full py-4 pl-16 pr-6 focus:outline-none focus:ring-2 transition-all ${
                      errors.location ? 'focus:ring-red-500 ring-2 ring-red-500' : 'focus:ring-teal-500'
                    }`}
                  />
                </div>
                {errors.location && <p className="text-red-400 text-sm">{errors.location}</p>}
              </div>
            </div>

            {/* Status & Job Type Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Status Field */}
              <div className="space-y-2">
                <label className="text-gray-300 text-sm font-medium">Application Status</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2.5 z-10">
                    <CheckCircle className="w-5 h-5 text-gray-600" />
                  </div>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 bg-opacity-80 text-white rounded-full py-4 pl-16 pr-6 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all appearance-none"
                  >
                    {statusOptions.map(option => (
                      <option key={option.value} value={option.value} className="bg-gray-800">
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Job Type Field */}
              <div className="space-y-2">
                <label className="text-gray-300 text-sm font-medium">Job Type</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2.5 z-10">
                    <Briefcase className="w-5 h-5 text-gray-600" />
                  </div>
                  <select
                    name="jobtype"
                    value={formData.jobtype}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 bg-opacity-80 text-white rounded-full py-4 pl-16 pr-6 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all appearance-none"
                  >
                    {jobtypeOptions.map(option => (
                      <option key={option.value} value={option.value} className="bg-gray-800">
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Application Date */}
            <div className="space-y-2">
              <label className="text-gray-300 text-sm font-medium">Application Date</label>
              <div className="relative max-w-md">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2.5 z-10">
                  <Calendar className="w-5 h-5 text-gray-600" />
                </div>
                <input
                  type="date"
                  name="applicationDate"
                  value={formData.applicationDate}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 bg-opacity-80 text-white rounded-full py-4 pl-16 pr-6 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                />
              </div>
            </div>

            {/* Notes Field */}
            <div className="space-y-2">
              <label className="text-gray-300 text-sm font-medium">Notes (Optional)</label>
              <textarea
                name="notes"
                placeholder="Add any additional notes about this application..."
                value={formData.notes}
                onChange={handleInputChange}
                rows={3}
                className="w-full bg-gray-700 bg-opacity-80 text-white placeholder-gray-300 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                onClick={handleSubmit}
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white px-6 py-4 rounded-full font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
              >
                <Save className="w-5 h-5" />
                Add Job Application
              </button>
              
              <button
                onClick={resetForm}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-6 py-4 rounded-full font-medium transition-all flex items-center justify-center gap-2"
              >
                <X className="w-5 h-5" />
                Clear Form
              </button>
            </div>

            {/* Helper Text */}
            <div className="text-center pt-4">
              <p className="text-gray-400 text-sm">
                Press <span className="font-medium text-gray-300">Ctrl + Enter</span> to quickly submit
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}