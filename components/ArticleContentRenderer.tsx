import React, { FC } from 'react'
import { Image, StructuredText } from 'react-datocms'

import { ArticleRecord, ImageBlockRecord, VideoRecord } from '../generated/sdk'
import ReactPlayer from 'react-player'

interface Props {
  article: ArticleRecord
}

export const ArticleContentRenderer: FC<Props> = ({ article }) => (
  <StructuredText
    // @ts-expect-error Some typing error
    data={article.content}
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
            <Image data={(record as ImageBlockRecord).image.responsiveImage} />
          )
        default:
          console.warn(`Cannot handle record type "${record.__typename}"`)
          return null
      }
    }}
  />
)
