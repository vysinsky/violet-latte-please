import Link from 'next/link'
import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { CommentsCount } from 'react-facebook'
import { ArticleContentRenderer } from './ArticleContentRenderer'

const ArticlePreview = styled.div``

const Heading = styled.h2`
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

const ArticleInfo = styled.p`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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

const ContentPreview = styled.div`
  position: relative;
  min-height: 100px;
  max-height: 400px;
  text-overflow: ellipsis;
  overflow: hidden;

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

  &:after {
    position: absolute;
    content: '';
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 1) 100%
    );
    width: 100%;
    height: 100px;
    bottom: 0;
  }
`

const BottomBar = styled.div`
  font-family: 'Amatic SC', cursive;
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: right;
  background: white;
  padding: 20px 0;

  ${Anchor} {
    color: #ce93d8;
    border: 2px solid #ce93d8;
    border-radius: 4px;
    padding: 5px 10px;
    text-decoration: none;
    font-weight: bold;
    font-size: 1.5em;

    &:hover {
      color: #9b60a5;
      border-color: #9b60a5;
      background: #fff9ff;
    }
  }
`

const CommentsCountWrapper = styled.div`
  ${Anchor} > div {
    display: inline;
  }
`

interface Props {
  articles: any[]
}

export const ArticlesList: FC<Props> = ({ articles }) => {
  if (articles.length === 0) {
    return <Heading>Žádné články nebyly nalezeny</Heading>
  }

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      {articles.map(article => (
        <ArticlePreview key={article.id}>
          <Heading>
            <Link href={`/clanek/${article.slug}`} passHref>
              <Anchor>{article.title}</Anchor>
            </Link>
          </Heading>
          <ArticleInfo>
            <div>
              Publikováno dne {article.date} v kategorii{' '}
              <Link href={`/kategorie/${article.category.slug}`} passHref>
                <Anchor>{article.category.title}</Anchor>
              </Link>
            </div>
            {typeof window !== 'undefined' && (
              <CommentsCountWrapper>
                <Link href={`/clanek/${article.slug}#komentare`} passHref>
                  <Anchor>
                    Komentářů:
                    <CommentsCount
                      style={{ display: 'inline' }}
                      href={`${location.origin}/clanek/${article.slug}`}
                    />
                  </Anchor>
                </Link>
              </CommentsCountWrapper>
            )}
          </ArticleInfo>
          <Tags key={isClient ? 'ssr' : 'client'}>
            {article.tags.map(tag => (
              <Link key={tag.id} href={`/tag/${tag.label}`} passHref>
                <Anchor>{tag.label}</Anchor>
              </Link>
            ))}
          </Tags>
          <ContentPreview>
            <ArticleContentRenderer article={article} />
          </ContentPreview>
          <BottomBar>
            <Link href={`/clanek/${article.slug}`} passHref>
              <Anchor>Pokračovat ve čtení</Anchor>
            </Link>
          </BottomBar>
        </ArticlePreview>
      ))}
    </>
  )
}
