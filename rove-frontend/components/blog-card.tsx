import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, User, ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { BlogPost } from '@/types/blog';

interface BlogCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured' | 'compact';
  showImage?: boolean;
}

export default function BlogCard({ post, variant = 'default', showImage = true }: BlogCardProps) {
  if (variant === 'featured') {
    return (
      <Card className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="secondary">{post.category}</Badge>
              {post.featured && (
                <Badge variant="default">Featured</Badge>
              )}
            </div>
            <CardTitle className="text-2xl mb-3">{post.title}</CardTitle>
            <CardDescription className="text-base mb-4">
              {post.excerpt}
            </CardDescription>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {post.author}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </div>
            </div>
            <Link href={`/blog/${post.slug}`}>
              <Button className="w-full md:w-auto">
                Read Article
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
          {showImage && (
            <div className="bg-muted rounded-r-lg flex items-center justify-center">
              <div className="text-muted-foreground text-center p-8">
                <BookOpen className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Article Image</p>
              </div>
            </div>
          )}
        </div>
      </Card>
    );
  }

  if (variant === 'compact') {
    return (
      <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
        <CardHeader className="flex-1 pb-3">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="text-xs">
              {post.category}
            </Badge>
            {post.featured && (
              <Badge variant="secondary" className="text-xs">
                Featured
              </Badge>
            )}
          </div>
          <CardTitle className="text-base mb-2 line-clamp-2">
            {post.title}
          </CardTitle>
          <CardDescription className="line-clamp-2 text-sm">
            {post.excerpt}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {post.author}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readTime}
            </div>
          </div>
          <Link href={`/blog/${post.slug}`}>
            <Button variant="outline" size="sm" className="w-full">
              Read More
              <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  // Default variant
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      {showImage && (
        <div className="bg-muted h-48 rounded-t-lg flex items-center justify-center">
          <div className="text-muted-foreground text-center p-4">
            <BookOpen className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Article Image</p>
          </div>
        </div>
      )}
      <CardHeader className="flex-1">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="outline" className="text-xs">
            {post.category}
          </Badge>
          {post.featured && (
            <Badge variant="secondary" className="text-xs">
              Featured
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg mb-2 line-clamp-2">
          {post.title}
        </CardTitle>
        <CardDescription className="line-clamp-3">
          {post.excerpt}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {post.author}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.readTime}
          </div>
        </div>
        <Link href={`/blog/${post.slug}`}>
          <Button variant="outline" className="w-full">
            Read More
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
