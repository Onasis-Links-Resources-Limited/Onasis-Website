import React from 'react';

const TeamSection = () => {
  const teamMembers = [
    { name: 'David Kivitz', role: 'CEO', initials: 'DK' },
    { name: 'Antony Radbod', role: 'CFO', initials: 'AR' },
    { name: 'Justin Vuong', role: 'Director of Credit and Risk', initials: 'JV' },
    { name: 'Jim Bates', role: 'Director', initials: 'JB' }
  ];

  return (
    <div className="my-12">
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 border-l-4 border-teal-600 pl-4 mb-8">
        Meet Our Team
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-white rounded-3xl p-6 text-center shadow-sm hover:shadow-md transition border border-gray-50">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-400 rounded-full flex items-center justify-center text-white text-2xl font-semibold mx-auto mb-3 shadow-md hover:scale-110 transition-transform">
              {member.initials}
            </div>
            <h4 className="text-lg font-semibold text-gray-800">{member.name}</h4>
            <span className="inline-block bg-gray-100 text-gray-600 text-sm px-4 py-1 rounded-full my-2">
              {member.role}
            </span>
            <p className="text-gray-500 text-sm mt-2">
              As head of the company, my job is to ensure everyone
            </p>
            <button className="mt-3 border-2 border-red-500 text-red-500 px-5 py-1 rounded-full text-sm font-semibold hover:bg-red-500 hover:text-white transition">
              Read More <i className="fas fa-arrow-right text-xs ml-1"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;