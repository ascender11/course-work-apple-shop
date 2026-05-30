export const initGallery = () => {
  const thumbs = document.querySelectorAll<HTMLButtonElement>('[data-gallery-thumb]')
  const mainImg = document.getElementById('product-gallery-main-img') as HTMLImageElement | null

  thumbs.forEach((btn) => {
    btn.addEventListener('click', () => {
      const src = btn.querySelector('img')?.src
      if (mainImg && src) {
        mainImg.src = src
        thumbs.forEach((t) => {
          t.classList.remove('border-primary')
          t.classList.add('border-transparent')
        })
        btn.classList.remove('border-transparent')
        btn.classList.add('border-primary')
      }
    })
  })
}
