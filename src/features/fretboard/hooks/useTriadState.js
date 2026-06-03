import { useState, useMemo, useCallback } from 'react'

export function useTriadState(normalizedTriads) {
	const [showTriad, setShowTriad] = useState(false)
	const [showThird, setShowThird] = useState(false)
	const [showFifth, setShowFifth] = useState(false)
	const [activeTriadIndex, setActiveTriadIndex] = useState(0)
	const [showScaleTonic, setShowScaleTonic] = useState(true)

	const currentTriadDegrees = useMemo(() => {
		if (!normalizedTriads || !normalizedTriads[activeTriadIndex]) {
			return { root: null, third: null, fifth: null }
		}
		const t = normalizedTriads[activeTriadIndex]
		return { root: t[0], third: t[1], fifth: t[2] }
	}, [normalizedTriads, activeTriadIndex])

	const toggleTriad = useCallback((checked) => {
		setShowTriad(checked)
		setShowThird(checked)
		setShowFifth(checked)
		if (!checked) setActiveTriadIndex(0)
	}, [])

	const toggleThird = useCallback((checked) => setShowThird(checked), [])
	const toggleFifth = useCallback((checked) => setShowFifth(checked), [])

	const selectTriad = useCallback((index) => {
		setActiveTriadIndex(index)
		setShowTriad(true)
		setShowThird(true)
		setShowFifth(true)
		setShowScaleTonic(false)
	}, [])

	const deselectTriad = useCallback(() => {
		setShowTriad(false)
		setShowThird(false)
		setShowFifth(false)
		setShowScaleTonic(true)
	}, [])

	return {
		showTriad,
		showThird,
		showFifth,
		activeTriadIndex,
		showScaleTonic,
		currentTriadDegrees,
		toggleTriad,
		toggleThird,
		toggleFifth,
		selectTriad,
		deselectTriad,
	}
}
