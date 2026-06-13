import { html } from '@/shared/lib'

export const MapMarker = (): string => html`
  <div class="map-balloon">
    <p>Apple Shop</p>
    <p>Официальный магазин</p>
    <p>ул. Барклая, 8 · Москва</p>
  </div>
  <div class="map-pin">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
        fill="white"/>
    </svg>
  </div>
`
