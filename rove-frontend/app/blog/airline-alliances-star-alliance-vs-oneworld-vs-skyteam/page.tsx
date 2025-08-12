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

const AirlineAlliances = () => {
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
              What are Airline Alliances?{" "}
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Learn the best strategies to earn, redeem, and maximize the value
              of your Rove Miles for premium flights and upgrades.
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Tom from Rove Team</span>
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
                  Airline alliances are strategic partnerships between multiple
                  airlines that are allowed them to pool resources, share
                  routes, and offer seamless travel experiences to passengers.
                  These partnerships enable airlines to expand their global
                  reach without having to operate flights at every destination.
                  In addition, they allow shared loyalty programs.{" "}
                </p>
                <h2 className="text-3xl font-bold text-foreground mb-6 text-primary">
                  Tom's Personal Experience with Star Alliance
                </h2>
                <p className="text-lg text-foreground mb-8 leading-relaxed">
                  "I was traveling from Toronto to Hong Kong with a layover in
                  San Francisco. Our flight from Toronto was delayed by two
                  hours, leaving us with only an hour to catch our connecting
                  flight. My family and I were worried we’d miss it, but thanks
                  to the alliance between Air Canada and United Airlines, they
                  actually delayed the flight for us along with the other
                  passengers who were on the same itinerary. It was a relief and
                  a great demonstration of the benefits of being part of such a
                  large alliance."
                </p>
                <h2 className="text-3xl font-bold text-foreground mb-6 text-primary">
                  Big Three: A Quick Historical Overview{" "}
                </h2>
                <p className="text-lg text-foreground mb-8 leading-relaxed">
                  The modern airline alliance landscape is dominated by three
                  major players, each formed in response to increased
                  globalization and passenger demand for a more cohesive and
                  seamless international travel experience.
                  <br />
                  <br />
                  <strong>Star Alliance</strong> led the charge as the first
                  global aviation alliance, launching on May 15, 1997 with five
                  founding airlines across three continents (Air Canada,
                  Lufthansa, Scandinavian Airlines, Thai Airways International,
                  United Airlines).
                  <br />
                  <br />
                  <strong>OneWorld</strong> followed in 1999 and positioned
                  itself as a premium alliance focused on high-quality service.
                  <br />
                  <br />
                  <strong>SkyTeam</strong> completed the trio in June 2000,
                  becoming the last of the three major alliances.
                  <br />
                  <br />
                  Today, the big three serve over 60 airlines across the world
                  and billions of passengers annually.
                </p>

                <hr />
                <h3 className="text-2xl font-bold text-foreground mb-6 text-primary mt-6">
                  Star Alliance
                </h3>
                <Image
                  src="https://travelingformiles.com/wp-content/uploads/2020/01/star-alliance-741.png"
                  alt="Star Alliance Map"
                  width={800}
                  height={400}
                  className="rounded-lg mb-6"
                />
                <h4 className="text-xl font-bold mb-4">Key Members (2025)</h4>
                <ul className="list-disc ml-8 mb-6">
                  <li>United Airlines (USA) – Major hub carrier</li>
                  <li>Lufthansa (Germany) – European powerhouse</li>
                  <li>Air Canada (Canada) – North American coverage</li>
                  <li>
                    Singapore Airlines (Singapore) – Asian premium carrier
                  </li>
                  <li>ANA (Japan) – Japanese market leader</li>
                  <li>Turkish Airlines (Turkey) – Expanding global reach</li>
                  <li>
                    Swiss International (Switzerland) – Premium European service
                  </li>
                  <li>
                    Austrian Airlines (Austria) – Central European connectivity
                  </li>
                  <li>Copa Airlines (Panama) – Latin American connectivity</li>
                  <li>And 15+ additional carriers worldwide</li>
                </ul>
                <h4 className="text-xl font-bold mb-4">Network Strength</h4>
                <ul className="list-disc ml-8 mb-6">
                  <li>Europe – Dominated by the Lufthansa Group</li>
                  <li>Asia-Pacific – Singapore Airlines, ANA</li>
                  <li>North America – United, Air Canada</li>
                  <li>
                    Emerging Markets – Turkish Airlines coverage to Africa,
                    Middle East
                  </li>
                </ul>
                <h4 className="text-xl font-bold mb-4">
                  Benefits for Travelers
                </h4>
                <ul className="list-disc ml-8 mb-6">
                  <li>
                    Reciprocal Elite Status – Achieve status with one airline
                    and enjoy benefits across all member airlines
                  </li>
                  <li>
                    Lounge Access – Access to over 1,000 airport lounges
                    worldwide
                  </li>
                  <li>
                    Miles Earning and Redemption – Earn and redeem miles across
                    the entire network
                  </li>
                  <li>
                    Priority Services – Check-in, boarding, and baggage handling
                    benefits
                  </li>
                  <li>
                    Round-the-World Tickets – Comprehensive global routing
                    options
                  </li>
                </ul>

                <hr />
                {/* OneWorld */}
                <h3 className="text-2xl font-bold text-foreground mb-6 text-primary mt-6">
                  OneWorld: The Premium Alliance
                </h3>
                <Image
                  src="https://www.headforpoints.com/wp-content/uploads/2022/09/oneworld-airlines-tail-fins.webp"
                  alt="OneWorld Map"
                  width={800}
                  height={400}
                  className="rounded-lg mb-6"
                />
                <h4 className="text-xl font-bold mb-4">Key Members (2025)</h4>
                <ul className="list-disc ml-8 mb-6">
                  <li>American Airlines (USA)</li>
                  <li>British Airways (UK)</li>
                  <li>Qatar Airways (Qatar)</li>
                  <li>Cathay Pacific (Hong Kong)</li>
                  <li>Qantas (Australia)</li>
                  <li>Japan Airlines (Japan)</li>
                  <li>Iberia (Spain)</li>
                  <li>Finnair (Finland)</li>
                  <li>Alaska Airlines (USA)</li>
                  <li>Royal Air Maroc (Morocco)</li>
                  <li>Malaysian Airlines (Malaysia)</li>
                  <li>Fiji Airways – joining March 2025</li>
                </ul>
                <h4 className="text-xl font-bold mb-4">
                  Network Characteristics
                </h4>
                <ul className="list-disc ml-8 mb-6">
                  <li>
                    Premium Focus – Known for high-quality service standards
                    across members
                  </li>
                  <li>
                    Business Travel – Strong presence in major business centers
                    globally
                  </li>
                  <li>
                    Transatlantic Strength – Excellent US-Europe connectivity
                    via American–British Airways partnership
                  </li>
                  <li>
                    Asia-Pacific Premium – Qatar Airways and Cathay Pacific
                    provide luxury options to Asia
                  </li>
                  <li>
                    Strategic Gaps – Fewer options in some emerging markets
                    compared to competitors
                  </li>
                </ul>

                <h4 className="text-xl font-bold mb-4">Unique Advantages</h4>
                <ul className="list-disc ml-8 mb-6">
                  <li>
                    Service Quality – Generally higher service standards across
                    member airlines
                  </li>
                  <li>
                    Premium Cabin Focus – Excellent business and first-class
                    product consistency
                  </li>
                  <li>
                    Hub Strategy – Well-positioned major hubs (London Heathrow,
                    Hong Kong, Doha)
                  </li>
                  <li>
                    Award Availability – Often better premium cabin award
                    availability than competitors
                  </li>
                </ul>

                <hr />
                {/* SkyTeam */}
                <h3 className="text-2xl font-bold text-foreground mb-6 text-primary mt-6">
                  SkyTeam: The Diverse Network
                </h3>
                <Image
                  src="https://www.saudia.com/pages/-/media/Project/SA/SC/SAUDIA/Pages/travel-with-saudia/skyteam-2025-apr.png?h=355&w=585&rev=0f42a37b12da4bcca259eb5349e8567e&hash=E5869FA9F4006AA60ADBFCA6368C847B"
                  alt="SkyTeam Map"
                  width={800}
                  height={400}
                  className="rounded-lg mb-6"
                />
                <h4 className="text-xl font-bold mb-4">Key Members (2025)</h4>
                <ul className="list-disc ml-8 mb-6">
                  <li>Delta Air Lines (USA)</li>
                  <li>Air France-KLM (France/Netherlands)</li>
                  <li>China Eastern (China)</li>
                  <li>Korean Air (South Korea)</li>
                  <li>Aeroméxico (Mexico)</li>
                  <li>Virgin Atlantic (UK)</li>
                  <li>Garuda Indonesia (Indonesia)</li>
                  <li>Kenya Airways (Kenya)</li>
                  <li>SAS (Scandinavia) – joined from Star Alliance in 2024</li>
                  <li>China Airlines (Taiwan)</li>
                  <li>Saudia (Saudi Arabia)</li>
                </ul>
                <h4 className="text-xl font-bold mb-4">Recent Changes</h4>
                <p className="mb-6">
                  The alliance has seen significant membership changes recently.
                  SAS switched from Star Alliance to SkyTeam in September 2024,
                  while Czech Airlines left SkyTeam in October 2024. Most
                  notably, ITA Airways (Italy's flag carrier) left SkyTeam and
                  is expected to join Star Alliance in 2026 following
                  Lufthansa's acquisition.
                </p>

                <h4 className="text-xl font-bold mb-4">Network Profile</h4>
                <ul className="list-disc ml-8 mb-6">
                  <li>
                    <strong>Emerging Markets:</strong> Strong presence in
                    developing aviation markets
                  </li>
                  <li>
                    <strong>China Access:</strong> Excellent connectivity to
                    China through China Eastern
                  </li>
                  <li>
                    <strong>European Hubs:</strong> Paris CDG and Amsterdam
                    Schiphol provide strong European coverage
                  </li>
                  <li>
                    <strong>Diverse Geography:</strong> Members span all
                    continents with varied service levels
                  </li>
                </ul>
                <hr />
                <h2 className="text-3xl font-bold text-foreground mb-6 text-primary mt-6">
                  Comparative Analysis: Which Alliance Is Best?
                </h2>
                <div className="prose max-w-none">
                  <h2>For North American Travelers</h2>
                  <ul className="list-disc ml-8 mb-6">
                    <li>
                      <strong>Star Alliance:</strong> Best for comprehensive
                      global coverage, especially if you value United&apos;s
                      domestic network
                    </li>
                    <li>
                      <strong>OneWorld:</strong> Ideal for premium travel and
                      transatlantic routes via American Airlines and British
                      Airways
                    </li>
                    <li>
                      <strong>SkyTeam:</strong> Good option for Delta loyalists
                      and those traveling frequently to Asia or emerging markets
                    </li>
                  </ul>

                  <h2>For European Travelers</h2>
                  <ul className="list-disc ml-8 mb-6">
                    <li>
                      <strong>Star Alliance:</strong> Lufthansa Group dominance
                      provides extensive European coverage
                    </li>
                    <li>
                      <strong>OneWorld:</strong> British Airways offers strong
                      connectivity, especially for premium travelers
                    </li>
                    <li>
                      <strong>SkyTeam:</strong> Air France-KLM partnership
                      provides competitive European hub access
                    </li>
                  </ul>

                  <h2>For Asian Travelers</h2>
                  <ul className="list-disc ml-8 mb-6">
                    <li>
                      <strong>Star Alliance:</strong> Singapore Airlines and ANA
                      provide excellent premium service
                    </li>
                    <li>
                      <strong>OneWorld:</strong> Qatar Airways and Cathay
                      Pacific offer luxury Middle East and Asia connectivity
                    </li>
                    <li>
                      <strong>SkyTeam:</strong> Strong China access through
                      China Eastern and Korean Air
                    </li>
                  </ul>

                  <h2>For Global Business Travelers</h2>
                  <p className="mb-6">
                    OneWorld generally wins for premium service consistency and
                    business-focused routes, while Star Alliance offers the most
                    comprehensive global network. SkyTeam provides good value
                    and access to emerging markets.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Tag className="h-4 w-4 text-muted-foreground" />
            {["Airlines", "Alliances", "Loyalty Programs"].map((tag) => (
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

export default AirlineAlliances;
