import { NextResponse } from 'next/server';

export type Client = {
  id: string;
  status: string;
  desc: string;
  subjectId: string;
  clientId: string;
  teamId: string;
  assistantId: string;
  createdAt: string;
  updatedAt: string;
  client: {
    name: string;
    email: string;
  };
  team: {
    name: string;
  };
};

export async function GET() {
  const res = await fetch('http://localhost:3333/requests', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();

  return NextResponse.json({ data });
}
