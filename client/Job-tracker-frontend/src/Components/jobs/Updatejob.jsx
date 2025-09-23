import React, { useState, useEffect } from 'react';
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
  Save,
  ArrowLeft,
  Edit3,
  Trash2,
  AlertTriangle
} from 'lucide-react';
import API from '../Services/api';
import { useNavigate, useParams } from 'react-router-dom';
export default function Updatejob() {
  const [formData, setFormData] = useState({
    id: '1', // This would come from route params
    company: '',
    role: '',
    salary: '',
    location: '',
    status: 'applied',
    jobtype: 'full-time',
    applicationDate: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
   const navigate = useNavigate();
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

    const {id} = useParams();
  // Simulate loading existing job data
  useEffect( () => {
    // This would typically fetch data from your API using the job ID
    const fetchjobdata = async()=>{
      try {
        const {data} = await API.get(`/v1/job/getsingleJob/${id}`)
       console.log(data);
         setTimeout(() => {
      setFormData({
        company: data.job.company,
        role: data.job.role,
        salary: data.job.salary,
        location: data.job.location,
        status: data.job.status,
        jobtype: data.job.jobtype,
        applicationDate: data.job.applicationDate.split('T')[0],
        notes: 'Second round interview scheduled for next week'
    

      });
      setIsLoading(false);
    });
        
      } catch (error) {
        console.log(error)
      }
    }
  fetchjobdata();
  }, [id]);

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

  const handleUpdate = () => {
    if (validateForm()) {
      console.log('Updated Job Application Data:', {
        ...formData,
        salary: Number(formData.salary),
        applicationDate: new Date(formData.applicationDate),
      });}
  
      // Here you would typically send the data to your backend
      // Then redirect back to the job list
  
         const updatejobdata = async()=>{
      try {
          const {data}= await API.put(`/v1/job/updatejob/${id}`,
    formData
          )
          console.log(data)
          alert(data.message)
          navigate("/home")

      } catch (error) {
        console.log(error)
      }
    }
     
    updatejobdata();
  };

  const handleDelete = () => {
    const deletejob = async()=>{
    try {
      const deletejobdata = await API.delete(`/v1/job/deletejob/${id}`)
      console.log(deletejobdata)
      alert(deletejobdata.data.message)
      console.log('Deleting job application with ID:', formData.id);
      alert('Job application deleted successfully!');
      setShowDeleteConfirm(false);
      navigate('/home')
    } catch (error) {
      console.log(error)
    }}
    deletejob();
    // Here you would typically send delete request to your backend
    // Then redirect back to the job list
  };

  const handleBack = () => {
    
    // This would typically navigate back to the job list
    navigate("/home")
    console.log('Navigate back to job list');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleUpdate();
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 min-h-screen bg-gradient-to-br from-teal-800 to-teal-900 flex items-center justify-center">
        <div className="bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-3xl p-12 border border-gray-700">
          <div className="flex items-center justify-center">
            <Clock className="w-8 h-8 text-teal-400 animate-spin" />
            <span className="ml-3 text-white text-lg">Loading job details...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className=" fixed inset-0 min-h-screen bg-gradient-to-br from-teal-800 to-teal-900 p-4 overflow-auto">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gray-700">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBack}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-full transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-white">Update Job Application</h1>
                <p className="text-gray-300 mt-1">Edit your job application details</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Edit3 className="w-6 h-6 text-teal-400" />
            </div>
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
                    placeholder="e.g. Google, Microsoft, Startup Inc."
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
                    placeholder="e.g. Frontend Developer, Data Scientist"
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
                <label className="text-gray-300 text-sm font-medium">Annual Salary *</label>
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
                onClick={handleUpdate}
                className="flex-1 bg-teal-600 hover:bg-teal-700 text-white px-6 py-4 rounded-full font-semibold transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
              >
                <Save className="w-5 h-5" />
                Update Application
              </button>
              
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-4 rounded-full font-medium transition-all flex items-center justify-center gap-2"
              >
                <Trash2 className="w-5 h-5" />
                Delete
              </button>
            </div>

            {/* Helper Text */}
            <div className="text-center pt-4">
              <p className="text-gray-400 text-sm">
                Press <span className="font-medium text-gray-300">Ctrl + Enter</span> to quickly update
              </p>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-900 rounded-2xl p-6 max-w-md w-full border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-600 bg-opacity-20 p-3 rounded-full">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Delete Job Application</h3>
                  <p className="text-gray-300 text-sm">This action cannot be undone</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6">
                Are you sure you want to delete the application for <span className="font-semibold text-white">{formData.role}</span> at <span className="font-semibold text-white">{formData.company}</span>?
              </p>
              
              <div className="flex gap-3">
                <button
                  onClick={handleDelete}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-full font-medium transition-colors"
                >
                  Delete Permanently
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-full font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}