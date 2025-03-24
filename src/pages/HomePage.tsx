import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import BlogCard from "../components/BlogCard/BlogCard";
import { getAllBlogsAsync } from "../api/blogService/BlogService";
import { blogPost } from "../models/blogmodel/blogModels";

const HomePage: React.FC = () => {
  const [blogs, setBlogs] = useState<blogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch blogs from "service" on mount
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

  return (
    <>
      {/* ======== HERO SECTION ======== */}
      <section className="py-5 bg-light text-center">
        <Container>
          <h1 className="display-5 fw-bold mb-3">Unplugged Journal</h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: "600px" }}>
            Everything you need to know about digital decluttering, wellbeing,
            and switching off every once in a while.
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

      {/* ======== MAIN CONTENT ======== */}
      <main className="py-4">
        <Container>
          <Row>
            {/* Sidebar: Tags / Categories */}
            <Col md={3} className="mb-4">
              <div className="border rounded p-3">
                <h5>All Tags</h5>
                <ul className="list-unstyled mt-3">
                  <li>
                    <a href="#" className="text-decoration-none">
                      Health &amp; Wellbeing
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-decoration-none">
                      Productivity
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-decoration-none">
                      Mindfulness
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-decoration-none">
                      Digital Detox Diaries
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-decoration-none">
                      Outdoor Adventures
                    </a>
                  </li>
                </ul>
              </div>
            </Col>

            {/* Blog Posts */}
            <Col md={9}>
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
                          console.log(
                            `Read more clicked for post ${blog.blogPostDocumentId}`
                          )
                        }
                      />
                    </Col>
                  ))}
                </Row>
              )}

              {/* Pagination */}
              <div className="d-flex justify-content-center mt-4">
                <nav>
                  <ul className="pagination">
                    <li className="page-item">
                      <a className="page-link" href="#">
                        Previous
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        Next
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </Col>
          </Row>
        </Container>
      </main>

      {/* ======== NEWSLETTER SECTION ======== */}
      <section className="py-5 bg-white text-center">
        <Container>
          <h2 className="mb-3">Tune Out. Every Tuesday.</h2>
          <p className="mb-4 text-muted">
            Join 20,000+ readers for topics, tips, and hacks about wellness.
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
