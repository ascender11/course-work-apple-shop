import { initDeliveryMap } from '../lib/init-delivery-map'

export const initDeliveryPage = () => {
  const observer = new MutationObserver((_, obs) => {
    const mapEl = document.getElementById('delivery-map')
    if (!mapEl) return
    obs.disconnect()
    void initDeliveryMap()
  })
  observer.observe(document.body, { childList: true, subtree: true })
}
