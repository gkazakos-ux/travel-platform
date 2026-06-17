import Link from "next/link";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";

export default function HomePage() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center gap-8 px-4 py-24 text-center sm:px-6">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        Real itineraries from real travelers
      </h1>
      <p className="max-w-xl text-lg text-gray-600">
        Discover structured day-by-day trips, save the ones you love, and copy
        them as the starting point for your own adventure.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href={routes.explore()}>
          <Button size="lg" variant="primary">
            Explore itineraries
          </Button>
        </Link>
        <Link href={routes.signup()}>
          <Button size="lg" variant="secondary">
            Share your trip
          </Button>
        </Link>
      </div>
    </section>
  );
}
