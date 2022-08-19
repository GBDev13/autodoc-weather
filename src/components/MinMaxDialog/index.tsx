import * as Dialog from '@radix-ui/react-dialog'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  CollectionReference,
} from 'firebase/firestore'
import { GiThermometerHot, GiThermometerCold } from 'react-icons/gi'
import { IoMdClose } from 'react-icons/io'
import { LogData } from '../../interfaces/weather.interface'
import { storage } from '../../lib/firebase'
import { useAppSelector } from '../../store/hooks'
import { StyledClose, StyledContent, StyledOverlay } from './styles'

interface MinMaxDialogProps {
  children: ReactNode
}

export function MinMaxDialog({ children }: MinMaxDialogProps) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  const [maxData, setMaxData] = useState({} as LogData)
  const [minData, setMinData] = useState({} as LogData)

  const logsRef = collection(storage, 'logs') as CollectionReference<LogData>
  // const q = query(logsRef, where('cityId', '==', '-McqHCnP9pZbDJWfmnnD'))
  const qMax = query(logsRef, orderBy('max', 'desc'), limit(1))
  const qMin = query(logsRef, orderBy('min', 'asc'), limit(1))

  const getLogs = useCallback(async () => {
    const dataMax = await getDocs(qMax)
    const dataMin = await getDocs(qMin)

    const resultsMax: LogData[] = []
    const resultsMin: LogData[] = []

    dataMax.forEach((doc) => {
      return resultsMax.push(doc.data())
    })
    dataMin.forEach((doc) => {
      return resultsMin.push(doc.data())
    })

    setMaxData(resultsMax[0])
    setMinData(resultsMin[0])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (dialogIsOpen) getLogs()
  }, [dialogIsOpen, getLogs])

  const { availableCities } = useAppSelector((state) => state.weather)

  const currentMaxCity = availableCities.find(
    (city) => city.name === maxData?.cityId,
  )
  const currentMinCity = availableCities.find(
    (city) => city.name === minData?.cityId,
  )

  return (
    <Dialog.Root open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <StyledOverlay />
        <StyledContent>
          <Dialog.Title>Maior e menor temperatura registrada</Dialog.Title>
          <StyledClose>
            <IoMdClose />
          </StyledClose>

          <p>
            <GiThermometerHot />
            <strong>Maior temperatura</strong>
            {currentMaxCity?.name} {maxData?.max}°C
          </p>

          <p>
            <GiThermometerCold />
            <strong>Menor temperatura</strong>
            {currentMinCity?.name} {minData?.min}°C
          </p>
        </StyledContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
