
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';
import styled from 'styled-components';
import { deleteVideo,editVideo } from '../redux/videoSlice'; 
import { useNavigate } from 'react-router-dom';
const Container = styled.div`
  padding: 20px;
  
`;

const VideoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const H1 = styled.h1`
  color: ${({ theme }) => theme.text};
`;
const VideoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
    color: ${({ theme }) => theme.text};
`;

const VideoTitle = styled.h3`
  font-size: 18px;
  margin: 0;
  
`;

const VideoFrame = styled.video`
  max-width: 100%;
  border-radius: 8px;
  
`;

const Button = styled.button`
  padding: 8px 16px;
  cursor: pointer;
  
`;

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

export const ProfilePage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.user);
  const [userVideos, setUserVideos] = useState([]);
  const dispatch = useDispatch();
 const navigate = useNavigate()
 const [status, setStatus] = useState('');

 const [editingVideo, setEditingVideo] = useState(null);
 const [title, setTitle] = useState('');
 const [desc, setDescription] = useState('');
 
  useEffect(() => {
    const fetchUserVideos = async () => {
      try {
        const response = await axios.get(`/videos/user-videos/${currentUser._id}`);
        setUserVideos(response.data || []); 
      } catch (error) {
        console.error('Error fetching user videos:', error);
        setUserVideos([]);
      }
    };

    if (currentUser) {
      fetchUserVideos();
    }
  }, [currentUser]);

  const handleDelete = async (videoId) => {
    try {
      await axios.delete(`/videos/delete/${videoId}`);
      dispatch(deleteVideo(videoId)); 
 
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };
  const handleEdit = (video) => {
    setEditingVideo(video);
    setTitle(video.title);
    setDescription(video.desc);
    // setStatus(video.status || '');

  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`/videos/edit/${editingVideo._id}`, {
        title,
        desc,
        // status,
        userId: currentUser._id,
      });

      dispatch(editVideo(response.data)); 

      
      setEditingVideo(null);
      setTitle('');
      setDescription('');
   
    } catch (error) {
      console.error('Error updating video:', error);
    }
  };
  return (
    <Container>
      <H1>My Videos</H1>
      <VideoList>
        {userVideos.length > 0 ? (
          userVideos.map((video) => (
            <VideoItem key={video._id}>
              <VideoTitle>{video.title}</VideoTitle>
              <VideoFrame src={video.videoUrl} controls />
              <div>
              <Button onClick={() => handleEdit(video)}>Edit</Button>
                <Button onClick={() => handleDelete(video._id)}>Delete</Button>
              </div>
              {editingVideo && editingVideo._id === video._id && (
                <EditForm onSubmit={handleEditSubmit}>
                  <Input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Video Title"
                  />
                  <Input
                    type="text"
                    value={desc}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Video Description"
                  />
                  
                  <Button type="submit">Save Changes</Button>
                  <Button onClick={() => setEditingVideo(null)}>Cancel</Button>
                </EditForm>
              )}
            </VideoItem>
          ))
        ) : (
          <p>No videos found.</p>
        )}
      </VideoList>
    </Container>
  );
};
