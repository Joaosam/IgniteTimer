import { ChangeEvent, createContext, useEffect, useState } from 'react'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  stopDate?: Date
  finishedDate?: Date
}

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  totalSeconds: number
  disableForm: boolean
  currentCycleFinished: () => void
  secondsPassed: (seconds: number) => void
  createNewTask: (data: CreateCycleData) => void
  handleStopCycle: () => void
  setCycles: (data: Cycle[]) => void
  setDisableForm: (data: boolean) => void
}

export const CyclesContext = createContext({} as CyclesContextType)

interface childrenProps {
  children: React.ReactNode
}

export function CyclesContextProvider({ children }: childrenProps) {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [disableForm, setDisableForm] = useState<boolean>(false)
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmoutSecondsPassed] = useState(0)
  const activeCycle = cycles.find((idActive) => idActive.id === activeCycleId)
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  let tasksLocalStorage: Cycle[] = []

  if (window.localStorage.getItem('@Ignite-Timer:Cycles')) {
    tasksLocalStorage = JSON.parse(
      localStorage.getItem('@Ignite-Timer:Cycles') ?? ''
    )
  }

  useEffect(() => {
    if (tasksLocalStorage.length !== 0) setCycles(tasksLocalStorage)
  }, [])

  useEffect(() => {
    const stateJson = JSON.stringify(cycles)
    localStorage.setItem('@Ignite-Timer:Cycles', stateJson)
  }, [cycles])

  function secondsPassed(seconds: number) {
    setAmoutSecondsPassed(seconds)
  }

  function currentCycleFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      })
    )
  }

  function createNewTask(data: CreateCycleData) {
    const newCycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((currentCycle) => [...currentCycle, newCycle])
    // O ciclo criado será o ciclo ativo
    setActiveCycleId(newCycle.id)
    setAmoutSecondsPassed(0)
  }

  function handleStopCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, stopDate: new Date() }
        } else {
          return cycle
        }
      })
    )
    setActiveCycleId(null)
    setDisableForm(!activeCycle)
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        totalSeconds,
        disableForm,
        handleStopCycle,
        createNewTask,
        secondsPassed,
        currentCycleFinished,
        setCycles,
        setDisableForm,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
