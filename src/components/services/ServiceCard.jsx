export const ServiceCard = ({ icon, title, description, features, ctaLink }) => {
  return (
    <div className="group p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mt-2">{description}</p>
      <ul className="mt-4 space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="text-sm flex items-center gap-2">
            <span className="text-[#E6501B]">✓</span> {feature}
          </li>
        ))}
      </ul>
      <a href={ctaLink} className="inline-block mt-6 text-[#C3110C] hover:text-[#E6501B] font-semibold">
        Learn More →
      </a>
    </div>
  );
};