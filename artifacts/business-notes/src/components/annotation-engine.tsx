import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "wouter";
import { X, StickyNote, Trash2, Highlighter, ChevronRight, ChevronLeft, Plus, GripVertical } from "lucide-react";

/* ─────────────────────────── Types ─────────────────────────── */
interface Highlight {
  id: string;
  text: string;
  color: string;
  createdAt: number;
}
interface Note {
  id: string;
  highlightId?: string;
  content: string;
  color: string;
  createdAt: number;
}

/* ──────────────────────── Color palettes ────────────────────── */
const HL_COLORS = [
  { value: "#fef08a", label: "Yellow" },
  { value: "#86efac", label: "Green" },
  { value: "#f9a8d4", label: "Pink" },
  { value: "#93c5fd", label: "Blue" },
  { value: "#fdba74", label: "Orange" },
];

const NOTE_COLORS = [
  { bg: "#fef9c3", border: "#ca8a04", label: "Yellow" },
  { bg: "#dbeafe", border: "#2563eb", label: "Blue" },
  { bg: "#dcfce7", border: "#16a34a", label: "Green" },
  { bg: "#fce7f3", border: "#db2777", label: "Pink" },
  { bg: "#f3e8ff", border: "#9333ea", label: "Purple" },
];

/* ──────────────────────── LocalStorage ─────────────────────── */
function loadHL(key: string): Highlight[] {
  try { return JSON.parse(localStorage.getItem(`hl__${key}`) || "[]"); } catch { return []; }
}
function saveHL(key: string, data: Highlight[]) {
  localStorage.setItem(`hl__${key}`, JSON.stringify(data));
}
function loadNotes(key: string): Note[] {
  try { return JSON.parse(localStorage.getItem(`notes__${key}`) || "[]"); } catch { return []; }
}
function saveNotes(key: string, data: Note[]) {
  localStorage.setItem(`notes__${key}`, JSON.stringify(data));
}

/* ────────────────────── DOM: apply highlight ────────────────── */
function applyHL(root: HTMLElement, hl: Highlight): HTMLElement | null {
  // Remove stale mark for this id first
  root.querySelectorAll(`mark[data-hl-id="${hl.id}"]`).forEach(m => unwrapMark(m as HTMLElement));
  root.normalize();

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node: Node) {
      const el = (node as Text).parentElement;
      if (!el) return NodeFilter.FILTER_REJECT;
      const tag = el.tagName.toLowerCase();
      if (["script", "style", "mark", "textarea", "input"].includes(tag)) return NodeFilter.FILTER_REJECT;
      if (el.closest("[data-ann]")) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  let node: Text;
  while ((node = walker.nextNode() as Text)) {
    const idx = (node.textContent || "").indexOf(hl.text);
    if (idx === -1) continue;
    const range = document.createRange();
    range.setStart(node, idx);
    range.setEnd(node, idx + hl.text.length);
    const mark = document.createElement("mark");
    mark.dataset.hlId = hl.id;
    mark.style.cssText = `background:${hl.color};border-radius:3px;padding:0 2px;cursor:pointer;`;
    mark.title = "Click to manage highlight";
    try {
      range.surroundContents(mark);
      return mark;
    } catch {
      // selection crosses elements — skip
    }
    break;
  }
  return null;
}

function unwrapMark(m: HTMLElement) {
  const parent = m.parentNode;
  if (!parent) return;
  while (m.firstChild) parent.insertBefore(m.firstChild, m);
  parent.removeChild(m);
}

function clearAllMarks(root: HTMLElement) {
  root.querySelectorAll("mark[data-hl-id]").forEach(m => unwrapMark(m as HTMLElement));
  root.normalize();
}

/* ──────────────────────── Unique ID ────────────────────────── */
function uid() { return Math.random().toString(36).slice(2) + Date.now().toString(36); }

