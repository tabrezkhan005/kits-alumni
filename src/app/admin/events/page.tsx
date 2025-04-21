"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { CalendarIcon, PlusIcon, ClockIcon, MapPinIcon, UserGroupIcon } from "@heroicons/react/24/outline";

// Mock data for events
const events = [
  {
    id: 1,
    title: "Annual Tech Symposium",
    date: "2023-06-15",
    time: "9:00 AM - 5:00 PM",
    location: "Main Auditorium",
    attendees: 150,
    status: "upcoming",
    description: "Annual technology conference featuring industry speakers, workshops, and networking opportunities.",
    image: "/img/aiquest.jpg",
  },
  {
    id: 2,
    title: "AI Workshop Series",
    date: "2023-05-20",
    time: "10:00 AM - 2:00 PM",
    location: "Computer Lab 2",
    attendees: 75,
    status: "upcoming",
    description: "Hands-on workshop covering the latest techniques in artificial intelligence and machine learning.",
    image: "/img/conference.jpg",
  },
  {
    id: 3,
    title: "Alumni Networking Event",
    date: "2023-04-10",
    time: "6:00 PM - 9:00 PM",
    location: "Student Center",
    attendees: 120,
    status: "completed",
    description: "Connect current students with successful alumni for mentorship and career guidance.",
    image: "/img/eliteanniversary.jpg",
  },
];

export default function EventsOrganizing() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Event Organizing</h1>
          <p className="text-gray-500 mt-2">
            Create and manage college events
          </p>
        </div>
        <button className="px-4 py-2 bg-burgundy text-white rounded-lg hover:bg-burgundy/90 transition-colors">
          <PlusIcon className="h-5 w-5 inline-block mr-2" />
          Create Event
        </button>
      </div>

      {/* Calendar View */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Schedule</CardTitle>
          <CardDescription>View and manage your event timeline</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-7 gap-2 text-center mb-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="font-medium text-sm text-gray-500">{day}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 35 }).map((_, i) => {
              const day = i + 1;
              const hasEvent = events.some(event => {
                const eventDate = new Date(event.date);
                return eventDate.getDate() === (day % 30);
              });

              return (
                <div
                  key={i}
                  className={`h-12 flex items-center justify-center text-sm rounded-md border ${
                    hasEvent
                      ? "bg-burgundy/10 border-burgundy/30 font-medium"
                      : "border-gray-200"
                  }`}
                >
                  {day % 31 === 0 ? 31 : day % 31}
                  {hasEvent && <div className="w-1.5 h-1.5 bg-burgundy rounded-full absolute -mt-6"></div>}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Events List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Card key={event.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative h-48 w-full">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 right-2">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                  event.status === "upcoming"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}>
                  {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                </span>
              </div>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{event.title}</CardTitle>
              <CardDescription className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-1 text-gray-500" />
                {event.date}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <ClockIcon className="h-4 w-4 mr-2 text-gray-500" />
                  {event.time}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPinIcon className="h-4 w-4 mr-2 text-gray-500" />
                  {event.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <UserGroupIcon className="h-4 w-4 mr-2 text-gray-500" />
                  {event.attendees} Attendees
                </div>
              </div>
              <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
              <div className="mt-4 flex justify-between">
                <button className="text-xs text-burgundy font-medium hover:underline">
                  View Details
                </button>
                <button className="text-xs text-burgundy font-medium hover:underline">
                  Edit Event
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
