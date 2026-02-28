import { Shield } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <Shield className="h-6 w-6" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
      </div>

      <div className="prose prose-slate max-w-none space-y-8 text-slate-600">
        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            1. Introduction
          </h2>
          <p>
            Welcome to Pharmetix. We are committed to protecting your personal
            information and your right to privacy. If you have any questions or
            concerns about our policy, or our practices with regards to your
            personal information, please contact us at support@pharmetix.com.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            2. Information We Collect
          </h2>
          <p>
            We collect personal information that you voluntarily provide to us
            when registering at the Services expressing an interest in obtaining
            information about us or our products and services, when
            participating in activities on the Services or otherwise contacting
            us.
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Name and Contact Data</li>
            <li>Credentials (Passwords, Hint, Security Info)</li>
            <li>Payment Data (Processed by secure payment gateways)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            3. How We Use Your Information
          </h2>
          <p>
            We use personal information collected via our Services for a variety
            of business purposes described below. We process your personal
            information for these purposes in reliance on our legitimate
            business interests, in order to enter into or perform a contract
            with you, with your consent, and/or for compliance with our legal
            obligations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            4. Sharing Your Information
          </h2>
          <p>
            We only share information with your consent, to comply with laws, to
            provide you with services, to protect your rights, or to fulfill
            business obligations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            5. Contact Us
          </h2>
          <p>
            If you have questions or comments about this policy, you may email
            us at support@pharmetix.com or by post to:
          </p>
          <address className="not-italic mt-2">
            Pharmetix Healthcare Ltd.
            <br />
            Level 4, Health Tower, Dhaka, Bangladesh
          </address>
        </section>
      </div>
    </div>
  );
}