/* ═══════════════════════════════════════════════════════════════
   Main AnnotationEngine component
═══════════════════════════════════════════════════════════════ */
export function AnnotationEngine({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const pageKey = location || "/";

  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [panelOpen, setPanelOpen] = useState(false);

  /* Floating toolbar state */
  const [toolbar, setToolbar] = useState<{
    visible: boolean; x: number; y: number;
    text: string; onMarkId: string | null;
  }>({ visible: false, x: 0, y: 0, text: "", onMarkId: null });

  const contentRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);

  /* ── Load from localStorage on page change ── */
  useEffect(() => {
    setHighlights(loadHL(pageKey));
    setNotes(loadNotes(pageKey));
    setToolbar({ visible: false, x: 0, y: 0, text: "", onMarkId: null });
  }, [pageKey]);

  /* ── Apply highlights to DOM ── */
  useEffect(() => {
    if (!contentRef.current) return;
    const timer = setTimeout(() => {
      if (!contentRef.current) return;
      clearAllMarks(contentRef.current);
      highlights.forEach(hl => applyHL(contentRef.current!, hl));
    }, 150);
    return () => clearTimeout(timer);
  }, [highlights, pageKey]);

  /* ── Detect text selection (mouseup) ── */
  useEffect(() => {
    const handleMouseUp = (e: MouseEvent) => {
      // Ignore if clicking inside toolbar or panel
      if ((e.target as HTMLElement).closest("[data-ann]")) return;

      // Check if clicking on an existing mark
      const mark = (e.target as HTMLElement).closest("mark[data-hl-id]");
      if (mark) {
        const id = (mark as HTMLElement).dataset.hlId!;
        const rect = mark.getBoundingClientRect();
        setToolbar({ visible: true, x: rect.left + rect.width / 2, y: rect.top - 8, text: "", onMarkId: id });
        return;
      }

      const sel = window.getSelection();
      const text = sel?.toString().trim();
      if (!text || text.length < 2) { setToolbar(t => ({ ...t, visible: false })); return; }
      if (!contentRef.current?.contains(sel!.anchorNode)) { setToolbar(t => ({ ...t, visible: false })); return; }

      const range = sel!.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setToolbar({ visible: true, x: rect.left + rect.width / 2, y: rect.top - 8, text, onMarkId: null });
    };

    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, []);

  /* ── Close toolbar on click outside ── */
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!toolbar.visible) return;
      if (toolbarRef.current?.contains(e.target as Node)) return;
      if ((e.target as HTMLElement).closest("mark[data-hl-id]")) return;
      setToolbar(t => ({ ...t, visible: false }));
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [toolbar.visible]);

  /* ── Highlight actions ── */
  const addHighlight = useCallback((color: string) => {
    const text = toolbar.text;
    if (!text) return;
    const hl: Highlight = { id: uid(), text, color, createdAt: Date.now() };
    const updated = [...highlights, hl];
    setHighlights(updated);
    saveHL(pageKey, updated);
    window.getSelection()?.removeAllRanges();
    setToolbar(t => ({ ...t, visible: false }));
  }, [toolbar.text, highlights, pageKey]);

  const removeHighlight = useCallback((id: string) => {
    const updated = highlights.filter(h => h.id !== id);
    setHighlights(updated);
    saveHL(pageKey, updated);
    const notesUpdated = notes.filter(n => n.highlightId !== id);
    setNotes(notesUpdated);
    saveNotes(pageKey, notesUpdated);
    setToolbar(t => ({ ...t, visible: false }));
  }, [highlights, notes, pageKey]);

  const changeHighlightColor = useCallback((id: string, color: string) => {
    const updated = highlights.map(h => h.id === id ? { ...h, color } : h);
    setHighlights(updated);
    saveHL(pageKey, updated);
    setToolbar(t => ({ ...t, visible: false }));
  }, [highlights, pageKey]);

  /* ── Add sticky note from toolbar ── */
  const addNoteFromHighlight = useCallback((highlightId: string | null) => {
    const noteColor = NOTE_COLORS[0];
    const note: Note = {
      id: uid(),
      highlightId: highlightId ?? undefined,
      content: "",
      color: noteColor.bg,
      createdAt: Date.now(),
    };
    const updated = [...notes, note];
    setNotes(updated);
    saveNotes(pageKey, updated);
    setPanelOpen(true);
    setToolbar(t => ({ ...t, visible: false }));
  }, [notes, pageKey]);

  /* ── Note actions ── */
  const updateNote = useCallback((id: string, content: string) => {
    const updated = notes.map(n => n.id === id ? { ...n, content } : n);
    setNotes(updated);
    saveNotes(pageKey, updated);
  }, [notes, pageKey]);

  const updateNoteColor = useCallback((id: string, color: string) => {
    const updated = notes.map(n => n.id === id ? { ...n, color } : n);
    setNotes(updated);
    saveNotes(pageKey, updated);
  }, [notes, pageKey]);

  const deleteNote = useCallback((id: string) => {
    const updated = notes.filter(n => n.id !== id);
    setNotes(updated);
    saveNotes(pageKey, updated);
  }, [notes, pageKey]);

  /* ── Resolve linked highlight text for note header ── */
  const getLinkedText = (highlightId?: string) => {
    if (!highlightId) return null;
    const hl = highlights.find(h => h.id === highlightId);
    return hl ? hl.text : null;
  };

  const totalAnnotations = highlights.length + notes.length;

  return (
    <div className="relative flex-1">
      {/* ─── Page content area ─── */}
      <div ref={contentRef} className="min-h-0">
        {children}
      </div>

      {/* ─── Floating selection toolbar ─── */}
      {toolbar.visible && (
        <div
          data-ann="toolbar"
          ref={toolbarRef}
          className="fixed z-50 flex flex-col items-center gap-1"
          style={{
            left: Math.max(8, Math.min(toolbar.x, window.innerWidth - 220)),
            top: Math.max(8, toolbar.y - 64),
            transform: "translateX(-50%)",
          }}
        >
          <div className="bg-white dark:bg-zinc-800 border border-border rounded-xl shadow-xl p-2 flex flex-col gap-2 min-w-[200px]">
            {/* ── Title ── */}
            <div className="flex items-center gap-1.5 px-1">
              <Highlighter className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs font-semibold text-muted-foreground">
                {toolbar.onMarkId ? "Edit highlight" : "Highlight text"}
              </span>
            </div>

            {/* ── Color swatches ── */}
            <div className="flex gap-1.5 px-1">
              {HL_COLORS.map(c => (
                <button
                  key={c.value}
                  title={c.label}
                  onClick={() => toolbar.onMarkId ? changeHighlightColor(toolbar.onMarkId, c.value) : addHighlight(c.value)}
                  className="h-6 w-6 rounded-full border-2 border-white dark:border-zinc-700 shadow hover:scale-110 transition-transform"
                  style={{ backgroundColor: c.value }}
                />
              ))}
            </div>

            {/* ── Actions ── */}
            <div className="flex gap-1 px-1 border-t border-border pt-1.5">
              <button
                onClick={() => addNoteFromHighlight(toolbar.onMarkId)}
                className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors"
              >
                <StickyNote className="h-3 w-3" />
                Add sticky note
              </button>
              {toolbar.onMarkId && (
                <button
                  onClick={() => removeHighlight(toolbar.onMarkId!)}
                  className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                >
                  <Trash2 className="h-3 w-3" />
                  Remove
                </button>
              )}
            </div>
          </div>
          {/* Arrow */}
          <div className="w-3 h-1.5 overflow-hidden">
            <div className="w-3 h-3 bg-white dark:bg-zinc-800 border border-border rotate-45 -mt-1.5 mx-auto" />
          </div>
        </div>
      )}

      {/* ─── Toggle button ─── */}
      <button
        data-ann="toggle"
        onClick={() => setPanelOpen(o => !o)}
        className={`fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full px-4 py-2.5 shadow-lg text-sm font-medium transition-all duration-200
          ${panelOpen
            ? "bg-primary text-primary-foreground"
            : "bg-white dark:bg-zinc-800 text-foreground border border-border hover:bg-muted"}
        `}
        title="Open / close annotations panel"
      >
        <StickyNote className="h-4 w-4" />
        <span className="hidden sm:inline">Notes</span>
        {totalAnnotations > 0 && (
          <span className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold
            ${panelOpen ? "bg-primary-foreground text-primary" : "bg-primary text-primary-foreground"}`}>
            {totalAnnotations > 9 ? "9+" : totalAnnotations}
          </span>
        )}
      </button>

      {/* ─── Sticky notes panel ─── */}
      <div
        data-ann="panel"
        className={`fixed top-14 right-0 bottom-0 z-30 w-80 bg-background border-l border-border shadow-xl flex flex-col transition-transform duration-300
          ${panelOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
          <div className="flex items-center gap-2">
            <StickyNote className="h-4 w-4 text-primary" />
            <span className="font-semibold text-sm text-foreground">My Annotations</span>
            {totalAnnotations > 0 && (
              <span className="text-xs text-muted-foreground">({totalAnnotations})</span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => addNoteFromHighlight(null)}
              className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              title="Add a free sticky note"
            >
              <Plus className="h-3.5 w-3.5" />
              New note
            </button>
            <button
              onClick={() => setPanelOpen(false)}
              className="ml-1 p-1 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Panel body */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {totalAnnotations === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-12">
              <div className="h-16 w-16 rounded-full bg-muted/50 flex items-center justify-center">
                <Highlighter className="h-8 w-8 text-muted-foreground/40" />
              </div>
              <div>
                <p className="font-medium text-foreground/70 text-sm">No annotations yet</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed max-w-[200px] mx-auto">
                  Select any text on the page to highlight it or add a sticky note
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Highlights list */}
              {highlights.length > 0 && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 px-1">
                    Highlights ({highlights.length})
                  </p>
                  <div className="space-y-2">
                    {highlights.map(hl => (
                      <div
                        key={hl.id}
                        className="rounded-lg border border-border/60 bg-card/50 p-3 group"
                      >
                        <div className="flex items-start gap-2">
                          <div
                            className="mt-0.5 h-4 w-4 rounded-sm shrink-0 border border-black/10"
                            style={{ backgroundColor: hl.color }}
                          />
                          <p className="text-xs text-foreground/80 leading-relaxed flex-1 line-clamp-3">
                            "{hl.text}"
                          </p>
                          <button
                            onClick={() => {
                              removeHighlight(hl.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded text-muted-foreground hover:text-red-500"
                            title="Remove highlight"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                        {/* Change color swatches */}
                        <div className="flex gap-1 mt-2 ml-6">
                          {HL_COLORS.map(c => (
                            <button
                              key={c.value}
                              title={`Change to ${c.label}`}
                              onClick={() => changeHighlightColor(hl.id, c.value)}
                              className={`h-4 w-4 rounded-full border-2 hover:scale-110 transition-transform
                                ${hl.color === c.value ? "border-foreground" : "border-transparent"}`}
                              style={{ backgroundColor: c.value }}
                            />
                          ))}
                          <button
                            onClick={() => addNoteFromHighlight(hl.id)}
                            className="ml-auto text-xs text-amber-600 dark:text-amber-400 hover:underline"
                            title="Attach a sticky note to this highlight"
                          >
                            + note
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sticky notes list */}
              {notes.length > 0 && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 px-1">
                    Sticky Notes ({notes.length})
                  </p>
                  <div className="space-y-3">
                    {notes.map(note => {
                      const noteColorObj = NOTE_COLORS.find(c => c.bg === note.color) || NOTE_COLORS[0];
                      const linkedText = getLinkedText(note.highlightId);
                      return (
                        <StickyNoteCard
                          key={note.id}
                          note={note}
                          noteColorObj={noteColorObj}
                          linkedText={linkedText}
                          onUpdateContent={content => updateNote(note.id, content)}
                          onUpdateColor={color => updateNoteColor(note.id, color)}
                          onDelete={() => deleteNote(note.id)}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Panel footer — clear all */}
        {totalAnnotations > 0 && (
          <div className="px-4 py-2 border-t border-border bg-muted/20">
            <button
              onClick={() => {
                if (!confirm("Remove all highlights and notes from this page?")) return;
                setHighlights([]);
                setNotes([]);
                saveHL(pageKey, []);
                saveNotes(pageKey, []);
              }}
              className="text-xs text-muted-foreground hover:text-red-500 transition-colors flex items-center gap-1"
            >
              <Trash2 className="h-3 w-3" />
              Clear all annotations on this page
            </button>
          </div>
        )}
      </div>

      {/* Overlay behind panel on small screens */}
      {panelOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/20 lg:hidden"
          onClick={() => setPanelOpen(false)}
        />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   StickyNoteCard component
═══════════════════════════════════════════════════════════════ */
function StickyNoteCard({
  note,
  noteColorObj,
  linkedText,
  onUpdateContent,
  onUpdateColor,
  onDelete,
}: {
  note: Note;
  noteColorObj: typeof NOTE_COLORS[0];
  linkedText: string | null;
  onUpdateContent: (v: string) => void;
  onUpdateColor: (v: string) => void;
  onDelete: () => void;
}) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div
      className="rounded-xl overflow-hidden shadow-sm border"
      style={{ borderColor: noteColorObj.border, backgroundColor: noteColorObj.bg }}
    >
      {/* Note header */}
      <div
        className="flex items-center gap-1.5 px-3 py-2 cursor-pointer select-none"
        style={{ backgroundColor: noteColorObj.bg, borderBottom: `1px solid ${noteColorObj.border}33` }}
        onClick={() => setExpanded(e => !e)}
      >
        <GripVertical className="h-3.5 w-3.5 text-current opacity-40" />
        <StickyNote className="h-3.5 w-3.5 shrink-0" style={{ color: noteColorObj.border }} />
        <span className="text-xs font-semibold flex-1 truncate" style={{ color: noteColorObj.border }}>
          {note.content ? note.content.slice(0, 30) + (note.content.length > 30 ? "…" : "") : "Empty note"}
        </span>
        <button
          onClick={e => { e.stopPropagation(); onDelete(); }}
          className="p-0.5 rounded opacity-50 hover:opacity-100 transition-opacity"
          title="Delete note"
        >
          <X className="h-3 w-3" style={{ color: noteColorObj.border }} />
        </button>
      </div>

      {expanded && (
        <div className="px-3 py-2.5 space-y-2">
          {/* Linked highlight indicator */}
          {linkedText && (
            <div
              className="text-xs italic opacity-70 border-l-2 pl-2 line-clamp-2"
              style={{ borderColor: noteColorObj.border }}
            >
              Re: "{linkedText}"
            </div>
          )}

          {/* Note text area */}
          <textarea
            className="w-full min-h-[80px] resize-y text-xs rounded-lg p-2 bg-white/60 dark:bg-black/10 border-none outline-none focus:ring-1 focus:ring-current placeholder:opacity-50"
            style={{ color: "#1a1a1a" }}
            placeholder="Write your note here…"
            value={note.content}
            onChange={e => onUpdateContent(e.target.value)}
            onClick={e => e.stopPropagation()}
          />

          {/* Note color picker */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs opacity-50">Color:</span>
            {NOTE_COLORS.map(c => (
              <button
                key={c.bg}
                title={c.label}
                onClick={() => onUpdateColor(c.bg)}
                className={`h-4 w-4 rounded-full border-2 hover:scale-110 transition-transform`}
                style={{
                  backgroundColor: c.bg,
                  borderColor: note.color === c.bg ? c.border : "transparent",
                  outline: note.color === c.bg ? `2px solid ${c.border}` : "none",
                  outlineOffset: "1px",
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
