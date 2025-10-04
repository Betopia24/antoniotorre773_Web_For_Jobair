import React from "react";

export default function Page() {
  return (
    <div className="pt-28 sm:pt-36 py-20 bg-gradient-to-br from-brand-dark via-brand-darker to-brand-darker text-white min-h-screen">
      <div className="app-container">
        <div className="flex items-center justify-center flex-col gap-3">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-wide">
            Privacy Policy
          </h1>
          <p className="text-gray-300 font-semibold">
            Last Updated: February 5, 2025
          </p>
        </div>
        <div className="mt-12 space-y-4 text-gray-400">
          <p>
            At MANIFEX, we respect and value your privacy. This Privacy Policy
            explains how we collect, use, and protect your personal information
            when you visit our website or use our services. By accessing
            MANIFEX, you agree to the practices described in this policy. If you
            do not agree, please discontinue using our services.
          </p>

          <p>
            When you create an account or use MANIFEX, we may collect certain
            personal information such as your name, email address, age group,
            language preference, subscription details, and any content you
            submit during practice activities such as writing exercises. For
            minors, we may also collect guardian or parent contact details for
            verification and progress tracking. In addition, we automatically
            collect certain technical information such as your browser type,
            device, IP address, and usage activity to ensure smooth
            functionality and improve the user experience.
          </p>

          <p>
            We use the information we collect to deliver and personalize our
            services, provide AI-powered feedback, process subscription payments
            securely through Stripe, track progress and generate analytics, send
            user updates or notifications, and improve MANIFEX by analyzing
            learner behaviors and preferences. Your personal data is used solely
            for the purpose of operating and enhancing the platform. We never
            sell your data to third parties.
          </p>

          <p>
            MANIFEX uses trusted third-party tools and services, such as Stripe
            for payment processing. Stripe collects and processes payment
            information on our behalf, and we do not store your full payment
            card details on our servers. Integrations with third-party providers
            are carefully selected, and we require them to follow strict
            security and privacy practices.
          </p>

          <p>
            We take the security of your information seriously. All data is
            protected using industry-standard encryption and secure storage
            practices. Access to personal data is restricted to authorized team
            members only, and we routinely monitor and update our systems to
            prevent unauthorized access, loss, misuse, or disclosure. However,
            no system can ever be 100% secure, and we cannot guarantee absolute
            protection of your information.
          </p>

          <p>
            If you are a child or minor, guardian or parent consent may be
            required to create an account and access certain features. Parent
            dashboards and notifications may be used to update guardians about a
            child’s learning progress.
          </p>

          <p>
            You have certain rights regarding your personal information. At any
            time, you may access your account, update or correct your details,
            or request account deletion. If you cancel your subscription or
            deactivate your account, some data may remain in backup storage or
            logs but will not be used further. To exercise these rights, please
            contact us at the provided email address.
          </p>

          <p>
            Our services are not designed to collect sensitive personal data
            such as racial or ethnic origin, political opinions, religious
            beliefs, or health-related details. Please do not provide this
            information when using our platform.
          </p>

          <p>
            We may update this Privacy Policy from time to time to reflect new
            features, technologies, or legal requirements. If there are
            significant changes, we will notify you via email or through the
            platform. By continuing to use MANIFEX after those updates, you
            agree to the revised Privacy Policy.
          </p>

          <p>
            This Privacy Policy is governed by the laws of [Insert
            Country/Region]. Any disputes will be resolved in the courts of
            [Insert Location].
          </p>

          <p>
            If you have any questions, concerns, or complaints about how we
            handle your personal data, please reach out to us at: Email:
            [support@manifex.org] Address: [Insert Business Address]
          </p>

          <p>
            By using MANIFEX, you acknowledge that you have read, understood,
            and agreed to this Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
