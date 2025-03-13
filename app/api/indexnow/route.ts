import type { NextApiRequest, NextApiResponse } from 'next';

const INDEXNOW_KEY = 'c52e67d9ca3f454c889360e666a22b6c'; // Replace with your IndexNow key
const HOST = 'bakingsubs.com'; // Your domain name
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`; // URL where your key file is hosted
const SITEMAP_URL = `https://${HOST}/sitemap.xml`; // Your sitemap URL

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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const urls = await fetchSitemapUrls();
  if (!urls.length) {
    return res.status(400).json({ message: 'No URLs found in sitemap' });
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
    return res.status(response.ok ? 200 : response.status).json({
      message: response.ok ? 'IndexNow request successful' : 'IndexNow request failed',
      responseData,
    });
  } catch (error) {
    console.error('IndexNow API Error:', error);
    return res.status(500).json({ message: 'Error sending request', error });
  }
}
