import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "wouter";
import { X, Play, Pause, Square, ChevronRight, ChevronDown, SkipForward, SkipBack, Volume2 } from "lucide-react";

// ── All available study topics ──────────────────────────────────────────────
const STUDY_UNITS = [
  {
    unit: "Unit 1 — Business Management",
    accent: "#a78bfa",
    topics: [
      { title: "Introduction to Management", path: "/topic/1" },
      { title: "Forms of Business Organizations", path: "/topic/2" },
      { title: "Evolution of Management Thought", path: "/topic/3" },
    ],
  },
  {
    unit: "Unit 2 — Economics",
    accent: "#60a5fa",
    topics: [
      { title: "Introduction to Macroeconomics", path: "/economics/1" },
      { title: "National Income", path: "/economics/2" },
      { title: "Money and Banking", path: "/economics/3" },
      { title: "Classical & Keynesian Theories", path: "/economics/5" },
      { title: "Circular Flow & Macro Theory", path: "/economics/6" },
    ],
  },
  {
    unit: "Unit 3 — Society & Culture",
    accent: "#34d399",
    topics: [
      { title: "Introduction to Sociology", path: "/society/1" },
      { title: "Society", path: "/society/2" },
      { title: "Urban & Rural Community", path: "/society/3" },
      { title: "Socialization", path: "/society/4" },
      { title: "Culture", path: "/society/5" },
      { title: "Social Change", path: "/society/6" },
      { title: "Leadership & Group Dynamics", path: "/society/8" },
      { title: "Social Processes", path: "/society/9" },
      { title: "Human Rights", path: "/society/10" },
      { title: "Civil Education", path: "/society/11" },
      { title: "Emerging Issues", path: "/society/12" },
    ],
  },
  {
    unit: "Unit 4 — Health Education",
    accent: "#f87171",
    topics: [
      { title: "Introduction to Health Education", path: "/health/1" },
      { title: "HIV Prevention Strategies", path: "/health/2" },
      { title: "Drug & Substance Abuse", path: "/health/3" },
      { title: "Hygiene, Sanitation & Safety", path: "/health/4" },
    ],
  },
  {
    unit: "Unit 5 — ICT",
    accent: "#22d3ee",
    topics: [
      { title: "Microsoft Word", path: "/ict/1" },
      { title: "Microsoft Excel", path: "/ict/2" },
    ],
  },
  {
    unit: "Unit 6 — Accounting",
    accent: "#fbbf24",
    topics: [
      { title: "Partnership Accounts", path: "/accounting/1" },
      { title: "Company Final Accounts", path: "/accounting/2" },
      { title: "Control Accounts & Incomplete Records", path: "/accounting/3" },
    ],
  },
];

// ── Extract readable text from current page DOM ──────────────────────────────
function extractPageChunks(): string[] {
  // Target the main notes content area — the wide content column
  const content =
    document.querySelector(".flex-1.min-w-0.max-w-3xl") ||
    document.querySelector("main .flex-1");

  if (!content) {
    // Fallback: grab body text
    return [document.body.innerText.slice(0, 2000)];
  }

  const chunks: string[] = [];
  const elements = content.querySelectorAll("h1, h2, h3, p, li, td");

  let currentBlock = "";
  elements.forEach((el) => {
    const tag = el.tagName.toLowerCase();
    const text = el.textContent?.replace(/\s+/g, " ").trim() ?? "";
    if (!text || text.length < 4) return;

    if (tag === "h1" || tag === "h2" || tag === "h3") {
      if (currentBlock) chunks.push(currentBlock.trim());
      currentBlock = text + ". ";
    } else {
      currentBlock += text + " ";
      // Break into ~400-char chunks so the reader doesn't run on too long
      if (currentBlock.length > 400) {
        chunks.push(currentBlock.trim());
        currentBlock = "";
      }
    }
  });
  if (currentBlock.trim()) chunks.push(currentBlock.trim());
  return chunks.filter((c) => c.length > 10);
}

// ── Pick the best Jarvis-like voice ─────────────────────────────────────────
function pickVoice(): SpeechSynthesisVoice | null {
  const voices = speechSynthesis.getVoices();
  if (!voices.length) return null;

  const preferred = [
    "Daniel",          // macOS — deep British male
    "Google UK English Male",
    "Microsoft George", // Windows
    "Microsoft Stefan", // Windows – deep male
    "en-GB",
  ];

  for (const name of preferred) {
    const v = voices.find(
      (v) =>
        v.name.toLowerCase().includes(name.toLowerCase()) ||
        v.lang === name
    );
    if (v) return v;
  }
  // Fallback: any en-GB, then any English
  return (
    voices.find((v) => v.lang === "en-GB") ||
    voices.find((v) => v.lang.startsWith("en")) ||
    voices[0]
  );
}

