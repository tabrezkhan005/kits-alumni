"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { QuestionMarkCircleIcon, ChatBubbleLeftRightIcon, CheckCircleIcon, MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/24/outline";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

// Interface for query data
interface Query {
  id: number;
  name: string;
  email: string;
  subject: string;
  category: string;
  message: string;
  priority: string;
  status: string;
  created_at: string;
}

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  let color = "bg-gray-100 text-gray-800";

  if (status === "pending") {
    color = "bg-blue-100 text-blue-800 font-bold";
  } else if (status === "in-progress") {
    color = "bg-yellow-100 text-yellow-800 font-bold";
  } else if (status === "resolved") {
    color = "bg-green-100 text-green-800 font-bold";
  }

  const displayStatus = status === "pending" ? "Open" :
                        status === "in-progress" ? "In Progress" :
                        status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-base font-medium ${color}`}>
      {displayStatus}
    </span>
  );
};

// Priority badge component
const PriorityBadge = ({ priority }: { priority: string }) => {
  let color = "bg-gray-100 text-gray-800";

  if (priority === "high") {
    color = "bg-red-100 text-red-800";
  } else if (priority === "medium") {
    color = "bg-yellow-100 text-yellow-800";
  } else if (priority === "low") {
    color = "bg-green-100 text-green-800";
  }

  return (
    <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-base font-medium ${color}`}>
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  );
};

// Priority dropdown component
const PriorityDropdown = ({ id, currentPriority, onUpdate }: { id: number; currentPriority: string; onUpdate: () => void }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const updatePriority = async (priority: string) => {
    if (currentPriority === priority) return;

    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('queries')
        .update({ priority })
        .eq('id', id);

      if (error) throw error;

      toast.success(`Priority updated to ${priority}`);
      onUpdate();
    } catch (error) {
      console.error("Error updating priority:", error);
      toast.error("Failed to update priority");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="relative inline-block">
      <select
        className="block w-full px-3 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-burgundy focus:border-burgundy bg-white cursor-pointer"
        value={currentPriority}
        onChange={(e) => updatePriority(e.target.value)}
        disabled={isUpdating}
      >
        <option value="low" className="bg-green-100 text-green-800">Low</option>
        <option value="medium" className="bg-yellow-100 text-yellow-800">Medium</option>
        <option value="high" className="bg-red-100 text-red-800">High</option>
      </select>
    </div>
  );
};

