import React from "react";
import { StoryListStyles } from "./styles";
import { UserStory, Story } from "../../App";

interface StoryListProps {
  selectedStoryId: number | null;
  onSelect: (userId: number, storyId: number) => void;
  userStories: UserStory[];
}

const StoryList = ({ selectedStoryId, onSelect, userStories }: StoryListProps) => {

  if (selectedStoryId) {
    return null;
  }

  const handleStoryClick = (userId: number, stories: Story[]) => {
    const firstStory = stories[0];
    onSelect(userId, firstStory.id);
  };

  return (
    <StoryListStyles className="story-list" data-testid="story-list">
      {userStories?.map((user) => (
        <div 
          key={user.userId} 
          className="story-item" 
          data-testid="story-item"
          onClick={() => handleStoryClick(user.userId, user.stories)}
        >
          <img
            src={user.profileImage}
            alt={`${user.username}'s stories`}
            className={`profile-image`}
          />
        </div>
      ))}
    </StoryListStyles>
  );
};

export { StoryList };
