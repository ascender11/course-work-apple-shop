import type { LngLat } from '@yandex/ymaps3-types'

import { getTheme, onThemeChange } from '@/shared/lib'

import { MapError, MapMarker } from './map-helpers'

const SHOP_COORDS: LngLat = [37.3891, 55.7319]

const createMapMarker = (): HTMLElement => {
  const wrapper = document.createElement('div')
  wrapper.className = 'map-marker-wrapper'
  wrapper.innerHTML = MapMarker()

  const balloon = wrapper.querySelector<HTMLElement>('.map-balloon')
  const pin = wrapper.querySelector<HTMLElement>('.map-pin')

  if (pin && balloon) {
    pin.addEventListener('click', (e) => {
      e.stopPropagation()
      balloon.style.display = balloon.style.display === 'none' ? 'block' : 'none'
    })
    document.addEventListener('click', () => {
      balloon.style.display = 'none'
    })
  }

  return wrapper
}

const waitForYmaps3 = (timeoutMs = 8000): Promise<boolean> =>
  new Promise((resolve) => {
    if ('ymaps3' in window) {
      resolve(true)
      return
    }
    let elapsed = 0
    const interval = setInterval(() => {
      elapsed += 100
      if ('ymaps3' in window) {
        clearInterval(interval)
        resolve(true)
      } else if (elapsed >= timeoutMs) {
        clearInterval(interval)
        resolve(false)
      }
    }, 100)
  })

let cleanupThemeListener: (() => void) | null = null

export const initDeliveryMap = async (): Promise<void> => {
  const container = document.getElementById('delivery-map')
  if (!container) return

  container.classList.add('delivery-map-container')

  const loaded = await waitForYmaps3()

  if (!loaded) {
    container.innerHTML = MapError('Карта временно недоступна')
    return
  }

  try {
    await ymaps3.ready

    const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } = ymaps3

    const currentTheme = getTheme()

    const map = new YMap(container, {
      location: { center: SHOP_COORDS, zoom: 15 },
      theme: currentTheme,
    })

    map.addChild(new YMapDefaultSchemeLayer({}))
    map.addChild(new YMapDefaultFeaturesLayer({}))
    map.addChild(new YMapMarker({ coordinates: SHOP_COORDS }, createMapMarker()))

    if (cleanupThemeListener) {
      cleanupThemeListener()
    }

    cleanupThemeListener = onThemeChange((theme) => {
      map.update({ theme })
    })
  } catch {
    container.innerHTML = MapError('Не удалось загрузить карту')
  }
}
