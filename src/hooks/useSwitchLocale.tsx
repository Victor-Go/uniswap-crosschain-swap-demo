'use client'

import { usePathname, useRouter } from 'next/navigation'

const useSwitchLocale = () => {
  const pathname = usePathname()
  const router = useRouter()

  const switchLocale = (targetLocale: string) => {
    const segments = pathname.split('/')

    if (segments[1]) {
      segments[1] = targetLocale
    } else {
      segments.unshift(targetLocale)
    }

    const newPath = segments.join('/') || '/'
    router.push(newPath)
  }

  return switchLocale
}

export default useSwitchLocale
