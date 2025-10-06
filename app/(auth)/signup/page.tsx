import RegisterStepFirst from "@/components/register/RegisterStepFirst";
import RegisterStepFive from "@/components/register/RegisterStepFive";
import RegisterStepFour from "@/components/register/RegisterStepFour";
import RegisterStepSecond from "@/components/register/RegisterStepSecond";
import RegisterStepThree from "@/components/register/RegisterStepThree";
import React from "react";

export default function SignUp() {
  return (
    <>
      <RegisterStepFirst />
      <RegisterStepSecond />
      <RegisterStepThree />
      <RegisterStepFour />
      <RegisterStepFive />
    </>
  );
}
