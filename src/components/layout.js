import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeProvider } from 'styled-components';
import { Head, Loader, Nav, Social, Email, Footer } from '@components';
import { GlobalStyle, theme } from '@styles';
import AnimatedCursor from 'react-animated-cursor';
import Particles from 'react-tsparticles';

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Layout = ({ children, location }) => {
  const isHome = location.pathname === '/';
  const [isLoading, setIsLoading] = useState(isHome);
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    setShowParticles(true);
  }, []);

  // Sets target="_blank" rel="noopener noreferrer" on external links
  const handleExternalLinks = () => {
    const allLinks = Array.from(document.querySelectorAll('a'));
    if (allLinks.length > 0) {
      allLinks.forEach(link => {
        if (link.host !== window.location.host) {
          link.setAttribute('rel', 'noopener noreferrer');
          link.setAttribute('target', '_blank');
        }
      });
    }
  };

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (location.hash) {
      const id = location.hash.substring(1); // location.hash without the '#'
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView();
          el.focus();
        }
      }, 0);
    }

    handleExternalLinks();
  }, [isLoading]);

  return (
    <>
      <Head />

      <div id="root">
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          {showParticles && (
            <Particles
              id="tsparticles"
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: -1,
              }}
              options={{
                fullScreen: { enable: false },
                background: { color: { value: '#0a192f' } },
                particles: {
                  number: { value: 80, density: { enable: true, value_area: 800 } },
                  color: { value: '#64ffda' },
                  shape: { type: 'circle' },
                  opacity: { value: 0.5, random: false },
                  size: { value: 3, random: true },
                  move: { enable: true, speed: 1, direction: 'none', outModes: 'out' },
                  links: {
                    enable: true,
                    distance: 150,
                    color: '#64ffda',
                    opacity: 0.2,
                    width: 1,
                  },
                },
                interactivity: {
                  events: {
                    onHover: { enable: true, mode: 'repulse' },
                    onClick: { enable: true, mode: 'push' },
                  },
                  modes: {
                    repulse: { distance: 100, duration: 0.4 },
                    push: { quantity: 4 },
                  },
                },
                detectRetina: true,
              }}
            />
          )}
          <AnimatedCursor
            innerSize={8}
            outerSize={32}
            color="100,255,218"
            outerAlpha={0.2}
            innerScale={1}
            outerScale={2}
            clickables={[
              'a',
              'input[type="text"]',
              'input[type="email"]',
              'input[type="number"]',
              'input[type="submit"]',
              'input[type="image"]',
              'label[for]',
              'select',
              'textarea',
              'button',
              '.link',
              '.email-link',
              '.cta',
            ]}
          />
          <a className="skip-to-content" href="#content">
            Skip to Content
          </a>

          {isLoading && isHome ? (
            <Loader finishLoading={() => setIsLoading(false)} />
          ) : (
            <StyledContent>
              <Nav isHome={isHome} />
              <Social isHome={isHome} />
              <Email isHome={isHome} />

              <div id="content">
                {children}
                <Footer />
              </div>
            </StyledContent>
          )}
        </ThemeProvider>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
};

export default Layout;
