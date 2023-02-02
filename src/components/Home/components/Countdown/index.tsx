import { useContext, useEffect } from 'react'
import { CountdownContainer, Separator } from './styled'

import { differenceInSeconds } from 'date-fns'
import { CyclesContext } from '../../../../contexts/CyclesContext'

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    amountSecondsPassed,
    totalSeconds,
    currentCycleFinished,
    secondsPassed,
    setDisableForm,
  } = useContext(CyclesContext)

  useEffect(() => {
    let interval: number
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        )
        setDisableForm(!!activeCycle)

        // Se o tempo percorrido for igual ao total de segundos defino a finalização, senão, continuo contando
        if (secondsDifference >= totalSeconds) {
          setDisableForm(!activeCycle)
          currentCycleFinished()
          secondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          secondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    activeCycleId,
    totalSeconds,
    currentCycleFinished,
    secondsPassed,
  ])

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
  const amountMinutes = Math.floor(currentSeconds / 60)
  const amountSeconds = currentSeconds % 60
  // Converto meu número para string e digo que o minutes terá 2 caracteres, se tiver 1, incluo o 0 no começo da string
  const minutes = String(amountMinutes).padStart(2, '0')
  const seconds = String(amountSeconds).padStart(2, '0')

  useEffect(() => {
    if (activeCycle && !(amountSecondsPassed >= totalSeconds)) {
      document.title = `${activeCycle.task} - ${minutes}:${seconds}`
    } else {
      document.title = 'Ignite Timer'
    }
  }, [minutes, seconds, activeCycle])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
