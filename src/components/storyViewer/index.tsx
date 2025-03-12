import React, { useEffect, useState, useCallback, useRef } from "react";
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
  if (storyId === null || userId === null || userStories.length === 0) return null;

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isClosingRef = useRef(false);

  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const safeClose = useCallback(() => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    onClose();
  }, [onClose]);

  const currentUser = userStories[currentUserIndex];
  const stories = currentUser?.stories || [];

  useEffect(() => {
    isClosingRef.current = false;
    
    const userIndex = userStories.findIndex(u => u.userId === userId);
    if (userIndex !== -1) {
      setCurrentUserIndex(userIndex);
      const storyIndex = userStories[userIndex].stories.findIndex(s => s.id === storyId);
      setCurrentStoryIndex(storyIndex !== -1 ? storyIndex : 0);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [userId, storyId, userStories]);

  useEffect(() => {
    if (!stories[currentStoryIndex]?.image) return;
    
    setIsLoading(true);
    const img = new Image();
    img.src = stories[currentStoryIndex].image;
    img.onload = () => setIsLoading(false);
    img.onerror = () => {
      setIsLoading(false);
      console.error('Failed to load image:', stories[currentStoryIndex].image);
    };
    
    const timeout = setTimeout(() => setIsLoading(false), 5000);
    return () => clearTimeout(timeout);
  }, [currentStoryIndex, stories]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    if (isPaused || isLoading || isClosingRef.current) return;

    intervalRef.current = setInterval(() => {
      if (currentStoryIndex < stories.length - 1) {
        setCurrentStoryIndex(prev => prev + 1);
      } else if (currentUserIndex < userStories.length - 1) {
        setCurrentUserIndex(prev => prev + 1);
        setCurrentStoryIndex(0);
      } else {
        safeClose();
      }
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [currentStoryIndex, currentUserIndex, stories.length, userStories.length, safeClose, isPaused, isLoading]);

  const handleNext = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else if (currentUserIndex < userStories.length - 1) {
      setCurrentUserIndex(currentUserIndex + 1);
      setCurrentStoryIndex(0);
    } else {
      safeClose();
    }
  }, [currentStoryIndex, stories.length, currentUserIndex, userStories.length, safeClose]);

  const handlePrev = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    } else if (currentUserIndex > 0) {
      setCurrentUserIndex(currentUserIndex - 1);
      setCurrentStoryIndex(userStories[currentUserIndex - 1].stories.length - 1);
    } else {
      safeClose();
    }
  }, [currentStoryIndex, currentUserIndex, userStories, safeClose]);

  const getProgressClasses = (index: number) => {
    const classes = [];
    if (index === currentStoryIndex) classes.push('active');
    if (index < currentStoryIndex) classes.push('completed');
    if (index === currentStoryIndex && isPaused) classes.push('paused');
    return classes.join(' ');
  };

  return (
    <StoryViewerStyles 
      className="story-container"
      data-testid="story-viewer"
      onMouseDown={() => setIsPaused(true)}
      onMouseUp={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="story-header">
        <img 
          src={currentUser.profileImage} 
          alt={currentUser.username} 
          className="story-profile-image" 
        />
        <span className="story-username">{currentUser.username}</span>
        <div 
          className="dismiss-button" 
          onClick={safeClose} 
          data-testid="close-button"
        >
          ×
        </div>
      </div>
      
      <div className="progress-bar">
        {stories.map((_, index) => (
          <div 
            key={`story-progress-${currentUserIndex}-${index}`}
            className={`progress-item ${getProgressClasses(index)}`}
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
