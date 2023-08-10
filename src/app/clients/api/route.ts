import { NextResponse } from 'next/server';

export type Client = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  requests: {
    id: string;
    status: string;
    desc: string;
    subjectId: string;
    clientId: string;
    teamId: string;
    assistantId: string;
    createdAt: string;
    updatedAt: string;
  }[];
};

export async function GET() {
  const res = await fetch('http://localhost:3333/clients', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();

  return NextResponse.json({ data });
}
