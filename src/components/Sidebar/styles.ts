import styled, { css } from 'styled-components'

export const SidebarContainer = styled.aside`
  width: 23rem;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  padding: 3rem;
  backdrop-filter: blur(10px);
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  h4 {
    opacity: 0.7;
  }

  nav {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 1rem;
    overflow-y: auto;

    ::-webkit-scrollbar {
      width: 5px;
      border-radius: 999px;
    }

    ::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
    }

    ::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.primary};
      border-radius: 999px;
    }

    border-top: 1px solid rgba(255, 255, 255, 0.5);
    padding-top: 2rem;
    margin-top: 2rem;
  }

  @media (max-width: 1280px) {
    padding: 2rem;
  }

  @media (max-width: 1150px) {
    width: 100%;
    bottom: 0;
    top: inherit;
    height: 45vh;
  }

  @media (max-width: 800px) {
    height: 60vh;
  }
`

interface NavButtonProps {
  isActive: boolean
}

export const NavButton = styled.button<NavButtonProps>`
  background: none;
  border: none;
  color: #fff;
  opacity: 0.7;
  transition: 0.4s;
  font-size: 1.3rem;

  &:hover {
    opacity: 1;
  }

  ${({ isActive, theme }) =>
    isActive &&
    css`
      opacity: 1;
      color: ${theme.primary};
    `}
`

export const SearchContainer = styled.section`
  display: flex;
`

export const SearchInput = styled.input`
  width: 100%;
  border: none;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid transparent;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  color: #fff;
  transition: 0.4s;
  margin-top: 2rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }

  &::placeholder {
    color: #fff;
    opacity: 0.5;
  }
`
