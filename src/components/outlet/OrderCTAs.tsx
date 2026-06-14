import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PureVegBadge } from "@/components/ui/PureVegBadge";
import { Reveal } from "@/components/ui/Reveal";
import type { Outlet } from "@/lib/outlets";

export function OrderCTAs({ outlet }: { outlet: Outlet }) {
  return (
    <Section id="order" className="bg-ink text-surface">
      <Container>
        <Reveal className="flex flex-col items-center gap-7 text-center">
          <PureVegBadge className="text-surface/70" />
          <h2 className="font-display text-4xl leading-[1.05] tracking-tight text-balance sm:text-5xl">
            Hungry in {outlet.city}?{" "}
            <span className="italic text-accent">Let&apos;s feed the wander.</span>
          </h2>
          <p className="max-w-xl text-surface/65 text-pretty">
            Reserve a table or order in through your favourite platform. Pure
            veg, freshly made, ready when you are.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {outlet.orderLinks.map((link) => (
              <Button
                key={link.label}
                href={link.href}
                variant={link.label === "Swiggy Dineout" ? "primary" : "outline"}
                className={
                  link.label === "Swiggy Dineout"
                    ? undefined
                    : "border-surface/30 text-surface hover:bg-surface hover:text-ink"
                }
              >
                {link.label}
              </Button>
            ))}
          </div>

          {outlet.phone && (
            <p className="pt-2 text-sm text-surface/60">
              Or call{" "}
              <a
                href={`tel:${outlet.phone.replace(/\s+/g, "")}`}
                className="font-medium text-surface underline-offset-4 hover:underline"
              >
                {outlet.phone}
              </a>
            </p>
          )}
        </Reveal>
      </Container>
    </Section>
  );
}