export default function Queries() {
  const [queries, setQueries] = useState<Query[]>([]);
  const [filteredQueries, setFilteredQueries] = useState<Query[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, open: 0, resolved: 0 });
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  // Function to fetch queries from Supabase
  const fetchQueries = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('queries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setQueries(data || []);
      setFilteredQueries(data || []);

      // Calculate stats
      const total = data?.length || 0;
      const open = data?.filter(q => q.status === 'pending').length || 0;
      const resolved = data?.filter(q => q.status === 'resolved').length || 0;

      setStats({ total, open, resolved });
    } catch (error) {
      console.error("Error fetching queries:", error);
      toast.error("Failed to load queries");
    } finally {
      setLoading(false);
    }
  };

  // Apply filters
  useEffect(() => {
    if (!queries.length) return;

    let filtered = [...queries];

    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(q =>
        q.subject.toLowerCase().includes(term) ||
        q.message.toLowerCase().includes(term) ||
        q.name.toLowerCase().includes(term) ||
        q.email.toLowerCase().includes(term) ||
        q.category.toLowerCase().includes(term)
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(q => q.status === statusFilter);
    }

    // Apply priority filter
    if (priorityFilter !== "all") {
      filtered = filtered.filter(q => q.priority === priorityFilter);
    }

    setFilteredQueries(filtered);
  }, [searchTerm, statusFilter, priorityFilter, queries]);

  // Function to mark a query as resolved
  const markAsResolved = async (id: number) => {
    try {
      const { error } = await supabase
        .from('queries')
        .update({ status: 'resolved' })
        .eq('id', id);

      if (error) throw error;

      toast.success("Query marked as resolved");
      fetchQueries();
    } catch (error) {
      console.error("Error resolving query:", error);
      toast.error("Failed to resolve query");
    }
  };

  // Function to mark a query as in-progress
  const markAsInProgress = async (id: number) => {
    try {
      const { error } = await supabase
        .from('queries')
        .update({ status: 'in-progress' })
        .eq('id', id);

      if (error) throw error;

      toast.success("Query marked as in progress");
      fetchQueries();
    } catch (error) {
      console.error("Error updating query status:", error);
      toast.error("Failed to update query status");
    }
  };

  // Fetch queries on component mount
  useEffect(() => {
    fetchQueries();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center flex-wrap gap-4">
        {/* Left side - Title */}
        <div className="flex-shrink-0 w-full sm:w-auto">
          <h1 className="text-4xl font-bold tracking-tight">Student Queries</h1>
          <p className="text-gray-500 mt-1">
            {filteredQueries.length} {filteredQueries.length === 1 ? 'query' : 'queries'} found
          </p>
        </div>

        {/* Middle - Search bar */}
        <div className="relative flex-grow max-w-xl">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-burgundy focus:border-burgundy"
            placeholder="Search queries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Right side - Filters and Refresh button */}
        <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
          <select
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-burgundy focus:border-burgundy"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>

          <select
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-burgundy focus:border-burgundy"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <button
            onClick={fetchQueries}
            className="px-4 py-2 bg-burgundy text-white rounded-md text-base font-bold shadow-md transition-all duration-300 hover:bg-burgundy/90 hover:shadow-lg hover:translate-y-[-2px]"
            disabled={loading}
          >
            {loading ? "Loading..." : "Refresh"}
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-md">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base font-bold text-gray-500">Total Queries</p>
                <h3 className="text-3xl font-bold mt-1">{stats.total}</h3>
              </div>
              <QuestionMarkCircleIcon className="h-8 w-8 text-burgundy opacity-80" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base font-bold text-gray-500">Open</p>
                <h3 className="text-3xl font-bold mt-1">{stats.open}</h3>
              </div>
              <ChatBubbleLeftRightIcon className="h-8 w-8 text-blue-500 opacity-80" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base font-bold text-gray-500">Resolved</p>
                <h3 className="text-3xl font-bold mt-1">{stats.resolved}</h3>
              </div>
              <CheckCircleIcon className="h-8 w-8 text-green-500 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Queries List */}
      <Card className="shadow-md">
        <CardContent className="p-5">
          {loading ? (
            <div className="text-center py-6">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-burgundy mx-auto"></div>
              <p className="mt-3 text-base text-gray-600">Loading queries...</p>
            </div>
          ) : filteredQueries.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-base text-gray-600">No queries found matching your filters</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredQueries.map((query) => (
                <div key={query.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
                  <div className="flex flex-col md:flex-row md:items-start justify-between mb-3 gap-3">
                    <div className="flex items-center">
                      <div className="relative h-10 w-10 mr-3 overflow-hidden rounded-full bg-gray-100">
                        <Image
                          src="/img/default-avatar.png"
                          alt={query.name}
                          width={40}
                          height={40}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-gray-800">{query.subject}</h4>
                        <div className="flex items-center text-sm text-gray-500">
                          <span>{query.name}</span>
                          <span className="mx-2">•</span>
                          <span>{new Date(query.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          <span>{query.email}</span>
                          <span className="mx-2">•</span>
                          <span>Category: {query.category}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <StatusBadge status={query.status} />
                      <div className="w-32">
                        <PriorityDropdown
                          id={query.id}
                          currentPriority={query.priority}
                          onUpdate={fetchQueries}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-start gap-3 mt-2">
                    <div className="p-2 bg-gray-50 rounded-md text-sm text-gray-600 flex-grow max-w-[70%]">
                      {query.message}
                    </div>

                    <div className="flex flex-col space-y-2">
                      {query.status !== "resolved" && (
                        <>
                          {query.status === "pending" && (
                            <button
                              onClick={() => markAsInProgress(query.id)}
                              className="px-4 py-2 text-base bg-yellow-500 text-white rounded-md font-bold shadow-md transition-all duration-300 hover:bg-yellow-600 hover:shadow-lg hover:translate-y-[-2px]"
                            >
                              Mark In Progress
                            </button>
                          )}
                          <button
                            onClick={() => markAsResolved(query.id)}
                            className="px-4 py-2 text-base bg-green-500 text-white rounded-md font-bold shadow-md transition-all duration-300 hover:bg-green-600 hover:shadow-lg hover:translate-y-[-2px]"
                          >
                            Mark Resolved
                          </button>
                          <button
                            className="px-4 py-2 text-base bg-burgundy text-white rounded-md font-bold shadow-md transition-all duration-300 hover:bg-burgundy/90 hover:shadow-lg hover:translate-y-[-2px]"
                          >
                            Reply
                          </button>
                        </>
                      )}
                      {query.status === "resolved" && (
                        <button
                          className="px-4 py-2 text-base bg-burgundy text-white rounded-md font-bold shadow-md transition-all duration-300 hover:bg-burgundy/90 hover:shadow-lg hover:translate-y-[-2px]"
                        >
                          Reply
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
