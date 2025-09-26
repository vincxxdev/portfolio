import React from 'react';

const experienceData = [
  {
    date: 'Test',
    title: 'Test',
    company: 'Test',
    description: 'Test',
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-primary-text mb-16">
          Esperienze
        </h2>
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-3 sm:left-1/2 transform sm:-translate-x-1/2 h-full w-0.5 bg-secondary-text/30"></div>

          {experienceData.map((item, index) => (
            <div key={index} className="relative mb-12">
              <div className="flex items-center">
                <div className="absolute left-3 sm:left-1/2 transform sm:-translate-x-1/2 z-10">
                  <div className="bg-accent w-6 h-6 rounded-full border-4 border-background"></div>
                </div>

                <div className={`w-full pl-12 sm:pl-0 ${index % 2 === 0 ? 'sm:pr-8 sm:text-right' : 'sm:pl-8'}`}>
                  <div className={`inline-block p-6 rounded-xl border border-secondary-text/20 bg-secondary-background shadow-lg max-w-sm ${index % 2 === 0 ? 'sm:text-right' : 'sm:text-left'}`}>
                    <p className="text-sm font-semibold text-accent mb-1">{item.date}</p>
                    <h3 className="text-xl font-bold text-primary-text">{item.title}</h3>
                    <p className="text-md text-secondary-text mb-3">{item.company}</p>
                    <p className="text-sm text-primary-text/80">{item.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
