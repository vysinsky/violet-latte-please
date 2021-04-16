import Link from 'next/link'
import React, { FC } from 'react'
import styled from 'styled-components'

import { ArticleContentRenderer } from './ArticleContentRenderer'
import { DiscussionEmbed } from 'disqus-react'

const ArticleWrapper = styled.div``

const Heading = styled.h1`
  font-family: 'Amatic SC', cursive;
  font-size: 2em;
  line-height: 1.4em;
  margin: 10px auto;
  color: #ce93d8;
  font-weight: bold;
  vertical-align: middle;

  @media only screen and (max-width: 400px) {
    font-size: 2em;
    line-height: 2em;
  }
`

const Anchor = styled.a`
  color: #ce93d8;
  text-decoration: none;

  &:hover {
    color: #9b60a5;
  }
`

const AnchorLike = styled.span`
  color: #ce93d8;
  text-decoration: none;
`

const ArticleInfo = styled.p`
  font-family: 'Amatic SC', cursive;
  margin: 0;
  font-size: 1.2em;
  line-height: 1.5em;
`

const Tags = styled.p`
  font-family: 'Amatic SC', cursive;

  ${Anchor} {
    color: #ce93d8;
    border: 2px solid #ce93d8;
    border-radius: 4px;
    padding: 5px 10px;
    text-decoration: none;
    font-weight: bold;
    font-size: 1.2em;
    display: inline-block;
    margin-bottom: 5px;
    margin-right: 5px;

    &:hover {
      color: #9b60a5;
      border-color: #9b60a5;
      background: #fff9ff;
    }
  }
`

const Content = styled.div`
  a {
    color: #ce93d8;
    text-decoration: underline;

    &:active,
    &:focus,
    &:hover {
      color: #9b60a5;
      text-decoration: underline;
    }
  }
`

const CommentsWrapper = styled.div``

interface Props {
  article: any
}

export const Article: FC<Props> = ({ article }) => {
  return (
    <ArticleWrapper key={article.id}>
      <Heading>
        <AnchorLike>{article.title}</AnchorLike>
      </Heading>
      <ArticleInfo>
        Publikováno dne{' '}
        {new Date(article.date).toLocaleDateString('cs-CZ', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}{' '}
        v kategorii{' '}
        <Link href={`/kategorie/${article.category.slug}`} passHref>
          <Anchor>{article.category.title}</Anchor>
        </Link>
      </ArticleInfo>
      <Tags>
        {article.tags.map(tag => (
          <Link key={tag.id} href={`/tag/${tag.label}`} passHref>
            <Anchor>{tag.label}</Anchor>
          </Link>
        ))}
      </Tags>
      <Content>
        <ArticleContentRenderer article={article} />
      </Content>
      {typeof window !== 'undefined' && (
        <CommentsWrapper>
          <Heading id="komentare" as="h4">
            Komentáře
          </Heading>
          <div>
            <DiscussionEmbed
              shortname="violet-latte-please"
              config={{
                url: process.env.DISQUS_URL,
                identifier: article.id,
                title: article.title,
                language: 'cs_CZ',
              }}
            />
          </div>
        </CommentsWrapper>
      )}
    </ArticleWrapper>
  )
}
