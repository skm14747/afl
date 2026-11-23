import { MainHeader } from "@/components/layout/MainHeader";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/layout/Container";
import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata({
  title: "About — How Our Calculators Work",
  description:
    "AstrologyForLove uses the astronomy-engine library to calculate real planetary positions in your browser. Tropical zodiac for Western tools, Lahiri sidereal for Vedic kundli matching.",
  ogTitle: "About AstrologyForLove — Calculation Methodology",
  ogDescription:
    "Real ephemeris math, no backend. How every calculator on AstrologyForLove works.",
  href: "/about",
});

export default function AboutPage() {
  return (
    <>
      <MainHeader />
      <main className="flex-1 pt-[60px]">
        <Container size="standard" className="py-16 max-w-2xl">
          <h1
            className="mb-6"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--text-h1)",
              fontWeight: 500,
            }}
          >
            How Our Calculators Work
          </h1>
          <div className="space-y-6 text-[var(--color-fg)] leading-relaxed">
            <p>
              Every calculator on AstrologyForLove computes real planetary
              positions in your browser. No birth data is sent to a server,
              because there is no server — the math runs on your device.
            </p>

            <h2
              className="mt-10 mb-3"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-h3)",
                fontWeight: 500,
              }}
            >
              Ephemeris library
            </h2>
            <p>
              Planetary longitudes are calculated with{" "}
              <a
                href="https://github.com/cosinekitty/astronomy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-[var(--color-primary)]"
              >
                astronomy-engine
              </a>
              , an open-source library by Don Cross that implements the same
              VSOP87 and ELP/MPP02 models used by professional observatories.
              The library runs entirely in JavaScript — no API calls, no
              backend.
            </p>

            <h2
              className="mt-10 mb-3"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-h3)",
                fontWeight: 500,
              }}
            >
              Western tools — tropical zodiac
            </h2>
            <p>
              Love Compatibility, Venus Sign, Moon Sign, Synastry, Composite,
              Marriage Compatibility, and all other Western tools use the{" "}
              <strong>tropical zodiac</strong>, where 0° Aries is the March
              equinox point. This is the standard in Western natal astrology.
            </p>
            <p>
              Compatibility scores are product-specific weighted models. They
              combine element compatibility, aspect type (conjunction, sextile,
              square, trine, opposition), and planet-pair weights. The scoring
              formula is explained on each tool&apos;s results page. Scores are
              not predictions — they are a structured way to read the chart
              contacts between two people.
            </p>

            <h2
              className="mt-10 mb-3"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-h3)",
                fontWeight: 500,
              }}
            >
              Kundli Matching — Lahiri sidereal zodiac
            </h2>
            <p>
              The Kundli Matching tool uses the{" "}
              <strong>Lahiri (Chitrapaksha) ayanamsa</strong> to convert
              tropical longitudes to sidereal positions. This is the standard
              ayanamsa recognised by the Indian government&apos;s calendar
              reform committee. The tool calculates:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Ashtakoota (36 Guna)</strong> — eight compatibility
                factors scored from both Moon nakshatras
              </li>
              <li>
                <strong>Mangal Dosha</strong> — Mars placement in the 1st, 2nd,
                4th, 7th, 8th, or 12th house from the Lagna, Moon, or Venus
              </li>
              <li>
                <strong>Ten Poruthams</strong> — Tamil marriage compatibility
                checks (Dinam, Ganam, Yoni, Rasi, Rasiyathipathi, Rajju,
                Vedha, Vasya, Mahendra, Stree Deergha)
              </li>
            </ul>

            <h2
              className="mt-10 mb-3"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-h3)",
                fontWeight: 500,
              }}
            >
              Relationship Numerology
            </h2>
            <p>
              The numerology tool uses the Pythagorean Life Path method: sum all
              digits of the birth date, reduce to a single digit (or master
              number 11, 22, 33), then compare the two Life Path numbers.
            </p>

            <h2
              className="mt-10 mb-3"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-h3)",
                fontWeight: 500,
              }}
            >
              What these tools are not
            </h2>
            <p>
              These calculators are interpretive tools based on astrological
              tradition. They do not predict relationship outcomes, and they
              should not replace professional advice of any kind. The planetary
              positions are astronomically accurate; the astrological
              interpretations are one framework for understanding those
              positions.
            </p>

            <h2
              className="mt-10 mb-3"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-h3)",
                fontWeight: 500,
              }}
            >
              Open source
            </h2>
            <p>
              The astronomy-engine library is open source under the MIT licence.
              You can verify any planetary position this site calculates against
              the{" "}
              <a
                href="https://ssd.jpl.nasa.gov/horizons/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-[var(--color-primary)]"
              >
                JPL Horizons system
              </a>
              .
            </p>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
