export const CompanyOverview = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold">Our Story</h2>
            <p className="text-gray-600 mt-4">
              Onasis Links Resources Limited has been at the forefront of 
              telecommunications innovation in Africa...
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold">Our Impact</h3>
            {/* <div className="grid grid-cols-2 gap-4 mt-4">
              <StatCard number="10+" label="Years Experience" />
              <StatCard number="500+" label="Clients Served" />
              <StatCard number="98%" label="Satisfaction Rate" />
              <StatCard number="24/7" label="Support Available" />
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};