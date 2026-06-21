"use client"

import { useEffect } from "react"

function isInAppBrowser(): boolean {
  if (typeof navigator === "undefined") return false
  return /KAKAOTALK|Line\/|Instagram|NAVER|FB_IAB|FBAN|LinkedInApp|Snapchat/i.test(
    navigator.userAgent,
  )
}

function isAndroid(): boolean {
  if (typeof navigator === "undefined") return false
  return /Android/i.test(navigator.userAgent)
}

export function ChromeRedirect() {
  useEffect(() => {
    if (!isInAppBrowser()) return

    const { host, pathname, search } = window.location

    if (isAndroid()) {
      // Android: intent 스킴으로 Chrome 강제 실행
      window.location.href = `intent://${host}${pathname}${search}#Intent;scheme=https;package=com.android.chrome;end;`
    } else {
      // iOS: googlechrome:// 스킴으로 Chrome 강제 실행
      const url = window.location.href
      window.location.href = url.replace(/^https?:\/\//, "googlechrome://")
    }
  }, [])

  return null
}
