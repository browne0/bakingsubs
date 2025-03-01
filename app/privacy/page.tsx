import { ogImage } from '@/lib/metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for BakingSubs - Your trusted baking substitution resource',
  openGraph: {
    title: 'Privacy Policy - BakingSubs',
    description: 'Privacy Policy for BakingSubs - Your trusted baking substitution resource',
    ...ogImage,
  },
};

export default function PrivacyPolicy() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>

      <div className="space-y-8 text-gray-700 dark:text-gray-300">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="mb-4">
            At BakingSubs, we take your privacy seriously. This Privacy Policy explains how we
            collect, use, and protect your personal information when you use our website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <p className="mb-4">We collect information that you provide directly to us, including:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Email address (if you subscribe to our newsletter)</li>
            <li>User preferences and settings</li>
            <li>Comments and feedback you provide</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <p className="mb-4">We use the collected information to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Provide and improve our services</li>
            <li>Send newsletters and updates (if subscribed)</li>
            <li>Respond to your comments and questions</li>
            <li>Analyze website usage to improve user experience</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
          <p className="mb-4">
            We implement appropriate security measures to protect your personal information.
            However, no method of transmission over the Internet is 100% secure, and we cannot
            guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
          <p className="mb-4">
            We use cookies to enhance your browsing experience. You can control cookie settings
            through your browser preferences.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
          <p className="mb-4">
            We may use third-party services that collect, monitor, and analyze user data to improve
            our service. These third parties have their own privacy policies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
          <p className="mb-4">
            We may update this Privacy Policy from time to time. We will notify you of any changes
            by posting the new Privacy Policy on this page.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy, please contact us at
            privacy@bakingsubs.com.
          </p>
        </section>

        <footer className="text-sm text-gray-500 dark:text-gray-400 pt-8">
          <p>Last updated: February 6, 2025</p>
        </footer>
      </div>
    </main>
  );
}
