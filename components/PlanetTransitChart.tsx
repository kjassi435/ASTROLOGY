"use client";

import React, { useState, useEffect } from "react";
import { SectionHeader } from "./Cards";

interface PlanetPosition {
  planet: string;
  planetHi: string;
  symbol: string;
  sign: string;
  signHi: string;
  degree: string;
  longitude: string;
  nakshatra: string;
  nakshatraHi: string;
  nakshatraPada: string;
  nakshatraLord: string;
  nakshatraSubLord: string;
  rulerOf: string;
  isIn: string;
  houseOwner: string;
  relationship: string;
  dignity: string;
  retrograde: boolean;
  isLagna?: boolean;
}

interface Bhava {
  bhava: string;
  residents: string;
  owner: string;
  rashi: string;
  qualities: string;
  aspectedBy: string;
}

const SIGN_COLORS: Record<string, string> = {
  Aries: "bg-red-100 text-red-700 border-red-200",
  Taurus: "bg-green-100 text-green-700 border-green-200",
  Gemini: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Cancer: "bg-blue-100 text-blue-700 border-blue-200",
  Leo: "bg-orange-100 text-orange-700 border-orange-200",
  Virgo: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Libra: "bg-pink-100 text-pink-700 border-pink-200",
  Scorpio: "bg-purple-100 text-purple-700 border-purple-200",
  Sagittarius: "bg-indigo-100 text-indigo-700 border-indigo-200",
  Capricorn: "bg-slate-100 text-slate-700 border-slate-200",
  Aquarius: "bg-cyan-100 text-cyan-700 border-cyan-200",
  Pisces: "bg-violet-100 text-violet-700 border-violet-200",
};

function dignityClass(d: string): string {
  if (/exalt/i.test(d)) return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (/debil/i.test(d)) return "bg-red-50 text-red-600 border-red-200";
  if (/mool/i.test(d)) return "bg-amber-50 text-amber-700 border-amber-200";
  if (/own house/i.test(d)) return "bg-blue-50 text-blue-700 border-blue-200";
  return "bg-muted text-foreground border-muted";
}

function relClass(r: string): string {
  if (/friend/i.test(r)) return "bg-green-50 text-green-700 border-green-200";
  if (/enemy/i.test(r)) return "bg-red-50 text-red-600 border-red-200";
  if (/neutral/i.test(r)) return "bg-slate-50 text-slate-600 border-slate-200";
  if (/own house/i.test(r)) return "bg-blue-50 text-blue-700 border-blue-200";
  return "bg-muted text-foreground border-muted";
}

