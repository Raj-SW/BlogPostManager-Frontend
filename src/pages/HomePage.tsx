// src/pages/HomePage.tsx
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import BlogCard from "../components/BlogCard/BlogCard";
import {
  getAllBlogsAsync,
  searchBlogsAsync,
} from "../api/blogService/BlogService";
import { blogPost } from "../models/blogmodel/blogModels";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const [blogs, setBlogs] = useState<blogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  // Loads all blogs initially
  const fetchAllBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllBlogsAsync();
      setBlogs(data.resultObject);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Call the server-side search endpoint
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // If search term is empty, load all blogs
      if (!searchTerm.trim()) {
        await fetchAllBlogs();
        return;
      }
      const result = await searchBlogsAsync(searchTerm);
      setBlogs(result.resultObject);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOnReadMore = (blogPostDocumentId: string) => {
    navigate(`/blog/${blogPostDocumentId}`);
  };

  return (
    <>
      <section className="py-5 bg-light text-center">
        <Container>
          <h1 className="display-5 fw-bold mb-3">BlogPost</h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: "600px" }}>
            Welcome to BlogPost, where you can create and share your blogs.
          </p>
          <div className="mx-auto" style={{ maxWidth: "400px" }}>
            <Form className="d-flex" onSubmit={handleSearch}>
              <Form.Control
                type="text"
                placeholder="Search for articles..."
                aria-label="Search"
                className="me-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="primary" type="submit">
                <FaSearch />
              </Button>
            </Form>
          </div>
        </Container>
      </section>

      <main className="py-4">
        <Container>
          <Row>
            <Col md={12}>
              <h5 className="mb-4">All posts</h5>
              {loading && <p>Loading blogs...</p>}
              {error && <p className="text-danger">Error: {error}</p>}
              {!loading && !error && (
                <Row className="g-4">
                  {blogs.map((blog) => (
                    <Col md={6} lg={4} key={blog.blogPostDocumentId}>
                      <BlogCard
                        image={blog.thumbNailLink}
                        title={blog.title}
                        excerpt={blog.excerpt}
                        onReadMore={() =>
                          handleOnReadMore(blog.blogPostDocumentId)
                        }
                      />
                    </Col>
                  ))}
                </Row>
              )}
            </Col>
          </Row>
        </Container>
      </main>

      <section className="py-5 bg-white text-center">
        <Container>
          <h2 className="mb-3">Tune in for weekly blogs.</h2>
          <p className="mb-4 text-muted">
            Join us to get frequent updates on blogs.
          </p>
          <Form className="d-inline-flex flex-wrap justify-content-center gap-2">
            <Form.Control
              type="email"
              placeholder="Enter your email address"
              className="w-auto"
            />
            <Button variant="success">Subscribe to newsletter</Button>
          </Form>
        </Container>
      </section>
    </>
  );
};

export default HomePage;
