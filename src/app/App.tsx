import { Button, Checkbox, TooltipProvider } from "@/ui"

// Scaffold smoke test: one real design-system component and one placeholder. Replaced by the app shell.
export default function App() {
  return (
    <TooltipProvider>
      <main className="flex flex-col gap-4 p-8">
        <h1>MkM prototypes</h1>
        <Button label="Real DS button" />
        <label className="flex items-center gap-2">
          <Checkbox /> Placeholder checkbox
        </label>
      </main>
    </TooltipProvider>
  )
}
