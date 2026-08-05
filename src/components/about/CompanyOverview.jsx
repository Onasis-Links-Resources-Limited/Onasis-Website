import React from 'react';

const CompanyOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
      <div className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-md transition border border-gray-50 hover:border-orange-500 hover:bg-orange-50 group">
        <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <i className="fas fa-timeline text-teal-600 text-2xl group-hover:text-orange-500 transition"></i> 
          Our History
        </h3>
        <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition">
          Onasis Links Resources Ltd was established in 2005 as a value added distributor of Electrical/Electronics, Power Equipment, ICT and Telecommunication Infrastructure Company. Our strategic partnership with original equipment manufacturers around the globe is our strength to customers' satisfaction.
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-md transition border border-gray-50 hover:border-orange-500 hover:bg-orange-50 group">
        <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <i className="fas fa-eye text-teal-600 text-2xl group-hover:text-orange-500 transition"></i> 
          Our Vision
        </h3>
        <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition">
          To relieve customers challenges through our supply chain global network and timely deliveries.
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-md transition border border-gray-50 hover:border-orange-500 hover:bg-orange-50 group">
        <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <i className="fas fa-bullseye text-teal-600 text-2xl group-hover:text-orange-500 transition"></i> 
          Our Mission
        </h3>
        <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition">
          To be the centre point in sales and logistics in the areas of our specialization.
        </p>
      </div>
    </div>
  );
};

export default CompanyOverview;