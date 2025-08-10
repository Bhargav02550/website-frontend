"use client";
import PriceList from "./components/PriceList";
import Bulk from "./components/Bulk";
import QualitySection from "./components/QualitySection";
import BulkBenefitsSection from "./components/BulkBenefitsSection";
import FaqSection from "./components/FaqSection";
import Footer from "./components/Footer";
import Stat from "./components/Stat";
import SustainabilitySection from "./components/SustainabilitySection";
import TestimonialCarousel from "./components/TestimonialCarousel";
import { useRouter } from "next/navigation";
import { useAuth } from "../app/context/AuthContext";
import React, { useEffect } from "react";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/webapp");
    }
  }, [isAuthenticated]);

  return (
    <main className="font-sans bg-white text-black overflow-x-hidden">
      {/* <Sample/> */}
      <Bulk />
      <Stat />
      <BulkBenefitsSection />
      <QualitySection />
      <PriceList />
      <SustainabilitySection />
      <TestimonialCarousel />
      <FaqSection />
      <Footer />
    </main>
  );
}
