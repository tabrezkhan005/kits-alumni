import Image from "next/image";
import Link from "next/link";

// Mock data for the website
const upcomingEvents = [
  {
    id: 1,
    title: "Alumni Reunion 2024",
    date: "June 15, 2024",
    time: "5:00 PM",
    location: "Main Campus Auditorium",
    image: "/img/conference.jpg",
    description: "Join us for our annual alumni reunion event with networking, dinner, and special guest speakers."
  },
  {
    id: 2,
    title: "Career Fair",
    date: "July 22, 2024",
    time: "10:00 AM",
    location: "Engineering Building",
    image: "/img/innovationday.jpg",
    description: "Connect with top employers and explore career opportunities with our industry partners."
  },
  {
    id: 3,
    title: "Tech Innovation Day",
    date: "August 10, 2024",
    time: "9:00 AM",
    location: "Technology Center",
    image: "/img/aiquest.jpg",
    description: "Showcase of the latest technological innovations from our students and faculty members."
  }
];

const newsAndUpdates = [
  {
    id: 1,
    title: "College Celebrates 25 Years of Excellence",
    date: "May 5, 2024",
    image: "/img/eliteanniversary.jpg",
    summary: "KITS College proudly marks its 25th anniversary with special events and alumni gatherings throughout the year."
  },
  {
    id: 2,
    title: "New Research Partnership Announced",
    date: "April 28, 2024",
    image: "/img/conference.jpg",
    summary: "The college has established a new research partnership with leading technology firms to advance AI research."
  },
  {
    id: 3,
    title: "Students Win National Hackathon",
    date: "April 15, 2024",
    image: "/img/aiquest.jpg",
    summary: "A team of our students secured first place at the National Coding Challenge, demonstrating exceptional skills."
  }
];

const facultyMembers = [
  {
    id: 1,
    name: "Dr. Nagendra Prasad",
    position: "Principal",
    image: "/img/nagendraPrasadsir.jpg",
    profile: "/faculty/nagendra-prasad"
  },
  {
    id: 2,
    name: "Dr. Radhakrishna",
    position: "Head of Computer Science",
    image: "/img/radhakrshnasir.jpg",
    profile: "/faculty/radhakrishna"
  },
  {
    id: 3,
    name: "Dr. Srinivas",
    position: "Professor of Engineering",
    image: "/img/srinivassir.jpg",
    profile: "/faculty/srinivas"
  },
  {
    id: 4,
    name: "Dr. John Saida",
    position: "Professor of Mathematics",
    image: "/img/johnsaidasir.jpg",
    profile: "/faculty/john-saida"
  }
];

const galleryImages = [
  { id: 1, src: "/img/conference.jpg", alt: "Conference Event", title: "Annual Conference" },
  { id: 2, src: "/img/eliteanniversary.jpg", alt: "Anniversary Celebration", title: "25th Anniversary" },
  { id: 3, src: "/img/innovationday.jpg", alt: "Innovation Day", title: "Technology Showcase" },
  { id: 4, src: "/img/aiquest.jpg", alt: "AI Research Event", title: "AI Research Symposium" },
];

const resources = [
  { id: 1, title: "Academic Calendar", link: "/resources/calendar", icon: "📅" },
  { id: 2, title: "Library Resources", link: "/resources/library", icon: "📚" },
  { id: 3, title: "Career Services", link: "/resources/careers", icon: "💼" },
  { id: 4, title: "Research Publications", link: "/resources/research", icon: "📄" },
];

