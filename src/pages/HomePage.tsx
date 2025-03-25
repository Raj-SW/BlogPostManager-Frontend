import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import BlogCard from "../components/BlogCard/BlogCard";
import { getAllBlogsAsync } from "../api/blogService/BlogService";
import { blogPost } from "../models/blogmodel/blogModels";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const [blogs, setBlogs] = useState<blogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllBlogsAsync();
        setBlogs(data.resultObject);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleonReadMore = (blogPostDocumentId: string) => {
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

          {/* Responsive Search Bar */}
          <div className="mx-auto" style={{ maxWidth: "400px" }}>
            <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
              <Form.Control
                type="text"
                placeholder="Search for articles..."
                aria-label="Search"
                className="me-2"
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
                          handleonReadMore(blog.blogPostDocumentId)
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
