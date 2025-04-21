"use client";

export default function ContactHero() {
  return (
    <div className="relative bg-burgundy text-white">
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `url('/img/alumini logo2.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(2px)'
        }}
      ></div>
      <div className="container relative z-10 py-20 md:py-28 mx-auto flex justify-center items-center">
        <div className="max-w-4xl w-full text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h1>
          <p className="text-xl md:text-2xl mb-8 mx-auto max-w-3xl">
            Connect with the KITS AI & ML Alumni Association for inquiries,
            collaborations, or to update your information.
          </p>
        </div>
      </div>
    </div>
  );
}
