import * as Dialog from '@radix-ui/react-dialog'
import { darken, lighten } from 'polished'
import styled from 'styled-components'

export const StyledOverlay = styled(Dialog.Overlay)`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  z-index: 5;
  inset: 0;
`

export const StyledContent = styled(Dialog.Content)`
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 6;
  background: ${({ theme }) => darken(0.15, theme.primary)};
  padding: 2.5rem;
  border-radius: 9px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  p {
    display: flex;
    font-size: 1.2rem;
    align-items: center;
    gap: 5px;

    svg {
      font-size: 2.3rem;
      color: ${({ theme }) => lighten(0.4, theme.primary)};
    }
  }
`
export const StyledClose = styled(Dialog.Close)`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  color: #fff;
  border: none;
  font-size: 1.2rem;
`
