'use client';

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, User, Calendar, Share2, BookOpen, Tag } from "lucide-react";
import Link from "next/link";

const TravelHackingForBeginners = () => {
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
              <Badge variant="secondary">Miles & Rewards</Badge>
              <Badge variant="outline">Featured</Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              How to Maximize Your Rove Miles: A Complete Guide
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Learn the best strategies to earn, redeem, and maximize the value of your Rove Miles for premium flights and upgrades.
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Rove Team</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>August 9, 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>8 min read</span>
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
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold text-foreground mb-6 text-primary">
                  Introduction
                </h2>
                <p className="text-lg text-foreground mb-8 leading-relaxed">
                  Rove Miles are one of the most valuable currencies in the travel world,
                  offering incredible opportunities to upgrade your travel experience
                  without breaking the bank. In this comprehensive guide, we'll explore
                  everything you need to know about maximizing your Rove Miles.
                </p>

                <h2 className="text-3xl font-bold text-foreground mb-6 text-primary">
                  Understanding Rove Miles
                </h2>
                <p className="text-lg text-foreground mb-8 leading-relaxed">
                  Rove Miles are loyalty points earned through the Rove travel platform.
                  Unlike traditional airline miles, Rove Miles can be used across multiple
                  airlines and travel partners, making them incredibly flexible and
                  valuable.
                </p>

                <h3 className="text-2xl font-semibold text-foreground mb-4 text-primary">
                  How to Earn Rove Miles
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">✈️ Flight Bookings</h4>
                    <p className="text-muted-foreground">Earn miles on every flight booked through Rove</p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">🏨 Hotel Stays</h4>
                    <p className="text-muted-foreground">Accumulate miles on hotel bookings</p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">🚗 Car Rentals</h4>
                    <p className="text-muted-foreground">Earn miles on transportation services</p>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">🛍️ Partner Purchases</h4>
                    <p className="text-muted-foreground">Shop with Rove partners to earn additional miles</p>
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-foreground mb-6 text-primary">
                  Redemption Strategies
                </h2>
                <p className="text-lg text-foreground mb-8 leading-relaxed">
                  The key to maximizing Rove Miles is understanding when and how to redeem
                  them. Here are our top strategies:
                </p>

                <div className="space-y-6 mb-8">
                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-2xl font-semibold text-foreground mb-3">
                      1. Premium Cabin Upgrades
                    </h3>
                    <p className="text-lg text-foreground leading-relaxed">
                      Use your miles to upgrade from economy to premium economy, business, or
                      first class. This often provides the highest value per mile.
                    </p>
                  </div>

                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-2xl font-semibold text-foreground mb-3">
                      2. Last-Minute Bookings
                    </h3>
                    <p className="text-lg text-foreground leading-relaxed">
                      Redeem miles for last-minute flights when cash prices are typically
                      highest. This can provide exceptional value.
                    </p>
                  </div>

                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-2xl font-semibold text-foreground mb-3">
                      3. Peak Season Travel
                    </h3>
                    <p className="text-lg text-foreground leading-relaxed">
                      Use miles during peak travel seasons when cash prices are inflated,
                      maximizing your savings.
                    </p>
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-foreground mb-6 text-primary">
                  Advanced Techniques
                </h2>
                <p className="text-lg text-foreground mb-6 leading-relaxed">
                  For experienced travelers, consider these advanced strategies:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-foreground mb-3 text-primary">
                        🚀 Mileage Runs
                      </h3>
                      <p className="text-foreground leading-relaxed">
                        Strategic flights designed specifically to earn miles, often at a lower
                        cost than purchasing miles directly.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-foreground mb-3 text-primary">
                        🎯 Sweet Spots
                      </h3>
                      <p className="text-foreground leading-relaxed">
                        Identify routes where Rove Miles provide exceptional value compared to
                        cash prices.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <h2 className="text-3xl font-bold text-foreground mb-6 text-primary">
                  Common Mistakes to Avoid
                </h2>
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 mb-8">
                  <ul className="space-y-3 text-lg text-foreground">
                    <li className="flex items-start gap-3">
                      <span className="text-destructive font-bold">✗</span>
                      <span>Redeeming miles for low-value rewards</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-destructive font-bold">✗</span>
                      <span>Not considering taxes and fees</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-destructive font-bold">✗</span>
                      <span>Ignoring expiration dates</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-destructive font-bold">✗</span>
                      <span>Failing to compare cash vs. miles value</span>
                    </li>
                  </ul>
                </div>

                <h2 className="text-3xl font-bold text-foreground mb-6 text-primary">
                  Conclusion
                </h2>
                <p className="text-lg text-foreground mb-8 leading-relaxed">
                  With the right strategies, Rove Miles can transform your travel
                  experience. Focus on high-value redemptions, stay flexible with your
                  travel dates, and always compare the cash value before redeeming.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Tag className="h-4 w-4 text-muted-foreground" />
            {["Rove Miles", "Travel Tips", "Rewards", "Loyalty Programs"].map((tag) => (
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
      </div>
    </div>
  );
};

export default TravelHackingForBeginners;
