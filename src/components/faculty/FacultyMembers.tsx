"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, Mail, Linkedin, GraduationCap, Award, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";

// Faculty member type
type FacultyMember = {
  name: string;
  position: string;
  qualification: string;
  image: string;
  email?: string;
  linkedin?: string;
};

const FacultyMembers = () => {
  const [showMore, setShowMore] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const departmentHead: FacultyMember = {
    name: "Dr. G. MURALI",
    position: "Professor & Head",
    qualification: "M.Tech, Ph.D",
    image: "/img/hodsir.jpg",
    email: "hod_csm@kits.edu.in",
  };

  const primaryFaculty: FacultyMember[] = [
    {
      name: "Dr. S. RADHA KRISHNAN",
      position: "Professor",
      qualification: "M.E., Ph.D",
      image: "/img/radhakrshnasir.jpg",
    },
    {
      name: "Dr. S. NAGENDRAM",
      position: "Professor",
      qualification: "M.Tech, Ph.D",
      image: "/img/nagendrammam.jpg",
    },
    {
      name: "D. HARI KRISHNA",
      position: "Professor",
      qualification: "M.Tech, (Ph.D)",
      image: "/img/harii.jpg",
    },
    {
      name: "Dr. M. Narendranadh Reddy",
      position: "Professor",
      qualification: "AP/CAI",
      image: "/img/narendranath.jpg",
    },
  ];

  const additionalFaculty: FacultyMember[] = [
    { name: "Mr. Md.John Saida", position: "Assistant Professor", qualification: "AP/CAI", image: "/img/johnsaidasir.jpg" },
    { name: "Mrs. D.Vijaysri", position: "Assistant Professor", qualification: "AP/CAI", image: "/img/vijayasrimam.jpg" },
    { name: "Ms. K.Radhika", position: "Assistant Professor", qualification: "AP/CAI", image: "/img/radhikaa.jpg" },
    { name: "Mr. Y.Srinivasa Rao", position: "Professor", qualification: "Prof-CAI", image: "/img/srinivassir.jpg" },
    { name: "Mrs. K.Bhanusri", position: "Assistant Professor", qualification: "AP/CAI", image: "/img/bhanu.jpg" },
    { name: "Ms. N.Vijayalakshmi", position: "Assistant Professor", qualification: "AP/CAI", image: "/img/vijayalakshmimam.jpg" },
    { name: "Mrs. K.Archana", position: "Assistant Professor", qualification: "AP/CAI", image: "/img/archanaaa.jpg" },
    { name: "Mrs. B.Sravanthi", position: "Assistant Professor", qualification: "AP/CAI", image: "/img/sravanthimam.jpg" },
    { name: "Mrs. P.Bhargavi", position: "Assistant Professor", qualification: "AP/CAI", image: "/img/bhargaviii.jpg" },
    { name: "Mrs. A.Sai Pavani", position: "Assistant Professor", qualification: "AP/CAI", image: "/img/pavanimam.jpg" },
    { name: "Mrs. E.Padmavathi", position: "Assistant Professor", qualification: "AP/CAI", image: "/img/padmavathimam.jpg" },
    { name: "Mr. K.Nagendra Prasad", position: "Assistant Professor", qualification: "AP/CAI", image: "/img/nagendraPrasadsir.jpg" },
    { name: "Mrs. D.Krishnaveni", position: "Assistant Professor", qualification: "AP/CAI", image: "/img/krishnavenimam.jpg" },
    { name: "Mr. B.L.Narayana", position: "Assistant Professor", qualification: "AP/CAI", image: "/img/narayanasir.jpg" },
    { name: "Ms. D.Vasavi", position: "Assistant Professor", qualification: "AP/CAI", image: "/img/vasavimam.jpg" },
  ];

  const FacultyCard = ({ faculty, index }: { faculty: FacultyMember; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 hover:border-gold/30 hover:shadow-2xl hover:shadow-navy/10 transition-all duration-500"
    >
      <div className="relative h-72 overflow-hidden bg-gray-50">
        <Image
          src={faculty.image}
          alt={faculty.name}
          fill
          className="object-cover object-top group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
           <div className="absolute bottom-6 left-6 right-6 flex justify-center gap-4">
              <button className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-gold transition-colors">
                <Mail className="w-4 h-4 text-white" />
              </button>
              <button className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-gold transition-colors">
                <Linkedin className="w-4 h-4 text-white" />
              </button>
           </div>
        </div>
      </div>
      <div className="p-8 text-center">
        <span className="inline-block px-4 py-1 rounded-full bg-navy/5 text-navy text-[10px] font-bold uppercase tracking-widest mb-3 border border-navy/5">
          {faculty.position}
        </span>
        <h4 className="text-xl font-space-grotesk font-bold text-navy mb-2 group-hover:text-gold transition-colors">
          {faculty.name}
        </h4>
        <p className="text-gray-500 text-sm font-medium flex items-center justify-center gap-2">
           <GraduationCap className="w-4 h-4 text-gold" />
           {faculty.qualification}
        </p>
      </div>
    </motion.div>
  );

  return (
    <section className="py-24 bg-white relative overflow-hidden" ref={ref}>
      {/* Abstract background shapes */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-navy/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gold font-bold tracking-[0.3em] text-[10px] uppercase mb-4 block">Leadership</span>
          <h2 className="text-4xl md:text-5xl font-space-grotesk font-bold text-navy mb-4">Department Leadership</h2>
          <div className="w-20 h-1 bg-gold mx-auto rounded-full"></div>
        </motion.div>

        {/* HOD Card */}
        <motion.div
          className="max-w-4xl mx-auto mb-32"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-navy rounded-[3rem] overflow-hidden shadow-2xl shadow-navy/30 flex flex-col md:flex-row items-center border border-navy/10">
            <div className="md:w-2/5 relative h-[450px] w-full overflow-hidden">
              <Image
                src={departmentHead.image}
                alt={departmentHead.name}
                fill
                className="object-cover object-top hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy to-transparent"></div>
            </div>
            <div className="md:w-3/5 p-10 md:p-16 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
                 <div className="w-12 h-12 bg-gold rounded-2xl flex items-center justify-center">
                    <Award className="text-navy w-6 h-6" />
                 </div>
                 <div>
                    <span className="text-gold font-bold text-xs uppercase tracking-[0.2em]">Department Head</span>
                    <h3 className="text-3xl font-space-grotesk font-bold text-white">{departmentHead.name}</h3>
                 </div>
              </div>
              <p className="text-white/70 text-lg leading-relaxed mb-8 italic">
                "Welcome to the Department of CS & Machine Learning. Our mission is to bridge the gap between human intelligence and machine efficiency through world-class engineering education."
              </p>
              <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/10">
                 <div className="flex flex-col">
                    <span className="text-gold font-bold text-[10px] uppercase tracking-widest mb-1">Qualification</span>
                    <span className="text-white font-medium">{departmentHead.qualification}</span>
                 </div>
                 <div className="flex flex-col">
                    <span className="text-gold font-bold text-[10px] uppercase tracking-widest mb-1">Email</span>
                    <span className="text-white/60 font-medium text-xs break-all">{departmentHead.email}</span>
                 </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Faculty Grid Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <span className="text-gold font-bold tracking-[0.3em] text-[10px] uppercase mb-4 block">Meet the Team</span>
          <h3 className="text-3xl font-space-grotesk font-bold text-navy">Distinguished Faculty</h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {primaryFaculty.map((faculty, index) => (
            <FacultyCard key={`primary-${index}`} faculty={faculty} index={index} />
          ))}
        </div>

        {/* Additional Faculty with Animation */}
        <AnimatePresence>
          {showMore && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8 mb-16 pt-8">
                {additionalFaculty.map((faculty, index) => (
                  <FacultyCard key={`additional-${index}`} faculty={faculty} index={index + 4} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        <div className="flex justify-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowMore(!showMore)}
            className="group flex items-center justify-center gap-3 px-12 py-5 bg-navy text-white rounded-full hover:bg-navy-dark transition-all duration-300 shadow-2xl shadow-navy/20 font-bold uppercase tracking-widest text-xs border border-navy/10"
          >
            <span>{showMore ? "Show Less" : "View All Faculty"}</span>
            <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center transition-transform duration-300 group-hover:rotate-12">
              {showMore ? <ChevronUp className="h-4 w-4 text-navy" /> : <ChevronDown className="h-4 w-4 text-navy" />}
            </div>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default FacultyMembers;
