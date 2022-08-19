import styled from 'styled-components'
import { readableColor, lighten } from 'polished'

export const WeatherDetailsContainer = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 5rem;
  justify-content: space-between;

  h1 {
    font-size: 1.5rem;
  }

  button {
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => readableColor(theme.primary, '#000', '#fff')};
    border: none;
    padding: 0.4rem 1rem;
    font-size: 1.2rem;
    border-radius: 8px;
    font-weight: 500;
    transition: 0.4s;

    &:hover {
      background: ${({ theme }) => lighten(0.1, theme.primary)};
    }
  }

  @media (max-width: 1150px) {
    justify-content: flex-start;
    align-items: center;
    padding: 5rem 1rem;
  }

  @media (max-width: 800px) {
    padding: 2rem 1rem;

    button {
      font-size: 1rem;
    }
  }

  @media (max-width: 480px) {
    h2 {
      margin-bottom: 1rem;
    }
    button {
      margin-top: 0.5rem;
      font-size: 0.9rem;
      padding: 0.3rem 0.8rem;
    }
  }
`

export const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  h2 {
    font-size: 9rem;
  }

  h3 {
    font-size: 4rem;
  }

  p {
    font-size: 1.2rem;
  }

  svg {
    width: 5rem;
    height: 5rem;
  }

  @media (max-width: 800px) {
    h2 {
      font-size: 5rem;
    }

    h3 {
      font-size: 2.5rem;
    }

    p {
      font-size: 1rem;
    }

    svg {
      width: 3.5rem;
      height: 3.5rem;
    }
  }

  @media (max-width: 480px) {
    gap: 0.5rem;

    h2 {
      font-size: 2.5rem;
    }

    h3 {
      font-size: 1.5rem;
    }

    p {
      font-size: 0.85rem;
    }

    svg {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
`
