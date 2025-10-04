"use client";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import Heading from "../shared/Heading";

const Review: React.FC = () => {
  const reviews = [
    {
      name: "Michael Chen",
      role: "Executive, Tech Company",
      avatar: "/user1.png",
      review:
        "My 9-year-old improved her reading within weeks thanks to MANIFEX. The AI guidance and reward system kept her motivated every single day.",
      rating: 5,
    },
    {
      name: "Sophia Martinez",
      role: "Parent, Teacher",
      avatar: "/user2.png",
      review:
        "As a teacher and parent, I’ve never seen such an engaging platform. My students actually look forward to learning!",
      rating: 5,
    },
    {
      name: "David Kim",
      role: "College Student",
      avatar: "/user1.png",
      review:
        "MANIFEX adapted to my pace and interests, making English learning fun and highly effective.",
      rating: 5,
    },
    {
      name: "Emily Johnson",
      role: "Professional Writer",
      avatar: "/user2.png",
      review:
        "This platform sharpened my writing and speaking skills in ways I didn’t think possible. Highly recommend!",
      rating: 5,
    },
  ];

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [maxHeight, setMaxHeight] = useState(0);

  useEffect(() => {
    if (cardRefs.current.length > 0) {
      const heights = cardRefs.current.map((el) => el?.offsetHeight ?? 0);
      setMaxHeight(Math.max(...heights));
    }
  }, []);

  return (
    <div className="py-20 bg-brand-darker relative">
      <div className="app-container flex flex-col items-center gap-12">
        {/* Heading */}
        <Heading
          heading="Trusted by Families Worldwide"
          subheading="See how MANIFEX is transforming the learning experience for students, parents, and professionals"
          specialText="Families Worldwide"
          align="center"
        />

        {/* Carousel */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="w-full"
        >
          {reviews.map((item, i) => (
            <SwiperSlide key={i} className="h-full flex">
              <div
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                style={{ height: maxHeight || "auto" }}
                className="bg-gradient-to-b from-[#1C1C3C] to-[#12122A] p-6 rounded-2xl shadow-lg text-white flex flex-col justify-between"
              >
                {/* Avatar + Name */}
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-400 text-sm">{item.role}</p>
                  </div>
                </div>

                {/* Review */}
                <p className="text-gray-300 mb-4 text-sm leading-relaxed flex-grow">
                  “{item.review}”
                </p>

                {/* Rating */}
                <div className="flex gap-1 mt-auto">
                  {Array.from({ length: item.rating }).map((_, idx) => (
                    <span key={idx} className="text-yellow-400 text-lg">
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom Navigation Styling */}
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: white !important;
          width: 40px;
          height: 40px;
        }
        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 24px;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default Review;
