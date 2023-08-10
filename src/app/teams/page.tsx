'use client';
import React from 'react';

import { Team } from './api/route';

export default function Page() {
  const [teams, setTeams] = React.useState<Team[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3000/teams/api');
        const json = await res.json();
        setTeams(json.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      {teams.length > 0
        ? teams.map((team) => (
            <article
              key={team.id}
              className="hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl"
            >
              <div className="rounded-[10px] bg-white p-4 !pt-20 sm:p-6">
                <time
                  dateTime="2022-10-10"
                  className="block text-xs text-gray-500"
                >
                  TIME
                </time>

                <a href="#">
                  <h3 className="mt-0.5 text-lg font-medium text-gray-900">
                    {team.name}
                  </h3>
                </a>

                <div className="mt-4 flex flex-wrap gap-1">
                  <span className="whitespace-nowrap rounded-full bg-purple-200 px-2.5 py-0.5 text-xs text-purple-600">
                    {team.subject.name}
                  </span>

                  <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
                    Assistentes designados: <b>{team.assistants.length}</b>
                  </span>
                  <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
                    Total de solicitações: <b>{team.requests.length}</b>
                  </span>
                </div>
              </div>
            </article>
          ))
        : 'No data'}
    </React.Fragment>
  );
}
