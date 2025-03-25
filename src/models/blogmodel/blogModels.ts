 export interface blogPost {
  blogPostDocumentId: string;
  title: string;
  content: string;
  excerpt: string;
  createdBy: string;
  createdDate?: Date;
  likes: number;
  isFeatured: boolean;
  tags: string[];
  thumbNailLink?: string;
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
