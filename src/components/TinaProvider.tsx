import { ReactNode } from 'react'

interface TinaProviderProps {
  children: ReactNode
}

export function TinaProvider({ children }: TinaProviderProps) {
  // TinaCMS will be loaded via the /admin page
  // This provider is here for future client-side editing features
  return <>{children}</>
}
