"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, User, Calendar, Share2, Tag } from "lucide-react";
import Link from "next/link";

const SyntheticRouting = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/blog">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">Travel Hacks</Badge>
              <Badge variant="secondary">Flight Booking</Badge>
              <Badge variant="secondary">Airlines</Badge>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Synthetic Routing: The Secret Travel Hack to Unlock Cheaper Flights
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Learn how to creatively piece together flight segments to save money and fly smarter.
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Tom from Rove Team</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>August 12, 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>6 min read</span>
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
              <div className="prose prose-lg max-w-none text-foreground">
                <p className="text-lg mb-6 leading-relaxed">
                  If you’ve been hunting for ways to slash your airfare, you’ve probably heard about using stopovers or booking flights with multiple legs. But have you ever heard of <strong>synthetic routing</strong>? It’s a clever travel hacking trick that savvy travelers use to pay less for their flights — often significantly less — by combining different flight segments in an unconventional way.
                </p>

                <h2 className="text-3xl font-bold mb-4 text-primary">What Is Synthetic Routing?</h2>
                <p className="text-lg mb-6 leading-relaxed">
                  Synthetic routing is the process of piecing together multiple flight segments, sometimes on different airlines or booking classes, to create a custom itinerary that airlines or booking engines might not normally offer directly. Instead of booking a straightforward flight from point A to point B, you “synthesize” your route by creatively linking connections that take advantage of pricing quirks, fare rules, and airline partnerships.
                </p>
                <p className="text-lg mb-6 leading-relaxed">
                  For example, instead of booking a direct flight from Toronto to Hong Kong, you might book Toronto to Los Angeles, then Los Angeles to Hong Kong as separate tickets or a combined booking with a stopover in LA. Sometimes, adding an extra city or leg — called a "hidden city" or "throwaway ticket" — can lower the overall cost.
                </p>

                <h2 className="text-3xl font-bold mb-4 text-primary">Why Does Synthetic Routing Work?</h2>
                <p className="text-lg mb-6 leading-relaxed">
                  Airline pricing is complex and influenced by factors like competition on routes, demand, fare classes, and partnerships. Sometimes, flying a slightly longer or less obvious route can cost less than a direct flight. Airlines price their seats based on historical data and market conditions, not always in a straightforward or logical manner.
                </p>
                <p className="text-lg mb-6 leading-relaxed">
                  Synthetic routing exploits these pricing inefficiencies:
                </p>
                <ul className="list-disc ml-8 mb-6">
                  <li><strong>Hidden city ticketing:</strong> Booking a ticket with a layover at your intended destination, then skipping the final leg.</li>
                  <li><strong>Back-to-back ticketing:</strong> Booking two round-trip tickets to circumvent minimum stay requirements.</li>
                  <li><strong>Mixing alliances and low-cost carriers:</strong> Combining flights from different alliances or budget airlines to save.</li>
                </ul>

                <h2 className="text-3xl font-bold mb-4 text-primary">How to Use Synthetic Routing for Cheaper Flights</h2>
                <ol className="list-decimal ml-8 mb-6 space-y-2">
                  <li>Research your routes carefully using tools like Google Flights, ITA Matrix, or expert travel forums.</li>
                  <li>Be flexible with airports — consider nearby airports or alternate hubs.</li>
                  <li>Check baggage and change fees — synthetic routing may involve separate tickets.</li>
                  <li>Avoid tight connections — allow enough time between legs.</li>
                  <li>Beware of airline policies — use hidden city ticketing cautiously.</li>
                </ol>

                <h2 className="text-3xl font-bold mb-4 text-primary">Real-World Example</h2>
                <p className="text-lg mb-6 leading-relaxed">
                  Suppose a direct flight from Toronto to Hong Kong costs $1,200, but a ticket from Toronto to Los Angeles to Hong Kong costs $900 combined, and you only want to go as far as Los Angeles. By booking the latter and skipping the Hong Kong leg, you save $300. That’s synthetic routing and hidden city ticketing in action.
                </p>

                <h2 className="text-3xl font-bold mb-4 text-primary">Risks and Considerations</h2>
                <ul className="list-disc ml-8 mb-6">
                  <li>Risk of cancellations or delays — separate tickets mean less airline responsibility.</li>
                  <li>Checked luggage complications — best for carry-on only.</li>
                  <li>Airline backlash — some airlines penalize hidden city ticketing.</li>
                </ul>

                <h2 className="text-3xl font-bold mb-4 text-primary">Final Thoughts</h2>
                <p className="text-lg leading-relaxed">
                  Synthetic routing is a powerful travel hack that can help you unlock savings on flights, especially if you’re flexible and enjoy planning. It requires a bit more effort and risk awareness but can be well worth it for those looking to stretch their travel budget. Combine it with airline alliances, loyalty programs, and travel apps, and you’re well on your way to mastering the art of travel hacking.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Tag className="h-4 w-4 text-muted-foreground" />
            {["Travel Hacks", "Flight Booking", "Airlines"].map((tag) => (
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
              <span className="text-sm text-muted-foreground">Share this article:</span>
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

export default SyntheticRouting;
