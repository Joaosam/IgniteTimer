import { FormContainer, MinutesAmountInput, TaskInput } from './styles'
import { useContext } from 'react'
import { CyclesContext } from '../../../../contexts/CyclesContext'
import { dataForm } from '../..'

interface NewCycleFormProps {
  register: (name: any, type?: any) => any
}

export function NewCycleForm({ register }: NewCycleFormProps) {
  const { disableForm } = useContext(CyclesContext)

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        autoComplete="off"
        id="task"
        list="task-suggestions"
        disabled={disableForm}
        placeholder="Dê um nome para o seu projeto"
        {...register('task')}
      />

      <datalist id="task-suggestions">
        <option value="Trabalhar" />
        <option value="Estudar React" />
        <option value="Descansar" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        type="number"
        id="minutesAmount"
        placeholder="00"
        disabled={disableForm}
        step={5}
        max={60}
        min={5}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  )
}
