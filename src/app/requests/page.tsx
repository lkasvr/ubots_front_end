'use client';
import React from 'react';

import { Request } from './api/route';

export default function Page() {
  const [requests, setRequests] = React.useState<Request[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3000/requests/api');
        const json = await res.json();
        setRequests(json.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <button className="group relative inline-block text-sm font-bold text-white focus:outline-none focus:ring">
        <span className="absolute inset-0 border border-primary group-active:border-red-500"></span>
        <span className="block border border-primary bg-primary px-12 py-3 transition-transform active:border-red-500 active:bg-red-500 group-hover:-translate-x-1 group-hover:-translate-y-1">
          Nova Solicitação
        </span>
      </button>

      {requests.length > 0
        ? requests.map((request) => (
            <a
              key={request.id}
              className="relative block overflow-hidden rounded-lg border border-gray-200 p-4 sm:p-6 lg:p-8"
            >
              <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

              <div className="sm:flex sm:justify-between sm:gap-4">
                <div>
                  <h3
                    className={`text-lg font-bold sm:text-xl ${
                      request.status === 'CONCLUIDA'
                        ? 'text-green-400'
                        : 'text-gray-900'
                    }`}
                  >
                    {request.status}
                  </h3>

                  <p className="mt-1 text-xs font-medium text-gray-600">
                    Cliente Solicitante:{' '}
                    <span className="font-bold">{request.client.name}</span>
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <p className="font-bold text-gray-900">Descrição</p>
                <p className="max-w-[40ch] text-sm text-gray-500">
                  {request.desc}
                </p>
              </div>

              <dl className="mt-6 flex gap-4 sm:gap-6">
                <div className="flex flex-col-reverse">
                  <dt className="text-sm font-medium text-gray-600">Criada</dt>
                  <dd className="text-xs text-gray-500">
                    {new Date(request.createdAt).toLocaleString()}
                  </dd>
                </div>

                <div className="flex flex-col-reverse">
                  <dt className="text-sm font-medium text-gray-600">
                    Atualizada
                  </dt>
                  <dd className="text-xs text-gray-500">
                    {new Date(request.updatedAt).toLocaleString()}
                  </dd>
                </div>
              </dl>
            </a>
          ))
        : 'No data'}
    </React.Fragment>
  );
}
