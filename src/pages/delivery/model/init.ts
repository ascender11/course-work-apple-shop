import { initDeliveryMap } from '../lib/init-delivery-map'

export const initDeliveryPage = () => {
  requestAnimationFrame(() => {
    const mapEl = document.getElementById('delivery-map')
    if (mapEl) void initDeliveryMap()
  })
}
