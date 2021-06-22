
export const highlight = (str) => {
  return str.toLowerCase().replace(
    this.q.toLowerCase(),
    `<span style="color: red;">${this.q}</span>`
  )
}
