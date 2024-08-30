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
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`/videos/${type}`);
        // Ensure that res.data is an array before setting it in state
        if (Array.isArray(res.data)) {
          setVideos(res.data);
        } else {
          console.error("Expected an array but got:", res.data);
          setVideos([]); // Set to an empty array if the response is not an array
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
        setVideos([]); // Handle error by setting videos to an empty array
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
        <p>No videos available</p> // Handle case where there are no videos
      )}
    </Container>
  );
};
