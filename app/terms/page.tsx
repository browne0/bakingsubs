import { BreadcrumbNav } from '@/components/BreadcrumbNav';
import { baseMetadata } from '@/lib/metadata';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...baseMetadata,
  title: 'Terms of Service | BakingSubs',
  description: 'Terms of service and usage conditions for BakingSubs',
};

export default function TermsPage() {
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <BreadcrumbNav items={[{ label: 'Home', href: '/' }, { label: 'Terms of Service' }]} />

      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>

      <div className="prose dark:prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing and using BakingSubs.com, you accept and agree to be bound by these Terms
            of Service. If you do not agree to these terms, please do not use our service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Use of Service</h2>
          <p className="mb-4">
            BakingSubs provides information about baking substitutions as a general guide. While we
            strive for accuracy, we cannot guarantee the results of using any substitution in your
            specific recipe.
          </p>
          <p className="mb-4">
            Users are responsible for ensuring that any substitutions are appropriate for their
            dietary needs and restrictions.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Content and Information</h2>
          <p className="mb-4">
            All content provided on BakingSubs is for informational purposes only. We make no
            warranties about the accuracy, reliability, or completeness of the content.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. User Contributions</h2>
          <p className="mb-4">
            If we implement user contributions in the future, users will retain ownership of their
            content while granting us a license to use, modify, and display that content on our
            platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Disclaimer of Warranties</h2>
          <p className="mb-4">
            BakingSubs is provided "as is" without any warranties, expressed or implied. We do not
            warrant that the service will be uninterrupted or error-free.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
          <p className="mb-4">
            BakingSubs shall not be liable for any indirect, incidental, special, consequential, or
            punitive damages resulting from your use or inability to use the service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Changes to Terms</h2>
          <p className="mb-4">
            We reserve the right to modify these terms at any time. Continued use of the service
            after changes constitutes acceptance of the new terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Contact Information</h2>
          <p className="mb-4">
            For questions about these Terms of Service, please contact us at support@bakingsubs.com.
          </p>
        </section>
      </div>
    </div>
  );
}
