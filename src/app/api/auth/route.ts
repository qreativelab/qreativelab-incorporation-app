import { NextRequest, NextResponse } from 'next/server';

const VALID_PASSWORD = '@LoMax@$0204@$Showinc';
const AUTH_COOKIE_NAME = 'qreativelab-inc-auth';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (password === VALID_PASSWORD) {
      const response = NextResponse.json({ success: true });

      // Set auth cookie for 7 days
      response.cookies.set(AUTH_COOKIE_NAME, 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });

      return response;
    }

    return NextResponse.json({ success: false, error: 'Invalid password' }, { status: 401 });
  } catch {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
