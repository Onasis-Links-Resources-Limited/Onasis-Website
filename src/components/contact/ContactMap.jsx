export const ContactMap = () => {
  return (
    <div className="w-full h-96 bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden">
      {/* Google Maps or OpenStreetMap integration */}
      <iframe
        src="https://www.openstreetmap.org/export/embed.html?bbox=3.0%2C6.0%2C7.0%2C9.0&layer=mapnik"
        className="w-full h-full"
        allowFullScreen
      />
    </div>
  );
};