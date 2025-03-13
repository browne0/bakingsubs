import { NextResponse } from 'next/server';

const INDEXNOW_KEY = process.env.INDEXNOW_KEY;
const HOST = 'www.bakingsubs.com';
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;

async function fetchSitemapUrls() {
  try {
    console.log('Fetching sitemap from:', SITEMAP_URL);
    const response = await fetch(SITEMAP_URL);
    if (!response.ok) {
      console.error('Sitemap fetch failed:', response.status);
      return [];
    }
    const text = await response.text();
    const urls = [...text.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
    console.log('Found URLs:', urls);
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
