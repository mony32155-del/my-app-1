"use client";
import React, { ComponentType } from "react";
import { Users, Activity, DollarSign, BarChart2 } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface CardProps {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
  iconBgColor: string;
  iconTextColor: string;
}

const summaryCards: CardProps[] = [
  {
    icon: Users,
    label: "Total Users",
    value: "1,250",
    iconBgColor: "bg-blue-100",
    iconTextColor: "text-blue-600",
  },
  {
    icon: DollarSign,
    label: "Revenue",
    value: "$8,400",
    iconBgColor: "bg-green-100",
    iconTextColor: "text-green-600",
  },
  {
    icon: Activity,
    label: "Activity",
    value: "573",
    iconBgColor: "bg-yellow-100",
    iconTextColor: "text-yellow-600",
  },
  {
    icon: BarChart2,
    label: "Reports",
    value: "27",
    iconBgColor: "bg-red-100",
    iconTextColor: "text-red-600",
  },
];

const performanceData = [
  { name: "Jan", "This Year": 4000, "Last Year": 2400 },
  { name: "Feb", "This Year": 3000, "Last Year": 1398 },
  { name: "Mar", "This Year": 5000, "Last Year": 9800 },
  { name: "Apr", "This Year": 4780, "Last Year": 3908 },
  { name: "May", "This Year": 5890, "Last Year": 4800 },
  { name: "Jun", "This Year": 4390, "Last Year": 3800 },
  { name: "Jul", "This Year": 5490, "Last Year": 4300 },
];

const DashboardCard: React.FC<CardProps> = ({
  icon: Icon,
  label,
  value,
  iconBgColor,
  iconTextColor,
}) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4 transition-transform hover:scale-105">
    <div className={`p-3 rounded-full ${iconBgColor}`}>
      <Icon className={`h-6 w-6 ${iconTextColor}`} />
    </div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome back, MT!</h1>
        <p className="text-gray-600">
          Here's what's happening with your project today.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {summaryCards.map((card) => (
          <DashboardCard key={card.label} {...card} />
        ))}
      </div>

      {/* Main Content Area */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Performance Overview
        </h2>

        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(5px)",
                  borderRadius: "0.5rem",
                }}
              />
              <Line
                type="monotone"
                dataKey="This Year"
                stroke="#4f39f6"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="Last Year"
                stroke="#d1d5dc"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
