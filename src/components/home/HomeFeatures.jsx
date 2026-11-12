
import {
  Search,
  BookPlus,
  BookMarked,
  RotateCcw,
  Users,
  Library,
  Heart,
} from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Discover Books",
    description:
      "Explore our collection and find books that match your interests.",
  },
  {
    icon: BookMarked,
    number: "02",
    title: "Borrow a Book",
    description:
      "Choose your favorite book and borrow an available copy.",
  },
  {
    icon: RotateCcw,
    number: "03",
    title: "Return & Repeat",
    description:
      "Return your book on time and discover another great story.",
  },
];

const benefits = [
  {
    icon: Library,
    title: "One Growing Library",
    description:
      "Explore books across different categories in one place.",
  },
  {
    icon: Users,
    title: "Reader Community",
    description:
      "Share your collection and help other readers discover books.",
  },
  {
    icon: Heart,
    title: "Made for Book Lovers",
    description:
      "Enjoy a simple and friendly experience built around reading.",
  },
];

export default function HomeFeatures() {
  return (
    <>
      {/* How Borrowing Works */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-700">
              Simple and easy
            </p>

            <h2 className="text-3xl font-bold text-stone-900 md:text-4xl">
              How Borrowing Works
            </h2>

            <p className="mt-4 leading-7 text-stone-500">
              Your next reading adventure is just three simple steps away.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="rounded-2xl border border-stone-200 bg-stone-50 p-8"
                >
                  <div className="mb-6 flex items-center justify-between">
                    <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                      <Icon size={27} />
                    </span>

                    <span className="text-4xl font-bold text-stone-200">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-stone-900">
                    {step.title}
                  </h3>

                  <p className="mt-3 leading-7 text-stone-500">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why BookNook */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-700">
              More than just books
            </p>

            <h2 className="text-3xl font-bold leading-tight text-stone-900 md:text-4xl">
              A Little Space for Every Book Lover.
            </h2>

            <p className="mt-5 leading-8 text-stone-500">
              BookNook makes it easier to discover books, share
              collections, and connect with the joy of reading.
              Whether you want to explore or contribute, there&apos;s
              a place for you here.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
                >
                  <Icon size={27} className="text-emerald-700" />

                  <h3 className="mt-4 font-bold text-stone-900">
                    {benefit.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-stone-500">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
