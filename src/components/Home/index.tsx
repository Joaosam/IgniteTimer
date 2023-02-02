import { HandPalm, Play } from 'phosphor-react'
import { useContext } from 'react'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { CyclesContext } from '../../contexts/CyclesContext'

export type dataForm = {
  task: string
  minutesAmount: number
}

const schema = yup.object().shape({
  minutesAmount: yup
    .number()
    .required()
    .min(5, 'O ciclo mínimo é de 5 minutos.')
    .max(60, 'O ciclo máximo é de 60 minutos.'),
})

export function Home() {
  const {
    activeCycle,
    amountSecondsPassed,
    totalSeconds,
    createNewTask,
    handleStopCycle,
  } = useContext(CyclesContext)

  const { register, handleSubmit, watch, reset, formState } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      task: '',
      minutesAmount: 5,
    },
  })
  const errorValidation = formState.errors.minutesAmount?.message
  errorValidation && alert(errorValidation)

  function handleCreateNewTask(data: dataForm) {
    createNewTask(data)
    reset()
  }

  const task = watch('task')
  const isTaskDisable = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewTask)}>
        <NewCycleForm register={register} />
        <Countdown />

        {activeCycle && !(amountSecondsPassed >= totalSeconds) ? (
          <StopCountdownButton onClick={handleStopCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton
            title="Preencha o nome e a duração antes de começar."
            disabled={isTaskDisable}
            type="submit"
          >
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
