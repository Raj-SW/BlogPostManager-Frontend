// src/pages/DashBoard.tsx
import React, { useEffect, useState } from "react";
import { Container, Button, Form, Tabs, Tab } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import {
  deleteBlogByBlogIdAsync,
  getAllSelfBlogsAsync,
} from "../api/blogService/BlogService";
import CreateEditBlogPost from "../components/CreateEditBlog/CreateEditBlog";
import UserBlogsTable from "../components/UserBlogsTable/UserBlogsTable";
import { blogPost } from "../models/blogmodel/blogModels";
import { useNavigate } from "react-router-dom";

const DashBoard: React.FC = () => {
  const [blogs, setBlogs] = useState<blogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = React.useState<string | null>(
    localStorage.getItem("token")
  );
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }
        const data = await getAllSelfBlogsAsync(token);
        setBlogs(data.resultObject);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleEdit = (blogId: string) => {};

  const handleDelete = async (blogId: string) => {
    try {
      await deleteBlogByBlogIdAsync(blogId, token);
      setBlogs((prev) => prev.filter((b) => b.blogPostDocumentId !== blogId));
    } catch (err: any) {
      console.error(err.message || "Error deleting blog");
    }
  };

  const handleOnView = (blogPostDocumentId: string) => {
    navigate(`/blog/${blogPostDocumentId}`);
  };

  return (
    <>
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
                loading={false}
                error={null}
                onEdit={(id) => console.log("edit", id)}
                onDelete={handleDelete}
                onView={(id) => handleOnView(id)}
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
