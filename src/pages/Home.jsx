import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Card from '../components/Card';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const Home = ({ type }) => {
  const [videos, setVideos] = useState([]); // Ensure initial state is an empty array

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`https://videoback-7csk.onrender.com/api/videos/${type}`);
        console.log(res.data); // Log the API response to inspect the structure
        // Ensure that the response is an array before setting it to state
        setVideos(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('Failed to fetch videos:', err);
      }
    };
    fetchVideos();
  }, [type]);

  return (
    <Container>
      {Array.isArray(videos) && videos.length > 0 ? (
        videos.map((video) => (
          <Card key={video._id} video={video} />
        ))
      ) : (
        <p>No videos found</p> // Fallback message if no videos are available
      )}
    </Container>
  );
};

