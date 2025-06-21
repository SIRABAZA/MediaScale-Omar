import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig, email } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledContactSection = styled.section`
  max-width: 600px;
  margin: 0 auto 100px;
  text-align: center;

  @media (max-width: 768px) {
    margin: 0 auto 50px;
  }

  .overline {
    display: block;
    margin-bottom: 20px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 400;

    &:before {
      bottom: 0;
      font-size: var(--fz-sm);
    }

    &:after {
      display: none;
    }
  }

  .title {
    font-size: clamp(40px, 5vw, 60px);
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }

  .typeform-container {
    margin-top: 50px;
    width: 100%;
    height: 500px;
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: 0 10px 30px -10px var(--navy-shadow);
    border: 1px solid var(--lightest-navy);

    @media (max-width: 768px) {
      height: 400px;
    }
  }

  .typeform-embed {
    width: 100%;
    height: 100%;
    border: none;
  }

  .contact-info {
    margin-top: 30px;
    padding: 20px;
    background-color: var(--light-navy);
    border-radius: var(--border-radius);
    border: 1px solid var(--lightest-navy);

    p {
      margin: 0;
      font-size: var(--fz-sm);
      color: var(--light-slate);

      a {
        color: var(--green);
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;

const Contact = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      <h2 className="numbered-heading overline">What's Next?</h2>

      <h2 className="title">Get In Touch</h2>

      <p>
        Ready to bring your vision to life? Let's discuss your project and create something amazing
        together. Fill out the form below and I'll get back to you within 24 hours!
      </p>

      <div className="typeform-container">
        <iframe
          className="typeform-embed"
          src="https://form.typeform.com/to/SPcDg0QM"
          frameBorder="0"
          allowFullScreen
          title="Contact Form"
        />
      </div>

      <div className="contact-info">
        <p>
          <strong>Quick Contact:</strong> Prefer email?{' '}
          <a href={`mailto:${email}`}>Send me a direct message</a> or connect on{' '}
          <a href="https://www.linkedin.com/in/omar-ziidan/" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </p>
        <p style={{ marginTop: '10px', fontSize: 'var(--fz-xs)' }}>
          Response time: Within 24 hours • Available for new projects
        </p>
      </div>
    </StyledContactSection>
  );
};

export default Contact;
