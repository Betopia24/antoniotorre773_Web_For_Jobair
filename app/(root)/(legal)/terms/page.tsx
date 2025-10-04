import React from "react";

export default function Page() {
  return (
    <div className="pt-28 sm:pt-36 py-20 bg-gradient-to-br from-brand-dark via-brand-darker to-brand-darker text-white min-h-screen">
      <div className="app-container">
        <div className="flex items-center justify-center flex-col gap-3">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-wide">
            Terms of Use
          </h1>
          <p className="text-gray-300 font-semibold">
            Last Updated: February 5, 2025
          </p>
        </div>
        <div className="mt-12 space-y-4 text-gray-400">
          <p>
            Welcome to MANIFEX. These Terms of Use (“Terms”) govern your access
            to and use of our platform, website, and services. By using MANIFEX,
            you agree to follow these Terms. Please read them carefully. If you
            do not agree, you may not use our Service.
          </p>

          <p>
            MANIFEX is intended for learners of all ages, but you must be at
            least 13 years old to create an account. If you are under 18, you
            must have parent or guardian consent to use the platform. By using
            the Service, you confirm that the information you provide is
            accurate and truthful. When you create an account, you are
            responsible for safeguarding your password and account. You should
            notify us immediately if you suspect unauthorized access. We are not
            liable for damages or losses resulting from failure to protect your
            login details.
          </p>

          <p>
            Our platform is designed to help users practice English reading,
            writing, and speaking through AI-powered support. You agree to use
            the Service only for learning purposes in a lawful way. Misuse, such
            as attempting unauthorized access, copying or redistributing content
            without permission, uploading inappropriate, offensive or illegal
            material, or disrupting service operations, is prohibited.
          </p>

          <p>
            Certain features of MANIFEX require a paid subscription. By
            subscribing, you authorize us to charge your selected payment method
            through Stripe, our secure payment partner. Subscription fees are
            displayed on our Pricing page, processed automatically according to
            your billing cycle, and may renew monthly or annually until
            canceled. Unless required by law, subscription fees are
            non-refundable once charged, though in exceptional cases such as
            duplicate payments or system errors you may contact support for
            assistance. A free trial, if provided, will be limited to the
            duration stated.
          </p>

          <p>
            All content, features, AI-generated outputs, and visuals on MANIFEX
            belong to the company and are protected by intellectual property
            rights. You are granted a limited, non-exclusive license to use this
            content for personal learning purposes and you may not copy, sell,
            or distribute materials without written permission. Some activities
            allow you to create your own text, such as in Smart Writing
            practice. You retain ownership of your written content, but by
            submitting it you grant MANIFEX limited rights to analyze, process,
            and use the text to improve our services.
          </p>

          <p>
            We may suspend or terminate accounts that violate these Terms. You
            may close your account at any time. While we strive to provide
            accessible and effective services, MANIFEX is provided “as is” and
            “as available.” We do not guarantee uninterrupted, error-free, or
            perfectly accurate service, as AI-based recommendations are intended
            as guidance and not absolute advice. To the maximum extent permitted
            by law, MANIFEX and its affiliates will not be liable for indirect
            or incidental damages resulting from use of the Service. Our total
            liability shall not exceed the subscription fee paid in the last
            three months.
          </p>

          <p>
            We reserve the right to update or modify these Terms and the
            platform itself at any time. Continued use after updates indicates
            acceptance of the new Terms. Your use of the Service also means you
            agree to our Privacy Policy, which explains how we handle your
            personal information.
          </p>

          <p>
            These Terms will be governed by and interpreted under the laws of
            [Insert Country/Region], with disputes handled exclusively by the
            courts of [Insert Location]. If you have questions about these
            Terms, you can contact us at [support@manifex.org] or at our
            business address.
          </p>

          <p>
            By accessing or using MANIFEX, you acknowledge that you have read,
            understood, and agreed to these Terms of Use.
          </p>
        </div>
      </div>
    </div>
  );
}
