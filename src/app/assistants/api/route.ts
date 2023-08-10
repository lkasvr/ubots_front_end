import { NextResponse } from 'next/server';

export type Assistant = {
  id: string;
  name: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
  team: {
    name: string;
  };
  requests: {
    id: string;
    status: string;
    subject: {
      id: string;
      name: string;
    };
    client: {
      id: string;
      name: string;
    };
  }[];
};

export async function GET() {
  const res = await fetch('http://localhost:3333/assistants', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();

  return NextResponse.json({ data });
}
