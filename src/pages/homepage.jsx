import React from 'react'
import Carousel from 'react-bootstrap/Carousel';

function Homepage() {
  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://media.istockphoto.com/id/859665292/photo/assorted-lebanese-food.jpg?s=1024x1024&w=is&k=20&c=bmBDSdiH6HhZOduf_-8YKcCOYVe9awyklpRWABfwSHY="
          alt="First slide"
        />
        <Carousel.Caption>
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://media.istockphoto.com/id/1200458738/photo/arabic-and-middle-eastern-food.jpg?s=2048x2048&w=is&k=20&c=la-lCii4pgAn-EWWlOVKdwkyMbVHDK8nt_QTYW2DVaQ="
          alt="Second slide"
        />
        <Carousel.Caption>
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://media.istockphoto.com/id/1279889700/photo/indian-food-background.jpg?s=2048x2048&w=is&k=20&c=rmaR_xEhWQs8FBI33UCFjjOCqxYRw0UTFBiigsiVIxI="
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Homepage
