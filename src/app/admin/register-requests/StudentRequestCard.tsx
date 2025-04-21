"use client";

import React from 'react';
import { Calendar, BookOpen, Mail, Briefcase, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';

// Define the request interface
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
  requested_at?: string;
}

interface StudentRequestCardProps {
  request: RegisterRequest;
  onApprove: () => void;
  onDeny: () => void;
}

export default function StudentRequestCard({
  request,
  onApprove,
  onDeny
}: StudentRequestCardProps) {
  // Format the date if available
  const formattedDate = request.requested_at
    ? new Date(request.requested_at).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    : null;

  // Get status badge styles and icon
  const getStatusBadge = () => {
    switch(request.status) {
      case 'pending':
        return {
          icon: <AlertCircle className="h-4 w-4" />,
          bgColor: 'bg-amber-100',
          textColor: 'text-amber-800',
          label: 'Pending'
        };
      case 'approved':
        return {
          icon: <CheckCircle2 className="h-4 w-4" />,
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          label: 'Approved'
        };
      case 'denied':
        return {
          icon: <XCircle className="h-4 w-4" />,
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
          label: 'Denied'
        };
      default:
        return {
          icon: <AlertCircle className="h-4 w-4" />,
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          label: request.status
        };
    }
  };

  const statusBadge = getStatusBadge();

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Header with name and status */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-900">{request.first_name} {request.last_name}</h3>
          <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${statusBadge.bgColor} ${statusBadge.textColor}`}>
            {statusBadge.icon}
            <span>{statusBadge.label}</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 font-medium">{request.reg_number}</p>
        {formattedDate && (
          <p className="text-xs text-gray-500 mt-1 flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            Requested: {formattedDate}
          </p>
        )}
      </div>

      {/* Details */}
      <div className="px-5 py-4 space-y-3">
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-800 break-all">{request.email}</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-800">Batch: {request.batch_year}</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-800">Branch: {request.branch}</span>
          </div>
        </div>

        {request.linkedin_url && (
          <div className="flex items-center gap-2 pt-1">
            <Briefcase className="h-4 w-4 text-gray-500" />
            <Link
              href={request.linkedin_url.startsWith('http') ? request.linkedin_url : `https://${request.linkedin_url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline break-all"
            >
              LinkedIn Profile
            </Link>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {request.status === 'pending' && (
        <div className="grid grid-cols-2 border-t border-gray-200 divide-x divide-gray-200">
          <button
            onClick={onApprove}
            className="py-3 flex items-center justify-center text-sm font-medium text-green-700 hover:bg-green-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-600"
          >
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Approve
          </button>
          <button
            onClick={onDeny}
            className="py-3 flex items-center justify-center text-sm font-medium text-red-700 hover:bg-red-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-600"
          >
            <XCircle className="h-4 w-4 mr-2" />
            Deny
          </button>
        </div>
      )}

      {request.status !== 'pending' && (
        <div className="p-3 text-center text-sm text-gray-600 border-t border-gray-200 bg-gray-50">
          This request has been {request.status} and cannot be modified
        </div>
      )}
    </div>
  );
}
