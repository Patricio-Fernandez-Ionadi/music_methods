import { useState, useMemo, useCallback } from 'react'

export function useTriadState(normalizedTriads) {
	const [showTriad, setShowTriad] = useState(false)
	const [showThird, setShowThird] = useState(false)
	const [showFifth, setShowFifth] = useState(false)
	const [activeTriadIndex, setActiveTriadIndex] = useState(0)
	const [showScaleTonic, setShowScaleTonic] = useState(true)
	const [activeTriadVoicing, setActiveTriadVoicing] = useState(null)

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
		setActiveTriadVoicing(null)
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
		setActiveTriadVoicing(null)
	}, [])

	const deselectTriad = useCallback(() => {
		setShowTriad(false)
		setShowThird(false)
		setShowFifth(false)
		setShowScaleTonic(true)
		setActiveTriadVoicing(null)
	}, [])

	const selectTriadVoicing = useCallback((voicing) => {
		setActiveTriadVoicing(voicing)
	}, [])

	return {
		showTriad,
		showThird,
		showFifth,
		activeTriadIndex,
		showScaleTonic,
		currentTriadDegrees,
		activeTriadVoicing,
		toggleTriad,
		toggleThird,
		toggleFifth,
		selectTriad,
		deselectTriad,
		selectTriadVoicing,
	}
}
