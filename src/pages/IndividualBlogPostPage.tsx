// src/pages/IndividualBlogPostPage.tsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetBlogPostByIdAsync } from "../api/blogService/BlogService";
import { blogPost } from "../models/blogmodel/blogModels";
import { Container } from "react-bootstrap";

const IndividualBlogPostPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<blogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      navigate("/notfound");
      return;
    }

    async function fetchBlog() {
      try {
        setLoading(true);
        const response = await GetBlogPostByIdAsync(id!);

        if (!response || !response.resultObject) {
          navigate("/notfound");
        } else {
          setBlog(response.resultObject);
        }
      } catch (err) {
        navigate("/notfound");
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [id, navigate]);

  if (loading) {
    return <Container className="py-5">Loading...</Container>;
  }

  if (!blog) {
    return null;
  }

  return (
    <Container className="py-5">
      <h1 className="mb-3">{blog.title}</h1>
      <p className="text-muted">
        Created by {blog.createdBy} on{" "}
        {new Date(blog.createdDate).toLocaleDateString()}
      </p>
      {blog.thumbNailLink && (
        <div className="my-4">
          <img
            src={blog.thumbNailLink}
            alt={blog.title}
            className="img-fluid"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        </div>
      )}
      <div dangerouslySetInnerHTML={{ __html: blog.content }} />
    </Container>
  );
};
export default IndividualBlogPostPage;
