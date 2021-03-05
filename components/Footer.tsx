import React, { FC } from 'react'
import styled from 'styled-components'
import { ArticleContentRenderer } from './ArticleContentRenderer'
import ReactPlayer from 'react-player'
import { ImageBlockRecord, VideoRecord } from '../generated/sdk'
import { Image, StructuredText } from 'react-datocms'

const Wrapper = styled.footer`
  text-align: center;
  background: #fff;
  font-family: 'Amatic SC', cursive;
`

interface Props {
  content: any
}

export const Footer: FC<Props> = ({ content }) => {
  return (
    <Wrapper>
      <StructuredText
        data={content}
        renderText={text =>
          text.replace(/\s([ksvzouai])\s(\w)/gi, ' $1\u00a0$2')
        }
      />
    </Wrapper>
  )
}
