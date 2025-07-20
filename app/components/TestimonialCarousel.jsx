"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

const testimonials = [
  {
    quote: "Ordering through Go-Vigi is effortless.",
    description:
      "I used to call 3-4 suppliers to get everything for my shop. Now I just open the app and reorder. Its delivered the next day.",
    name: "Rithika",
    location: "Vijayawada",
    avatar: "/avatar/av1.png",
  },
  {
    quote: "Helps me plan smarter.",
    description:
      "Weekly reports help me avoid stockouts and reorder better. I now understand which products perform best.",
    name: "Ravi Kumar",
    location: "Nellore",
    avatar: "/avatar/av2.png",
  },
  {
    quote: "Flexible delivery is a blessing.",
    description:
      "Go-Vigi once resolved a wrong item issue in less than an hour. Amazing support!",
    name: "Sandeep Verma",
    location: "Visakhapatnam",
    avatar: "/avatar/av3.png",
  },
  {
    quote: "Real-time insights make a difference.",
    description:
      "With analytics from the dashboard, I know exactly whats moving fast.",
    name: "Lakshmi",
    location: "Hyderabad",
    avatar: "/avatar/av4.png",
  },
  {
    quote: "Support team is super helpful!",
    description:
      "I had a payment issue and their support resolved it calmly and quickly.",
    name: "Naresh",
    location: "Guntur",
    avatar: "/avatar/av5.png",
  },
  {
    quote: "Simplified my ordering completely.",
    description:
      "No more spreadsheets or phone calls. I now manage my store in a few clicks.",
    name: "Priya",
    location: "Rajahmundry",
    avatar: "/avatar/av6.png",
  },
  {
    quote: "Trustworthy supply chain.",
    description:
      "All products are authentic and delivered on time every single time.",
    name: "Mohammed Irfan",
    location: "Warangal",
    avatar: "/avatar/av7.png",
  },
  {
    quote: "Cost-saving insights.",
    description:
      "Smart suggestions on offers and pack sizes have helped me save on every order.",
    name: "Anjali",
    location: "Tirupati",
    avatar: "/avatar/av8.png",
  },
  {
    quote: "Built for small retailers like us.",
    description:
      "Its like they understand exactly what we need. Easy UI, great service!",
    name: "Rakesh",
    location: "Kakinada",
    avatar: "/avatar/av9.png",
  },
];

export default function TestimonialCarousel() {
  const [imgErrors, setImgErrors] = useState({});
  const [groupSize, setGroupSize] = useState(3); // 3 on desktop, 2 on mobile

  const handleImgError = (name) => {
    setImgErrors((prev) => ({ ...prev, [name]: true }));
  };

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setGroupSize(isMobile ? 2 : 3); // 2 per slide on mobile, 3 on desktop
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const groupedTestimonials = Array.from(
    { length: Math.ceil(testimonials.length / groupSize) },
    (_, i) => testimonials.slice(i * groupSize, i * groupSize + groupSize)
  );

  return (
    <section className="bg-[#f9f9f9] text-black py-12 px-4 md:px-16 overflow-x-hidden">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mt-5 mb-18">
        What Our Retailers Say About Go-Vigi
      </h2>

      <div className="relative z-0 max-w-7xl mx-auto overflow-visible">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={20}
          className="testimonial-swiper"
        >
          {groupedTestimonials.map((group, idx) => (
            <SwiperSlide key={idx}>
              <div
                className={`grid gap-4 ${
                  group.length === 1
                    ? "grid-cols-1"
                    : group.length === 2
                    ? "grid-cols-2"
                    : "grid-cols-1 md:grid-cols-3"
                }`}
              >
                {group.map((t, i) => (
                  <div
                    key={i}
                    className="w-full bg-white rounded-xl shadow-md p-4 pt-10 text-center relative flex flex-col justify-between h-[220px]"
                  >
                    {/* Avatar */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white z-10">
                      <Image
                        src={imgErrors[t.name] ? "/default-avatar.png" : t.avatar}
                        alt={t.name}
                        width={64}
                        height={64}
                        className="object-cover rounded-full w-full h-full"
                        onError={() => handleImgError(t.name)}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 justify-between mt-6">
                      <div>
                        <p className="font-semibold text-sm mb-1">“{t.quote}”</p>
                        <p className="text-gray-600 text-xs line-clamp-3">
                          {t.description}
                        </p>
                      </div>
                      <p className="text-xs text-gray-800 font-medium">
                        - {t.name}, {t.location}
                      </p>
                    </div>

                    {/* Star rating */}
                    <div className="flex justify-center mt-2 text-[#fbbf24] text-sm">
                      {"★★★★★".split("").map((_, idx) => (
                        <span key={idx}>★</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .testimonial-swiper .swiper-pagination {
          position: relative;
          margin-top: 2rem;
        }

        .testimonial-swiper,
        .testimonial-swiper .swiper,
        .testimonial-swiper .swiper-wrapper,
        .testimonial-swiper .swiper-slide {
          overflow: visible !important;
        }

        body {
          overflow-x: hidden;
        }
      `}</style>
    </section>
  );
}
