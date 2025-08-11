export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  readTime: string;
  category: string;
  tags: string[];
  featured: boolean;
  image: string;
}

export interface BlogCategory {
  name: string;
  slug: string;
  description: string;
  postCount: number;
}

export interface BlogTag {
  name: string;
  slug: string;
  postCount: number;
}

export interface BlogFilters {
  searchQuery: string;
  selectedCategory: string;
  selectedTags: string[];
}
