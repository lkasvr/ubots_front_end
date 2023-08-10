import { NextResponse } from 'next/server';

export type Team = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  subject: {
    id: string;
    name: string;
  };
  assistants: {
    id: string;
    name: string;
  }[];
  requests: {
    id: string;
    status: string;
    client: {
      id: string;
      name: string;
    };
    assistantId: string;
  }[];
};

export async function GET() {
  const res = await fetch('http://localhost:3333/teams', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();

  return NextResponse.json({ data });
}
