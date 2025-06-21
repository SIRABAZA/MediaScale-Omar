import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Omar Zidan.</h2>;
  const three = <h3 className="big-heading">I tell stories through video.</h3>;
  const four = (
    <>
      <p>
        I'm a creative director and video editor, currently leading{' '}
        <a href="https://mediascale.net" target="_blank" rel="noreferrer">
          MediaScale
        </a>
        , a Wyoming-based production company focused on crafting high-impact visual content. I
        specialize in transforming ideas into engaging videos that inspire, connect, and convert.
      </p>
    </>
  );
  const five = (
    <div
      style={{
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginTop: '50px',
      }}>
      <a
        className="email-link"
        href="mailto:Omarzidan@mediascale.net"
        target="_blank"
        rel="noreferrer">
        Let's create something great.
      </a>
      <a
        className="email-link"
        href="https://form.typeform.com/to/SPcDg0QM"
        target="_blank"
        rel="noreferrer"
        style={{
          backgroundColor: 'transparent',
          border: '1px solid var(--green)',
          color: 'var(--green)',
          transition: 'all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)',
          '&:hover': {
            backgroundColor: 'var(--green-tint)',
            transform: 'translate(-4px, -4px)',
          },
        }}>
        Start a Project
      </a>
    </div>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
