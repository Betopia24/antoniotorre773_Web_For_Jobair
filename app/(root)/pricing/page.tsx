"use client";
import Heading from "@/components/shared/Heading";
import { plans } from "@/lib/constants";
import Link from "next/link";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";

export default function Page() {
  const [step, setStep] = useState<
    "pricing" | "confirm" | "billing" | "success"
  >("pricing");
  const [selectedPlan, setSelectedPlan] = useState<(typeof plans)[0] | null>(
    null
  );
  const [billingInfo, setBillingInfo] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
  });
  const [isPaying, setIsPaying] = useState(false);

  const handleSelectPlan = (plan: (typeof plans)[0]) => {
    setSelectedPlan(plan);
    setStep("confirm");
  };

  const handleNextConfirm = () => {
    setStep("billing");
  };

  const handlePayNow = async () => {
    setIsPaying(true);
    // Mock API call
    await new Promise((res) => setTimeout(res, 1500));
    setIsPaying(false);
    setStep("success");
  };

  return (
    <div className="pt-32 sm:pt-36 py-20 bg-gradient-to-br from-brand-dark via-brand-darker to-brand-darker text-white min-h-screen flex items-center justify-center">
      <div className="app-container flex flex-col items-center gap-12">
        {/* Step 1: Pricing */}
        {step === "pricing" && (
          <>
            <Heading
              heading="Choose Your Learning Path"
              subheading="Start your journey with our free trial, then choose the plan that fits your learning goals"
              specialText="Learning Path"
              align="center"
            />
            <div className="mt-2 flex flex-col md:flex-row gap-6 w-full justify-center">
              {plans.map((plan, idx) => (
                <div
                  key={idx}
                  className={`flex-1 p-8 rounded-2xl flex flex-col justify-between cursor-pointer ${
                    plan.highlight
                      ? "relative z-0"
                      : "bg-gradient-to-br from-[#2B2E4E] to-[#12132F] border border-gray-700"
                  }`}
                  onClick={() => handleSelectPlan(plan)}
                >
                  {plan.highlight && (
                    <div className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to z-[-1]">
                      <div className="bg-[#171045] rounded-2xl h-full w-full"></div>
                    </div>
                  )}

                  <div className="flex flex-col gap-4 relative z-10">
                    <div className="w-full flex items-center flex-col gap-2">
                      <h3 className="text-xl font-semibold">{plan.title}</h3>
                      <p className="text-3xl font-bold">{plan.price}</p>
                      <span className="text-sm font-normal">
                        {plan.duration}
                      </span>
                    </div>
                    <ul className="flex flex-col gap-2 mt-4">
                      {plan.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-gray-300"
                        >
                          <FaCheck className="text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button className="inline-block mt-8 py-2.5 px-4 w-full rounded-xl font-semibold border border-gray-500 text-gradient hover:opacity-90 transition">
                    <h1 className="text-gradient">Select Plan</h1>
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Step 2: Confirm Plan */}
        {step === "confirm" && selectedPlan && (
          <div className="w-full flex flex-col lg:flex-row gap-8 items-start">
            {/* Selected Plan Card */}
            <div className="flex-1 p-6 rounded-xl border-[2px] border-gradient-to-br from-purple-500 via-pink-500 to-blue-500">
              <h3 className="text-xl font-semibold mb-2">
                {selectedPlan.title}
              </h3>
              <p className="text-3xl font-bold mb-1">{selectedPlan.price}</p>
              <span className="text-gray-300 text-sm mb-4">
                {selectedPlan.duration}
              </span>
              <ul className="flex flex-col gap-2">
                {selectedPlan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-200">
                    <FaCheck className="text-green-500" /> {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Plan Summary */}
            <div className="flex-1 bg-[#1f1f36] rounded-xl p-6 flex flex-col gap-4">
              <h3 className="text-xl font-semibold mb-4">Plan Summary</h3>
              <div className="flex justify-between text-gray-300">
                <span>Plan Selected</span>
                <span>{selectedPlan.title}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Billing Frequency</span>
                <span>Monthly</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Price</span>
                <span>{selectedPlan.price}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Next Payment</span>
                <span>
                  {new Date().toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex justify-between font-semibold text-white text-lg mt-2">
                <span>Total</span>
                <span>{selectedPlan.price}</span>
              </div>

              {/* Buttons */}
              <button
                className="mt-4 py-2.5 w-full rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 font-semibold hover:opacity-90 transition"
                onClick={handleNextConfirm}
              >
                Next
              </button>
              <button
                className="mt-2 py-2.5 w-full rounded-xl border border-gray-500 text-gray-200 hover:opacity-90 transition"
                onClick={() => setStep("pricing")}
              >
                Go Back
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Billing */}
        {step === "billing" && selectedPlan && (
          <div className="w-full max-w-2xl flex flex-col gap-6 bg-[#232339] p-8 rounded-2xl">
            <h2 className="text-2xl font-semibold text-center mb-4">
              Billing Information
            </h2>
            <input
              type="text"
              placeholder="Card Number"
              className="w-full p-3 rounded-xl bg-[#1a1a2a] border border-gray-600"
              value={billingInfo.cardNumber}
              onChange={(e) =>
                setBillingInfo({ ...billingInfo, cardNumber: e.target.value })
              }
            />
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="MM/YY"
                className="flex-1 p-3 rounded-xl bg-[#1a1a2a] border border-gray-600"
                value={billingInfo.expiry}
                onChange={(e) =>
                  setBillingInfo({ ...billingInfo, expiry: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="CVC"
                className="flex-1 p-3 rounded-xl bg-[#1a1a2a] border border-gray-600"
                value={billingInfo.cvc}
                onChange={(e) =>
                  setBillingInfo({ ...billingInfo, cvc: e.target.value })
                }
              />
            </div>
            <button
              onClick={handlePayNow}
              className={`mt-6 py-2.5 px-4 w-full rounded-xl font-semibold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:opacity-90 transition ${
                isPaying ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isPaying}
            >
              {isPaying ? "Processing..." : `Pay Now - ${selectedPlan.price}`}
            </button>
          </div>
        )}

        {/* Step 4: Success */}
        {step === "success" && selectedPlan && (
          <div className="w-full max-w-xl flex flex-col gap-8 bg-gradient-to-br from-[#28284A] to-[#12122A] text-white p-12 rounded-xl shadow-lg items-center justify-center text-center">
            <div className="bg-gradient-to-r from-green-500 via-green-600 to-green-700 p-4 rounded-full">
              <FaCircleCheck className="w-10 h-10" />
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-semibold text-white">
                Payment Successful!
              </h2>
              <p className="text-gray-300">
                Thank you, your MANIFEX subscription is now active.
              </p>
            </div>
            <Link href='/'
              className="py-2.5 px-4 w-full rounded-xl font-semibold bg-gradient-brand hover:opacity-90 transition"
            >
              Go to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
