import type { ComponentContract } from "@/lib/contract"

/** Banner text for a Deprecated contract. One place, used by the Storybook description and the Contract docs section. */
export function deprecatedBanner(d: ComponentContract["deprecated"]): string {
  return `DEPRECATED, not for new work.${d?.replacedBy ? ` Use ${d.replacedBy} instead.` : ""}${d?.note ? ` ${d.note}` : ""}`
}

/**
 * Wrap a stories `meta` so a Deprecated contract is visible in Storybook:
 * the `deprecated` tag (sidebar filter) and a banner on the docs page. Other statuses pass through unchanged.
 * Usage in <name>.stories.tsx: `export default withContractStatus(meta, <name>Contract)`.
 */
export function withContractStatus<M extends { tags?: string[]; parameters?: Record<string, any> }>(
  meta: M,
  contract: Pick<ComponentContract, "status" | "deprecated">,
): M {
  if (contract.status !== "Deprecated") return meta
  const banner = deprecatedBanner(contract.deprecated)
  return {
    ...meta,
    tags: [...(meta.tags ?? []), "deprecated"],
    parameters: { ...meta.parameters, docs: { ...meta.parameters?.docs, description: { component: banner } } },
  }
}
