// src/pages/DashBoard.tsx
import React, { useEffect, useState } from "react";
import { Container, Button, Form, Tabs, Tab } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { Blog, getBlogs } from "../api/blogService/BlogService";
import { useNavigate } from "react-router-dom";
import CreateEditBlogPost from "../components/CreateEditBlog/CreateEditBlog";
import UserBlogsTable from "../components/UserBlogsTable/UserBlogsTable";

const DashBoard: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch blogs from service on mount
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getBlogs();
        setBlogs(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Handlers for blog actions
  const handleEdit = (blogId: number) => {
    navigate(`/CreateEditBlogPost?blogId=${blogId}`);
  };

  const handleDelete = (blogId: number) => {
    console.log(`Delete clicked for blog ${blogId}`);
  };

  const handleSetInactive = (blogId: number) => {
    console.log(`Set inactive clicked for blog ${blogId}`);
  };

  return (
    <>
      {/* ======== HERO SECTION ======== */}
      <section className="py-5 bg-light text-center">
        <Container>
          <h1 className="display-5 fw-bold mb-3">@User name here</h1>
          <h3 className="display-6 fw-bold mb-3">
            First name and last name here
          </h3>
          <p className="lead text-muted mx-auto" style={{ maxWidth: "600px" }}>
            User About here
          </p>
          <p className="lead text-muted mx-auto" style={{ maxWidth: "600px" }}>
            Email here
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
          <Tabs
            defaultActiveKey="myBlogs"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="myBlogs" title="My Blogs">
              <UserBlogsTable
                blogs={blogs}
                loading={loading}
                error={error}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onSetInactive={handleSetInactive}
              />
            </Tab>
            <Tab eventKey="createBlog" title="Create Blog">
              <CreateEditBlogPost />
            </Tab>
            <Tab eventKey="profile" title="Profile">
              Tab content for Profile
            </Tab>
          </Tabs>
        </Container>
      </main>
    </>
  );
};

export default DashBoard;
