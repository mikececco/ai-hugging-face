import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const features = [
  { title: 'Easy Listing', description: 'List your business in minutes with our user-friendly interface.' },
  { title: 'Wide Exposure', description: 'Reach thousands of potential buyers across various industries.' },
  { title: 'Secure Transactions', description: 'Our platform ensures safe and confidential business dealings.' },
  { title: 'Expert Support', description: 'Get guidance from our team of experienced business brokers.' },
];

export function LandingPage({ onGetStarted }) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-blue-600 text-white py-20">
          <div className="container mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4">List your businesses with ease</h1>
            <p className="text-xl mb-8">The premier platform for buying and selling businesses</p>
            <button 
              className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-100 transition duration-300"
              onClick={onGetStarted}
            >
              Get Started
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
            <p>Email: info@businesssaleplatform.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-2xl hover:text-blue-400 transition duration-300"><FaFacebook /></a>
            <a href="#" className="text-2xl hover:text-blue-400 transition duration-300"><FaTwitter /></a>
            <a href="#" className="text-2xl hover:text-blue-400 transition duration-300"><FaLinkedin /></a>
            <a href="mailto:info@businesssaleplatform.com" className="text-2xl hover:text-blue-400 transition duration-300"><FaEnvelope /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
