import { useRef, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { motion, useInView } from "framer-motion";
import { 
  Users, 
  Briefcase, 
  Code, 
  Megaphone, 
  Mail,
  // Linkedin,
  X,
  ArrowRight
} from "lucide-react";

const TeamSection = () => {
  const { theme } = useTheme();
  const sectionRef = useRef(null);
  const [hoveredMember, setHoveredMember] = useState(null);
  const isInView = useInView(sectionRef, {
    once: false,
    amount: 0.2,
  });

  const teamMembers = [
    // Executive Team
    {
      id: 1,
      name: "David Kivitz",
      role: "Chief Executive Officer",
      department: "Executive",
      initials: "DK",
      email: "david.k@onasislinks.com",
      color: "#E6501B"
    },
    {
      id: 2,
      name: "Antony Radbod",
      role: "Chief Financial Officer",
      department: "Executive",
      initials: "AR",
      email: "antony.r@onasislinks.com",
      color: "#C3110C"
    },
    {
      id: 3,
      name: "Jim Bates",
      role: "Director of Operations",
      department: "Executive",
      initials: "JB",
      email: "jim.b@onasislinks.com",
      color: "#740A03"
    },
    // IT Team
    {
      id: 4,
      name: "Sarah Johnson",
      role: "Lead Network Engineer",
      department: "IT",
      initials: "SJ",
      email: "sarah.j@onasislinks.com",
      color: "#E6501B"
    },
    {
      id: 5,
      name: "Michael Chen",
      role: "Cloud Architect",
      department: "IT",
      initials: "MC",
      email: "michael.c@onasislinks.com",
      color: "#C3110C"
    },
    {
      id: 6,
      name: "Amara Okafor",
      role: "Cybersecurity Specialist",
      department: "IT",
      initials: "AO",
      email: "amara.o@onasislinks.com",
      color: "#740A03"
    },
    // Marketing Team
    {
      id: 7,
      name: "Jessica Williams",
      role: "Marketing Director",
      department: "Marketing",
      initials: "JW",
      email: "jessica.w@onasislinks.com",
      color: "#E6501B"
    },
    {
      id: 8,
      name: "Tunde Adebayo",
      role: "Brand Manager",
      department: "Marketing",
      initials: "TA",
      email: "tunde.a@onasislinks.com",
      color: "#C3110C"
    },
    // Support Team
    {
      id: 9,
      name: "Priya Sharma",
      role: "Customer Support Lead",
      department: "Support",
      initials: "PS",
      email: "priya.s@onasislinks.com",
      color: "#740A03"
    }
  ];

  // Group members by department
  const groupedMembers = teamMembers.reduce((acc, member) => {
    if (!acc[member.department]) {
      acc[member.department] = [];
    }
    acc[member.department].push(member);
    return acc;
  }, {});

  const departments = Object.keys(groupedMembers);

  // Department icons
  const departmentIcons = {
    "Executive": Briefcase,
    "IT": Code,
    "Marketing": Megaphone,
    "Support": Users
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <section 
      ref={sectionRef}
      className={`py-20 overflow-hidden ${
        theme === "dark" ? "bg-[#0a0a0a]" : "bg-white"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <span
            className={`uppercase tracking-[0.2em] text-sm mb-4 font-bold inline-block ${
              theme === "dark" ? "text-[#E6501B]" : "text-[#C3110C]"
            }`}
          >
            Meet Our Team
          </span>
          <h2
            className={`text-4xl sm:text-5xl font-bold transition-colors duration-300 ${
              theme === "dark" ? "text-white" : "text-[#280905]"
            }`}
          >
            The <span className="text-[#E6501B]">People</span> Behind Onasis
          </h2>
          <p className={`mt-4 text-lg max-w-2xl mx-auto ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}>
            Dedicated professionals working together to connect Africa to the world
          </p>
        </motion.div>

        {/* Departments */}
        {departments.map((department) => {
          const members = groupedMembers[department];
          const DepartmentIcon = departmentIcons[department] || Users;

          return (
            <motion.div
              key={department}
              variants={sectionVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="mb-16 last:mb-0"
            >
              {/* Department Header */}
              <motion.div 
                className="flex items-center gap-3 mb-6"
                variants={itemVariants}
              >
                <div className={`p-2 rounded-xl ${
                  theme === "dark" ? "bg-[#E6501B]/20" : "bg-[#C3110C]/10"
                }`}>
                  <DepartmentIcon className={`w-5 h-5 ${
                    theme === "dark" ? "text-[#E6501B]" : "text-[#C3110C]"
                  }`} />
                </div>
                <h3 className={`text-xl font-bold ${
                  theme === "dark" ? "text-white" : "text-[#280905]"
                }`}>
                  {department} Team
                </h3>
                <span className={`text-sm px-3 py-1 rounded-full ${
                  theme === "dark" 
                    ? "bg-gray-800 text-gray-400" 
                    : "bg-gray-100 text-gray-500"
                }`}>
                  {members.length} members
                </span>
              </motion.div>

              {/* Team Members Grid */}
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                {members.map((member) => {
                  const isHovered = hoveredMember === member.id;

                  return (
                    <motion.div
                      key={member.id}
                      variants={itemVariants}
                      className={`group relative p-6 rounded-2xl transition-all duration-500 ${
                        theme === "dark"
                          ? "bg-gray-800/30 hover:bg-gray-800 border border-gray-700 hover:border-[#E6501B]/30"
                          : "bg-gray-50 hover:bg-white border border-gray-100 hover:border-[#C3110C]/20 hover:shadow-xl"
                      }`}
                      onMouseEnter={() => setHoveredMember(member.id)}
                      onMouseLeave={() => setHoveredMember(null)}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Avatar */}
                      <div className="flex flex-col items-center text-center">
                        <motion.div 
                          className="relative"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div 
                            className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-lg"
                            style={{
                              background: `linear-gradient(135deg, ${member.color}, ${member.color}CC)`
                            }}
                          >
                            {member.initials}
                          </div>
                          
                          {/* Online status dot */}
                          <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-[#0a0a0a]"></div>
                        </motion.div>

                        {/* Name */}
                        <h4 className={`text-lg font-bold mt-4 transition-colors duration-300 ${
                          theme === "dark" 
                            ? "text-white group-hover:text-[#E6501B]" 
                            : "text-[#280905] group-hover:text-[#C3110C]"
                        }`}>
                          {member.name}
                        </h4>

                        {/* Role */}
                        <span className={`inline-block text-sm px-4 py-1 rounded-full mt-1 ${
                          theme === "dark"
                            ? "bg-gray-700 text-gray-300"
                            : "bg-gray-100 text-gray-600"
                        }`}>
                          {member.role}
                        </span>

                        {/* Email */}
                        <div className={`flex items-center gap-2 mt-3 text-sm ${
                          theme === "dark" ? "text-gray-500" : "text-gray-400"
                        }`}>
                          <Mail className="w-3.5 h-3.5" />
                          <span>{member.email}</span>
                        </div>

                        {/* Social Links - appears on hover */}
                        <motion.div 
                          className="flex gap-3 mt-4"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ 
                            opacity: isHovered ? 1 : 0,
                            y: isHovered ? 0 : 10
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <a 
                            href="#" 
                            className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                              theme === "dark"
                                ? "bg-gray-700 hover:bg-[#E6501B] text-gray-400 hover:text-white"
                                : "bg-gray-100 hover:bg-[#C3110C] text-gray-500 hover:text-white"
                            }`}
                            aria-label="LinkedIn"
                          >
                            <X className="w-4 h-4" />
                          </a>
                          <a 
                            href="#" 
                            className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                              theme === "dark"
                                ? "bg-gray-700 hover:bg-[#E6501B] text-gray-400 hover:text-white"
                                : "bg-gray-100 hover:bg-[#C3110C] text-gray-500 hover:text-white"
                            }`}
                            aria-label="Twitter"
                          >
                            <X className="w-4 h-4" />
                          </a>
                          <a 
                            href={`mailto:${member.email}`} 
                            className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                              theme === "dark"
                                ? "bg-gray-700 hover:bg-[#E6501B] text-gray-400 hover:text-white"
                                : "bg-gray-100 hover:bg-[#C3110C] text-gray-500 hover:text-white"
                            }`}
                            aria-label="Email"
                          >
                            <Mail className="w-4 h-4" />
                          </a>
                        </motion.div>
                      </div>

                      {/* Decorative bottom line */}
                      <motion.div 
                        className={`absolute bottom-0 left-0 h-0.5 rounded-b-2xl transition-all duration-500 ${
                          theme === "dark" ? "bg-[#E6501B]" : "bg-[#C3110C]"
                        }`}
                        style={{
                          width: isHovered ? "100%" : "0%",
                        }}
                      />
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          );
        })}

        {/* Join Our Team CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            delay: 0.6,
            duration: 0.6,
            ease: [0.6, -0.05, 0.01, 0.99],
          }}
        >
          <p className={`text-sm mb-4 ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}>
            Want to be part of our team?
          </p>
          <a
            href="/careers"
            className={`inline-flex items-center gap-2 px-8 py-3 font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
              theme === "dark"
                ? "bg-[#E6501B] hover:bg-[#C3110C] text-white"
                : "bg-[#C3110C] hover:bg-[#E6501B] text-white"
            }`}
          >
            Join Our Team
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;