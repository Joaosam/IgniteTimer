import { formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Trash } from 'phosphor-react'
import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CyclesContext'
import { TaskEmpty } from './components/TaskEmpty'
import { HistoryContainer, HistoryList, Status } from './styles'

export function History() {
  const { cycles, activeCycle, setCycles, setDisableForm } =
    useContext(CyclesContext)

  function taskDelete(id: string) {
    const listWithTaskDeleted = cycles.filter((task) => task.id !== id)
    setCycles(listWithTaskDeleted)
    !!activeCycle ? setDisableForm(!activeCycle) : setDisableForm(!!activeCycle)
  }

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      {cycles.length ? (
        <HistoryList>
          <table>
            <thead>
              <tr>
                <th>Tarefa</th>
                <th>Duração</th>
                <th>Duração</th>
                <th>Status</th>
                <th>Excluir</th>
              </tr>
            </thead>
            <tbody>
              {cycles
                .slice(0)
                .reverse()
                .map((cycle) => (
                  <tr key={cycle.id}>
                    <td>{cycle.task}</td>
                    <td>{cycle.minutesAmount} minutos</td>
                    <td>
                      {formatDistanceToNow(new Date(cycle.startDate), {
                        addSuffix: true,
                        locale: ptBR,
                      })}
                    </td>
                    <td>
                      {cycle.finishedDate && (
                        <Status statusColor="done">Concluído</Status>
                      )}
                      {cycle.stopDate && (
                        <Status statusColor="interrupted">Interrompido</Status>
                      )}
                      {!cycle.stopDate && !cycle.finishedDate && (
                        <Status statusColor="progress">Em andamento</Status>
                      )}
                    </td>
                    <td>
                      <DeleteTask
                        key={cycle.id}
                        id={cycle.id}
                        onDeleteTask={taskDelete}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </HistoryList>
      ) : (
        <TaskEmpty />
      )}
    </HistoryContainer>
  )
}

interface taskProps {
  id: string
  onDeleteTask: (id: string) => void
}

function DeleteTask({ onDeleteTask, id }: taskProps) {
  return (
    <button onClick={() => onDeleteTask(id)} title="Apagar Tarefa">
      <Trash size={24} />
    </button>
  )
}
