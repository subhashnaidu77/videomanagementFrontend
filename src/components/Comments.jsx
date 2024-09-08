import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import Comment from './Comment';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Button = styled.button`
  padding: 5px 10px;
  border: none;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  cursor: pointer;
`;
export const Comments = ({videoId}) => {
  const { currentUser } = useSelector((state) => state.user);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`https://videoback-7csk.onrender.com/api/comments/${videoId}`);
        setComments(res.data);
      } catch (err) {}
    };
    fetchComments();
  }, [videoId]);

  const sendComment = async () => {
    console.log("Current comment text:", newComment); 

    if (newComment.trim()) {
      try {
        console.log("Sending comment:", newComment); 
        const res = await axios.post(`https://videoback-7csk.onrender.com/api/comments`, {
          videoId,
          userId: currentUser._id,
          desc: newComment,
        });
        console.log("Comment posted successfully:", res.data);
        setComments([...comments, res.data]);
        setNewComment(""); 
      } catch (err) {
        console.error("Error posting comment:", err);
      }
    } else {
      console.log("Comment text is empty, not submitting.");
    }
  };
  return (
    <Container>
         <NewComment>
         <Avatar src={currentUser.img} />
         <Input placeholder="Add a comment..."  onChange={(e) => {
            console.log("Input changed:", e.target.value); 
            setNewComment(e.target.value)}} /> 
         <Button onClick={sendComment}>Comment</Button>
         </NewComment>
         {comments.map(comment=>(
         <Comment  key={comment._id} comment={comment}/>

        ))}
       </Container>
  )
}
