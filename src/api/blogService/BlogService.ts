import axiosInstance from '../axios/Axios';
import { multipleBlogResponse, singleBlogResponse, blogPost } from '../../models/blogmodel/blogModels';

export async function getAllBlogsAsync(): Promise<multipleBlogResponse> {
   try {
    const response = await axiosInstance.get<multipleBlogResponse>(`Blog/GetAllBlogPostsAsync`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to delete blog');
  }
}

export async function createBlogPostAsync(
  blogData: blogPost,
  thumbnail: File | null,
  token: string
): Promise<void> {
  const formData = new FormData();

  formData.append("title", blogData.title);
  formData.append("excerpt", blogData.excerpt);
  formData.append("content", blogData.content);

  blogData.tags.forEach(tag => {
    formData.append("tags", tag);
  });

  if (thumbnail) {
    formData.append("file", thumbnail);
  }

  try {
    await axiosInstance.post("Blog/CreateBlogPostAsync", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    });
  } catch (error: any) {
    console.error(error)
  }
}

export async function GetBlogPostByIdAsync(blogId: string): Promise<singleBlogResponse> {
  try {
    const response = await axiosInstance.get(`Blog/GetBlogPostByBlogPostIdAsync/${blogId}`, {
      headers: {},
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch blog");
  }
}

export async function getAllSelfBlogsAsync(token: string): Promise<multipleBlogResponse> {
  try {
    const response = await axiosInstance.get<multipleBlogResponse>(
      'Blog/GetAllBlogPostByUserNameAsync',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch your blogs');
  }
}

export async function deleteBlogByBlogIdAsync(blogId: string, token: string | null): Promise<void> {
  try {
    await axiosInstance.post(`Blog/DeletePostAsync/${blogId}`, {}, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  } catch (error: any) {
    console.error(error);
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

export async function searchBlogsAsync(searchCriteria: string): Promise<multipleBlogResponse> {
  try {
    const response = await axiosInstance.get<multipleBlogResponse>(
      `Blog/SearchBlogAsync?searchCriteria=${encodeURIComponent(searchCriteria)}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to search blogs");
  }
}