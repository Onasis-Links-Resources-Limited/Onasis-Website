import React from 'react';
import AboutHero from '../components/about/AboutHero';
import CompanyOverview from '../components/about/CompanyOverview';
import TeamSection from '../components/about/TeamSection';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <AboutHero />
      <CompanyOverview />
      <TeamSection />
      
      {/* CTA Section - No hover effect */}
      <div className="bg-black rounded-3xl p-6 sm:p-10 my-12 flex flex-wrap items-center justify-between gap-4 border border-gray-800">
        <h3 className="text-xl sm:text-2xl font-semibold text-white flex items-center gap-3">
          <i className="fas fa-handshake text-white text-2xl"></i> 
          How can we help you?
        </h3>
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-gray-300">Contact us and we'll get back to you as soon as possible.</span>
          <a href="#" className="bg-gradient-to-r from-red-500 to-orange-400 text-white px-6 py-3 rounded-full font-semibold hover:from-red-600 hover:to-orange-500 transition flex items-center gap-2 shadow-lg hover:shadow-xl">
            <i className="fas fa-paper-plane"></i> Submit a Request
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;