// src/components/carousel/AdvancedCarousel.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Carousel.css'; // Import the updated CSS styles
import firstImage from '../../images/posterW1.png';
import secondImage from '../../images/postergit.png';
import thirdImage from '../../images/upi.png';

const AdvancedCarousel = () => {
  const [postIndex, setPostIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [disableClicks, setDisableClicks] = useState(false);
  const progressIntervalRef = useRef(null);

  const postsData = [
    {
      image: firstImage,
      tag: 'Join',
      date: '25 Sep 2024',
      title: 'Join Whatsapp Group',
      title2: 'For Every New Product Notification',
      linkText: 'whatsapp.link',
      linkUrl: 'https://chat.whatsapp.com/DnVP8qYp26G4Gt1RtCdZCK',
    },
    {
      image: secondImage,
      tag: 'Contribute',
      date: '01 Oct 2024',
      title: 'Project is open source',
      title2: 'Can help us improve',
      linkText: 'github.com',
      linkUrl: 'https://github.com/sliet-olx',
    },
    {
      image: thirdImage,
      tag: 'Support',
      date: '03 Oct 2024',
      title: 'Support us monetarily',
      title2: 'Via UPI',
      linkText: 'UPI QR',
      linkUrl: '/upi-qr-code-page',    
    },
  ];

  useEffect(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    progressIntervalRef.current = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          setPostIndex((prevIndex) => (prevIndex + 1) % postsData.length);
          return 0;
        } else {
          return prevProgress + 1;
        }
      });
    }, 100);

    return () => {
      clearInterval(progressIntervalRef.current);
    };
  }, [postIndex, postsData.length]);

  const handlePostClick = (index) => {
    if (disableClicks || index === postIndex) return;

    setDisableClicks(true);
    setPostIndex(index);
    setProgress(0);

    setTimeout(() => {
      setDisableClicks(false);
    }, 2500);
  };

  return (
    <div className="carousel">
      {/* Progress bar for mobile */}
      <div className="progress-bar progress-bar--primary hide-on-desktop">
        <div className="progress-bar__fill" style={{ width: `${progress}%` }}></div>
      </div>

      <header className="main-post-wrapper">
        <div className="slides">
          {postsData.map((post, index) => (
            <article
              key={index}
              className={`main-post ${
                index === postIndex ? 'main-post--active' : 'main-post--not-active'
              }`}
            >
              <div className="main-post__content-wrapper">
                <div className="main-post__content">
                  <div className="main-post__tag-wrapper">
                    <span className="main-post__tag">{post.tag}</span>
                  </div>
                  <h1 className="main-post__title">{post.title}</h1>
                  <h3 className="main-post__published">{post.title2}</h3>
                  <br />
                  {post.linkUrl.startsWith('http') ? (
                    <a
                      className="main-post__link"
                      href={post.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="main-post__link-text">{post.linkText}</span>
                    </a>
                  ) : (
                    <Link
                      className="main-post__link"
                      to={post.linkUrl}
                    >
                      <span className="main-post__link-text">{post.linkText}</span>
                    </Link>
                  )}
                </div>
              </div>
              <div className="main-post__image">
                <img src={post.image} alt={post.title} loading="lazy" />
              </div>
            </article>
          ))}
        </div>
      </header>

      {/* Posts wrapper for desktop */}
      <div className="posts-wrapper hide-on-mobile">
        {postsData.map((post, index) => (
          <article
            key={index}
            className={`post ${index === postIndex ? 'post--active' : ''} ${
              disableClicks ? 'post--disabled' : ''
            }`}
            onClick={() => handlePostClick(index)}
          >
            <div className="progress-bar">
              <div
                className="progress-bar__fill"
                style={{
                  width: index === postIndex ? `${progress}%` : '0%',
                }}
              ></div>
            </div>
            <header className="post__header">
              <span className="post__tag">{post.tag}</span>
              <p className="post__published">{post.date}</p>
            </header>
            <h2 className="post__title">{post.title}</h2>
          </article>
        ))}
      </div>
    </div>
  );
};

export default AdvancedCarousel;
