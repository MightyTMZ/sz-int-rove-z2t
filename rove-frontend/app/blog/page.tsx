'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, BookOpen } from 'lucide-react';
import BlogCard from '@/components/blog-card';

// Sample blog data - in a real app, this would come from a CMS or API
const blogPosts = [
  {
    id: 1,
    slug: "maximize-rove-miles-complete-guide",
    title: "How to Maximize Your Rove Miles: A Complete Guide",
    excerpt: "Learn the best strategies to earn, redeem, and maximize the value of your Rove Miles for premium flights and upgrades.",
    content: "Full article content would go here...",
    author: "Rove Team",
    publishDate: "2025-08-09",
    readTime: "5 min read",
    category: "Miles & Rewards",
    tags: ["Rove Miles", "Travel Tips", "Rewards"],
    featured: true,
    image: "/rove_miles_banner.avif"
  },
  {
    id: 2,
    slug: "airline-alliances-star-alliance-vs-oneworld-vs-skyteam",
    title: "Airline Alliances: Star Alliance vs OneWorld vs SkyTeam",
    excerpt: "Discover how airline alliances work and which one might be best for your travel patterns and loyalty program preferences.",
    content: "Full article content would go here...",
    author: "Tom Zhang",
    publishDate: "2025-08-12",
    readTime: "6 min read",
    category: "Airline Guide",
    tags: ["Airlines", "Alliances", "Loyalty Programs"],
    featured: false,
    image: "/airline_alliances.avif"
  },
  {
    id: 3,
    slug: "what-is-premium-economy",
    title: "What is Premium Economy? A Young Traveler's Guide",
    excerpt: "Compare premium economy offerings across major airlines and learn when this class provides the best value for your money.",
    content: "Full article content would go here...",
    author: "Landon Turk",
    publishDate: "2025-08-11",
    readTime: "7 min read",
    category: "Cabin Classes",
    tags: ["Premium Economy", "Upgrades", "Value"],
    featured: false,
    image: "/premium_economy.avif"
  },
  {
    id: 4,
    slug: "synthetic-routing",
    title: "What is Synthetic Routing?",
    excerpt: "Learn how to creatively piece together flight segments to save money and fly smarter.",
    content: "Full article content would go here...",
    author: "Tom Zhang",
    publishDate: "2025-08-12",
    readTime: "6 min read",
    category: "Booking Tips",
    tags: ["Travel Hacks", "Flight Booking", "Airlines"],
    featured: false,
    image: "https://www.bentley.com/wp-content/uploads/elementor/thumbs/thumbnail-openpaths-agent-testimonial-3-680x400-1-r94vo6d73vds9z6df4m1qa387hax8vs8n9ikohw0i4.jpg"
  },
  // {
  //   id: 5,
  //   slug: "hidden-city-ticketing-pros-cons-legal-considerations",
  //   title: "Hidden City Ticketing: The Pros, Cons, and Legal Considerations",
  //   excerpt: "Explore the controversial practice of hidden city ticketing and understand when it might work for savvy travelers.",
  //   content: "Full article content would go here...",
  //   author: "Legal Travel Expert",
  //   publishDate: "2024-01-03",
  //   readTime: "15 min read",
  //   category: "Advanced Strategies",
  //   tags: ["Hidden City", "Legal", "Advanced"],
  //   featured: false,
  //   image: "/api/placeholder/400/250"
  // },
  // {
  //   id: 6,
  //   slug: "airport-lounge-access-how-to-get-in-without-premium-ticket",
  //   title: "Airport Lounge Access: How to Get In Without a Premium Ticket",
  //   excerpt: "Discover multiple ways to access airport lounges, from credit card benefits to day passes and membership programs.",
  //   content: "Full article content would go here...",
  //   author: "Lounge Expert",
  //   publishDate: "2024-01-01",
  //   readTime: "7 min read",
  //   category: "Airport Experience",
  //   tags: ["Lounges", "Credit Cards", "Membership"],
  //   featured: false,
  //   image: "/api/placeholder/400/250"
  // }
];

const categories = [
  "All",
  "Miles & Rewards",
  "Airline Guide", 
  "Cabin Classes",
  "Booking Tips",
  "Advanced Strategies",
  "Airport Experience"
];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get all unique tags from blog posts
  const allTags = Array.from(new Set(blogPosts.flatMap(post => post.tags)));

  // Filter blog posts based on search, category, and tags
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => post.tags.includes(tag));

    return matchesSearch && matchesCategory && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedTags([]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Rove Travel Blog
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Expert insights, travel tips, and strategies to help you become a smarter traveler
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles, authors, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Tag Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {allTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "secondary"}
                className={`cursor-pointer hover:opacity-80 ${
                  selectedTags.includes(tag) ? "bg-primary" : "bg-secondary"
                }`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Clear Filters */}
          {(searchQuery || selectedCategory !== 'All' || selectedTags.length > 0) && (
            <div className="text-center">
              <Button variant="outline" onClick={clearAllFilters}>
                Clear All Filters
              </Button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6 text-center">
          <p className="text-muted-foreground">
            {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Featured Article */}
        {filteredPosts.filter(post => post.featured).length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
              Featured Article
            </h2>
            {filteredPosts.filter(post => post.featured).map((post) => (
              <BlogCard key={post.id} post={post} variant="featured" showImage={true}/>
            ))}
          </div>
        )}

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.filter(post => !post.featured).map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No articles found
            </h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or filters.
            </p>
            <Button onClick={clearAllFilters}>
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
