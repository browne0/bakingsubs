import { NextResponse } from 'next/server';

const INDEXNOW_KEY = process.env.INDEXNOW_KEY;
const HOST = process.env.NEXT_PUBLIC_BASE_URL || 'https://bakingsubs.com';
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;

async function fetchSitemapUrls() {
  try {
    const response = await fetch(SITEMAP_URL);
    const text = await response.text();

    // Extract URLs from the sitemap XML
    const urls = [...text.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);

    return urls;
  } catch (error) {
    console.error('Error fetching sitemap:', error);
    return [];
  }
}

export async function POST() {
  const urls = await fetchSitemapUrls();
  if (!urls.length) {
    return NextResponse.json({ message: 'No URLs found in sitemap' }, { status: 400 });
  }

  const requestBody = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const responseData = await response.json();
    return NextResponse.json(
      {
        message: response.ok ? 'IndexNow request successful' : 'IndexNow request failed',
        responseData,
      },
      { status: response.ok ? 200 : response.status }
    );
  } catch (error) {
    console.error('IndexNow API Error:', error);
    return NextResponse.json({ message: 'Error sending request', error }, { status: 500 });
  }
}
