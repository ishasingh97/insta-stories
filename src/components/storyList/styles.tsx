import styled from 'styled-components';

export const StoryListStyles = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
  overflow-x: auto;
  background: white;
  border-bottom: 1px solid #dbdbdb;

  &::-webkit-scrollbar {
    display: none;
  }

  .story-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    
    .profile-image {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      padding: 3px;
      background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
    }

    .username {
      margin-top: 4px;
      font-size: 12px;
      color: #262626;
      max-width: 64px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: center;
    }
  }
`; 