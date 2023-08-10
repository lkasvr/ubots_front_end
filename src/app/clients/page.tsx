'use client';
import React from 'react';

import { Client } from './api/route';

export default function Page() {
  const [clients, setClients] = React.useState<Client[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3000/clients/api');
        const json = await res.json();
        setClients(json.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      {clients.length > 0
        ? clients.map((client) => (
            <article
              key={client.id}
              className="rounded-xl border bg-orange-100 00 p-4 text-zinc-600 font-bold"
            >
              <div className="flex items-center gap-4">
                <img
                  alt="Developer"
                  src="https://images.unsplash.com/photo-1614644147724-2d4785d69962?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"
                  className="h-16 w-16 rounded-full object-cover"
                />

                <div>
                  Cliente:
                  <h3 className="text-lg font-medium text-zinc-500 ml-3">
                    {client.name}
                  </h3>
                </div>
              </div>

              <ul className="mt-4 space-y-2 overflow-y-auto">
                {client?.requests.length > 0
                  ? client.requests.map((request) => (
                      <li key={request.id}>
                        <div
                          className={`block h-full rounded-lg border p-4 hover:border-primary ${
                            request.status === 'CONCLUIDA'
                              ? 'border-green-400'
                              : 'text-zinc-600'
                          }`}
                        >
                          <strong
                            className={`font-medium ${
                              request.status === 'CONCLUIDA'
                                ? 'text-green-300'
                                : 'text-zinc-600'
                            }`}
                          >
                            {request.status}
                          </strong>

                          <ul>
                            <li className="p-1 leading-none">
                              <div
                                className={`text-[11px] font-medium  ${
                                  !request.assistantId
                                    ? 'text-orange-400 font-bold'
                                    : 'text-zinc-600'
                                }`}
                              >
                                {request.assistantId
                                  ? ''
                                  : 'Não possui assistente atribuído'}
                              </div>
                            </li>
                          </ul>

                          <p className="mt-1 text-xs font-medium text-zinc-600">
                            {request.desc}
                          </p>
                        </div>
                      </li>
                    ))
                  : 'No data'}
              </ul>
            </article>
          ))
        : 'No data'}
    </React.Fragment>
  );
}
