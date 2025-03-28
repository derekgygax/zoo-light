"use client"


import { useState } from "react";

interface CreateOrganizationProps {
  createOrganization: (organizationName: string) => Promise<{
    success: boolean,
    organizationId: string,
    organizationName: string,
    message: string
  }>;
}

export const CreateOrganization = ({ createOrganization }: CreateOrganizationProps) => {

  const [organizationName, setOrganizationName] = useState('');
  const [status, setStatus] = useState<{
    loading: boolean;
    message: string;
    error: boolean;
  }>({ loading: false, message: '', error: false });

  const handleSubmit = async () => {
    await createOrganization(organizationName);
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

      <button
        onClick={handleSubmit}
        disabled={status.loading}
        className={`px-4 py-2 rounded text-white ${status.loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
      >
        {status.loading ? 'Sending...' : 'Create Organization'}
      </button>

      {status.message && (
        <p className={`mt-2 ${status.error ? 'text-red-500' : 'text-green-500'}`}>
          {status.message}
        </p>
      )}
    </div>
  );
}
