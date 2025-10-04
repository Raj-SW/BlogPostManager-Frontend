import React, { useState, useRef } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import { createBlogPostAsync } from "../../api/blogService/BlogService";
import { blogPost } from "../../models/blogmodel/blogModels";

const CreateEditBlogPost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("<p>Write your content here...</p>");
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const editorRef = useRef<HTMLDivElement>(null);

  const applyFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  const handleEditorInput = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  const validateBlogPost = (): string => {
    if (!title.trim()) return "Title is required.";
    if (!excerpt.trim()) return "Excerpt is required.";
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;
    if (!tempDiv.textContent?.trim()) return "Content is required.";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    const validationError = validateBlogPost();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("User is not authenticated. Please log in.");
      return;
    }

    const blogPostData: blogPost = {
      title,
      excerpt,
      content,
      tags: tags.split(",").map((tag) => tag.trim()),
      blogId: "",
      createdBy: "",
      likes: 0,
      isFeatured: false,
      createdDate: "",
    };

    try {
      await createBlogPostAsync(blogPostData, thumbnail, token);
      setSuccessMessage("Blog post created successfully!");

      setTitle("");
      setExcerpt("");
      setTags("");
      setThumbnail(null);
      setContent("<p>Write your content here...</p>");
      if (editorRef.current) {
        editorRef.current.innerHTML = "<p>Write your content here...</p>";
      }
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to create blog post.");
    }
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4">Create a New Blog Post</h2>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        {/* Thumbnail Image Upload */}
        <Form.Group controlId="thumbnail" className="mb-3">
          <Form.Label>Thumbnail Image</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={(e) =>
              setThumbnail((e.target as HTMLInputElement).files?.[0] || null)
            }
          />
        </Form.Group>
        <Form.Group controlId="blogTitle" className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="blogExcerpt" className="mb-3">
          <Form.Label>Excerpt</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter a short excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            required
          />
        </Form.Group>

        {/* Toolbar */}
        <Row className="mb-2">
          <Col>
            <div className="d-flex gap-2">
              <Button
                variant="outline-secondary"
                onClick={() => applyFormat("bold")}
              >
                <b>B</b>
              </Button>
              <Button
                variant="outline-secondary"
                onClick={() => applyFormat("italic")}
              >
                <i>I</i>
              </Button>
              <Button
                variant="outline-secondary"
                onClick={() => applyFormat("underline")}
              >
                <u>U</u>
              </Button>
              <Button
                variant="outline-secondary"
                onClick={() => applyFormat("insertOrderedList")}
              >
                OL
              </Button>
              <Button
                variant="outline-secondary"
                onClick={() => applyFormat("insertUnorderedList")}
              >
                UL
              </Button>
            </div>
          </Col>
        </Row>

        {/* Editable Area */}
        <Form.Group controlId="blogContent" className="mb-3">
          <Form.Label>Blog Content</Form.Label>
          <div
            ref={editorRef}
            className="border p-2"
            style={{ minHeight: "200px" }}
            contentEditable
            dangerouslySetInnerHTML={{ __html: content }}
            onInput={handleEditorInput}
          />
        </Form.Group>

        <Form.Group controlId="blogTags" className="mb-3">
          <Form.Label>Tags</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter tags separated by commas"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit Post
        </Button>
      </Form>
    </Container>
  );
};

export default CreateEditBlogPost;
