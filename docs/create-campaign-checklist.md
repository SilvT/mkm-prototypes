# Create Campaign: screen and component checklist

Source: Figma `1Y7TegkMY7wZtv8AzDxXNS`, page "Create Campaign -prototype", section "Create new campaign - prototype flow" (node `1:15649`).
Read from screenshots of the panel states and the layer names. Copy below is as it appears in Figma (spellings kept, e.g. "Business"); confirm before shipping.

## Scope (decided)

Build **only the side panel** for now, on a plain stage page (panel open, a "reopen" button, neutral backdrop). The Campaigns list, sidebar, KPI row and list rows are out of scope here and come with the Filtering flow. Save as Draft writes the campaign to the store in the shape the list will read later, and shows a "Draft saved" state.
Decided: copy typos are fixed (Business, Assign to self); the 92px sidebar is the collapsed `sidebarnav` (later); channel glyphs are added to the shared icon registry in ds_POC (export from the Figma `icons` page, then `npm run ds:sync` here). Step 2 is blocked on those icons.

### Decisions log
- Stepper uses `indicator-count` type secondary, size medium. Display only now; later, steps become clickable only for completed previous steps.

## What the flow is

A **507 × 1070 side panel** that opens over the Campaigns list (list is blurred behind it, sidebar stays). A vertical 6-step numbered stepper on the left of the panel; the active step is highlighted. Header: chevron, "Create new campaign", close (x). Footer: Back / Next.

| # | Step title | Content | Figma frames |
|---|------------|---------|--------------|
| 1 | Campaign details | Campaign name, Campaign ID (counter 0/8, "Only letters and numbers. Must be at least 8 characters."), Description (0/10, "Must be at least 10 words"), Campaign Manager* (select + "Assign to self" link, info tooltip), Campaign Type* (radio: Seed / Series / Re-engage, "Clear") | `1:23958`, `1:17297` |
| 2 | Channel | "List of channels" accordion with count; "Select channel" tile grid (Canvas, Events, Radio, Print, WOM, Website, Blog, Social media; selected = darker tile); Channel Name; Channel Description* (0/5, "Must be at least 5 words"); "Add channel" | `channel for prototype` `1:18663` (19 states: hasChannels, 0..16) |
| 3 | Settings | Timeline: start and end date, "Total campaign days N"; Budget: "Channel List" with one row per added channel (radio select; open row shows Paid toggle, £ budget input, "Add budget"); "Overall total for campaign" £ | `settings for prototype` `1:20235` (19 states) |
| 4 | Audience | "Set targets" toggle; Gender (checkboxes + Select all), Age range (checkbox grid + Select all), Language (multi-select, removable chips), Location (search input) | `audience for prototype` `1:21071` (8 states, incl. `off`) |
| 5 | Marketing objectives | Three checkbox groups: Business (4), Brand (2), Customer (2), each with Select all | `marketing obj` `1:17297`, `1:17395` |
| 6 | Resume (review) | Title is the campaign name + ID. Read-only summary per section (General, Channels, Targets, Marketing objectives) with an edit control each; inline editing of a section swaps it for its fields; date picker popup; channel/target/objective dropdowns open in place. Footer: Reset, Save as Draft | `Resume for prototype` `1:21579` (about 45 states: Editing = General / Channels / Targets / Mark obj, stage 0..11) |

Entry and exit: Campaigns list (`Campaigns_list`, with `Interactions_dashboard` and `campaign list` variants, KPI "card-higlight" row, campaign rows with status and metrics) → panel opens → Save as Draft / close → back to the list.

## Component map

Legend: **DS** = exists in ds_POC, **PH** = stock-shadcn placeholder already in `src/placeholders`, **NEW** = not built anywhere yet (needs a placeholder now and a design system build later), **APP** = prototype code, not a design system component.

