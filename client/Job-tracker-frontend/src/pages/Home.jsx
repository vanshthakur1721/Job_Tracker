import React, { useEffect, useState } from 'react';
import { CSVLink } from "react-csv";
import { 
  Plus,Search, Filter, MoreVertical, Calendar, MapPin, DollarSign, Clock, CheckCircle, XCircle ,AlertCircle,
  TrendingUp,
  Briefcase,
  Award,
  Users,
  Target,
  Bell
} from 'lucide-react';
import API from '../Services/api';
import { useNavigate } from 'react-router-dom';
export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  // Sample job applications data

  const [jobs,setJobs] = useState([]);
  const [stats, setStats] = useState([]);
    const navigate = useNavigate();


    const logout = async()=>{
      try {
       const data = await API.post('/v1/auth/logout');
       console.log(data)
        localStorage.removeItem('token')
        console.log("logged out successfully")
        alert("logged out successfully")
        navigate('/')
      } catch (error) {
        console.log(error)
      }
    }

useEffect(() => {
  const alljobs = async () => {
    try {
      setLoading(true);
      const { data } = await API.get('/v1/job/alljobs');
      setJobs(data.jobs);
      console.log(data);
       const appliedJobs = data.jobs.length;
      const interviews = data.jobs.filter(job => job.status === "interview").length;
      const offers = data.jobs.filter(job => job.status === "offer").length;
      const rejected = data.jobs.filter(job => job.status === "rejected").length;

      setStats([
        { label: "Applied Jobs", value: appliedJobs, icon: Briefcase, color: "text-blue-400" },
        { label: "Interviews", value: interviews, icon: Calendar, color: "text-green-400" },
        { label: "Offers", value: offers, icon: Award, color: "text-yellow-400" },
        { label: "Rejected", value: rejected, icon: XCircle, color: "text-red-400" }
      ]);
    } catch (error) {
      console.error("API error:", error);
    } finally {
      setLoading(false);
    }
  }

  alljobs();
}, []);

const handleExportCSV = () => {
  if (!jobs || jobs.length === 0) {
    alert("No job data available to export!");
    return;
  }

  // Extract column names (keys)
  const headers = Object.keys(jobs[0]);

  // Convert array of objects into CSV string
  const csvRows = [
    headers.join(","), // first row as header
    ...jobs.map(job =>
      headers.map(header => JSON.stringify(job[header] ?? "")).join(",")
    )
  ];

  const csvData = new Blob([csvRows.join("\n")], { type: "text/csv" });
  const url = window.URL.createObjectURL(csvData);

  // Create a temporary <a> tag to trigger download
  const a = document.createElement("a");
  a.href = url;
  a.download = "jobs.csv";
  a.click();
  window.URL.revokeObjectURL(url);
};



  const [menuOpenId,setMenuOpenId]= useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'applied': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'interview': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'offer': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  const getInitials = (name) => {
  if (!name) return "";
  return name
    .split(" ")          // split into words
    .map(word => word[0]) // take first letter
    .join("")            // join them
    .toUpperCase();      // uppercase
};


  const getStatusIcon = (status) => {
    switch (status) {
      case 'applied': return <Clock className="w-4 h-4" />;
      case 'interview': return <AlertCircle className="w-4 h-4" />;
      case 'offer': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  // const stats = [
  //   { label: 'Total Applications', value: '24', icon: Target, color: 'text-blue-600' },
  //   { label: 'Interviews', value: '6', icon: Users, color: 'text-yellow-600' },
  //   { label: 'Offers', value: '2', icon: TrendingUp, color: 'text-green-600' },
  //   { label: 'This Week', value: '5', icon: Calendar, color: 'text-purple-600' }
  // ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || job.status === filterStatus;
    return matchesSearch && matchesFilter;
  });
//bg-gradient-to-br from-teal-800 to-teal-900
  if (loading) {
    return (
      <div className="fixed inset-0 min-h-screen bg-gradient-to-br from-teal-700 to-teal-800 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-400"></div>
          <p className="text-white mt-4 text-lg font-semibold">Loading jobs...</p>
        </div>
      </div>
    );
  }
//just for git
  return (
    <div className="fixed inset-0 min-h-screen bg-gradient-to-br from-teal-700 to-teal-800 overflow-auto">
      {/* Header */}
      <div className=" bg-gray-900 bg-opacity-90 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-white">Job Tracker</h1>
              <p className="text-gray-300 mt-1">Manage your job applications efficiently</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-300 hover:text-white p-2 rounded-full hover:bg-gray-700 transition-colors">
                <Bell className="w-6 h-6" />
              </button>
              <div className="w-20 h-12 bg-teal-600 rounded-full flex items-center justify-center transition-all transform hover:scale-105  gap-2 shadow-lg">
                <button className="text-white font-semibold "
                
                onClick={()=>{
                 logout();
                }}>Logout</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full bg-gray-800 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Actions Bar */}
        <div className="bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search companies, positions, or notes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-800 text-white placeholder-gray-400 rounded-full py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                />
              </div>
              <div className="flex gap-3">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="bg-gray-800 text-white rounded-full py-3 pl-10 pr-8 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all appearance-none"
                  >
                    <option value="all">All Status</option>
                    <option value="applied">Applied</option>
                    <option value="interview">Interview</option>
                    <option value="offer">Offer</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <button className="bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white px-4 py-3 rounded-full transition-all flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  View All
                </button>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2"
              onClick={()=>{
                handleExportCSV();
              }}
               >
                <DollarSign className="w-5 h-5" />
                Export Data
              </button>
              <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg"
              onClick={()=>navigate("/addjob")
  
              }      
                      >
                <Plus className="w-5 h-5" />
                Add Application  
              </button>
            </div>
          </div>
        </div>

        {/* Job Applications List */}
        <div className="bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-2xl border border-gray-700 ">
          <div className="px-6 py-4 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-white">Recent Applications</h2>
            <p className="text-gray-300 text-sm mt-1">{filteredJobs.length} applications found</p>
          </div>
          
          <div className="divide-y divide-gray-700">
            {filteredJobs.map((job) => (
              <div key={job._id} className="p-6 hover:bg-gray-800 hover:bg-opacity-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">{job.role}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(job.status)}`}>
                        {getStatusIcon(job.status)}
                        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-teal-400 font-medium mb-2">{job.company}</p>
                    <div className="flex flex-wrap items-center gap-4 text-gray-300 text-sm">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {job.salary}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Applied {new Date(job.applicationDate).toLocaleDateString()}
                      </div>
                    </div>
                    {job.notes && (
                      <p className="text-gray-400 text-sm mt-2 italic">{job.notes}</p>
                    )}
                  </div>
                  <div className="ml-4">
                    <button className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-700 transition-colors"
                    onClick={()=>{
                      setMenuOpenId(menuOpenId === job._id?null:job._id)
                    }}>
                      <MoreVertical className="w-5 h-5" />
                    </button>
                     {menuOpenId === job._id && (
                <div className="absolute right-14  mt-0 w-27 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10">
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-teal-600 rounded-t-lg"
                    onClick={() => {
                      setMenuOpenId(null);
                      // Call your edit handler here
                      navigate(`/updatejob/${job._id}`);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-600 hover:text-white rounded-b-lg"
                    onClick={() => {
                      setMenuOpenId(null);
                      // Call your delete handler here
                      // Example: handleDelete(job._id)
                       navigate(`/updatejob/${job._id}`)
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredJobs.length === 0 && (
            <div className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Search className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-300 mb-2">No applications found</h3>
              <p className="text-gray-400">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}