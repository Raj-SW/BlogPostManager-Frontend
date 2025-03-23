// src/pages/CreateBlogPost.tsx
import React, { useState, useRef } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";

const CreateEditBlogPost: React.FC = () => {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("<p>Write your content here...</p>");

  // A ref to the editable div, so we can read/update its HTML
  const editorRef = useRef<HTMLDivElement>(null);

  // Apply formatting commands using document.execCommand()
  const applyFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    // After applying the command, we can read the updated HTML from the editor
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  // Whenever the user types or changes the editor, store the current HTML in state
  const handleEditorInput = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // The content state holds the current HTML from the editor
    const blogPost = {
      title,
      excerpt,
      content,
      tags: tags.split(",").map((tag) => tag.trim()),
    };

    console.log("Blog post submitted:", blogPost);
    // TODO: Replace console.log with an API call or further processing
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4">Create a New Blog Post (No External Editor)</h2>
      <Form onSubmit={handleSubmit}>
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

        {/* ====== Toolbar ====== */}
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
                onClick={() => applyFormat("strikeThrough")}
              >
                <s>S</s>
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
              <Button
                variant="outline-secondary"
                onClick={() => applyFormat("justifyLeft")}
              >
                Left
              </Button>
              <Button
                variant="outline-secondary"
                onClick={() => applyFormat("justifyCenter")}
              >
                Center
              </Button>
              <Button
                variant="outline-secondary"
                onClick={() => applyFormat("justifyRight")}
              >
                Right
              </Button>
            </div>
          </Col>
        </Row>

        {/* ====== Editable Area ====== */}
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
