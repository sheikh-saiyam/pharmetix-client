import { FileText } from "lucide-react";

export default function TermsConditionsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <FileText className="h-6 w-6" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900">
          Terms & Conditions
        </h1>
      </div>

      <div className="prose prose-slate max-w-none space-y-8 text-slate-600">
        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            1. Agreement to Terms
          </h2>
          <p>
            Welcome to Pharmetix. These Terms of Service constitute a legally
            binding agreement made between you, whether personally or on behalf
            of an entity and Pharmetix Healthcare Ltd.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            2. Intellectual Property Rights
          </h2>
          <p>
            Unless otherwise indicated, the Services is our proprietary property
            and all source code, databases, functionality, software, website
            designs, audio, video, text, photographs, and graphics on the
            Services and the trademarks, service marks, and logos contained
            therein are owned or controlled by us or licensed to us.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            3. User Representations
          </h2>
          <p>
            By using the Services, you represent and warrant that all
            registration information you submit will be true, accurate, current,
            and complete; you will maintain the accuracy of such information and
            promptly update such registration information as necessary.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            4. Prohibited Activities
          </h2>
          <p>
            You may not access or use the Services for any purpose other than
            that for which we make the Services available. The Services may not
            be used in connection with any commercial endeavors except those
            that are specifically endorsed or approved by us.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            5. Governing Law
          </h2>
          <p>
            These Terms shall be governed by and defined following the laws of
            Bangladesh. Pharmetix Healthcare Ltd and yourself irrevocably
            consent that the courts of Bangladesh shall have exclusive
            jurisdiction to resolve any dispute which may arise in connection
            with these terms.
          </p>
        </section>
      </div>
    </div>
  );
}
