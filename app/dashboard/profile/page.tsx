import React from "react";
import Image from "next/image";
import { FileText, Github, Linkedin, Mail, MapPin, Phone, Twitter, UserPlus, Users } from "lucide-react";

const ProfilePage = () => {
  const user = {
    name: "MT Mony",
    role: "Full Stack Developer",
    avatar: "/avatar.png",
    bio: "Passionate developer with a love for creating amazing web experiences. I enjoy working with modern technologies and building scalable applications. In my free time, I contribute to open-source projects and explore new tech.",
    stats: {
      followers: "1.2k",
      following: "240",
      posts: "88",
    },
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "GraphQL",
      "Tailwind CSS",
      "PostgreSQL",
      "Docker",
    ],
    contact: {
      email: "mony@example.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
    },
    social: {
      github: "https://github.com/mony",
      linkedin: "https://linkedin.com/in/mony",
      twitter: "https://twitter.com/mony",
    },
  };

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-8 text-white text-center relative">
          <div className="relative inline-block">
            <Image
              src={user.avatar}
              alt={`${user.name}'s avatar`}
              width={128}
              height={128}
              className="rounded-full border-4 border-white shadow-md"
            />
            <span className="absolute bottom-2 right-2 block h-5 w-5 rounded-full bg-green-500 border-2 border-white"></span>
          </div>
          <h1 className="text-4xl font-bold mt-4">{user.name}</h1>
          <p className="text-xl text-gray-300">{user.role}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 divide-x divide-gray-200 p-4 border-b border-gray-200 bg-gray-50">
          <div className="text-center p-2">
            <Users className="h-6 w-6 text-gray-500 mx-auto mb-1" />
            <p className="text-2xl font-bold text-gray-800">
              {user.stats.followers}
            </p>
            <p className="text-sm text-gray-600">Followers</p>
          </div>
          <div className="text-center p-2">
            <UserPlus className="h-6 w-6 text-gray-500 mx-auto mb-1" />
            <p className="text-2xl font-bold text-gray-800">
              {user.stats.following}
            </p>
            <p className="text-sm text-gray-600">Following</p>
          </div>
          <div className="text-center p-2">
            <FileText className="h-6 w-6 text-gray-500 mx-auto mb-1" />
            <p className="text-2xl font-bold text-gray-800">
              {user.stats.posts}
            </p>
            <p className="text-sm text-gray-600">Posts</p>
          </div>
        </div>

        <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: About and Skills */}
          <div className="md:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                About Me
              </h2>
              <p className="text-justify text-gray-700 leading-relaxed">
                {user.bio}
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full transition-all hover:bg-blue-200 hover:shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Contact and Social */}
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Contact Information
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  <a
                    href={`mailto:${user.contact.email}`}
                    className="hover:text-blue-600 break-all"
                  >
                    {user.contact.email}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  <span>{user.contact.phone}</span>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  <span>{user.contact.location}</span>
                </li>
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Social Media
              </h2>
              <div className="flex gap-4">
                <a
                  href={user.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-800 transition-transform duration-200 hover:scale-110"
                >
                  <Github className="h-6 w-6" />
                </a>
                <a
                  href={user.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-700 transition-transform duration-200 hover:scale-110"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
                <a
                  href={user.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-sky-500 transition-transform duration-200 hover:scale-110"
                >
                  <Twitter className="h-6 w-6" />
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
