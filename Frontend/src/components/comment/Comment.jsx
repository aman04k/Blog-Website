import { Button } from '@material-tailwind/react';
import React, { useState, useContext } from 'react';
import myContext from '../../context/data/myContext';

function Comment() {
  const context = useContext(myContext);
  const { mode } = context;

  // State variables
  const [fullName, setFullName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [allComments, setAllComments] = useState([]);

  // Function to handle adding a comment
  const addComment = (e) => {
    e.preventDefault();
    // Validate if both fullName and commentText are not empty
    if (fullName.trim() !== '' && commentText.trim() !== '') {
      const newComment = {
        fullName: fullName,
        commentText: commentText,
        date: new Date().toLocaleDateString()  // Assuming you want to add a date
      };
      setAllComments([...allComments, newComment]);
      // Clear input fields after adding comment
      setFullName('');
      setCommentText('');
    } else {
      alert('Please enter both your name and a comment.');
    }
  };

  return (
    <section className="py-8 lg:py-16">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg lg:text-2xl font-bold" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
            Make Comment
          </h2>
        </div>
        {/* Comment Form */}
        <form className="mb-6">
          {/* Full Name Input */}
          <div className="py-2 px-4 mb-4 rounded-lg rounded-t-lg shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] border border-gray-200"
            style={{ background: mode === 'dark' ? '#353b48' : 'rgb(226, 232, 240)' }}>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              type='text'
              placeholder='Enter Full Name'
              className="px-0 w-full text-sm border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400"
              style={{ background: mode === 'dark' ? '#353b48' : 'rgb(226, 232, 240)' }}
            />
          </div>

          {/* Text Area */}
          <div className="py-2 px-4 mb-4 rounded-lg rounded-t-lg shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] border border-gray-200"
            style={{ background: mode === 'dark' ? '#353b48' : 'rgb(226, 232, 240)' }}>
            <label htmlFor="comment" className="sr-only">Your comment</label>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              id="comment"
              rows={6}
              className="px-0 w-full text-sm border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400"
              style={{ background: mode === 'dark' ? '#353b48' : 'rgb(226, 232, 240)' }}
              placeholder="Write a comment..."
              required
            />
          </div>

          {/* Button */}
          <div className="">
            <Button
              onClick={addComment}
              style={{
                background: mode === 'dark' ? 'rgb(226, 232, 240)' : 'rgb(30, 41, 59)',
                color: mode === 'dark' ? 'rgb(30, 41, 59)' : 'rgb(226, 232, 240)'
              }}>
              Post comment
            </Button>
          </div>
        </form>

        {/* Displaying Comments */}
        <div>
          {allComments.map((comment, index) => (
            <div key={index} className="p-6 mb-6 text-base rounded-lg" style={{ background: mode === 'dark' ? '#353b48' : 'rgb(226, 232, 240)' }}>
              <div className="flex justify-between items-center mb-">
                <div className="flex items-center my-2 bg-white px-2 py-1 rounded-lg">
                  <p className="inline-flex items-center mr-3 text-lg" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
                    {comment.fullName}
                  </p>
                  <p className="text-sm" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
                    {comment.date}
                  </p>
                </div>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-md">
                ↳ {comment.commentText}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Comment;
