'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';

export default function SustainabilitySection() {
  return (
    <section className="bg-[#2e7d32] text-white px-6 md:px-20 py-6 overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Left Text */}
        <div className="flex-1 max-w-xl">
          <h2 className="text-2xl md:text-2xl font-bold mb-4 leading-tight">
           Sustainability at Go-Vigi means building resilient, future-ready supply chains — not just going green.
          </h2>
          <p className="text-base leading-relaxed text-white/90">
          At Go-Vigi,sustainability goes beyond waste reduction — it’s about building a smarter, future-ready supply chain. We support local retailers with fair pricing, source directly from farmers, and use electric vehicles for last-mile delivery. With cold chain logistics and predictive planning, we reduce waste, cut emissions, and deliver with purpose.          </p>
        </div>

        {/* Right Carousel */}
        <div className="flex-1 w-full relative max-w-lg px-6">
          {/* Navigation buttons */}
          <div className="swiper-button-prev" />
          <div className="swiper-button-next" />

          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1.4}
            centeredSlides
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            loop={false}
            className="w-full"
          >
            {[
              '/ss1.jpg',
              '/ss2.jpg',
              '/ss3.jpg',
              '/ss4.jpg',
              '/ss5.jpg',
              '/ss6.jpg',
              '/ss7.jpg',
              '/ss8.jpg',
              '/ss9.jpg'
            ].map((src, i) => (
              <SwiperSlide key={i}>
              <div className="rounded-lg overflow-hidden shadow-lg h-40 md:h-60 relative w-full">
                <Image
                  src={src}
                  alt={`Slide ${i + 1}`}
                  fill
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
            </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Nav Styling */}
          <style jsx global>{`
            .swiper-button-next,
            .swiper-button-prev {
              color: white;
              top: 50%;
              transform: translateY(-50%);
              z-index: 10;
            }
            .swiper-button-prev {
              left: 0;
            }
            .swiper-button-next {
              right: 0;
            }

            .swiper-slide:not(.swiper-slide-active) {
              opacity: 0.6;
              scale: 0.95;
              transition: transform 0.3s ease, opacity 0.3s ease;
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
