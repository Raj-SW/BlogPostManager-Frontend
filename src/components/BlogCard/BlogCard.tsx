import React from 'react';
import { Card, Button } from 'react-bootstrap';

export interface BlogCardProps {
  image: string;
  title: string;
  excerpt: string;
  alt: string;
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
    <Card className="h-100 border-0 shadow-sm">
      <Card.Img variant="top" src={image} alt={alt} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text className="text-muted">{excerpt}</Card.Text>
        <Button variant="outline-primary" size="sm" onClick={onReadMore}>
          Read More
        </Button>
      </Card.Body>
    </Card>
  );
};

export default BlogCard;
