"use client"
import { useState } from "react";
import { createOrganizationAndSendInvite } from "@/actions/invitations";

export const OrganizationInvitation = () => {

  const [organizationName, setOrganizationName] = useState('');
  const [inviteeEmail, setInviteeEmail] = useState('');
  const [status, setStatus] = useState<{
    loading: boolean;
    message: string;
    error: boolean;
  }>({ loading: false, message: '', error: false });

  const handleSubmit = async () => {
    await createOrganizationAndSendInvite(organizationName, inviteeEmail);
    setStatus({
      loading: false,
      message: "yes",
      error: false
    })
  }

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <div className="space-y-2">
        <label htmlFor="orgName" className="block font-medium">
          Organization Name
        </label>
        <input
          id="orgName"
          type="text"
          value={organizationName}
          onChange={(e) => setOrganizationName(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          placeholder="Enter organization name"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="inviteeEmail" className="block font-medium">
          Invitee Email
        </label>
        <input
          id="inviteeEmail"
          type="email"
          value={inviteeEmail}
          onChange={(e) => setInviteeEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          placeholder="Enter invitee email"
          required
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={status.loading}
        className={`px-4 py-2 rounded text-white ${status.loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
      >
        {status.loading ? 'Sending...' : 'Create Organization & Send Invite'}
      </button>

      {status.message && (
        <p className={`mt-2 ${status.error ? 'text-red-500' : 'text-green-500'}`}>
          {status.message}
        </p>
      )}
    </div>
  );
}
