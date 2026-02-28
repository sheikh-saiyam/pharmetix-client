import { Cookie } from "lucide-react";

export default function CookiePolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <Cookie className="h-6 w-6" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Cookie Policy</h1>
      </div>

      <div className="prose prose-slate max-w-none space-y-8 text-slate-600">
        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            1. What Are Cookies
          </h2>
          <p>
            As is common practice with almost all professional websites this
            site uses cookies, which are tiny files that are downloaded to your
            computer, to improve your experience. This page describes what
            information they gather, how we use it and why we sometimes need to
            store these cookies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            2. How We Use Cookies
          </h2>
          <p>
            We use cookies for a variety of reasons detailed below.
            Unfortunately, in most cases there are no industry standard options
            for disabling cookies without completely disabling the functionality
            and features they add to this site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            3. Disabling Cookies
          </h2>
          <p>
            You can prevent the setting of cookies by adjusting the settings on
            your browser. Be aware that disabling cookies will affect the
            functionality of this and many other websites that you visit.
            Disabling cookies will usually result in also disabling certain
            functionality and features of the site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            4. The Cookies We Set
          </h2>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Account related cookies</li>
            <li>Login related cookies</li>
            <li>Orders processing related cookies</li>
            <li>Forms related cookies</li>
            <li>Site preferences cookies</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            5. More Information
          </h2>
          <p>
            Hopefully that has clarified things for you. If there is something
            that you aren&apos;t sure whether you need or not it&apos;s usually
            safer to leave cookies enabled in case it does interact with one of
            the features you use on our site.
          </p>
          <p className="mt-4">
            If you are still looking for more information then you can contact
            us through one of our preferred contact methods:{" "}
            <strong>support@pharmetix.com</strong>
          </p>
        </section>
      </div>
    </div>
  );
}
