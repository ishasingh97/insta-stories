import styled from 'styled-components';

export const StoryViewerStyles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .story-header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    padding: 16px;
    z-index: 1004;
    color: white;

    .story-profile-image {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      margin-right: 12px;
      object-fit: cover;
    }

    .story-username {
      font-weight: 600;
      font-size: 14px;
    }

    .dismiss-button {
      position: absolute;
      right: 16px;
      top: 16px;
      color: white;
      cursor: pointer;
      font-size: 24px;
      font-weight: 300;
      z-index: 1005;
    }
  }

  .progress-bar {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    gap: 4px;
    padding: 8px;
    z-index: 1004;

    .progress-item {
      height: 2px;
      flex: 1;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 2px;
      overflow: hidden;

      &.active {
        position: relative;
        &::after {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 0%;
          background: white;
          animation: progress 5s linear forwards;
          animation-play-state: running;
          will-change: width;
        }
      }

      &.paused {
        &::after {
          animation-play-state: paused;
        }
      }

      &.completed {
        background: white;
      }
    }
  }

  .story-content {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1001;
  }

  .story-image-container {
    position: relative;
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    z-index: 1003;
    
    img {
      max-height: 90vh;
      max-width: 100%;
      object-fit: contain;
      z-index: 1003;
    }
  }

  .left, .right {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 50%;
    cursor: pointer;
    z-index: 1002;
    background: transparent;
    pointer-events: auto;
  }

  .left {
    left: 0;
  }

  .right {
    right: 0;
  }

  @keyframes progress {
    0% {
      width: 0%;
    }
    100% {
      width: 100%;
    }
  }
`; 