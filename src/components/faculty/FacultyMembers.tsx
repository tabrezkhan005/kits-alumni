"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

// Faculty member type
type FacultyMember = {
  name: string;
  position: string;
  qualification: string;
  image: string;
};

const FacultyMembers = () => {
  const [showMore, setShowMore] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Department Head
  const departmentHead: FacultyMember = {
    name: "Dr. G. MURALI",
    position: "Professor & Head",
    qualification: "M.Tech, Ph.D",
    image: "/img/hodsir.jpg",
  };

  // First row faculty (always visible)
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
      name: "Dr. M.Narendranadh Reddy",
      position: "Professor",
      qualification: "AP/CAI",
      image: "/img/narendranath.jpg",
    },
  ];

  // Additional faculty members (toggled with Show More button)
  const additionalFaculty: FacultyMember[] = [
    {
      name: "Mr. Md.John Saida",
      position: "Assistant Professor",
      qualification: "AP/CAI",
      image: "/img/johnsaidasir.jpg",
    },
    {
      name: "Mrs. D.Vijaysri",
      position: "Assistant Professor",
      qualification: "AP/CAI",
      image: "/img/vijayasrimam.jpg",
    },
    {
      name: "Ms. K.Radhika",
      position: "Assistant Professor",
      qualification: "AP/CAI",
      image: "/img/radhikaa.jpg",
    },
    {
      name: "Mr. Y.Srinivasa Rao",
      position: "Professor",
      qualification: "Prof-CAI",
      image: "/img/srinivassir.jpg",
    },
    {
      name: "Mrs. K.Bhanusri",
      position: "Assistant Professor",
      qualification: "AP/CAI",
      image: "/img/bhanu.jpg",
    },
    {
      name: "Ms. N.Vijayalakshmi",
      position: "Assistant Professor",
      qualification: "AP/CAI",
      image: "/img/vijayalakshmimam.jpg",
    },
    {
      name: "Mrs. K.Archana",
      position: "Assistant Professor",
      qualification: "AP/CAI",
      image: "/img/archanaaa.jpg",
    },
    {
      name: "Mrs. B.Sravanthi",
      position: "Assistant Professor",
      qualification: "AP/CAI",
      image: "/img/sravanthimam.jpg",
    },
    {
      name: "Mrs. P.Bhargavi",
      position: "Assistant Professor",
      qualification: "AP/CAI",
      image: "/img/bhargaviii.jpg",
    },
    {
      name: "Mrs. A.Sai Pavani",
      position: "Assistant Professor",
      qualification: "AP/CAI",
      image: "/img/pavanimam.jpg",
    },
    {
      name: "Mrs. E.Padmavathi",
      position: "Assistant Professor",
      qualification: "AP/CAI",
      image: "/img/padmavathimam.jpg",
    },
    {
      name: "Mr. K.Nagendra Prasad",
      position: "Assistant Professor",
      qualification: "AP/CAI",
      image: "/img/nagendraPrasadsir.jpg",
    },
    {
      name: "Mrs. D.Krishnaveni",
      position: "Assistant Professor",
      qualification: "AP/CAI",
      image: "/img/krishnavenimam.jpg",
    },
    {
      name: "Mr. B.L.Narayana",
      position: "Assistant Professor",
      qualification: "AP/CAI",
      image: "/img/narayanasir.jpg",
    },
    {
      name: "Ms. D.Vasavi",
      position: "Assistant Professor",
      qualification: "AP/CAI",
      image: "/img/vasavimam.jpg",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const titleVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Faculty member card component
  const FacultyCard = ({ faculty, index }: { faculty: FacultyMember; index: number }) => (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.1 }}
      className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={faculty.image}
          alt={faculty.name}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-5 border-t-4 border-[#800020]">
        <h3 className="text-[#800020] font-semibold mb-1">{faculty.position}</h3>
        <h4 className="text-lg font-bold mb-2">{faculty.name}</h4>
        <p className="text-gray-600">{faculty.qualification}</p>
      </div>
    </motion.div>
  );

  const handleToggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <section className="py-20 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Department Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#800020] mb-4">Department of AI & ML</h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto"></div>
        </motion.div>

        {/* Department Head */}
        <motion.div
          className="max-w-xl mx-auto mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white rounded-lg overflow-hidden shadow-lg border-t-8 border-[#D4AF37]">
            <div className="relative h-80 overflow-hidden">
              <Image
                src={departmentHead.image}
                alt={departmentHead.name}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="p-8 text-center">
              <h3 className="text-xl text-[#800020] font-semibold mb-2">{departmentHead.position}</h3>
              <h4 className="text-2xl font-bold mb-3">{departmentHead.name}</h4>
              <p className="text-gray-600">{departmentHead.qualification}</p>
            </div>
          </div>
        </motion.div>

        {/* Faculty Coordinators Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#800020] mb-4">Faculty Co-ordinators</h2>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto"></div>
        </motion.div>

        {/* First row faculty (always visible) */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {primaryFaculty.map((faculty, index) => (
            <FacultyCard key={`primary-${index}`} faculty={faculty} index={index} />
          ))}
        </motion.div>

        {/* Hidden faculty members (toggle with Show More button) */}
        <motion.div
          className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-12")}
          style={{
            height: showMore ? 'auto' : 0,
            opacity: showMore ? 1 : 0,
            overflow: 'hidden'
          }}
          transition={{ duration: 0.6 }}
        >
          {additionalFaculty.map((faculty, index) => (
            <FacultyCard key={`additional-${index}`} faculty={faculty} index={index} />
          ))}
        </motion.div>

        {/* Show More Button */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <button
            onClick={handleToggleShowMore}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#800020] text-white rounded-full hover:bg-[#5c0018] transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <span>{showMore ? "Show Less" : "Show More Faculty"}</span>
            {showMore ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FacultyMembers;
