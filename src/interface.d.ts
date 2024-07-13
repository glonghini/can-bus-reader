export { }

declare global {
  interface Window {
    api: typeof import('./api').default
  }
}