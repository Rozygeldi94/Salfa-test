export interface IProductComment {
  rating: number;
  postId: string | undefined;
  comment_id: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface IProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  brand?: string;
  stock?: number;
  rating: number;
  images: Record<number, string>[];
  isLiked?: boolean;
  thumbnail?: string;
  reviews: IProductComment[];
}

export interface IProductCards {
  products: IProduct[];
}
