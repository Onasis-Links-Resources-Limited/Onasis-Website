import { useTheme } from '../../hooks/useTheme';
import { ContactItem } from './ContactItem';
import { SocialIcon } from './SocialIcon';

export const ContactInfo = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`p-8 rounded-xl ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
    }`}>
      <h3 className="text-2xl font-bold">Contact Information</h3>
      <div className="space-y-6 mt-8">
        <ContactItem icon="📍" text="123 Telecom Road, Lagos, Nigeria" />
        <ContactItem icon="📞" text="+234 800 123 4567" />
        <ContactItem icon="✉️" text="info@onasislinks.com" />
        <ContactItem icon="🕐" text="Mon-Fri: 8:00 AM - 6:00 PM" />
      </div>
      <div className="mt-8">
        <h4 className="font-semibold">Follow Us</h4>
        <div className="flex gap-4 mt-4">
          <SocialIcon platform="facebook" link="#" />
          <SocialIcon platform="twitter" link="#" />
          <SocialIcon platform="linkedin" link="#" />
          <SocialIcon platform="instagram" link="#" />
        </div>
      </div>
    </div>
  );
};