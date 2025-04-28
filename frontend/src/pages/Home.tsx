import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchComments, postComment } from '../api/api';
import Comment from '../components/Comment/Comment';
import { useAuth } from '../hooks/useAuth';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadComments();
  }, [user, navigate]);

  const loadComments = async () => {
    setLoading(true);
    try {
      const res = await fetchComments();
      setComments(res.data);
    } catch (error) {
      setError('Failed to load comments');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    try {
      await postComment({ content: newComment });
      setNewComment('');
      loadComments();
    } catch (error) {
      setError('Failed to post comment');
      console.error(error);
    }
  };

  return (
    <div className="comments-container">
      <h1 className="page-title">Discussion</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleAddComment} className="new-comment-form">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Start a discussion..."
          className="comment-input"
        />
        <button type="submit" className="submit-button">Post</button>
      </form>
      
      <div className="comments-list">
        {loading ? (
          <div className="loading">Loading comments...</div>
        ) : comments.length > 0 ? (
          comments.map((comment: any) => (
            <Comment key={comment.id} comment={comment} onUpdate={loadComments} />
          ))
        ) : (
          <div className="no-comments">No comments yet. Be the first to start a discussion!</div>
        )}
      </div>
    </div>
  );
};

export default Home;
