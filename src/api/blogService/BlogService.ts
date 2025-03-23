import { blogPost } from './../../models/blogmodel/blogModels';
import axiosInstance from '../axios/Axios';
import { multipleBlogResponse, singleBlogResponse } from '../../models/blogmodel/blogModels';
import img1 from "../../assets/BlogImages/blogimg1.webp";
import img2 from "../../assets/BlogImages/blogimage2.webp";
import img3 from "../../assets/BlogImages/blogimg3.webp";
import img4 from "../../assets/BlogImages/blogimg4.jpg";
import img5 from "../../assets/BlogImages/blogimg5.webp";
import img6 from "../../assets/BlogImages/blogimg6.webp";

// Blog interface
export interface Blog {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  alt: string;
  createdAt: string;
}

const datablog: Blog[] = [
  {
    id: 1,
    title: "Why You Should Try a Digital Detox",
    excerpt: "Taking a break from screens can boost your mood and creativity...",
    image: img1,
    alt: "Digital Detox",
    createdAt: "2025-03-01",
  },
  {
    id: 2,
    title: "5 Tips for Mindful Mornings",
    excerpt: "Kickstart your day with simple mindfulness practices...",
    image: img2,
    alt: "Mindful Mornings",
    createdAt: "2025-03-05",
  },
  {
    id: 3,
    title: "Nature Retreats for Rest and Rejuvenation",
    excerpt: "Explore cabins and retreats that help you disconnect...",
    image: img3,
    alt: "Nature Retreat",
    createdAt: "2025-03-10",
  },
  {
    id: 4,
    title: "How to Stay Productive Without Burning Out",
    excerpt: "Balance your workload and your wellness with these proven tips...",
    image: img4,
    alt: "Productivity Tips",
    createdAt: "2025-03-12",
  },
  {
    id: 5,
    title: "Unplug for Better Sleep",
    excerpt: "Learn how ditching devices before bed can dramatically improve your rest...",
    image: img5,
    alt: "Better Sleep",
    createdAt: "2025-03-15",
  },
  {
    id: 6,
    title: "Reconnecting with Hobbies in a Digital World",
    excerpt: "From painting to pottery—unplug and rediscover offline joys...",
    image: img6,
    alt: "Offline Hobbies",
    createdAt: "2025-03-20",
  },
];

export async function getBlogs(): Promise<Blog[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(datablog);
    }, 500);
  });
}

export async function getBlogAsync(blogId: string): Promise<singleBlogResponse> {
   try {
    const response = await axiosInstance.get<singleBlogResponse>(`Blog/GetBlogPostByIdAsync/${blogId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch blog');
  }
}

export async function getAllBlogsAsync(): Promise<multipleBlogResponse> {
   try {
    const response = await axiosInstance.get<multipleBlogResponse>(`Blog/GetAllBlogPostsAsync`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to delete blog');
  }
}

export async function deleteBlogByBlogIdAsync(blogId: number, token: string): Promise<void> {
  try {
    await axiosInstance.delete(`/Blog/DeletePostAsync/${blogId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to delete blog');
  }
}

export async function updateBlogByBlogIdAsync(blogId: string, blogData: blogPost, token: string): Promise<void> {
  try {
    await axiosInstance.post(`/Blog/UpdatePostAsync/${blogId}`, {
      data: {blogId, blogData},
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to delete blog');
  }
}