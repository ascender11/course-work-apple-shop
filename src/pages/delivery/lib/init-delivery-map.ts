import type { LngLat } from '@yandex/ymaps3-types'

import { t } from '@/shared/i18n'
import { getColorScheme, onAccessibilityChange } from '@/shared/lib'

import { MapError, MapMarker } from './map-helpers'

const SHOP_COORDS: LngLat = [37.3891, 55.7319]

const DARK_SCHEMES = ['black-white', 'black-green']

const getMapTheme = (): 'light' | 'dark' => (DARK_SCHEMES.includes(getColorScheme()) ? 'dark' : 'light')

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
    container.innerHTML = MapError(t('delivery.mapUnavailable'))
    return
  }

  try {
    await ymaps3.ready

    const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker } = ymaps3

    const mapTheme = getMapTheme()

    const map = new YMap(container, {
      location: { center: SHOP_COORDS, zoom: 15 },
      theme: mapTheme,
    })

    map.addChild(new YMapDefaultSchemeLayer({}))
    map.addChild(new YMapDefaultFeaturesLayer({}))
    map.addChild(new YMapMarker({ coordinates: SHOP_COORDS }, createMapMarker()))

    if (cleanupThemeListener) {
      cleanupThemeListener()
    }

    cleanupThemeListener = onAccessibilityChange(() => {
      map.update({ theme: getMapTheme() })
    })
  } catch {
    container.innerHTML = MapError(t('delivery.mapError'))
  }
}
