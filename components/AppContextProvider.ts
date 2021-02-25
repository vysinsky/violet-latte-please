import { createContext, useContext } from 'react'
import { AppQueryQuery } from '../generated/sdk'

const defaults: AppQueryQuery = {
  categories: [],
  configuration: undefined,
  site: {
    favicon: undefined,
    globalSeo: undefined,
  },
}

export const appContext = createContext<AppQueryQuery>(defaults)

export const AppContextProvider = appContext.Provider

export const useAppContext = (): AppQueryQuery =>
  useContext<AppQueryQuery>(appContext)