const socialMedia = [
  { id: 1, name: "Facebook", icon: "facebook", link: "https://facebook.com/kitscollege" },
  { id: 2, name: "Twitter", icon: "twitter", link: "https://twitter.com/kitscollege" },
  { id: 3, name: "Instagram", icon: "instagram", link: "https://instagram.com/kitscollege" },
  { id: 4, name: "LinkedIn", icon: "linkedin", link: "https://linkedin.com/company/kitscollege" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 font-[family-name:var(--font-geist-sans)]">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/conference.jpg"
            alt="KITS College Campus"
            fill
            priority
            className="object-cover opacity-70 dark:opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-transparent dark:from-blue-950/80"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
              Welcome to KITS College
            </h1>
            <p className="text-xl md:text-2xl mb-8 drop-shadow">
              Shaping futures through excellence in education and innovation
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/about"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-blue-500/50 text-center transform hover:-translate-y-1"
              >
                Learn More
              </Link>
              <Link
                href="/contact"
                className="bg-white hover:bg-gray-100 text-blue-600 px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-white/30 text-center transform hover:-translate-y-1"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty Members Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Distinguished Faculty
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Learn from experienced educators and industry professionals dedicated to your success
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {facultyMembers.map((member) => (
              <div
                key={member.id}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="h-64 relative overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{member.position}</p>
                  <Link
                    href={member.profile}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
                  >
                    View Profile →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/faculty"
              className="inline-block bg-transparent hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-600 px-6 py-3 rounded-lg font-medium transition-colors duration-300"
            >
              Meet All Faculty Members
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Upcoming Events
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join us for these exciting events and activities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="h-48 relative overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {event.date}
                    </span>
                    <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-xs font-medium px-2.5 py-0.5 rounded-full ml-2">
                      {event.time}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{event.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    <span className="font-medium">Location:</span> {event.location}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                    {event.description}
                  </p>
                  <Link
                    href={`/events/${event.id}`}
                    className="inline-block mt-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/events"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
            >
              View All Events
            </Link>
          </div>
        </div>
      </section>

      {/* News & Updates Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              News & Updates
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Stay informed about the latest happenings at KITS College
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsAndUpdates.map((news) => (
              <div
                key={news.id}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="h-48 relative overflow-hidden">
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">{news.date}</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{news.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {news.summary}
                  </p>
                  <Link
                    href={`/news/${news.id}`}
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                  >
                    Read More
                    <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/news"
              className="inline-block bg-transparent hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-600 px-6 py-3 rounded-lg font-medium transition-colors duration-300"
            >
              Browse All News
            </Link>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 bg-blue-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Student Resources
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Access important tools and information for your academic journey
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource) => (
              <Link
                key={resource.id}
                href={resource.link}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center border border-gray-100 dark:border-gray-700 transform hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{resource.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{resource.title}</h3>
                <p className="text-blue-600 dark:text-blue-400 mt-2 font-medium">Access Now →</p>
              </Link>
            ))}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mt-12 max-w-4xl mx-auto border border-gray-100 dark:border-gray-700">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Alumni Portal</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Connect with fellow alumni, access exclusive resources, and stay involved with the KITS community.
                </p>
                <Link
                  href="/login"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Log In / Register
                </Link>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <Image
                  src="/img/alumini logo.jpg"
                  alt="Alumni Portal"
                  width={200}
                  height={200}
                  className="rounded-full border-4 border-blue-100 dark:border-blue-900 shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Campus Gallery
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Experience life at KITS College through our photo gallery
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryImages.map((image) => (
              <div
                key={image.id}
                className="relative overflow-hidden rounded-xl aspect-square group cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 w-full">
                    <h3 className="text-white text-lg font-semibold">{image.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/gallery"
              className="inline-block bg-transparent hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-600 px-6 py-3 rounded-lg font-medium transition-colors duration-300"
            >
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Social Media Links */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Connect With Us</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Stay updated and join our community on social media
            </p>
          </div>

          <div className="flex justify-center space-x-6">
            {socialMedia.map((platform) => (
              <a
                key={platform.id}
                href={platform.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
                aria-label={platform.name}
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  {platform.icon === "facebook" && (
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  )}
                  {platform.icon === "twitter" && (
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  )}
                  {platform.icon === "instagram" && (
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                  )}
                  {platform.icon === "linkedin" && (
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                  )}
                </svg>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
