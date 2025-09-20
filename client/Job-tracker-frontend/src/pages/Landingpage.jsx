import React, { useState } from 'react';
import { 
  Search, 
  BarChart, 
  Filter, 
  Shield, 
  Bell, 
  ArrowRight, 
  CheckCircle, 
  Target, 
  TrendingUp, 
  Users, 
  Star,
  Menu,
  X,
  Play
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
   const navigate = useNavigate();
  const features = [
    {
      icon: Target,
      title: "Track Applications",
      description: "Keep a record of all your jobs with status updates."
    },
    {
      icon: BarChart,
      title: "Visual Dashboard", 
      description: "See your progress at a glance with charts and stats."
    },
    {
      icon: Filter,
      title: "Filter & Search",
      description: "Quickly find jobs by company, role, or status."
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is safe with JWT-based authentication."
    },
    {
      icon: Bell,
      title: "Stay Updated",
      description: "Know exactly where you stand in every application."
    }
  ];

  const jobCategories = [
    { name: "Software Engineering", count: "2 open positions" },
    { name: "Data Science", count: "5 open positions" },
    { name: "Product Management", count: "3 open positions" },
    { name: "Design", count: "4 open positions" },
    { name: "Marketing", count: "6 open positions" },
    { name: "Finance", count: "1 open position" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="bg-teal-600 text-white px-3 py-2 rounded-lg font-bold text-xl">
                JobTracker
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors">Features</a>
              <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors">How it Works</a>
              <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors">Pricing</a>
              <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors">Blog</a>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button className="text-gray-600 hover:text-teal-600 transition-colors"
              onClick={()=>{
                  navigate('/login')
                }}
              >
                Sign In
              </button>
              <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-full transition-colors"
              onClick={()=>{
                  navigate('/register')
                }}>
                Get Started
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100">
              <div className="flex flex-col space-y-4">
                <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors">Features</a>
                <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors">How it Works</a>
                <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors">Pricing</a>
                <a href="#" className="text-gray-600 hover:text-teal-600 transition-colors">Blog</a>
                <hr className="border-gray-200" />
                <button className="text-gray-600 hover:text-teal-600 transition-colors text-left"
                onClick={()=>{
                  navigate('/login')
                }}>
                  Sign In
                </button>
                <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-full transition-colors"
                onClick={()=>{
                    navigate('/register')
                }}>
                  Get Started
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-50 to-blue-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Track Your Job Applications.{' '}
                  <span className="text-teal-600">Land Your Dream Job.</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Manage applications, interviews, and offers all in one place. 
                  Designed for students and early-career professionals.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
                onClick={()=>{
                    navigate('/register')
                }}>
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="border-2 border-gray-300 hover:border-teal-600 text-gray-700 hover:text-teal-600 px-8 py-4 rounded-full font-semibold text-lg transition-all flex items-center justify-center gap-2">
                  <Play className="w-5 h-5" />
                  Learn More
                </button>
              </div>

              {/* Quick Search Demo */}
              <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md">
                <div className="flex items-center gap-3 mb-4">
                  <Search className="w-5 h-5 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Job title or keyword" 
                    className="flex-1 outline-none text-gray-700 placeholder-gray-400"
                    defaultValue="Frontend Developer"
                  />
                  <button className="bg-teal-600 text-white p-2 rounded-lg">
                    <Search className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Designer', 'Developer', 'Marketing'].map((tag) => (
                    <span key={tag} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative">
              <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-3xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="bg-white rounded-2xl p-6 space-y-4">
                  {/* Mock Dashboard Cards */}
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-gray-900">Your Applications</h3>
                    <span className="bg-teal-100 text-teal-600 px-3 py-1 rounded-full text-sm font-medium">24 Active</span>
                  </div>
                  
                  {/* Stats Cards */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-teal-600">15</div>
                      <div className="text-xs text-gray-500">Applied</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600">6</div>
                      <div className="text-xs text-gray-500">Interviews</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">3</div>
                      <div className="text-xs text-gray-500">Offers</div>
                    </div>
                  </div>

                  {/* Mock Job Cards */}
                  <div className="space-y-3">
                    {['Google', 'Microsoft', 'Stripe'].map((company, index) => (
                      <div key={company} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg"></div>
                          <div>
                            <div className="font-medium text-gray-900">{company}</div>
                            <div className="text-xs text-gray-500">Frontend Developer</div>
                          </div>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          index === 0 ? 'bg-yellow-100 text-yellow-600' :
                          index === 1 ? 'bg-green-100 text-green-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          {index === 0 ? 'Interview' : index === 1 ? 'Offer' : 'Applied'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg p-4 transform rotate-12">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">Interview Scheduled!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Stay Organized
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built specifically for students and early-career professionals who want to take control of their job search.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300 hover:border-teal-200">
                  <div className="bg-teal-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:bg-teal-200 transition-colors">
                    <feature.icon className="w-6 h-6 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Students Love It */}
      <section className="py-20 bg-gradient-to-br from-teal-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Simplify Your Job Hunt
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                No more spreadsheets or sticky notes. JobTracker organizes everything in one place, 
                helping students focus on landing their dream job.
              </p>
              
              <div className="space-y-4">
                {[
                  "Stop losing track of applications in email threads",
                  "Never miss an interview or follow-up deadline again", 
                  "See your progress clearly with visual dashboards",
                  "Focus on what matters - preparing for interviews"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              {/* Mock Categories */}
              <div className="grid grid-cols-2 gap-4">
                {jobCategories.map((category, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-500 rounded-lg mb-4 flex items-center justify-center">
                      <div className="w-6 h-6 bg-white rounded opacity-20"></div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.count}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-3xl p-12">
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <blockquote className="text-2xl lg:text-3xl font-medium text-gray-900 mb-8">
              "JobTracker helped me stay on top of all my applications. I never miss an interview!"
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-blue-500 rounded-full"></div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">Sarah Chen</div>
                <div className="text-gray-600">Student, 2025</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 bg-gradient-to-br from-teal-600 to-teal-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Take Control of Your Job Search?
          </h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already using JobTracker to land their dream jobs.
          </p>
          <button className="bg-white text-teal-600 hover:bg-gray-50 px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
          onClick={()=>{
            navigate('/register')
          }}>
            Sign Up Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="bg-teal-600 text-white px-3 py-2 rounded-lg font-bold text-xl mb-4 inline-block">
                JobTracker
              </div>
              <p className="text-gray-400">
                The smart way for students to manage their job applications.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 JobTracker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}