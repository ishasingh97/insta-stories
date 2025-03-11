import { useEffect, useState } from "react";

interface Story {
  id: number;
  image: string;
  timestamp: number;
}

interface UserStories {
  userId: number;
  username: string;
  profileImage: string;
  stories: Story[];
}

const useFetchStories = () => {
  const [userStories, setUserStories] = useState([] as UserStories[]);
  
  useEffect(() => {
    fetch("/stories.json")
      .then(res => res.json())
      .then(data => setUserStories(data))
      .catch(err => console.error("Failed to load stories:", err));
  }, []);

  return userStories;
};

export default useFetchStories;
