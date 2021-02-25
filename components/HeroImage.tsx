import { FC } from 'react'
import styled from 'styled-components'
import { useAppContext } from './AppContextProvider'
import { Image } from 'react-datocms'

const Wrapper = styled.div`
  text-align: center;
`

export const HeroImage: FC = () => {
  const {
    configuration: {
      introImage: { responsiveImage },
    },
  } = useAppContext()

  return (
    <Wrapper>
      <Image data={responsiveImage} />
    </Wrapper>
  )
}
