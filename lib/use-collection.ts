"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { CARDS } from "./cards"

const STORAGE_KEY = "bfd_collected_cards_v2"

const validIds = new Set(CARDS.map((c) => c.id))

function readStorage(): string[] {
  if (typeof window === "undefined") return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed
      .map((id) => String(id))
      .filter((id): id is string => typeof id === "string" && validIds.has(id))
  } catch {
    return []
  }
}

export function useCollection() {
  const [collected, setCollected] = useState<string[]>([])
  const [hydrated, setHydrated] = useState(false)
  // 방금 새로 획득한 카드(축하 모달용)
  const [justCollected, setJustCollected] = useState<string | null>(null)
  // 현재 수집 상태를 동기적으로 읽기 위한 ref (setState 업데이터 타이밍 이슈 방지)
  const collectedRef = useRef<string[]>([])

  useEffect(() => {
    const initial = readStorage()
    collectedRef.current = initial
    setCollected(initial)
    setHydrated(true)
  }, [])

  const persist = useCallback((next: string[]) => {
    collectedRef.current = next
    setCollected(next)
    try {
      const numericArray = next.map((id) => parseInt(id, 10)).filter((n) => !isNaN(n))
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(numericArray))
    } catch {
      /* storage unavailable */
    }
  }, [])

  const collect = useCallback(
    (id: string): "new" | "duplicate" | "invalid" => {
      if (!validIds.has(id)) return "invalid"
      if (collectedRef.current.includes(id)) return "duplicate"

      const next = [...collectedRef.current, id]
      collectedRef.current = next
      setCollected(next)
      try {
        const numericArray = next.map((id) => parseInt(id, 10)).filter((n) => !isNaN(n))
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(numericArray))
      } catch {
        /* ignore */
      }
      setJustCollected(id)
      return "new"
    },
    [],
  )

  const reset = useCallback(() => {
    persist([])
    setJustCollected(null)
  }, [persist])

  const clearJustCollected = useCallback(() => setJustCollected(null), [])

  return {
    collected,
    count: collected.length,
    hydrated,
    isCollected: (id: string) => collected.includes(id),
    collect,
    reset,
    justCollected,
    clearJustCollected,
  }
}
