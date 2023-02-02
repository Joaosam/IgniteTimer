import { Placeholder } from 'phosphor-react'
import { Description, ImgTask, SectionTaskEmpty, Task } from './styles'

export function TaskEmpty() {
  return (
    <SectionTaskEmpty>
      <Task>
        <ImgTask>
          <Placeholder size={64} />
        </ImgTask>
      </Task>
      <Description>
        <p>Você ainda não tem tarefas cadastradas</p>
        <p>Crie tarefas e organize seu pomodoro</p>
      </Description>
    </SectionTaskEmpty>
  )
}
