import styled from 'styled-components'

export const HistoryContainer = styled.main`
  flex: 1;
  padding: 3.5rem;
  display: flex;
  flex-direction: column;
  h1 {
    font-size: 1.5rem;
    color: ${(props) => props.theme['gray-100']};
  }
`

export const HistoryList = styled.div`
  flex: 1;
  overflow: auto;
  margin-top: 2rem;
  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;
    th {
      background-color: ${(props) => props.theme['gray-600']};
      padding: 1rem;
      text-align: left;
      color: ${(props) => props.theme['gray-100']};
      font-size: 0.875rem;
      line-height: 1.6;
      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }
      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }
    td {
      background-color: ${(props) => props.theme['gray-700']};
      border-top: 4px solid ${(props) => props.theme['gray-800']};
      padding: 1rem;
      font-size: 0.875rem;
      line-height: 1.6;
      &:first-child {
        width: 40%;
        padding-left: 1.5rem;
      }
      &:last-child {
        padding-right: 1.5rem;
      }

      button {
        margin-left: 50%;
        transform: translateX(-100%);
        background-color: transparent;
        display: flex;
        align-items: center;
        cursor: pointer;
        border-radius: 4px;
        border: none;
        transition: 0.3s;
        color: ${(props) => props.theme['gray-300']};

        &:hover {
          color: ${(props) => props.theme['red-500']};
        }
      }
    }
  }
`
const STATUS_COLORS = {
  done: 'green-500',
  progress: 'yellow-500',
  interrupted: 'red-500',
} as const

// Defino que as chaves são os tipos do meu STATUS_COLORS
type StatusProps = {
  statusColor: keyof typeof STATUS_COLORS
}

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: ${(props) =>
      props.theme[STATUS_COLORS[props.statusColor]]};
  }
`
