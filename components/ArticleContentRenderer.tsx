import React, { FC } from 'react'
import { Image, StructuredText } from 'react-datocms'

import { ArticleRecord, ImageBlockRecord, VideoRecord } from '../generated/sdk'
import ReactPlayer from 'react-player'

interface Props {
  article: ArticleRecord
}

export const ArticleContentRenderer: FC<Props> = ({ article }) => {
  return (
    <StructuredText
      // @ts-expect-error Some typing error
      data={article.content}
      renderText={text => text.replace(/\s([ksvzouai])\s(\w)/gi, ' $1\u00a0$2')}
      renderBlock={({ record }) => {
        switch (record.__typename) {
          case 'VideoRecord':
            return (
              <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                <ReactPlayer
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                  }}
                  url={(record as VideoRecord).data.url}
                  top={0}
                  left={0}
                  width="100%"
                  height="100%"
                />
              </div>
            )
          case 'ImageBlockRecord':
            return (
              <Image
                data={(record as ImageBlockRecord).image.responsiveImage}
                style={{ width: '60%', margin: '0 auto' }}
              />
            )
          default:
            console.warn(`Cannot handle record type "${record.__typename}"`)
            return null
        }
      }}
    />
  )
}
