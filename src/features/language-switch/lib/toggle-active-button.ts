export const toggleActiveButton = (buttons: NodeListOf<HTMLButtonElement>, activeBtn: HTMLButtonElement) => {
  buttons.forEach((b) => {
    b.classList.remove('bg-background', 'shadow-sm', 'text-text-primary')
    b.classList.add('text-text-quinary')
  })
  activeBtn.classList.remove('text-text-quinary')
  activeBtn.classList.add('bg-background', 'shadow-sm', 'text-text-primary')
}
