"use client";
import React, { useState } from "react";
import ForgotPasswordStepFirst from "@/components/forgot-password/ForgotPasswordStepFirst";
import ForgotPasswordStepSecond from "@/components/forgot-password/ForgotPasswordStepSecond";
import ForgotPasswordStepThird from "@/components/forgot-password/ForgotPasswordStepThird";
import { ProtectedAuthRoute } from "@/components/shared/ProtectedAuthRoute";

export interface ForgotPasswordData {
  step1: {
    email: string;
  };
  step2: {
    otp: string[];
    verified: boolean;
  };
  step3: {
    newPassword: string;
    confirmPassword: string;
  };
}

function ForgotPasswordPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ForgotPasswordData>({
    step1: {
      email: "",
    },
    step2: {
      otp: ["", "", "", "", "", ""],
      verified: false,
    },
    step3: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const updateFormData = (step: keyof ForgotPasswordData, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [step]: { ...prev[step], ...data },
    }));
  };

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ForgotPasswordStepFirst
            data={formData.step1}
            updateData={(data) => updateFormData("step1", data)}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <ForgotPasswordStepSecond
            data={formData.step2}
            userEmail={formData.step1.email}
            updateData={(data) => updateFormData("step2", data)}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <ForgotPasswordStepThird
            data={formData.step3}
            userEmail={formData.step1.email}
            updateData={(data) => updateFormData("step3", data)}
            prevStep={prevStep}
          />
        );
      default:
        return null;
    }
  };

  return <>{renderCurrentStep()}</>;
}

export default ProtectedAuthRoute(ForgotPasswordPage);
