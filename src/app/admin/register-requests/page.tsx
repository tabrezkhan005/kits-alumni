"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import StudentRequestCard from "@/app/admin/register-requests/StudentRequestCard";
import { Search, RefreshCw, Filter, User, CheckCircle, XCircle, Clock } from "lucide-react";

// Define the student registration request type
interface RegisterRequest {
  id: string;
  first_name: string;
  last_name: string;
  reg_number: string;
  batch_year: string;
  branch: string;
  email: string;
  status: 'pending' | 'approved' | 'denied';
  linkedin_url?: string;
}

export default function RegisterRequestsPage() {
  const [requests, setRequests] = useState<RegisterRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<RegisterRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'denied'>('all');
  const [branchFilter, setBranchFilter] = useState('all');
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    denied: 0
  });

  // Apply filters
  useEffect(() => {
    if (!requests.length) return;

    let filtered = [...requests];

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(request => request.status === statusFilter);
    }

    // Apply branch filter
    if (branchFilter !== 'all') {
      filtered = filtered.filter(request => request.branch === branchFilter);
    }

    // Apply search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        request =>
          request.first_name.toLowerCase().includes(term) ||
          request.last_name.toLowerCase().includes(term) ||
          request.email.toLowerCase().includes(term) ||
          request.reg_number.toLowerCase().includes(term)
      );
    }

    setFilteredRequests(filtered);
  }, [requests, statusFilter, branchFilter, searchTerm]);

  // Update stats when requests change
  useEffect(() => {
    if (!requests.length) return;

    const total = requests.length;
    const pending = requests.filter(req => req.status === 'pending').length;
    const approved = requests.filter(req => req.status === 'approved').length;
    const denied = requests.filter(req => req.status === 'denied').length;

    setStats({ total, pending, approved, denied });
  }, [requests]);

  // Fetch all registration requests
  const fetchRequests = async () => {
    try {
      setLoading(true);

      let data: RegisterRequest[] | null = null;
      let error: any = null;

      try {
        // First try using the RPC function that bypasses RLS
        const response = await supabase
          .rpc('admin_get_all_register_requests');

        data = response.data;
        error = response.error;

        if (error) {
          throw error;
        }
      } catch (rpcError) {
        // If RPC fails, try direct query as fallback
        const response = await supabase
          .from('register_requests')
          .select('*');

        data = response.data;
        error = response.error;

        if (error) {
          throw error;
        }
      }

      // Log success for debugging purposes only
      console.log('Fetched requests:', data?.length || 0);

      setRequests(data || []);
      setFilteredRequests(data || []);
    } catch (err: any) {
      console.error('Error fetching registration requests:', err);
      setError(err.message || 'Failed to load registration requests');
    } finally {
      setLoading(false);
    }
  };

  // Handle status update
  const handleStatusUpdate = async (id: string, newStatus: 'approved' | 'denied') => {
    try {
      // First try the RPC function
      let updateSuccessful = false;
      let finalError = null;

      // Try using RPC function
      try {
        const { data: rpcData, error: rpcError } = await supabase
          .rpc('admin_update_request_status', {
            request_id: id,
            new_status: newStatus
          });

        if (rpcError) {
          finalError = rpcError;
        } else {
          updateSuccessful = true;
        }
      } catch (rpcErr) {
        finalError = rpcErr;
      }

      // If RPC didn't work, try direct update
      if (!updateSuccessful) {
        try {
          const { error: directError } = await supabase
            .from('register_requests')
            .update({ status: newStatus })
            .eq('id', id);

          if (directError) {
            finalError = directError;
          } else {
            updateSuccessful = true;
          }
        } catch (directErr) {
          if (!finalError) finalError = directErr;
        }
      }

      // Verify the update was successful
      try {
        const { data: verifyData, error: verifyError } = await supabase
          .from('register_requests')
          .select('status')
          .eq('id', id)
          .single();

        if (!verifyError && verifyData) {
          if (verifyData.status === newStatus) {
            updateSuccessful = true;
          } else {
            updateSuccessful = false;
            console.warn(`Database status (${verifyData?.status}) does not match requested status (${newStatus})`);
          }
        }
      } catch (verifyErr) {
        console.error('Verification error:', verifyErr);
      }

      if (!updateSuccessful) {
        if (finalError) throw finalError;
        throw new Error("Update failed for unknown reasons");
      }

      // Update the local state
      setRequests(prev =>
        prev.map(request =>
          request.id === id
            ? { ...request, status: newStatus }
            : request
        )
      );
    } catch (err: any) {
      console.error('Error updating status:', err);
      setError(err.message || 'Failed to update status');
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchRequests();
  }, []);

  // Get unique branches for filter
  const branches = ['all', ...new Set(requests.map(req => req.branch))];

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Registration Requests</h1>
        <button
          onClick={fetchRequests}
          className="flex items-center justify-center px-4 py-2 bg-burgundy text-white rounded-md hover:bg-burgundy/90 transition-colors shadow-md"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
            <User className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Requests</p>
            <p className="text-2xl font-semibold">{stats.total}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
            <Clock className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Pending</p>
            <p className="text-2xl font-semibold">{stats.pending}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Approved</p>
            <p className="text-2xl font-semibold">{stats.approved}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
            <XCircle className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Denied</p>
            <p className="text-2xl font-semibold">{stats.denied}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name, email, or registration number"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy focus:border-burgundy"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex space-x-2">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Filter className="h-4 w-4 text-gray-400" />
            </div>
            <select
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy focus:border-burgundy bg-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="denied">Denied</option>
            </select>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Filter className="h-4 w-4 text-gray-400" />
            </div>
            <select
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-burgundy focus:border-burgundy bg-white"
              value={branchFilter}
              onChange={(e) => setBranchFilter(e.target.value)}
            >
              <option value="all">All Branches</option>
              {branches.filter(b => b !== 'all').map(branch => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-burgundy border-t-transparent"></div>
        </div>
      ) : error ? (
        <div className="rounded-md bg-red-50 p-4 my-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="text-sm text-red-700">{error}</div>
            </div>
          </div>
        </div>
      ) : filteredRequests.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <h3 className="mt-2 text-lg font-semibold text-gray-900">No registration requests found</h3>
          <p className="mt-1 text-gray-500">
            {searchTerm || statusFilter !== 'all' || branchFilter !== 'all'
              ? "No requests match your current filters"
              : "There are no registration requests at this time"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRequests.map((request) => (
            <StudentRequestCard
              key={request.id}
              request={request}
              onApprove={() => handleStatusUpdate(request.id, 'approved')}
              onDeny={() => handleStatusUpdate(request.id, 'denied')}
            />
          ))}
        </div>
      )}
    </div>
  );
}
