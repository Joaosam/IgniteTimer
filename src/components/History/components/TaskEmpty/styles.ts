import styled from 'styled-components'

export const SectionTaskEmpty = styled.section`
  display: grid;
  place-items: center;
  border-top: 1px solid ${(props) => props.theme['gray-300']};
  border-radius: 8px;
  margin-top: 3%;
`
export const Task = styled.div`
  width: 73.6rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-top: 1px solid var(--gray-400);
  border-radius: 8px;
  padding-top: 6.4rem;
  width: 50%;
`
export const ImgTask = styled.div`
  display: grid;
  place-items: center;
  margin-bottom: 1.6rem;
`
export const Description = styled.div`
  text-align: center;
  color: ${(props) => props.theme['gray-300']};
  font-size: 1.6rem;
  line-height: 140%;

  p:not(:nth-child(2)) {
    font-weight: 700;
  }
`
