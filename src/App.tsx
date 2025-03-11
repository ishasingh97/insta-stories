import React, { useState } from "react";
import { StoryList, StoryViewer } from "./components";
import { GlobalStyles } from "./styles/style";
import { useFetchStories } from "./hooks";

export interface Story {
    id: number;
    image: string;
    timestamp: number;
  }
  
export interface UserStory {
    userId: number;
    username: string;
    profileImage: string;
    stories: Story[];
  }
  
const App = () => {
  const [selectedStoryId, setSelectedStoryId] = useState<number | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const userStories = useFetchStories();

  const handleStorySelect = (userId: number, storyId: number) => {
    setSelectedUserId(userId);
    setSelectedStoryId(storyId);
  };

  const handleCloseViewer = () => {
    setSelectedStoryId(null);
    setSelectedUserId(null);
  };

  return (
    <GlobalStyles>
      <StoryList selectedStoryId={selectedStoryId} onSelect={handleStorySelect} userStories={userStories}/>
      <StoryViewer storyId={selectedStoryId} userId={selectedUserId} onClose={handleCloseViewer} userStories={userStories} />
    </GlobalStyles>
  );
};

export default App;
