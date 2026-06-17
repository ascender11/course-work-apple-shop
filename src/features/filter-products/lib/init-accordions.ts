export const initAccordions = () => {
  document.querySelectorAll<HTMLElement>('[data-accordion-target]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation()
      const targetId = btn.dataset.accordionTarget
      if (!targetId) return
      document.getElementById(targetId)?.classList.toggle('hidden')
      btn.querySelector<HTMLElement>('.accordion-arrow')?.classList.toggle('rotate-180')
    })
  })
}
