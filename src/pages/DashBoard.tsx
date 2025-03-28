import React, { useEffect, useState } from "react";
import { Container, Button, Form, Tabs, Tab } from "react-bootstrap";
import {
  deleteBlogByBlogIdAsync,
  getAllSelfBlogsAsync,
} from "../api/blogService/BlogService";
import CreateEditBlogPost from "../components/CreateEditBlog/CreateEditBlog";
import UserBlogsTable from "../components/UserBlogsTable/UserBlogsTable";
import { blogPost } from "../models/blogmodel/blogModels";
import { useNavigate } from "react-router-dom";
import { useAppSelector, RootState } from "../Service/statemanagement/store";

const DashBoard: React.FC = () => {
  const [blogs, setBlogs] = useState<blogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const user = useAppSelector((state: RootState) => state.auth.user);
  const storedUserName =
    user?.userName || localStorage.getItem("userName") || "User name here";
  const storedFirstName =
    user?.firstName || localStorage.getItem("firstName") || "First name";
  const storedLastName =
    user?.lastName || localStorage.getItem("lastName") || "Last name";
  const storedEmail =
    user?.email || localStorage.getItem("email") || "Email here";

  useEffect(() => {
    if (!token) {
      navigate("/unauthorized");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getAllSelfBlogsAsync(token);
        setBlogs(data.resultObject);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, navigate]);

  const handleEdit = (blogId: string) => {
    // TODO: handle edit of post here
  };

  const handleDelete = async (blogId: string) => {
    try {
      await deleteBlogByBlogIdAsync(blogId, token!);
      setBlogs((prev) =>
        prev.filter((blog) => blog.blogPostDocumentId !== blogId)
      );
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
          <h1 className="display-5 fw-bold mb-3">
            Hello user @{storedUserName}
          </h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: "600px" }}>
            Welcome to your dashboard.
          </p>
          <p className="lead text-muted mx-auto" style={{ maxWidth: "600px" }}>
            {storedEmail}
          </p>
        </Container>
      </section>

      <main className="py-4">
        <Container>
          <Tabs defaultActiveKey="myBlogs" id="dashboard-tabs" className="mb-3">
            <Tab eventKey="myBlogs" title="My Blogs">
              <UserBlogsTable
                blogs={blogs}
                loading={loading}
                error={error}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleOnView}
              />
            </Tab>
            <Tab eventKey="createBlog" title="Create Blog">
              <CreateEditBlogPost />
            </Tab>
          </Tabs>
        </Container>
      </main>
    </>
  );
};

export default DashBoard;
