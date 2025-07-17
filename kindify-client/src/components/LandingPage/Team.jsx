import React from 'react';

const team = [
  { name: 'Aman Soni', role: 'Founder', image: 'https://via.placeholder.com/150' },
  { name: 'Meera Joshi', role: 'NGO Advisor', image: 'https://via.placeholder.com/150' },
  { name: 'Rahul Verma', role: 'Tech Lead', image: 'https://via.placeholder.com/150' },
];

const Team = () => {
  return (
    <section className="py-16 px-6 bg-gray-50 text-center">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-10">Meet the Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={member.image}
                alt={member.name}
                className="rounded-full w-32 h-32 mb-4"
              />
              <h4 className="text-xl font-semibold">{member.name}</h4>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
