import React from 'react';



const EventsTable = ({events}:{events:any}) => {

  console.log('events :>> ', events);
  const eventData = [...new Set(events)].map((e:any)=>{
    return {
      event:e.name,
      visitor:e.visitor.name,
      metadata:e.metadata,
      start_date:e.start_date
    }
  })
  
  return (
    <div className="bg-white rounded-lg shadow-sm  border-gray-200 overflow-auto">
      <div className="p-6">
        
          <table className="min-w-full divide-y divide-gray-200 border-2 border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visitor</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metadata</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created at</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {eventData.length > 0 && eventData.map((row: any, index: number) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.event}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.visitor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{JSON.stringify(row.metadata)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.start_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
   
   
  );
};

export default EventsTable;