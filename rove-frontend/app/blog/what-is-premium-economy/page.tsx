"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Clock,
  User,
  Calendar,
  Share2,
  BookOpen,
  Tag,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const WhatIsPremiumEconomy = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/blog">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">Airlines</Badge>
              <Badge variant="secondary">Alliances</Badge>
              <Badge variant="secondary">Loyalty Programs</Badge>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              What is Premium Economy? A Young Traveler&apos;s Guide{" "}
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed"></p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Landon from Rove Team</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>August 11, 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>7 min read</span>
              </div>
              <div className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="container mx-auto px-4 py-12 flex gap-y-4">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-foreground mb-8 leading-relaxed">
                  So you’ve finally saved up some cash and you’re ready to
                  explore the world! But you’re looking at flights and your eye
                  wanders over one word: <strong>premium economy</strong>.
                  Business class? Whoa, that is obviously out of budget (we’re
                  talking thousands of dollars), but this premium economy thing?
                  What the heck is it? Is it worth your hard-earned money?
                </p>
                <Image
                  src="https://www.explore.com/img/gallery/what-is-premium-economy-and-when-should-you-choose-it-over-economy/l-intro-1680540069.jpg"
                  alt="Star Alliance Map"
                  width={800}
                  height={400}
                  className="rounded-lg mb-6"
                />

                <h2 className="text-2xl font-bold mb-4">
                  Think of it as “Economy Plus Plus”
                </h2>
                <p className="text-lg text-foreground mb-8 leading-relaxed">
                  Premium economy is basically the middle child between regular
                  Economy and fancy business class. It’s like upgrading from a
                  Honda Civic to a Honda Accord. You’re still in the same family
                  but with some nice extras that make the journey way more
                  comfortable.
                </p>

                <h2 className="text-2xl font-bold mb-4">
                  What do you get with that extra cash?
                </h2>

                <h3 className="text-xl font-bold mb-4">
                  More space (And You’ll Actually Feel It)
                </h3>
                <p className="text-lg text-foreground mb-8 leading-relaxed">
                  Premium economy offers wider seats, more legroom, and greater
                  comfort than economy class, with better seating comfort than
                  economy class. We’re talking about 6-8 inches of extra
                  legroom, about the difference where your knees touch the seat
                  and actually being able to stretch out.
                </p>
                <p className="text-lg text-foreground mb-8 leading-relaxed">
                  Your seat will be about 2-3 inches wider too. Doesn&apos;t
                  sound like much? Try sitting in a cramped space for 10+ hours
                  and you&apos;ll appreciate every inch.
                </p>

                <h3 className="text-xl font-bold mb-4">
                  Better Food (Actually Edible!)
                </h3>
                <p className="text-lg text-foreground mb-8 leading-relaxed">
                  Remember those sad airplane meals your parents probably
                  complained about? Premium Economy usually gets you:
                </p>
                <ul className="list-disc ml-8 mb-6 text-lg text-foreground">
                  <li>A proper menu with multiple meal options</li>
                  <li>
                    Better quality ingredients (think real chicken instead of
                    mystery meat)
                  </li>
                  <li>Sometimes even a second meal service on long flights</li>
                  <li>Complimentary alcohol (if you&apos;re old enough)</li>
                </ul>

                <h3 className="text-xl font-bold mb-4">
                  Perks That Actually Matter
                </h3>
                <ul className="list-disc ml-8 mb-6 text-lg text-foreground">
                  <li>
                    Priority boarding: Skip some of the chaos and board earlier
                  </li>
                  <li>
                    Extra baggage allowance: Usually an extra 5-10kg, perfect
                    for bringing back souvenirs
                  </li>
                  <li>
                    Better entertainment: Larger screens and newer movie
                    selections
                  </li>
                  <li>
                    Amenity kits: Little bags with eye masks, socks, and
                    toiletries
                  </li>
                </ul>

                <h2 className="text-2xl font-bold mb-4">
                  Is It Worth Your Money?
                </h2>
                <p className="text-lg text-foreground mb-8 leading-relaxed">
                  Premium Economy typically costs 25-75% more than regular
                  Economy. So if your Economy ticket to Tokyo costs $800,
                  Premium Economy might be $1,000-$1,400.
                </p>

                <h3 className="text-xl font-bold mb-4">
                  When It&apos;s Probably Worth It:
                </h3>
                <ul className="list-disc ml-8 mb-6 text-lg text-foreground">
                  <li>
                    Long-haul flights (8+ hours): The comfort difference becomes
                    massive on overnight flights to Europe, Asia, or Australia
                  </li>
                  <li>
                    You&apos;re tall: If you&apos;re over 6 feet, that extra
                    legroom isn&apos;t a luxury, it&apos;s a necessity
                  </li>
                  <li>
                    Special occasions: Maybe this is your first big solo trip or
                    graduation celebration
                  </li>
                  <li>
                    You can afford it without stress: If the extra cost
                    won&apos;t make you eat ramen for two months
                  </li>
                </ul>

                <h3 className="text-xl font-bold mb-4">When to Skip It:</h3>
                <ul className="list-disc ml-8 mb-6 text-lg text-foreground">
                  <li>
                    Short flights: On a 3-hour flight, you&apos;re paying
                    premium prices for minimal benefit
                  </li>
                  <li>
                    Tight budget: If upgrading means you can&apos;t afford to
                    actually do stuff at your destination, stick with Economy
                  </li>
                  <li>
                    You sleep easily anywhere: Some people can sleep on a park
                    bench. If that&apos;s you, save the money
                  </li>
                </ul>

                <h3 className="text-xl font-bold mb-4">Example:</h3>
                <p className="text-lg text-foreground mb-8 leading-relaxed">
                  Flying from Toronto Pearson (YYZ) to LaGuardia Airport (LGA)
                  in New York costs roughly USD $240 on economy class, while
                  premium economy will cost you USD $410. That is a 70% increase
                  in price compared to standard economy.
                </p>

                <h2 className="text-2xl font-bold mb-4">
                  The price as you go up the ladder in classes
                </h2>
                <ul className="list-disc ml-8 mb-6 text-lg text-foreground">
                  <li>Economy → USD $240</li>
                  <li>Premium Economy → USD $410</li>
                  <li>Business Class → USD $593</li>
                  <li>First Class → USD $1,229</li>
                </ul>

                <h2 className="text-2xl font-bold mb-4">
                  Pro Tips for Young Travelers
                </h2>
                <h3 className="text-xl font-bold mb-4">
                  How to Score Premium Economy for Less
                </h3>
                <ul className="list-disc ml-8 mb-6 text-lg text-foreground">
                  <li>
                    Book early: Premium Economy seats are limited, so early
                    birds get better prices
                  </li>
                  <li>
                    Use points/miles: If you have a travel credit card or use
                    Rove Miles, this is a great way to use points
                  </li>
                  <li>
                    Check for last-minute upgrades: Sometimes airlines offer
                    cheap upgrades at check-in
                  </li>
                  <li>
                    Shoulder season travel: Flying in off-peak times can make
                    upgrades more affordable
                  </li>
                </ul>

                <h2 className="text-2xl font-bold mb-4">
                  Airlines That Do Premium Economy Right
                </h2>
                <p className="text-lg text-foreground mb-8 leading-relaxed">
                  Some airlines treat Premium Economy as a real upgrade, while
                  others just add an inch of legroom and call it a day:
                </p>
                <ul className="list-disc ml-8 mb-6 text-lg text-foreground">
                  <li>
                    Best value: Virgin Atlantic, Singapore Airlines, Air New
                    Zealand
                  </li>
                  <li>Solid options: British Airways, Lufthansa, Emirates</li>
                  <li>
                    Maybe skip: Some US domestic carriers where &quot;Premium
                    Economy&quot; is barely different
                  </li>
                </ul>

                <h2 className="text-2xl font-bold mb-4">The Bottom Line</h2>
                <p className="text-lg text-foreground mb-8 leading-relaxed">
                  Premium Economy isn&apos;t about being fancy, rather it&apos;s
                  about arriving at your destination feeling human instead of
                  like a pretzel. For young travelers on longer international
                  flights, it can be the difference between starting your
                  adventure exhausted or energized.
                </p>
                <p className="text-lg text-foreground mb-8 leading-relaxed">
                  Whether premium economy is worth it depends on the airline,
                  your circumstances and how much extra you end up paying. If
                  you can swing the extra cost without sacrificing your travel
                  fund, and you&apos;re flying long-haul, it&apos;s often worth
                  every penny.
                </p>
                <p className="text-lg text-foreground mb-8 leading-relaxed">
                  But remember: the best seat on the plane is the one that gets
                  you to your destination ready to explore. Whether that&apos;s
                  Economy or Premium Economy depends on your budget, your body,
                  and your priorities. The most important thing is that
                  you&apos;re out there seeing the world!
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Tag className="h-4 w-4 text-muted-foreground" />
            {["Premium Economy", "Upgrades", "Value"].map((tag) => (
              <Badge key={tag} variant="outline" className="text-sm">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-8 border-t border-border">
            <Link href="/blog">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Share this article:
              </span>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default WhatIsPremiumEconomy;
