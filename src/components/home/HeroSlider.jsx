
"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    subtitle: "WELCOME TO BOOKNOOK",
    title: "Every Book Has a Story. Find Yours.",
    description:
      "Explore a growing collection of books and discover your next favorite read.",
    background: "from-emerald-950 to-emerald-700",
  },
  {
    subtitle: "DISCOVER SOMETHING NEW",
    title: "Your Next Favorite Book Is Waiting.",
    description:
      "Browse different genres, meet new authors, and find stories worth remembering.",
    background: "from-stone-900 to-stone-700",
  },
  {
    subtitle: "READ. SHARE. REPEAT.",
    title: "A Library That Brings Readers Together.",
    description:
      "Share your books with others and borrow something wonderful to read.",
    background: "from-teal-950 to-teal-700",
  },
];

export default function HeroSlider() {
  return (
    <section className="mx-auto max-w-7xl px-5 pt-8 lg:px-8">
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        loop
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        className="overflow-hidden rounded-3xl"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className={`flex min-h-[420px] items-center bg-gradient-to-r ${slide.background} px-8 py-16 text-white md:px-16`}
            >
              <div className="max-w-2xl">
                <p className="mb-5 text-sm font-semibold tracking-[0.2em] text-emerald-300">
                  {slide.subtitle}
                </p>

                <h1 className="text-4xl font-bold leading-tight md:text-6xl">
                  {slide.title}
                </h1>

                <p className="mt-6 max-w-xl text-base leading-8 text-stone-200 md:text-lg">
                  {slide.description}
                </p>

                <Link
                  href="/books"
                  className="mt-8 inline-flex rounded-full bg-white px-7 py-3 font-semibold text-emerald-900 transition hover:bg-emerald-100"
                >
                  Browse Books
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
