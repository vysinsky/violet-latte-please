import React, { FC } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  gap: 20px;
`

const Heading = styled.h4`
  font-family: 'Amatic SC', cursive;
  font-size: 1.5em;
  line-height: 1.4em;
  margin: 10px auto;
  color: #ce93d8;
  font-weight: bold;
  vertical-align: middle;
`

const Vivantis = () => (
  <a
    href="https://www.vivantis.cz/?d=73723&utm_source=provizni-system&utm_medium=affiliate&utm_campaign=73723"
    target="_blank"
    rel="nofollow, noreferrer"
  >
    <img
      src="https://img.vivantiscdn.net/soubory/-/provizni-system.cz/bannery/vivantis-cz-250x250_cz.jpg"
      alt="vivantis.cz"
      title="vivantis.cz"
    />
  </a>
)

const Econea = () => (
  <a
    href="https://www.econea.cz/?a_box=frvebzzb"
    target="_blank"
    rel="nofollow, noreferrer"
  >
    <img
      src="/partneri/250x250_Econea_Heroes.png"
      alt="econea.cz"
      title="econea.cz"
    />
  </a>
)

const SperkyCz = () => (
  <a
    href="https://www.sperky.cz/?d=73723&utm_source=provizni-system&utm_medium=affiliate&utm_campaign=73723"
    target="_blank"
    rel="nofollow, noreferrer"
  >
    <img
      src="https://img.vivantiscdn.net/soubory/-/provizni-system.cz/bannery/sperky-brand_bannery_3_250x250-1.jpg"
      alt="šperky.cz"
      title="šperky.cz"
    />
  </a>
)

const HodinkyCz = () => (
  <a
    href="https://www.hodinky.cz/?d=73723&utm_source=provizni-system&utm_medium=affiliate&utm_campaign=73723"
    target="_blank"
    rel="nofollow, noreferrer"
  >
    <img
      src="https://img.vivantiscdn.net/soubory/-/provizni-system.cz/bannery/hodinky-ho_brand_250x250.jpg"
      alt="hodinky.cz"
      title="hodinky.cz"
    />
  </a>
)

const KrasaCz = () => (
  <a
    href="https://www.krasa.cz/?d=73723&utm_source=provizni-system&utm_medium=affiliate&utm_campaign=73723"
    target="_blank"
    rel="nofollow, noreferrer"
  >
    <img
      src="https://img.vivantiscdn.net/soubory/-/provizni-system.cz/bannery/krasa-brand_bannery_1_250x250.jpg"
      alt="krása.cz"
      title="krása.cz"
    />
  </a>
)

const ParfemyCz = () => (
  <a
    href="https://www.parfemy.cz/armani/?d=73723&utm_source=provizni-system&utm_medium=affiliate&utm_campaign=73723"
    target="_blank"
    rel="nofollow, noreferrer"
  >
    <img
      src="https://img.vivantiscdn.net/soubory/-/provizni-system.cz/bannery/parfemy-armani_bannery_1_250x250.jpg"
      alt="parfémy.cz"
      title="parfémy.cz"
    />
  </a>
)

const ProzdraviCz = () => (
  <a
    href="https://www.prozdravi.cz/clanek/alergie-astma/?d=73723&utm_source=provizni-system&utm_medium=affiliate&utm_campaign=73723"
    target="_blank"
    rel="nofollow, noreferrer"
  >
    <img
      src="https://img.vivantiscdn.net/soubory/-/provizni-system.cz/bannery/prozdravi-alergie-250x250.jpg"
      alt="prozdraví.cz"
      title="prozdraví.cz"
    />
  </a>
)

export const Partners: FC = () => (
  <Wrapper>
    <Heading>Partnerské e-shopy</Heading>
    <Vivantis />
    <Econea />
    <ProzdraviCz />
    <KrasaCz />
    <ParfemyCz />
    <SperkyCz />
    <HodinkyCz />
  </Wrapper>
)
