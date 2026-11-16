import type { Ref } from "react"

// Prototype chrome (not part of the design): a desktop-sized "window" for the app. The app runs in an iframe so its media queries
// and viewport units follow the frame, not the browser window: resizing the frame is a real responsive test. The frame is 1440 x 800
// at most and shrinks with the browser window.
export function DesktopFrame({ src, ref }: { src: string; ref?: Ref<HTMLIFrameElement> }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-surface-neutral-extrasubtle p-content-l">
      <iframe
        ref={ref}
        src={src}
        title="Prototype, desktop frame"
        className="h-[1024px] max-h-full w-(--dimensions-1440) max-w-full resize overflow-auto rounded-large border-none bg-white shadow-[0_0_0_var(--border-width-light)_var(--stroke-neutral-light)]"
      />
    </div>
  )
}
