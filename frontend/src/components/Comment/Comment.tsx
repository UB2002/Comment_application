import { useState } from 'react';
import { postComment, editComment, deleteComment, restoreComment } from '../../api/api';

interface CommentProps {
  comment: any;
  onUpdate?: () => void;
}

const Comment = ({ comment, onUpdate }: CommentProps) => {
  const [replying, setReplying] = useState(false);
  const [content, setContent] = useState('');

  const handleReply = async () => {
    if (!content.trim()) return;
    
    await postComment({ content, parentId: comment.id });
    setReplying(false);
    setContent('');
    if (onUpdate) onUpdate();
  };

  const handleEdit = async () => {
    const newContent = prompt('Edit your comment:', comment.content);
    if (newContent && newContent.trim() && newContent !== comment.content) {
      await editComment(comment.id, newContent);
      if (onUpdate) onUpdate();
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      await deleteComment(comment.id);
      if (onUpdate) onUpdate();
    }
  };

  const handleRestore = async () => {
    await restoreComment(comment.id);
    if (onUpdate) onUpdate();
  };

  return (
    <div className={`comment ${comment.deleted ? 'deleted-comment' : ''}`} style={{ marginLeft: comment.parentId ? '2rem' : 0 }}>
      <div className="comment-header">
        <span className="comment-author">{comment.author?.email || 'Anonymous'}</span>
        <span className="comment-date">{new Date(comment.createdAt).toLocaleString()}</span>
      </div>
      
      <div className="comment-content">
        {comment.deleted ? (
          <p className="deleted-text">This comment has been deleted.</p>
        ) : (
          <p>{comment.content}</p>
        )}
      </div>
      
      <div className="comment-actions">
        {!comment.deleted && (
          <>
            <button className="action-button" onClick={() => setReplying(!replying)}>
              {replying ? 'Cancel' : 'Reply'}
            </button>
            <button className="action-button" onClick={handleEdit}>Edit</button>
            <button className="action-button delete" onClick={handleDelete}>Delete</button>
          </>
        )}
        {comment.deleted && (
          <button className="action-button restore" onClick={handleRestore}>Restore</button>
        )}
      </div>

      {replying && (
        <div className="reply-form">
          <textarea 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            placeholder="Write a reply" 
            className="reply-input"
          />
          <button className="reply-button" onClick={handleReply}>Post Reply</button>
        </div>
      )}

      {comment.replies?.length > 0 && (
        <div className="replies">
          {comment.replies.map((child: any) => (
            <Comment key={child.id} comment={child} onUpdate={onUpdate} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
