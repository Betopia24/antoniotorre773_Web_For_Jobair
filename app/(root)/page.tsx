import FAQ from "@/components/landing/FAQ";
import Features from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";
import LearningProgress from "@/components/landing/LearningProgress";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <Hero/>
    <Features/>
    <LearningProgress/>
    <FAQ/>
    </>
  );
}