// ── Waveform bars animation ──────────────────────────────────────────────────
function Waveform({ active }: { active: boolean }) {
  return (
    <div className="flex items-end gap-0.5 h-6">
      {[0.3, 0.7, 1, 0.8, 0.5, 0.9, 0.6, 0.4, 0.8, 1, 0.6, 0.3].map((scale, i) => (
        <div
          key={i}
          style={{
            width: 3,
            borderRadius: 2,
            backgroundColor: "#06b6d4",
            height: active ? `${8 + scale * 14}px` : "4px",
            transition: "height 0.15s ease",
            animation: active
              ? `jarvis-wave ${0.6 + (i % 4) * 0.15}s ease-in-out ${i * 0.05}s infinite alternate`
              : "none",
          }}
        />
      ))}
    </div>
  );
}

// ── Main VoiceReader component ───────────────────────────────────────────────
export function VoiceReader() {
  const [open, setOpen] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [chunkIndex, setChunkIndex] = useState(0);
  const [chunks, setChunks] = useState<string[]>([]);
  const [expandedUnit, setExpandedUnit] = useState<string | null>(null);
  const [activeTopicPath, setActiveTopicPath] = useState<string | null>(null);
  const [statusText, setStatusText] = useState("Select a topic and I will read your notes.");
  const [, setLocation] = useLocation();

  const chunkRef = useRef(0);
  const chunksRef = useRef<string[]>([]);
  const speakingRef = useRef(false);

  // Keep refs in sync
  useEffect(() => { chunkRef.current = chunkIndex; }, [chunkIndex]);
  useEffect(() => { chunksRef.current = chunks; }, [chunks]);
  useEffect(() => { speakingRef.current = speaking; }, [speaking]);

  // Inject waveform CSS keyframes once
  useEffect(() => {
    if (document.getElementById("jarvis-wave-style")) return;
    const style = document.createElement("style");
    style.id = "jarvis-wave-style";
    style.textContent = `
      @keyframes jarvis-wave {
        0%   { height: 4px; }
        100% { height: 22px; }
      }
      @keyframes jarvis-pulse {
        0%, 100% { box-shadow: 0 0 0 0 rgba(6,182,212,0.4); }
        50%       { box-shadow: 0 0 0 10px rgba(6,182,212,0); }
      }
      @keyframes jarvis-spin {
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
  }, []);

  // Stop speaking on unmount
  useEffect(() => () => { speechSynthesis.cancel(); }, []);

  // ── Core speak function ────────────────────────────────────────────────────
  const speakChunk = useCallback((text: string, onEnd: () => void) => {
    speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.pitch = 0.85;
    utt.rate = 0.92;
    utt.volume = 1;
    const voice = pickVoice();
    if (voice) utt.voice = voice;

    utt.onend = onEnd;
    utt.onerror = () => onEnd();
    speechSynthesis.speak(utt);
  }, []);

  const readNext = useCallback((startIndex: number, allChunks: string[]) => {
    if (startIndex >= allChunks.length) {
      setSpeaking(false);
      setPaused(false);
      setStatusText("Reading complete. Well done, scholar.");
      return;
    }
    setChunkIndex(startIndex);
    setStatusText(`Reading section ${startIndex + 1} of ${allChunks.length}…`);
    speakChunk(allChunks[startIndex], () => {
      if (!speakingRef.current) return;
      readNext(startIndex + 1, allChunks);
    });
  }, [speakChunk]);

  // ── Start reading a topic ──────────────────────────────────────────────────
  const startReading = useCallback(
    (path: string, topicTitle: string) => {
      speechSynthesis.cancel();
      setSpeaking(false);
      setPaused(false);
      setActiveTopicPath(path);
      setStatusText(`Navigating to ${topicTitle}…`);

      // Navigate first, then wait for DOM to render
      setLocation(path);
      setOpen(true);

      setTimeout(() => {
        const extracted = extractPageChunks();
        if (!extracted.length) {
          setStatusText("Could not extract notes. Try again in a moment.");
          return;
        }
        setChunks(extracted);
        chunksRef.current = extracted;

        // Intro phrase
        const intro = new SpeechSynthesisUtterance(
          `Good day. I am your study assistant. Now reading: ${topicTitle}.`
        );
        intro.pitch = 0.85;
        intro.rate = 0.92;
        const voice = pickVoice();
        if (voice) intro.voice = voice;

        intro.onend = () => {
          setSpeaking(true);
          speakingRef.current = true;
          readNext(0, extracted);
        };
        speechSynthesis.speak(intro);
        setStatusText(`Reading: ${topicTitle}`);
      }, 1600);
    },
    [setLocation, readNext]
  );

  // ── Read CURRENT page ──────────────────────────────────────────────────────
  const readCurrentPage = useCallback(() => {
    speechSynthesis.cancel();
    const extracted = extractPageChunks();
    if (!extracted.length) {
      setStatusText("No readable content found on this page.");
      return;
    }
    setChunks(extracted);
    chunksRef.current = extracted;
    setSpeaking(true);
    speakingRef.current = true;
    setStatusText("Reading current page…");
    readNext(0, extracted);
  }, [readNext]);

  // ── Controls ───────────────────────────────────────────────────────────────
  const handlePauseResume = () => {
    if (paused) {
      speechSynthesis.resume();
      setPaused(false);
      setStatusText("Resuming…");
    } else {
      speechSynthesis.pause();
      setPaused(true);
      setStatusText("Paused.");
    }
  };

  const handleStop = () => {
    speechSynthesis.cancel();
    setSpeaking(false);
    speakingRef.current = false;
    setPaused(false);
    setChunkIndex(0);
    setStatusText("Stopped. Ready when you are.");
  };

  const handleSkipForward = () => {
    speechSynthesis.cancel();
    const next = chunkRef.current + 1;
    if (next < chunksRef.current.length) {
      readNext(next, chunksRef.current);
    } else {
      handleStop();
    }
  };

  const handleSkipBack = () => {
    speechSynthesis.cancel();
    const prev = Math.max(0, chunkRef.current - 1);
    readNext(prev, chunksRef.current);
  };

  // ── Floating button ────────────────────────────────────────────────────────
  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open Study AI voice reader"
        style={{
          position: "fixed",
          bottom: 80,
          right: 24,
          zIndex: 9999,
          width: 54,
          height: 54,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #0f172a 0%, #164e63 100%)",
          border: "2px solid #06b6d4",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          animation: speaking ? "jarvis-pulse 1.5s ease-in-out infinite" : "none",
          boxShadow: "0 0 16px rgba(6,182,212,0.5)",
          transition: "box-shadow 0.3s",
        }}
      >
        <Volume2 size={22} color="#06b6d4" />
      </button>

      {/* ── The Jarvis panel ── */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 148,
            right: 24,
            zIndex: 9998,
            width: 340,
            maxHeight: "70vh",
            display: "flex",
            flexDirection: "column",
            background: "linear-gradient(180deg, #020b18 0%, #0a1929 100%)",
            border: "1.5px solid #0e7490",
            borderRadius: 16,
            boxShadow: "0 0 40px rgba(6,182,212,0.25), inset 0 1px 0 rgba(6,182,212,0.1)",
            fontFamily: "'Courier New', monospace",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "14px 18px 12px",
              borderBottom: "1px solid #0e7490",
              background: "rgba(6,182,212,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {/* Spinning arc */}
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  border: "2px solid #0e7490",
                  borderTopColor: "#06b6d4",
                  animation: "jarvis-spin 1.2s linear infinite",
                  flexShrink: 0,
                }}
              />
              <div>
                <p style={{ color: "#06b6d4", fontSize: 13, fontWeight: 700, letterSpacing: 3, margin: 0 }}>
                  STUDY·AI
                </p>
                <p style={{ color: "#155e75", fontSize: 9, letterSpacing: 2, margin: 0 }}>
                  VOICE ASSISTANT · ONLINE
                </p>
              </div>
            </div>
            <button
              onClick={() => { setOpen(false); handleStop(); }}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#0e7490", padding: 4 }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Status + waveform */}
          <div
            style={{
              padding: "10px 18px",
              borderBottom: "1px solid #082f49",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
            }}
          >
            <p style={{ color: "#67e8f9", fontSize: 10, letterSpacing: 1, margin: 0, flex: 1, paddingRight: 10, lineHeight: 1.4 }}>
              {statusText}
            </p>
            <Waveform active={speaking && !paused} />
          </div>

          {/* Playback controls */}
          {(speaking || chunks.length > 0) && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                padding: "10px 18px",
                borderBottom: "1px solid #082f49",
                flexShrink: 0,
              }}
            >
              <button onClick={handleSkipBack} title="Previous section" style={ctrlBtn}>
                <SkipBack size={14} />
              </button>
              <button onClick={handlePauseResume} style={{ ...ctrlBtn, border: "1px solid #06b6d4", borderRadius: "50%", width: 34, height: 34 }}>
                {paused ? <Play size={14} /> : <Pause size={14} />}
              </button>
              <button onClick={handleStop} style={{ ...ctrlBtn, border: "1px solid #ef4444", borderRadius: "50%", width: 34, height: 34, color: "#ef4444" }}>
                <Square size={13} />
              </button>
              <button onClick={handleSkipForward} title="Next section" style={ctrlBtn}>
                <SkipForward size={14} />
              </button>

              {/* Read current page button */}
              <button
                onClick={readCurrentPage}
                title="Read current page"
                style={{
                  ...ctrlBtn,
                  fontSize: 9,
                  letterSpacing: 1,
                  color: "#a5f3fc",
                  border: "1px solid #0e7490",
                  borderRadius: 6,
                  padding: "3px 8px",
                  width: "auto",
                  height: "auto",
                }}
              >
                THIS PAGE
              </button>
            </div>
          )}

          {/* Topic browser — scrollable */}
          <div style={{ overflowY: "auto", flex: 1 }}>
            {/* "Read current page" shortcut when not playing */}
            {!speaking && chunks.length === 0 && (
              <div style={{ padding: "10px 18px", borderBottom: "1px solid #082f49" }}>
                <button
                  onClick={readCurrentPage}
                  style={{
                    width: "100%",
                    background: "rgba(6,182,212,0.08)",
                    border: "1px solid #0e7490",
                    borderRadius: 8,
                    color: "#67e8f9",
                    fontSize: 11,
                    letterSpacing: 1.5,
                    padding: "8px 12px",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    transition: "background 0.2s",
                  }}
                >
                  ▶ READ CURRENT PAGE
                </button>
              </div>
            )}

            {/* Units list */}
            {STUDY_UNITS.map((unit) => (
              <div key={unit.unit} style={{ borderBottom: "1px solid #082f49" }}>
                {/* Unit header / accordion toggle */}
                <button
                  onClick={() =>
                    setExpandedUnit((prev) => (prev === unit.unit ? null : unit.unit))
                  }
                  style={{
                    width: "100%",
                    background: expandedUnit === unit.unit ? "rgba(6,182,212,0.07)" : "transparent",
                    border: "none",
                    borderLeft: `3px solid ${expandedUnit === unit.unit ? unit.accent : "transparent"}`,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 14px 10px 12px",
                    fontFamily: "inherit",
                    transition: "background 0.15s",
                  }}
                >
                  <span style={{ color: expandedUnit === unit.unit ? unit.accent : "#64748b", fontSize: 9, fontWeight: 700, letterSpacing: 2, textAlign: "left" }}>
                    {unit.unit.toUpperCase()}
                  </span>
                  {expandedUnit === unit.unit
                    ? <ChevronDown size={12} color="#64748b" />
                    : <ChevronRight size={12} color="#64748b" />}
                </button>

                {/* Topics list */}
                {expandedUnit === unit.unit &&
                  unit.topics.map((topic) => (
                    <button
                      key={topic.path}
                      onClick={() => startReading(topic.path, topic.title)}
                      style={{
                        width: "100%",
                        background: activeTopicPath === topic.path ? "rgba(6,182,212,0.12)" : "transparent",
                        border: "none",
                        borderLeft: `3px solid ${activeTopicPath === topic.path ? "#06b6d4" : "transparent"}`,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "8px 14px 8px 20px",
                        fontFamily: "inherit",
                        textAlign: "left",
                        transition: "background 0.15s",
                      }}
                    >
                      <span style={{ color: activeTopicPath === topic.path ? "#06b6d4" : "#475569", fontSize: 8, flexShrink: 0 }}>
                        {activeTopicPath === topic.path && speaking ? "▶" : "○"}
                      </span>
                      <span style={{ color: activeTopicPath === topic.path ? "#a5f3fc" : "#94a3b8", fontSize: 11, lineHeight: 1.3 }}>
                        {topic.title}
                      </span>
                    </button>
                  ))}
              </div>
            ))}

            <div style={{ padding: "12px 18px" }}>
              <p style={{ color: "#1e3a5f", fontSize: 9, letterSpacing: 1.5, textAlign: "center", margin: 0 }}>
                STUDY·AI · TUK BCOM · VOICE MODE
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Shared control button style
const ctrlBtn: React.CSSProperties = {
  background: "none",
  border: "none",
  color: "#67e8f9",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 28,
  height: 28,
  borderRadius: "50%",
  transition: "background 0.15s",
  fontFamily: "'Courier New', monospace",
};