export function PlanetTransitChart({ kicker, title, desc }: { kicker?: string; title?: string; desc?: string }) {
  const [planets, setPlanets] = useState<PlanetPosition[]>([]);
  const [bhavas, setBhavas] = useState<Bhava[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [view, setView] = useState<"cards" | "table">("cards");

  useEffect(() => {
    async function fetchTransits() {
      try {
        const res = await fetch("/api/transit", { next: { revalidate: 43200 } });
        if (res.ok) {
          const data = await res.json();
          setPlanets((data.planets || []).filter((p: PlanetPosition) => !p.isLagna && !/^lagna\b/i.test(String(p.planet))));
          setBhavas(data.bhavas || []);
          setLastUpdated(data.lastUpdated ? new Date(data.lastUpdated) : new Date());
        }
      } catch {
        // leave empty
      } finally {
        setLoading(false);
      }
    }
    fetchTransits();
  }, []);

  return (
    <div id="transits">
      <div className="mb-12">
        <SectionHeader
          center
          subtitle={kicker}
          title={title}
          desc={desc}
        />
        <div className="flex flex-wrap items-center justify-center gap-3 -mt-8">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-primary bg-card border border-primary/30 rounded-full px-3.5 py-1.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            LIVE
          </span>
          {lastUpdated && (
            <span className="text-xs text-muted-foreground bg-card border border-muted rounded-full px-3.5 py-1.5">
              Last updated: {lastUpdated.toLocaleString("en-IN")}
            </span>
          )}
        </div>
        <div className="flex justify-center mt-4">
          <div className="inline-flex rounded-full bg-card border border-muted p-1">
            <button
              onClick={() => setView("cards")}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${view === "cards" ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"}`}
            >
              Cards
            </button>
            <button
              onClick={() => setView("table")}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${view === "table" ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"}`}
            >
              Table View
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="h-44 bg-card rounded-xl animate-pulse border border-muted" />
          ))}
        </div>
      ) : view === "cards" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {planets.map((p) => (
            <div
              key={p.planet}
              className="bg-card rounded-xl p-4 border border-muted hover:border-primary-hover hover:shadow-lg transition-all duration-300 group flex flex-col"
            >
              <div className="flex items-center gap-3">
                <span className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 shrink-0">
                  {p.symbol}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">{p.planet}</span>
                    {p.retrograde && (
                      <span className="text-[0.55rem] font-bold uppercase tracking-wider bg-red-50 text-red-600 border border-red-200 px-1.5 py-0.5 rounded">
                        R
                      </span>
                    )}
                  </div>
                  <span className="block text-[0.7rem] text-muted-foreground">{p.planetHi}</span>
                </div>
                <span className={`text-[0.65rem] font-semibold px-2.5 py-1 rounded-full border shrink-0 ${SIGN_COLORS[p.sign] || "bg-muted text-foreground border-muted"}`}>
                  {p.sign}
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-muted space-y-2 text-[0.78rem]">
                <Row label="Longitude" value={p.longitude} />
                <Row
                  label="Nakshatra"
                  value={`${p.nakshatra}${p.nakshatraPada ? ` ${p.nakshatraPada}` : ""}${p.nakshatraHi ? ` (${p.nakshatraHi})` : ""}`}
                />
                <Row label="Lord / Sub" value={[p.nakshatraLord, p.nakshatraSubLord].filter(Boolean).join(" / ")} />
                <Row label="Ruler of" value={p.rulerOf} />
                <Row label="Is In" value={p.isIn} />
                <Row label="B. Owner" value={p.houseOwner} />
                {p.relationship && (
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-muted-foreground">Relationship</span>
                    <span className={`text-[0.65rem] font-semibold px-2 py-0.5 rounded-full border ${relClass(p.relationship)}`}>{p.relationship}</span>
                  </div>
                )}
                {p.dignity && (
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-muted-foreground">Dignities</span>
                    <span className={`text-[0.65rem] font-semibold px-2 py-0.5 rounded-full border ${dignityClass(p.dignity)}`}>{p.dignity}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-10">
          <TableView planets={planets} />
          <BhavaTableView bhavas={bhavas} />
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="text-muted-foreground shrink-0">{label}</span>
      <span className="text-right font-medium text-foreground">{value}</span>
    </div>
  );
}

function TableView({ planets }: { planets: PlanetPosition[] }) {
  return (
    <div>
      <h3 className="text-xl font-bold text-foreground mb-4 text-center">Graha Details</h3>
      <div className="overflow-x-auto rounded-xl border border-muted">
        <table className="w-full text-sm border-collapse min-w-[900px]">
          <thead className="bg-card">
            <tr className="text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Th>Graha</Th>
              <Th>Longitude</Th>
              <Th>Nakshatra</Th>
              <Th>Nakshatra Lord/Sub Lord</Th>
              <Th>Ruler of</Th>
              <Th>Is In</Th>
              <Th>B. Owner</Th>
              <Th>Relationship</Th>
              <Th>Dignities</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-muted">
            {planets.map((p) => (
              <tr key={p.planet} className="hover:bg-primary/5">
                <Td>
                  <span className="font-semibold text-foreground">{p.planet}</span>
                  {p.retrograde && <span className="ml-1 text-[0.6rem] font-bold text-red-600">R</span>}
                  <div className="text-[0.65rem] text-muted-foreground">{p.planetHi}</div>
                </Td>
                <Td>{p.longitude}</Td>
                <Td>
                  {p.nakshatra}
                  {p.nakshatraPada ? ` ${p.nakshatraPada}` : ""}
                  {p.nakshatraHi ? <div className="text-[0.65rem] text-muted-foreground">{p.nakshatraHi}</div> : null}
                </Td>
                <Td>{[p.nakshatraLord, p.nakshatraSubLord].filter(Boolean).join(" / ")}</Td>
                <Td>{p.rulerOf}</Td>
                <Td>{p.isIn}</Td>
                <Td>{p.houseOwner}</Td>
                <Td><span className={`inline-block text-[0.65rem] font-semibold px-2 py-0.5 rounded-full border ${relClass(p.relationship)}`}>{p.relationship || "—"}</span></Td>
                <Td><span className={`inline-block text-[0.65rem] font-semibold px-2 py-0.5 rounded-full border ${dignityClass(p.dignity)}`}>{p.dignity || "—"}</span></Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BhavaTableView({ bhavas }: { bhavas: Bhava[] }) {
  if (!bhavas.length) {
    return (
      <div>
        <h3 className="text-xl font-bold text-foreground mb-4 text-center">Bhava Details</h3>
        <p className="text-center text-sm text-muted-foreground">Bhava details are unavailable right now.</p>
      </div>
    );
  }
  return (
    <div>
      <h3 className="text-xl font-bold text-foreground mb-4 text-center">Bhava Details</h3>
      <div className="overflow-x-auto rounded-xl border border-muted">
        <table className="w-full text-sm border-collapse min-w-[800px]">
          <thead className="bg-card">
            <tr className="text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Th>Bhava</Th>
              <Th>Residents</Th>
              <Th>Owner</Th>
              <Th>Rashi</Th>
              <Th>Qualities</Th>
              <Th>Aspected By</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-muted">
            {bhavas.map((b) => (
              <tr key={b.bhava} className="hover:bg-primary/5">
                <Td className="font-semibold text-foreground">{b.bhava}</Td>
                <Td>{b.residents || "—"}</Td>
                <Td>{b.owner}</Td>
                <Td>{b.rashi}</Td>
                <Td>{b.qualities}</Td>
                <Td>{b.aspectedBy || "—"}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-3 py-2.5 whitespace-nowrap">{children}</th>;
}
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-3 py-2.5 align-top ${className}`}>{children}</td>;
}
