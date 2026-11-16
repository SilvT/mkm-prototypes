import { AvatarSingle, Button, Card, NotificationItem, SectionCard, Sidebarnav, sectionIcons } from "@/ui"
import { formatCount, longDate, missed, sections, user } from "@/app/data/landing"

// Landing page from Figma "The UI", node 9:7985. Sign out lives in the prototype controls (Sign in), not in the design.
export function Landing() {
  return (
    <div className="animate-motion-enter flex min-h-screen bg-(image:--gradient-general)">
      <Sidebarnav isCollapsed className="h-auto self-stretch" />
      <main className="flex flex-1 flex-col items-center justify-between gap-layout-s px-layout-m py-layout-l">
        <header className="flex flex-col items-center gap-content-l pb-layout-s">
          <h1 className="text-title-h0 text-text-header-brand">Marketing Management</h1>
          <p className="text-title-h3 text-text-header-sub-neutral">Fuel your connections, Drive Growth</p>
        </header>

        {/* 812 x 313 is the Figma size; no token for it yet (Card contract, Gaps). Min height: the list is a few px taller than the Figma box. */}
        <Card
          className="min-h-[313px] w-[812px]"
          container={
            <>
              <AvatarSingle content={user.initials} />
              <div className="flex flex-col items-start gap-content-s">
                <p className="text-body-b1 text-text-header-sub-brand">Welcome</p>
                <p className="text-title-h2 text-text-header-brand">{user.firstName}!</p>
              </div>
              <p className="text-body-b3 text-text-header-sub-neutral">{longDate()}</p>
            </>
          }
          containerTwo={
            <>
              <h2 className="text-title-h4 text-content-brand-bold">What you have missed</h2>
              <ul className="flex w-full flex-1 flex-col items-end gap-content-s">
                {missed.map((m, i) => (
                  <NotificationItem key={m.label} icon={sectionIcons[m.section]} label={m.label} count={formatCount(m.count)} underline={i === missed.length - 1} />
                ))}
                <li>
                  {/* Figma uses button xs (22 high, 10 text); Button has no xs size yet, so the height and text are overridden here (Gap). */}
                  <Button label="See All" type="tertiary" size="s" hasLeadIcon={false} hasTrailIcon={false} className="min-h-0 py-content-2xs text-body-b4" />
                </li>
              </ul>
            </>
          }
        />

        <section aria-label="Sections" className="flex w-full flex-wrap items-center justify-center gap-layout-s px-layout-l py-layout-s">
          {sections.map((s) => (
            <SectionCard key={s.label} icon={sectionIcons[s.section]} label={s.label} count={s.count === undefined ? undefined : formatCount(s.count)} />
          ))}
        </section>

        <footer className="text-title-h6 text-text-header-sub-neutral">
          A technology by <span className="text-content-brand-medium">Senapt</span>
        </footer>
      </main>
    </div>
  )
}
