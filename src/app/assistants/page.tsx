'use client';
import React from 'react';

import { Assistant } from './api/route';

export default function Page() {
  const [assistants, setAssistants] = React.useState<Assistant[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3000/assistants/api');
        const json = await res.json();
        setAssistants(json.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      {assistants.length > 0
        ? assistants.map((assistant) => (
            <article
              key={assistant.id}
              className="rounded-xl border bg-zinc-600 p-4"
            >
              <div className="flex items-center gap-4">
                <img
                  alt="Developer"
                  src="https://images.unsplash.com/photo-1614644147724-2d4785d69962?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"
                  className="h-16 w-16 rounded-full object-cover"
                />

                <div>
                  <h3 className="text-lg font-medium text-white">
                    {assistant.name}
                  </h3>

                  <div className="flow-root">
                    <ul className="-m-1 flex flex-wrap">
                      <li className="p-1 leading-none">
                        <a
                          href="#"
                          className="text-xs font-medium text-gray-300"
                        >
                          {' '}
                          Team{' '}
                        </a>
                      </li>

                      <li className="p-1 leading-none">
                        <a href="#" className="text-xs font-bold text-gray-300">
                          {' '}
                          {assistant?.team?.name}{' '}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <ul className="mt-4 space-y-2 overflow-y-auto">
                {assistant?.requests.length > 0
                  ? assistant.requests.map((request) => (
                      <li key={request.id}>
                        <a
                          href="#"
                          className={`block h-full rounded-lg border p-4 hover:border-pink-600 ${
                            request.status === 'CONCLUIDA'
                              ? 'border-green-400'
                              : 'border-white'
                          }`}
                        >
                          <strong
                            className={`font-medium ${
                              request.status === 'CONCLUIDA'
                                ? 'text-green-300'
                                : 'text-white'
                            }`}
                          >
                            {request.status}
                          </strong>

                          <ul>
                            <li className="p-1 leading-none">
                              <a
                                href="#"
                                className="text-xs font-bold text-gray-300"
                              >
                                {request.subject.name}
                              </a>
                            </li>
                          </ul>

                          <p className="mt-1 text-xs font-medium text-gray-300">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Maxime consequuntur deleniti, unde ab ut in!
                          </p>
                        </a>
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