export interface UnsplashImage {
  id: string;
  slug: string;
  created_at: string;
  updated_at: string;
  promoted_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string | null;
  alt_description: string;
  breadcrumbs: any[]; // You might want to replace 'any' with a more specific type if you know the structure
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
    small_s3: string;
  };
  links: {
    self: string;
    html: string;
    download: string;
    download_location: string;
  };
  likes: number;
  liked_by_user: boolean;
  current_user_collections: any[]; // You might want to replace 'any' with a more specific type if you know the structure
  sponsorship: any | null; // You might want to replace 'any' with a more specific type if you know the structure
  topic_submissions: Record<string, any>; // You might want to replace 'any' with a more specific type if you know the structure
  user: UnsplashImageUser;
  exif: {
    make: string;
    model: string;
    name: string;
    exposure_time: string;
    aperture: string;
    focal_length: string;
    iso: number;
  };
  location: {
    name: string | null;
    city: string | null;
    country: string | null;
    position: {
      latitude: number;
      longitude: number;
    };
  };
  meta: {
    index: boolean;
  };
  public_domain: boolean;
  tags: Tag[];
  tags_preview: Tag[];
  views: number;
  downloads: number;
  topics: any[]; // You might want to replace 'any' with a more specific type if you know the structure
}

export interface UnsplashImageUser {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  twitter_username: string;
  portfolio_url: string;
  bio: string;
  location: string;
  links: {
    self: string;
    html: string;
    photos: string;
    likes: string;
    portfolio: string;
    following: string;
    followers: string;
  };
  profile_image: {
    small: string;
    medium: string;
    large: string;
  };
  instagram_username: string;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  total_promoted_photos: number;
  accepted_tos: boolean;
  for_hire: boolean;
  social: {
    instagram_username: string;
    portfolio_url: string;
    twitter_username: string;
    paypal_email: string | null;
  };
}

interface Tag {
  type: string;
  title: string;
  source?: any; // You might want to replace 'any' with a more specific type if you know the structure
}
