import React from 'react';

const eventData = [
  { event: 'Track', visitor: '37d272f6-877b-47c6-98e5-5156f', metadata: '{}', createdAt: '9/15/2024, 5:08:56 PM' },
  { event: 'Page', visitor: 'e7ef515a-7a5b-4949-9f28-8ae34', metadata: '{"page_url": "https://withsurface.com/page-1"}', createdAt: '9/15/2024, 5:09:35 PM' },
  { event: 'Identity', visitor: '42d467c8-3bd1-4519-9ae6-bfb0f', metadata: '{"user_id": "42d467c8-3bd1-4519-9ae6-bfb00adcc01c"}', createdAt: '9/15/2024, 5:12:19 PM' },
  { event: 'Click', visitor: 'aa731c78-c4e0-4e4f-b515-65259', metadata: '{"element_id": "button-element"}', createdAt: '9/15/2024, 5:17:35 PM' },
];

const EventsTable = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm  border-gray-200 overflow-hidden">
      <div className="p-6">
        
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visitor</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metadata</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created at</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {eventData.map((row, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.event}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.visitor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.metadata}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
   
   
  );
};

export default EventsTable;