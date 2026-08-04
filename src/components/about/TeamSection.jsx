import { TeamCard } from './TeamCard';
import { teamMembers } from '../../data/teamMembers';

export const TeamSection = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center">Our Leadership Team</h2>
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {teamMembers.map(member => (
            <TeamCard key={member.id} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
};