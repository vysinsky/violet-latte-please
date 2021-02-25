import { FC } from 'react'
import styled, { css } from 'styled-components'
import Link from 'next/link'

import { CategoryRecord } from '../generated/sdk'

const Wrapper = styled.ul`
  background: #fff;
  list-style: none;
  margin: 0;
  padding: 0 0 0 5px;
  font-size: 1.5em;
  border-right: 1px solid rgba(206, 147, 216, 0.5);
  overflow-y: auto;
  min-width: 200px;
  font-family: 'Amatic SC', cursive;

  @media only screen and (max-width: 700px) {
    height: 100%;
  }
`

const Header = styled.li`
  font-size: 1.5em;
  color: #ce93d8;
  padding: 0 10px;
`

const NavLink = styled.a`
  &,
  &:visited {
    color: #ce93d8;
    text-decoration: none;
    line-height: 2em;
    font-weight: bold;
    display: block;
  }
`

const Item = styled.li<{ active?: boolean }>`
  margin: 0.5em 0 0 20px;
  padding: 0 10px 0;

  &:last-of-type {
    margin-bottom: 3em;
  }

  &:hover,
  &:focus,
  &:active {
    text-decoration: underline;
  }

  ${({ active }) =>
    active &&
    css`
      list-style-type: disc;
      color: #9b60a5;

      ${NavLink} {
        color: currentColor;
      }
    `}
`

interface Props {
  categories: Pick<CategoryRecord, 'slug' | 'title'>[]
}

export const Navigation: FC<Props> = ({ categories }) => {
  return (
    <Wrapper>
      <Header>Menu</Header>
      <Item>
        <Link href="/" passHref>
          <NavLink>Domů</NavLink>
        </Link>
      </Item>
      {categories.map(({ slug, title }) => (
        <Item key={slug}>
          <Link href={`/${slug}`} passHref>
            <NavLink>{title}</NavLink>
          </Link>
        </Item>
      ))}
    </Wrapper>
  )
}
