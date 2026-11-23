import { MainHeader } from "@/components/layout/MainHeader";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";

export function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <MainHeader />
      <main className="flex-1 pt-[60px]">
        <Container size="standard" className="py-16 max-w-2xl">
          <h1
            className="mb-6"
            style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-h1)", fontWeight: 500 }}
          >
            {title}
          </h1>
          <div className="space-y-4 text-[var(--color-fg)] leading-relaxed">{children}</div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
