 export interface blogPost {
  blogId: string;
  title: string;
  content: string;
  excerpt: string;
  createdBy: string;
  createdDate: string;
  likes: number;
  isFeatured: boolean;
  tags: string[];
  thumbnailLink?: string;
}

export interface singleBlogResponse {
  errorMesage: [];
  isSuccess: boolean;
  resultObject: blogPost;
}
export interface multipleBlogResponse {
  errorMesage: [];
  isSuccess: boolean;
  resultObject: blogPost[];
}
