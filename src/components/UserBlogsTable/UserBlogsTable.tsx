import React from "react";
import { Table, Button } from "react-bootstrap";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { blogPost } from "../../models/blogmodel/blogModels";

interface UserBlogsTableProps {
  blogs: blogPost[];
  loading: boolean;
  error: string | null;
  onEdit: (blogId: string) => void;
  onDelete: (blogId: string) => void;
  onView(blogPostDocumentId: string): void;
}

const UserBlogsTable: React.FC<UserBlogsTableProps> = ({
  blogs,
  loading,
  error,
  onEdit,
  onDelete,
  onView,
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
                <tr key={blog.blogId}>
                  <td>
                    <img
                      src={blog.thumbnailLink}
                      style={{ width: "80px", height: "auto" }}
                    />
                  </td>
                  <td>{blog.title}</td>
                  <td className="text-center">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => onEdit(blog.blogId)}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="me-2"
                      onClick={() => onDelete(blog.blogId)}
                    >
                      <FaTrash />
                    </Button>
                    <Button
                      variant="outline-info"
                      size="sm"
                      className="ms-2"
                      onClick={() => onView(blog.blogId)}
                    >
                      <FaEye />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
};

export default UserBlogsTable;
