import { PRICE_ABS_MAX, PRICE_ABS_MIN } from '../model/constants'

export const initRangeSlider = (prefix: string, onApply: () => void) => {
  const rangeMin = document.getElementById(`${prefix}-range-min`) as HTMLInputElement | null
  const rangeMax = document.getElementById(`${prefix}-range-max`) as HTMLInputElement | null
  const inputMin = document.getElementById(`${prefix}-price-min-input`) as HTMLInputElement | null
  const inputMax = document.getElementById(`${prefix}-price-max-input`) as HTMLInputElement | null
  const track = document.getElementById(`${prefix}-slider-track`)

  if (!rangeMin || !rangeMax || !inputMin || !inputMax) return

  const updateTrack = () => {
    const min = Number(rangeMin.value)
    const max = Number(rangeMax.value)
    const range = PRICE_ABS_MAX - PRICE_ABS_MIN
    const leftPct = ((min - PRICE_ABS_MIN) / range) * 100
    const rightPct = ((max - PRICE_ABS_MIN) / range) * 100
    if (track) {
      track.style.left = `${leftPct}%`
      track.style.width = `${rightPct - leftPct}%`
    }
    inputMin.value = String(min)
    inputMax.value = String(max)
  }

  rangeMin.addEventListener('input', () => {
    if (Number(rangeMin.value) > Number(rangeMax.value)) rangeMin.value = rangeMax.value
    updateTrack()
  })
  rangeMax.addEventListener('input', () => {
    if (Number(rangeMax.value) < Number(rangeMin.value)) rangeMax.value = rangeMin.value
    updateTrack()
  })

  rangeMin.addEventListener('change', onApply)
  rangeMax.addEventListener('change', onApply)

  const bindTextInput = (input: HTMLInputElement, rangeInput: HTMLInputElement) => {
    const commit = () => {
      const val = Math.max(PRICE_ABS_MIN, Math.min(PRICE_ABS_MAX, Number(input.value) || 0))
      input.value = String(val)
      rangeInput.value = String(val)
      updateTrack()
      onApply()
    }
    input.addEventListener('blur', commit)
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') commit()
    })
  }

  bindTextInput(inputMin, rangeMin)
  bindTextInput(inputMax, rangeMax)

  updateTrack()
}
