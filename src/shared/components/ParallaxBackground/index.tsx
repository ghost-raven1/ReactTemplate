import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const ParallaxContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  overflow: hidden;
`;

const ParallaxLayer = styled.div<{ offset: number; speed: number; opacity: number }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transform: translateY(${props => props.offset * props.speed}px);
  transition: transform 0.1s ease-out;
  opacity: ${props => props.opacity};
`;

const BaseLayer = styled(ParallaxLayer)`
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
`;

const MiddleLayer = styled(ParallaxLayer)`
  background: radial-gradient(circle at 50% 50%, 
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 25%,
    transparent 50%
  );
`;

const TopLayer = styled(ParallaxLayer)`
  background: linear-gradient(45deg,
    rgba(255, 255, 255, 0.03) 0%,
    transparent 20%,
    rgba(255, 255, 255, 0.02) 40%,
    transparent 60%,
    rgba(255, 255, 255, 0.03) 80%,
    transparent 100%
  );
`;

const GlowEffect = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150%;
  height: 150%;
  background: radial-gradient(
    circle at center,
    rgba(255, 255, 255, 0.03) 0%,
    rgba(255, 255, 255, 0.02) 20%,
    transparent 70%
  );
  pointer-events: none;
`;

export const ParallaxBackground: React.FC = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      setOffset(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ParallaxContainer>
      <BaseLayer offset={offset} speed={0.2} opacity={1} />
      <MiddleLayer offset={offset} speed={0.4} opacity={0.8} />
      <TopLayer offset={offset} speed={0.6} opacity={0.6} />
      <GlowEffect />
    </ParallaxContainer>
  );
}; 