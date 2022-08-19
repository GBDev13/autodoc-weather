import {
  RiThunderstormsLine,
  RiDrizzleLine,
  RiRainyLine,
  RiSnowyLine,
  RiMistLine,
  RiSunLine,
  RiSunCloudyLine,
  RiCloudyLine,
} from 'react-icons/ri'
import { BsFillCloudsFill } from 'react-icons/bs'

const weatherIcons = {
  '01': <RiSunLine />,
  '02': <RiSunCloudyLine />,
  '03': <RiCloudyLine />,
  '04': <BsFillCloudsFill />,
  '09': <RiDrizzleLine />,
  10: <RiRainyLine />,
  11: <RiThunderstormsLine />,
  13: <RiSnowyLine />,
  50: <RiMistLine />,
}

export type WeatherIconsType = keyof typeof weatherIcons

interface WeatherIconProps {
  code: string
}

export function WeatherIcon({ code = '03d' }: WeatherIconProps) {
  const parsedCode = code.slice(0, 2) as WeatherIconsType
  return weatherIcons[parsedCode]
}