| Need | Used in | Status |
|------|---------|--------|
| Button (primary, secondary with lead/trail icon: Back, Next, Reset, Save as Draft) | all | DS `button` |
| Text input with label, helper, counter, error (name, ID, description, channel name/description, budget) | 1, 2, 3 | DS `inputfield-base` / `inputfield-stack`. Multi-line description: check whether it supports it |
| Search input (Location) | 4 | DS `inputfield-base` type search |
| Text link ("Assign to self", "Select all", "Clear") | 1, 4, 5 | DS `links` |
| Icon set (channel glyphs, info, calendar, arrows, close, add) | all | DS `icon`. Channel glyphs (door-person, stadium, mic, printer, WOM, globe, blog, phone) may be missing from the registry: Gap check |
| Sidebar nav | list backdrop | DS `sidebarnav` |
| KPI card ("card-higlight") | list backdrop | DS `kpi-card` (stories only, no contract) |
| Status badge on list rows | list backdrop | DS `badge-status` |
| Radio group (Campaign Type, channel row select) | 1, 3 | PH `radio-group` |
| Checkbox (+ "Select all" group pattern) | 4, 5, 2 | PH `checkbox` |
| Select / dropdown | 1 (manager), 4 (language) | PH `select`. Language is multi-select with chips: NEW |
| Tooltip + label with info icon | 1, 2 | PH `tooltip`. Label-with-tooltip wrapper: NEW |
| Toggle switch (Paid, Set targets) | 3, 4 | NEW (shadcn `switch`) |
| Side panel / drawer with blurred overlay | whole flow | NEW (shadcn `sheet`, or a custom panel) |
| Vertical numbered stepper (6 steps) | whole flow | APP composition of DS `indicator-count`, **type secondary, size medium** (decided; matches the contract and Figma `1:18613`). Active step = `status="active"`, others default/disabled: check the Figma frame. **Display only for now**; later, only previously completed steps become clickable (needs a wrapper element, the component itself is not interactive) |
| Removable chip / tag (languages) | 4 | NEW |
| Channel tile selector (icon + label, selected state) | 2 | NEW |
| Collapsible "List of channels" with count | 2 | NEW (shadcn `accordion` or `collapsible`) |
| Date input and calendar popup (single date, range, "Total campaign days") | 3, 6 | NEW (shadcn `calendar` + `popover`). Costly |
| Currency input (£) | 3 | NEW, or `inputfield-base` type number with prefix: check |
| Budget row (radio + name + total, expands) | 3 | APP composed from DS pieces, unless reused elsewhere |
| Summary section with edit control (label, values, edit) | 6 | NEW (shadcn has none). Probably one component with a read and an edit mode |
| Wizard progress/validation state | whole flow | APP (state machine, see below) |
| Fake data: managers, channels, languages, locations, objectives | all | APP `src/app/data/` |

Placeholders still to add to `src/placeholders`: **switch, sheet (or custom), popover, calendar, accordion/collapsible, badge or chip** (via `npx shadcn@latest add ...`, then the PLACEHOLDER header, `cn` and `Icon` fixes from AGENTS.md).

## Behaviour to build (the story of the flow)

- **State:** one reducer holds the draft campaign `{details, channels[], settings{start,end,budgets}, audience{enabled, gender[], age[], languages[], location}, objectives[]}` and the current step.
- **Validation (from the copy):** ID letters and numbers only, at least 8 characters, live counter; description at least 10 words; channel description at least 5 words; Manager and Type required; Next stays disabled until the step is valid (Figma shows a faded Next on step 1).
- **Step 2:** adding a channel appends it to the list and updates the count; channels added here become the budget rows in step 3 (`hasChannels` False/True states).
- **Step 3:** total days from the dates; per-channel budget (Paid toggle, amount, "Add budget"); overall total is the sum.
- **Step 4:** "Set targets" off collapses the form (`off` state); "Select all" toggles a group; language chips removable.
- **Step 6:** summary mirrors the draft; edit on a section swaps in its fields with Save/Cancel; Reset clears; Save as Draft adds the campaign to the list as "Draft" and closes the panel.
- **Keyboard and a11y** (design system rule): focus moves to the first control of a new step or to the field in error; errors announced; 24px minimum targets; panel traps focus and closes on Escape.

## Suggested build order

1. **Stage page + panel + stepper + footer** with step navigation and no content.
2. **Step 1** (uses only DS components and existing placeholders: the best first vertical slice).
3. **Steps 5 and 4** (checkbox groups, switch, chips, multi-select).
4. **Steps 3, then 2** (2 waits for the channel icons) (channel tiles, accordion, dates, budget).
5. **Step 6** summary and editing, then Save as Draft into the store.

## Gaps and open questions

- Several Figma frames in "Resume" differ only by an open dropdown or popup: confirm which are real states and which are exploration.
- Channel glyphs (door-person, stadium, mic, printer, WOM, globe, blog, phone): to be added to the registry in ds_POC.
- Rows 4 and 5 "Mark obj" frames and the `Property 1=` frames are not labelled with names: the step mapping above is from the screenshots.
