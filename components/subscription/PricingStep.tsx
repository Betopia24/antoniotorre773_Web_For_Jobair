// components/subscription/PricingStep.tsx
"use client";
import Heading from "@/components/shared/Heading";
import { FaCheck, FaExclamationTriangle } from "react-icons/fa";

interface Plan {
  id: string;
  planName: string;
  amount: number;
  currency: string;
  interval: string;
  intervalCount: number;
  freeTrialDays: number | null;
  productId: string;
  priceId: string;
  active: boolean;
  description: string;
  maxMembers: number | null;
  features: string[];
  createdAt: string;
  updatedAt: string;
}

interface PricingStepProps {
  plans: Plan[];
  onSelectPlan: (plan: Plan) => void;
  hasActiveSubscription: boolean;
}

export default function PricingStep({ plans, onSelectPlan, hasActiveSubscription }: PricingStepProps) {
  // Format price for display
  const formatPrice = (plan: Plan) => {
    if (plan.amount === 0) return "Free";
    
    const intervalText = plan.interval === 'month' ? 'mo' : 
                        plan.interval === 'year' ? 'yr' : 
                        plan.interval;
    
    return `$${plan.amount}/${intervalText}`;
  };

  const formatDuration = (plan: Plan) => {
    if (plan.amount === 0) return "7-day trial";
    
    if (plan.interval === 'lifetime') return "Lifetime access";
    
    const intervalCount = plan.intervalCount > 1 ? plan.intervalCount : '';
    const intervalText = plan.interval === 'month' ? 'month' : 
                        plan.interval === 'year' ? 'year' : 
                        plan.interval;
    
    return `Billed every ${intervalCount} ${intervalText}${plan.intervalCount > 1 ? 's' : ''}`;
  };

  const handlePlanClick = (plan: Plan) => {
    if (hasActiveSubscription) {
      return; // Prevent selection - toast will show from hook
    }
    onSelectPlan(plan);
  };

  return (
    <>
      <Heading
        heading="Choose Your Learning Path"
        subheading="Start your journey with our free trial, then choose the plan that fits your learning goals"
        specialText="Learning Path"
        align="center"
      />
      
      {/* Active Subscription Warning */}
      {hasActiveSubscription && (
        <div className="w-full max-w-4xl mx-auto mb-6 p-4 bg-yellow-500/20 border border-yellow-500 rounded-xl">
          <div className="flex items-center gap-3">
            <FaExclamationTriangle className="text-yellow-500 text-xl" />
            <div>
              <p className="text-yellow-200 font-semibold">
                You have an active subscription
              </p>
              <p className="text-yellow-300 text-sm mt-1">
                Please cancel your current subscription before purchasing a new plan.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-2 flex flex-col md:flex-row gap-6 w-full justify-center">
        {plans.map((plan, idx) => (
          <div
            key={plan.id}
            className={`flex-1 p-8 rounded-2xl flex flex-col justify-between ${
              hasActiveSubscription 
                ? 'opacity-60 cursor-not-allowed' 
                : 'cursor-pointer'
            } ${
              idx === 1 // Always highlight the second plan
                ? "relative z-0"
                : "bg-gradient-to-br from-[#2B2E4E] to-[#12132F] border border-gray-700"
            }`}
            onClick={() => handlePlanClick(plan)}
          >
            {idx === 1 && (
              <div className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to z-[-1]">
                <div className="bg-[#171045] rounded-2xl h-full w-full"></div>
              </div>
            )}

            <div className="flex flex-col gap-4 relative z-10">
              <div className="w-full flex items-center flex-col gap-2">
                <h3 className="text-xl font-semibold">{plan.planName}</h3>
                <p className="text-3xl font-bold">{formatPrice(plan)}</p>
                <span className="text-sm font-normal">
                  {formatDuration(plan)}
                </span>
              </div>
              <ul className="flex flex-col gap-2 mt-4">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-gray-200 tracking-wider"
                  >
                    <FaCheck className="text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Buttons */}
            {idx === 1 ? (
              <button 
                className={`mt-10 py-2.5 w-full rounded-xl flex items-center justify-center gap-2 font-semibold transition ${
                  hasActiveSubscription
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-brand hover:opacity-90 cursor-pointer'
                }`}
                disabled={hasActiveSubscription}
              >
                {hasActiveSubscription ? 'Active Subscription' : `Start With ${plan.planName} Plan`}
              </button>
            ) : (
              <>
                <button 
                  className={`relative mt-10 py-2.5 w-full rounded-xl h-[44px] ${
                    hasActiveSubscription ? 'cursor-not-allowed' : 'cursor-pointer'
                  }`}
                  disabled={hasActiveSubscription}
                >
                  <div className={`absolute inset-[1px] rounded-xl p-2 flex justify-center items-center ${
                    hasActiveSubscription
                      ? 'bg-gray-700'
                      : 'bg-gradient-to-br from-[#2E2E43] via-[#2C2C41] to-[#27273B]'
                  }`}>
                    <h1 className={`font-semibold ${
                      hasActiveSubscription ? 'text-gray-400' : 'text-gradient'
                    }`}>
                      {hasActiveSubscription ? 'Active Subscription' : `Start With ${plan.planName} Plan`}
                    </h1>
                  </div>
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
}