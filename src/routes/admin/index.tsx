import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/')({
  component: TinaAdmin,
})

function TinaAdmin() {
  return (
    <iframe
      src="/admin/index.html"
      title="TinaCMS Admin"
      style={{
        width: '100vw',
        height: '100vh',
        border: 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
      }}
    />
  )
}
