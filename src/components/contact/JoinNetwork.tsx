"use client";

import Image from "next/image";
import Link from "next/link";

export default function JoinNetwork() {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 max-w-xl mx-auto lg:mx-0" data-animate-on-scroll>
            <h2 className="text-3xl font-bold text-burgundy">Join Our Alumni Network</h2>
            <p className="text-gray-700 text-lg">
              Stay connected with the KITS AI & ML Department community. Update
              your information, network with fellow alumni, and participate in
              our upcoming events.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center">
                <i className="fas fa-check-circle text-gold mr-3"></i>
                <span>Access to exclusive alumni events</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check-circle text-gold mr-3"></i>
                <span>Professional networking opportunities</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check-circle text-gold mr-3"></i>
                <span>Mentorship programs</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-check-circle text-gold mr-3"></i>
                <span>Career development resources</span>
              </li>
            </ul>
            <div>
              <Link
                href="/register"
                className="inline-block bg-burgundy hover:bg-burgundy-dark text-white px-8 py-3 rounded-md font-semibold transition duration-300 transform hover:scale-105"
              >
                Register Now
              </Link>
            </div>
          </div>

          <div className="relative max-w-xl mx-auto lg:mx-0" data-animate-on-scroll>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/img/alumini logo2.jpg"
                alt="KITS Alumni Network"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute left-0 bottom-0 bg-burgundy bg-opacity-90 text-white p-4 rounded-br-lg rounded-tl-lg">
              <h4 className="text-xl font-bold">Connect. Collaborate. Grow.</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
