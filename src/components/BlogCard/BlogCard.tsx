import React from "react";
import { Card, Button, CardFooter, CardImgOverlay } from "react-bootstrap";
import "./BlogCard.css";
export interface BlogCardProps {
  image?: string;
  title: string;
  excerpt: string;
  alt?: string;
  onReadMore?: () => void;
}

const BlogCard: React.FC<BlogCardProps> = ({
  image,
  title,
  excerpt,
  alt,
  onReadMore,
}) => {
  return (
    <Card className="blogCard" >
        <Card.Title>{title}</Card.Title>
      {image && <Card.Img variant="top" src={image} alt={alt} />}
      <Card.Body>
        <Card.Text className="text-muted">{excerpt}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button variant="outline-primary" size="sm" onClick={onReadMore}>
          Read More
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default BlogCard;
