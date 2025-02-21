import React from 'react';
import { Sun, Home, Building2, Users, Calculator, ArrowRight, MapPin, Battery, LineChart } from 'lucide-react';
import {useNavigate} from "react-router"

function FutureScope() {
    const navigate = useNavigate();
    const date = new Date();


  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-sky-100">
      {/* Hero Section */}
      <header className="bg-white shadow-lg">
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer"
                        onClick={() => navigate('/')}> 
            <Sun className="h-8 w-8 text-yellow-500" />
            <span className="text-2xl font-bold text-sky-900">helioHarvest</span>
          </div>
          <div className="flex space-x-6">
            <button className="text-sky-800 hover:text-sky-600">About</button>
            <button className="text-sky-800 hover:text-sky-600">Services</button>
            <button className="text-sky-800 hover:text-sky-600">Contact</button>
            <button className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition" onClick={() => navigate('/MapboxExample')}>
              Get Started
            </button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        {/* Hero Message */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-sky-900 mb-6">
            Discover Your Rooftop's Solar Potential
          </h1>
          <p className="text-lg text-sky-700 max-w-2xl mx-auto">
            Estimate your solar energy potential and savings with our advanced rooftop analysis tool. Make informed decisions about your sustainable energy future.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <Home className="h-12 w-12 text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold text-sky-900 mb-2">Homeowners</h3>
            <p className="text-sky-700">
              Calculate your home's solar potential and estimated energy savings with our user-friendly tools.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <Building2 className="h-12 w-12 text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold text-sky-900 mb-2">Business Owners</h3>
            <p className="text-sky-700">
              Optimize your commercial property's energy efficiency with comprehensive solar analysis.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <Users className="h-12 w-12 text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold text-sky-900 mb-2">Consultants</h3>
            <p className="text-sky-700">
              Access detailed reports and analytics to provide expert solar recommendations to your clients.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-sky-900 text-white rounded-2xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-sky-100 max-w-xl">
                Enter your address to receive an instant estimation of your rooftop's solar potential and potential savings.
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="flex gap-2">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-sky-600" />
                  <input
                    type="text"
                    placeholder="Enter your address"
                    className="pl-10 pr-4 py-2 rounded-lg w-64 text-sky-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
                <button className="bg-yellow-500 text-sky-900 px-6 py-2 rounded-lg hover:bg-yellow-400 transition flex items-center gap-2">
                  Analyze
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-8 my-16">
          <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-md">
            <Battery className="h-12 w-12 text-yellow-500" />
            <div>
              <h4 className="text-2xl font-bold text-sky-900">2.5K+</h4>
              <p className="text-sky-700">kWh Generated</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-md">
            <Calculator className="h-12 w-12 text-yellow-500" />
            <div>
              <h4 className="text-2xl font-bold text-sky-900">10K+</h4>
              <p className="text-sky-700">Estimates Provided</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white p-6 rounded-xl shadow-md">
            <LineChart className="h-12 w-12 text-yellow-500" />
            <div>
              <h4 className="text-2xl font-bold text-sky-900">$100k+</h4>
              <p className="text-sky-700">Customer Savings</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-sky-950 text-sky-100 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Sun className="h-6 w-6 text-yellow-500" />
              <span className="text-xl font-bold">helioHarvest</span>
            </div>
            <p className="text-sm text-sky-300">
                
              © {date.getFullYear()} helioHarvest. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default FutureScope;