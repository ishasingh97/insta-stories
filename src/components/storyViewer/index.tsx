import React, { useEffect, useState, useCallback } from "react";
import { StoryViewerStyles } from "./styles";
import { LoadingSpinner } from "../loadingSpinner";
import { UserStory } from "../../App";

interface Props {
  storyId: number | null;
  userId: number | null;
  onClose: () => void;
  userStories: UserStory[];
}

const StoryViewer = ({ storyId, userId, onClose, userStories }: Props) => {
  if(storyId === null) return null;

  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const currentUser = userStories[currentUserIndex];
  const stories = currentUser?.stories || [];
  const activeClass = (index: number) => index === currentStoryIndex ? 'active' : '';
  const completedClass = (index: number) => index < currentStoryIndex ? 'completed' : '';
  const pausedClass = (index: number) => index === currentStoryIndex && isPaused ? 'paused' : '';

  useEffect(() => {
    if (userId !== null && storyId !== null) {
      const userIndex = userStories.findIndex(u => u.userId === userId);
      if (userIndex !== -1) {
        setCurrentUserIndex(userIndex);
        const storyIndex = userStories[userIndex].stories.findIndex(s => s.id === storyId);
        setCurrentStoryIndex(storyIndex !== -1 ? storyIndex : 0);
      }
    }
  }, [userId, storyId, userStories]);

  useEffect(() => {
    if (stories[currentStoryIndex]?.image) {
      setIsLoading(true);
      const img = new Image();
      img.src = stories[currentStoryIndex].image;
      img.onload = () => {
        setIsLoading(false);
      };
      img.onerror = () => {
        setIsLoading(false);
        console.error('Failed to load image:', stories[currentStoryIndex].image);
      };
      
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 5000);
      
      return () => clearTimeout(timeout);
    }
  }, [currentStoryIndex, stories]);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (currentStoryIndex < stories.length - 1) {
        setCurrentStoryIndex(prev => prev + 1);
      } else if (currentUserIndex < userStories.length - 1) {
        setCurrentUserIndex(prev => prev + 1);
        setCurrentStoryIndex(0);
      } else {
        onClose();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentStoryIndex, currentUserIndex, stories.length, userStories.length, onClose, isPaused]);

  const handleNext = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else if (currentUserIndex < userStories.length - 1) {
      setCurrentUserIndex(currentUserIndex + 1);
      setCurrentStoryIndex(0);
    } else {
      onClose();
    }
  }, [currentStoryIndex, stories.length, currentUserIndex, userStories.length, onClose]);

  const handlePrev = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    } else if (currentUserIndex > 0) {
      setCurrentUserIndex(currentUserIndex - 1);
      const prevUserStories = userStories[currentUserIndex - 1].stories;
      setCurrentStoryIndex(prevUserStories.length - 1);
    } else {
      onClose();
    }
  }, [currentStoryIndex, currentUserIndex, userStories, onClose]);

  const handleMouseDown = () => {
    setIsPaused(true);
  };

  const handleMouseUp = () => {
    setIsPaused(false);
  };

  if (!userId || !storyId || userStories.length === 0) return null;

  return (
    <StoryViewerStyles 
      className="story-container"
      data-testid="story-viewer"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
    >
      <div className="story-header">
        <img 
          src={currentUser.profileImage} 
          alt={currentUser.username} 
          className="story-profile-image" 
        />
        <span className="story-username">{currentUser.username}</span>
        <div className="dismiss-button" onClick={onClose} data-testid="close-button">×</div>
      </div>
      <div className="progress-bar">
        {stories.map((_, index) => (
          <div 
            key={`${currentUserIndex}-${currentStoryIndex}-${index}`}
            className={`progress-item ${activeClass(index)} ${completedClass(index)} ${pausedClass(index)}`}
            data-testid={`story-progress-${index + 1}`}
          />
        ))}
      </div>
      
      <div className="story-content">
        <div className="story-image-container" data-testid="story-image-container">
          {!isLoading && (
            <img 
              src={stories[currentStoryIndex]?.image} 
              alt="Story" 
              draggable={false}
              data-testid="story-image"
            />
          )}
        </div>
        
        <div className="left" onClick={handlePrev} data-testid="prev-button"></div>
        <div className="right" onClick={handleNext} data-testid="next-button"></div>
      </div>
      
      {isLoading && <LoadingSpinner />}
    </StoryViewerStyles>
  );
};

export { StoryViewer };
