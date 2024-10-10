'use client';

import { useState } from 'react';

export default function ApiAccess() {
    const [apiKey, setApiKey] = useState('sk-XXXXXX'); // Simulated API Key
    const [quotaUsed, setQuotaUsed] = useState(120); // Example of API usage
    const [quotaLimit, setQuotaLimit] = useState(1000); // API call limit
    const [accessLevel, setAccessLevel] = useState('Read-Only'); // Default access level
    const [requestLogs, setRequestLogs] = useState<ApiLog[]>([]); // Correctly type the state
    const [keyExpiration, setKeyExpiration] = useState('2024-12-31'); // API Key Expiration
    const [alertsEnabled, setAlertsEnabled] = useState(false); // Alerts for usage
    const [keyName, setKeyName] = useState('Default Key'); // Key Name
    const [emailUsageReport, setEmailUsageReport] = useState(false); // Email Usage Reports

    // Feature 1: Regenerate API Key
    const regenerateKey = () => {
        const newKey = 'sk-NEWKEY1234';
        setApiKey(newKey);
        setKeyExpiration('2025-01-01');
        alert('API Key has been regenerated');
    };

    interface ApiLog {
        date: string;
        endpoint: string;
        status: number;
    }
    

    // Feature 2: Set Access Restrictions
    const setAccessRestrictions = (level: string) => {
        setAccessLevel(level);
    };

    // Feature 3: Set Key Name
    const updateKeyName = (name: string) => {
        setKeyName(name);
    };

    // Feature 4: Filter Request Logs by Date
    const filterRequestLogsByDate = (startDate: string, endDate: string) => {
        // Simulate log filtering by date
        const filteredLogs = requestLogs.filter(log => {
            const logDate = new Date(log.date);
            return logDate >= new Date(startDate) && logDate <= new Date(endDate);
        });
        setRequestLogs(filteredLogs);
    };

    // Feature 5: Enable Usage Alerts
    const toggleUsageAlerts = () => {
        setAlertsEnabled(!alertsEnabled);
    };

    // Feature 6: Email Usage Report
    const toggleEmailUsageReport = () => {
        setEmailUsageReport(!emailUsageReport);
    };

    // Feature 7: Delete API Key
    const deleteApiKey = () => {
        const confirmed = confirm('Are you sure you want to delete this API key?');
        if (confirmed) {
            setApiKey('');
            alert('API Key deleted.');
        }
    };

    

    // Feature 8: Request Logs (Simulated)
    const addRequestLog = () => {
        const newLog = {
            date: new Date().toISOString(),
            endpoint: '/get-data',
            status: 200,
        };
        setRequestLogs([...requestLogs, newLog]);
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold mb-4">API Access</h2>

            {/* API Key Management */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold">API Key Management</h3>
                <div className="border border-gray-100 p-4 rounded-lg">
                    <p><span className="font-bold">Key Name:</span> {keyName}</p>
                    <p><span className="font-bold">Current API Key:</span> {apiKey}</p>
                    <p><span className="font-bold">Expires on:</span> {keyExpiration}</p>
                    <input 
                        type="text" 
                        placeholder="Update Key Name" 
                        className="border p-2 mt-2 w-full bg-transparent"
                        onChange={(e) => updateKeyName(e.target.value)}
                    />
                    <button 
                        onClick={regenerateKey}
                        className="mt-4 px-4 py-2 bg-white text-black rounded-lg"
                    >
                        Regenerate API Key
                    </button>
                    <button 
                        onClick={deleteApiKey}
                        className="ml-4 mt-4 px-4 py-2 bg-white text-black rounded-lg"
                    >
                        Delete API Key
                    </button>
                </div>
            </div>

            {/* API Usage Overview */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold">API Usage Overview</h3>
                <div className="border border-gray-100 p-4 rounded-lg">
                    <p><span className="font-bold">API Calls Used:</span> {quotaUsed}/{quotaLimit}</p>
                    <progress className="w-full" value={quotaUsed} max={quotaLimit}></progress>
                    <p className="mt-4"><span className="font-bold">Set Alerts:</span> 
                        <input 
                            type="checkbox" 
                            className="ml-2" 
                            checked={alertsEnabled} 
                            onChange={toggleUsageAlerts} 
                        />
                    </p>
                    <p><span className="font-bold">Email Usage Report:</span> 
                        <input 
                            type="checkbox" 
                            className="ml-2" 
                            checked={emailUsageReport} 
                            onChange={toggleEmailUsageReport} 
                        />
                    </p>
                </div>
            </div>

            {/* API Access Restrictions */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold">Access Restrictions</h3>
                <div className="border border-gray-100 p-4 rounded-lg">
                    <p><span className="font-bold">Access Level:</span> {accessLevel}</p>
                    <div className="mt-4">
                        <button 
                            onClick={() => setAccessRestrictions('Read-Only')} 
                            className={`px-4 py-2 mr-2 ${accessLevel === 'Read-Only' ? 'bg-white text-black' : 'bg-gray-800'} rounded-lg`}
                        >
                            Read-Only
                        </button>
                        <button 
                            onClick={() => setAccessRestrictions('Full Access')} 
                            className={`px-4 py-2 ${accessLevel === 'Full Access' ? 'bg-white text-black' : 'bg-gray-800'} rounded-lg`}
                        >
                            Full Access
                        </button>
                    </div>
                </div>
            </div>

            {/* API Request Logs */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold">API Request Logs</h3>
                <div className="border border-gray-100 p-4 rounded-lg">
                    <p><span className="font-bold">Recent Logs:</span></p>
                    <button 
                        onClick={addRequestLog} 
                        className="mt-2 px-4 py-2 bg-white text-black rounded-lg"
                    >
                        Simulate API Request
                    </button>
                    <ul className="mt-4">
                        {requestLogs.length === 0 ? (
                            <li>No logs available</li>
                        ) : (
                            requestLogs.map((log, idx) => (
                                <li key={idx} className="p-2 border-b">
                                    <p><span className="font-bold">Date:</span> {log.date}</p>
                                    <p><span className="font-bold">Endpoint:</span> {log.endpoint}</p>
                                    <p><span className="font-bold">Status:</span> {log.status}</p>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>

            {/* API Documentation */}
            <div>
                <h3 className="text-xl font-semibold">API Documentation</h3>
                <p className="text-blue-500 underline">
                    <a href="/api-docs" target="_blank" rel="noopener noreferrer">
                        View API Documentation
                    </a>
                </p>
            </div>
        </div>
    );
}
