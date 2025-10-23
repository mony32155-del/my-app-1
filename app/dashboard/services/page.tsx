import React from "react";
import Link from "next/link";
import { CircleArrowLeft, Wrench } from "lucide-react";

const Services = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center gap-6 p-4">
      <Wrench className="h-40 w-40 text-gray-400 animate-bounce" />
      <h2 className="text-3xl font-bold text-gray-700">Working on It!</h2>
      <p className="text-lg text-gray-500 max-w-md text-justify">
        Our team of highly trained (and slightly caffeinated) developers are
        hard at work building this page. Please check back later!
      </p>
      <Link href="/dashboard">
        <span className="text-indigo-600 hover:text-indigo-800 font-semibold">
          <CircleArrowLeft className="h-10 w-10 inline-block mr-2" />
        </span>
      </Link>
    </div>
  );
};

export default Services;
