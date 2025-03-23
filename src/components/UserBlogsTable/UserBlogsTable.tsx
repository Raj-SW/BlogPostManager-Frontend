// src/components/AllBlogs/AllBlogs.tsx
import React from "react";
import { Table, Button, Pagination } from "react-bootstrap";
import { FaEdit, FaTrash, FaToggleOff } from "react-icons/fa";
import { Blog } from "../../api/blogService/BlogService";

interface UserBlogsTableProps {
  blogs: Blog[];
  loading: boolean;
  error: string | null;
  onEdit: (blogId: number) => void;
  onDelete: (blogId: number) => void;
  onSetInactive: (blogId: number) => void;
}

const UserBlogsTable: React.FC<UserBlogsTableProps> = ({
  blogs,
  loading,
  error,
  onEdit,
  onDelete,
  onSetInactive,
}) => {
  return (
    <div>
      <h5 className="mb-4">All your blogs</h5>
      {loading && <p>Loading blogs...</p>}
      {error && <p className="text-danger">Error: {error}</p>}

      {!loading && !error && (
        <>
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id}>
                  <td>
                    <img
                      src={blog.image}
                      alt={blog.alt}
                      style={{ width: "80px", height: "auto" }}
                    />
                  </td>
                  <td>{blog.title}</td>
                  <td className="text-center">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => onEdit(blog.id)}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="me-2"
                      onClick={() => onDelete(blog.id)}
                    >
                      <FaTrash />
                    </Button>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => onSetInactive(blog.id)}
                    >
                      <FaToggleOff />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Pagination className="d-flex justify-content-center mt-4">
            <Pagination.First />
            <Pagination.Prev />
            <Pagination.Item active>{1}</Pagination.Item>
            <Pagination.Item>{2}</Pagination.Item>
            <Pagination.Item>{3}</Pagination.Item>
            <Pagination.Ellipsis />
            <Pagination.Next />
            <Pagination.Last />
          </Pagination>
        </>
      )}
    </div>
  );
};

export default UserBlogsTable;
