import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const GHOST_ADMIN_API_KEY = process.env.GHOST_ADMIN_API_KEY;
const GHOST_API_URL = process.env.GHOST_URL;

if (!GHOST_ADMIN_API_KEY || !GHOST_API_URL) {
  throw new Error('Ghost Admin API credentials not found');
}

function generateToken() {
  const adminKey = GHOST_ADMIN_API_KEY as string;
  const [id, secret] = adminKey.split(':');

  return jwt.sign({}, Buffer.from(secret, 'hex'), {
    keyid: id,
    algorithm: 'HS256',
    expiresIn: '5m',
    audience: '/admin/',
  });
}

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    // Generate JWT token for authentication
    const token = generateToken();

    const response = await fetch(`${GHOST_API_URL}/ghost/api/admin/members`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Ghost ${token}`,
      },
      body: JSON.stringify({
        members: [
          {
            name,
            email,
            subscribed: true,
            labels: ['website-signup'],
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: error.errors?.[0]?.message || 'Failed to subscribe' },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter',
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json({ error: 'Failed to subscribe to newsletter' }, { status: 500 });
  }
}
