export const detectViewPort = () => {
  if (typeof window !== 'undefined') {
    const width = window.innerWidth
    if (width < 600) {
      return 'mobile'
    } else {
      return 'desktop'
    }
  }
}
