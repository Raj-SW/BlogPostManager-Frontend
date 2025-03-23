import axiosInstance from '../Axios/Axios';
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

// Dummy data array with local image imports
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

// Simulate an API call by returning a promise
export async function getBlogs(): Promise<Blog[]> {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      resolve(datablog);
    }, 500);
  });
}

export async function deleteBlog(blogId: number, token: string): Promise<void> {
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