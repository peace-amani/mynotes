import { Helmet } from "react-helmet-async";
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Layout } from "@/components/layout";
import { ChevronRight } from "lucide-react";

/* ── Shared styled blocks ─────────────────────────────────── */
const SectionHeading = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2 id={id} className="scroll-mt-20 text-2xl font-bold font-serif mt-12 mb-4"
    style={{ color: "#0f2044", borderBottom: "2px solid #d4a843", paddingBottom: "6px" }}>
    {children}
  </h2>
);
const Sub = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h3 id={id} className="scroll-mt-20 text-lg font-semibold mt-6 mb-2" style={{ color: "#0f2044" }}>{children}</h3>
);
const ExplainerBox = ({ title, children }: { title?: string; children: React.ReactNode }) => (
  <div className="rounded-xl border-l-4 p-4 my-4 bg-blue-50 dark:bg-blue-950/30 border-blue-500">
    {title && <p className="font-bold text-blue-700 dark:text-blue-400 mb-1">{title}</p>}
    <div className="text-sm leading-relaxed text-foreground/85">{children}</div>
  </div>
);
const ExampleBox = ({ title, children }: { title?: string; children: React.ReactNode }) => (
  <div className="rounded-xl border-l-4 p-4 my-4 bg-amber-50 dark:bg-amber-950/30 border-amber-400">
    {title && <p className="font-bold text-amber-700 dark:text-amber-400 mb-1">{title}</p>}
    <div className="text-sm leading-relaxed text-foreground/85">{children}</div>
  </div>
);
const NoteBox = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-xl border-l-4 p-4 my-4 bg-green-50 dark:bg-green-950/30 border-green-500">
    <p className="font-bold text-green-700 dark:text-green-400 mb-1">📝 Study Note</p>
    <div className="text-sm leading-relaxed text-foreground/85">{children}</div>
  </div>
);
const WarnBox = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-xl border-l-4 p-4 my-4 bg-red-50 dark:bg-red-950/30 border-red-400">
    <p className="font-bold text-red-600 dark:text-red-400 mb-1">⚠️ Common Mistake</p>
    <div className="text-sm leading-relaxed text-foreground/85">{children}</div>
  </div>
);
const Tbl = ({ headers, rows }: { headers: string[]; rows: string[][] }) => (
  <div className="overflow-x-auto my-4">
    <table className="w-full text-sm border-collapse rounded-lg overflow-hidden">
      <thead>
        <tr style={{ backgroundColor: "#0f2044", color: "#f5f0e8" }}>
          {headers.map(h => <th key={h} className="px-4 py-2 text-left font-semibold">{h}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className={i % 2 === 0 ? "bg-white dark:bg-zinc-900" : "bg-muted/40"}>
            {row.map((cell, j) => <td key={j} className="px-4 py-2 border-b border-border/30">{cell}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
const KbdRow = ({ keys, action }: { keys: string; action: string }) => (
  <div className="flex items-start gap-3 py-1.5 border-b border-border/20 last:border-0">
    <code className="shrink-0 rounded bg-muted px-2 py-0.5 text-xs font-mono font-bold">{keys}</code>
    <span className="text-sm text-foreground/80">{action}</span>
  </div>
);

const sections = [
  { id: "interface", label: "The Word Interface" },
  { id: "files", label: "Managing Documents" },
  { id: "editing", label: "Text Entry & Editing" },
  { id: "formatting", label: "Text Formatting" },
  { id: "para", label: "Paragraph Formatting" },
  { id: "page", label: "Page Layout" },
  { id: "tables", label: "Tables" },
  { id: "lists", label: "Lists" },
  { id: "headfoot", label: "Headers, Footers & Page Numbers" },
  { id: "insert", label: "Inserting Objects" },
  { id: "references", label: "References & TOC" },
  { id: "mailmerge", label: "Mail Merge" },
  { id: "review", label: "Track Changes & Comments" },
  { id: "findreplace", label: "Find, Replace & Proofing" },
  { id: "print", label: "Printing" },
  { id: "shortcuts", label: "Keyboard Shortcuts" },
];

export default function IctTopic1() {
  const [activeSection, setActiveSection] = useState("interface");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { rootMargin: "-20% 0px -75% 0px" }
    );
    sections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <Layout breadcrumbs={[
      { label: "Home", href: "/" },
      { label: "Unit 5 — ICT", href: "/" },
      { label: "Microsoft Word" },
    ]}>
      <Helmet><title>Microsoft Word — ICT Notes</title></Helmet>

      <div className="flex gap-8 px-4 sm:px-6 py-8 max-w-7xl mx-auto">
        {/* ── Content ── */}
        <div className="flex-1 min-w-0 max-w-3xl" ref={contentRef}>
          {/* Hero */}
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#d4a843" }}>
              Unit 5 — ICT · Topic 1
            </span>
            <h1 className="text-4xl font-bold font-serif mt-2 mb-3" style={{ color: "#0f2044" }}>
              Microsoft Word
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A complete guide to word processing — from the interface to advanced features — covering everything you need for your CAT.
            </p>
            <div className="mt-4 flex gap-2 flex-wrap">
              {["Word Processing", "Document Formatting", "Tables", "Mail Merge", "References"].map(tag => (
                <span key={tag} className="rounded-full px-3 py-1 text-xs font-medium"
                  style={{ backgroundColor: "#0f2044", color: "#f5f0e8" }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* ═══════════════════════════════════════ */}
          <SectionHeading id="interface">1. The Microsoft Word Interface</SectionHeading>
          <ExplainerBox title="What is Microsoft Word?">
            Microsoft Word is a <strong>word processing application</strong> developed by Microsoft Corporation, part of the Microsoft Office (now Microsoft 365) suite. It allows users to create, edit, format, save, and print text-based documents — letters, reports, essays, CVs, invoices, and more. It is the most widely used word processor in offices, schools, and homes globally, including across Kenya.
          </ExplainerBox>

          <Sub id="interface-parts">Key Parts of the Word Window</Sub>
          <Tbl
            headers={["Element", "Location", "Purpose"]}
            rows={[
              ["Title Bar", "Very top", "Shows the document name and Word version"],
              ["Quick Access Toolbar (QAT)", "Top-left above ribbon", "One-click buttons for Save, Undo, Redo — can be customised"],
              ["Ribbon", "Below title bar", "Organised tabs (Home, Insert, Design…) each containing groups of commands"],
              ["Tab", "On the ribbon bar", "E.g. Home, Insert, Layout — clicking reveals related command groups"],
              ["Group", "Within each tab", "Clusters of related buttons, e.g. the 'Font' group on the Home tab"],
              ["File Tab (Backstage)", "Far left of ribbon", "Access Open, Save, Print, Options, account settings"],
              ["Document Area", "Centre of screen", "The white page where you type — the 'canvas'"],
              ["Ruler", "Above and left of document", "Shows margins, indents, and tab stops"],
              ["Scroll Bars", "Right & bottom", "Move through the document vertically and horizontally"],
              ["Status Bar", "Bottom of window", "Shows page count, word count, language, view modes"],
              ["View Buttons", "Bottom-right", "Switch between Print Layout, Read Mode, Web Layout, Outline, Draft"],
              ["Zoom Slider", "Bottom-right", "Increases or decreases the display size of the document"],
              ["Navigation Pane", "Left panel (View → Navigation Pane)", "Browse headings, pages, and search results"],
            ]}
          />

          <Sub id="ribbon-tabs">The Ribbon Tabs Explained</Sub>
          <Tbl
            headers={["Tab", "Key Functions Found Here"]}
            rows={[
              ["Home", "Clipboard (Cut/Copy/Paste), Font, Paragraph, Styles, Editing (Find & Replace)"],
              ["Insert", "Pages, Tables, Pictures, Shapes, SmartArt, Charts, Header/Footer, Page Number, Hyperlink, Symbols"],
              ["Design", "Document themes, colours, fonts, watermarks, page colour, page borders"],
              ["Layout (Page Layout)", "Margins, Orientation, Size, Columns, Breaks, Indent, Spacing"],
              ["References", "Table of Contents, Footnotes, Citations & Bibliography, Captions, Index, Table of Authorities"],
              ["Mailings", "Mail Merge — Start Mail Merge, Select Recipients, Insert Merge Field, Finish & Merge"],
              ["Review", "Spelling & Grammar, Thesaurus, Word Count, Track Changes, Accept/Reject Changes, Comments"],
              ["View", "Views, Zoom, Show (Ruler, Gridlines, Navigation Pane), Window arrangement, Macros"],
            ]}
          />

          <NoteBox>
            In Word 2016 and later, <strong>Layout</strong> replaced the older name <strong>Page Layout</strong> — both refer to the same tab. Examiners may use either name.
          </NoteBox>

          {/* ═══════════════════════════════════════ */}
          <SectionHeading id="files">2. Creating, Saving, and Managing Documents</SectionHeading>

          <Sub id="creating">Creating a New Document</Sub>
          <ul className="list-disc pl-6 space-y-2 text-sm leading-relaxed">
            <li><strong>Blank document:</strong> File → New → Blank Document (or <code>Ctrl+N</code>)</li>
            <li><strong>From a template:</strong> File → New → search for a template (e.g., "CV", "Invoice", "Letter")</li>
            <li>Templates save time by providing pre-designed layouts.</li>
          </ul>

          <Sub id="saving">Saving a Document</Sub>
          <ExplainerBox title="Save vs Save As">
            <ul className="list-disc pl-4 space-y-1">
              <li><strong>Save (Ctrl+S):</strong> Saves changes to the existing file. If new, prompts for filename and location.</li>
              <li><strong>Save As (F12 or Ctrl+Shift+S):</strong> Saves a copy with a new name, location, or format — the original is untouched. Use this to save in a different file format.</li>
              <li><strong>AutoSave:</strong> In Microsoft 365, documents saved to OneDrive are saved automatically every few seconds.</li>
            </ul>
          </ExplainerBox>

          <Sub id="formats">Common File Formats</Sub>
          <Tbl
            headers={["Extension", "Format Name", "When to Use"]}
            rows={[
              [".docx", "Word Document (default)", "Standard format for all Word 2007 and later documents"],
              [".doc", "Word 97-2003 Document", "For sharing with users of very old versions of Word"],
              [".pdf", "Portable Document Format", "For sharing a document that should not be edited; preserves layout on any device"],
              [".rtf", "Rich Text Format", "Compatible with almost all word processors; preserves basic formatting"],
              [".txt", "Plain Text", "No formatting; just raw text — smallest file size"],
              [".dotx", "Word Template", "A reusable template for creating new documents with pre-set styles"],
              [".odt", "OpenDocument Text", "For LibreOffice / OpenOffice compatibility"],
            ]}
          />

          <ExampleBox title="Real-World Example: Kenyan University Assignment">
            A student at the University of Nairobi writes their assignment in <strong>.docx</strong> format to submit online. Before submitting, they use <em>Save As → PDF</em> to convert it, ensuring the lecturer sees the exact same layout regardless of the device used to open it.
          </ExampleBox>

          <Sub id="open-close">Opening and Closing Documents</Sub>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li><strong>Open:</strong> File → Open (Ctrl+O) — browse to the file location or use Recent Documents list</li>
            <li><strong>Close:</strong> File → Close (Ctrl+W) — closes the document but keeps Word open</li>
            <li><strong>Exit Word:</strong> File → Exit (Alt+F4) — closes the entire application</li>
            <li>If unsaved changes exist, Word always prompts: <em>Save / Don't Save / Cancel</em></li>
          </ul>

          {/* ═══════════════════════════════════════ */}
          <SectionHeading id="editing">3. Text Entry and Basic Editing</SectionHeading>

          <Sub id="cursor">The Insertion Point (Cursor)</Sub>
          <p className="text-sm leading-relaxed mb-3">
            The <strong>insertion point</strong> (blinking vertical line) shows where typed text will appear. Click anywhere in the document to move it, or use arrow keys, Home, End, Ctrl+Home (go to very beginning), Ctrl+End (go to very end).
          </p>

          <Sub id="select">Selecting Text</Sub>
          <Tbl
            headers={["To Select…", "Method"]}
            rows={[
              ["One word", "Double-click the word"],
              ["One sentence", "Ctrl + Click anywhere in the sentence"],
              ["One paragraph", "Triple-click anywhere in the paragraph"],
              ["Entire document", "Ctrl + A"],
              ["A range of text", "Click at start, hold Shift, click at end"],
              ["Non-contiguous text", "Select first section, then hold Ctrl and select more"],
            ]}
          />

          <Sub id="clipboard">Cut, Copy, and Paste</Sub>
          <Tbl
            headers={["Action", "Shortcut", "What It Does"]}
            rows={[
              ["Cut", "Ctrl+X", "Removes selected text/object and places it on the Clipboard"],
              ["Copy", "Ctrl+C", "Places a copy on the Clipboard; original stays in place"],
              ["Paste", "Ctrl+V", "Inserts Clipboard content at the insertion point"],
              ["Paste Special", "Ctrl+Alt+V", "Choose how to paste — e.g. as plain text, as picture, as HTML"],
              ["Office Clipboard", "Home → Clipboard (launcher)", "Holds up to 24 items; click any item to paste it"],
            ]}
          />

          <Sub id="undo-redo">Undo and Redo</Sub>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li><strong>Undo (Ctrl+Z):</strong> Reverses the last action. Can be pressed multiple times to undo several actions.</li>
            <li><strong>Redo (Ctrl+Y):</strong> Re-applies an action that was undone.</li>
            <li>The Undo/Redo buttons on the Quick Access Toolbar have drop-down arrows to jump back multiple steps at once.</li>
          </ul>

          <Sub id="overtype">Insert vs Overtype Mode</Sub>
          <p className="text-sm leading-relaxed">By default, Word is in <strong>Insert mode</strong> — typed text pushes existing text to the right. Pressing the <kbd>Insert</kbd> key switches to <strong>Overtype mode</strong>, where typed text replaces existing characters (the cursor changes appearance). Press Insert again to return to Insert mode.</p>

          {/* ═══════════════════════════════════════ */}
          <SectionHeading id="formatting">4. Text Formatting</SectionHeading>
          <ExplainerBox title="What is Text Formatting?">
            Text formatting changes the <strong>appearance</strong> of individual characters or words — their size, weight, style, colour, and effects. All text formatting tools are in the <strong>Home tab → Font group</strong>, or by right-clicking selected text → Format Cells (in Word: Mini Toolbar appears automatically on selection).
          </ExplainerBox>

          <Sub id="basic-format">Basic Character Formats</Sub>
          <Tbl
            headers={["Format", "Shortcut", "Effect"]}
            rows={[
              ["Bold", "Ctrl+B", "Makes text heavier/thicker — used for headings, key terms"],
              ["Italic", "Ctrl+I", "Slants text — used for titles of books, foreign words, emphasis"],
              ["Underline", "Ctrl+U", "Draws a line under text — use sparingly, often confused with hyperlinks"],
              ["Strikethrough", "—", "Draws a line through text — shows deleted or outdated content"],
              ["Subscript", "Ctrl+=", "Smaller text below the baseline — e.g. H₂O"],
              ["Superscript", "Ctrl+Shift++", "Smaller text above the baseline — e.g. E=mc²"],
              ["Change Case", "Shift+F3", "Cycles: Sentence case → UPPERCASE → lowercase → Title Case"],
              ["Text Highlight Colour", "—", "Simulates a highlighter pen — yellow is default"],
              ["Font Colour", "—", "Changes the colour of text"],
              ["Clear Formatting", "Ctrl+Space", "Removes all character formatting, restoring to default Normal style"],
            ]}
          />

          <Sub id="font">Font, Font Size, and Font Effects</Sub>
          <ul className="list-disc pl-6 space-y-2 text-sm leading-relaxed">
            <li><strong>Font (typeface):</strong> The design of the letters. Common fonts: <em>Times New Roman</em> (serif, formal documents), <em>Calibri</em> (Word's default since 2007, sans-serif), <em>Arial</em> (clean, readable), <em>Courier New</em> (monospace, code).</li>
            <li><strong>Font size:</strong> Measured in <strong>points (pt)</strong>. 1 point = 1/72 of an inch. Body text is typically 11–12pt; headings 14–18pt+. Change in the Font Size box on the Home tab or with <code>Ctrl+] </code>(increase by 1pt) and <code>Ctrl+[</code> (decrease by 1pt).</li>
            <li><strong>Font dialog (Ctrl+D or Ctrl+Shift+F):</strong> Opens the full Font dialog where you can set all character formats in one place — including advanced options like character spacing, kerning, and ligatures.</li>
          </ul>

          <ExampleBox title="Kenyan Example: Formatting a Report Cover Page">
            For a report to the <em>Kenya National Examination Council (KNEC)</em>: Title → Arial, 24pt, Bold, Dark Blue. Subtitle → Calibri, 14pt, Italic. Student name and registration number → Times New Roman, 12pt, regular.
          </ExampleBox>

          <WarnBox>
            Avoid using more than 2–3 different fonts in one document. Too many fonts make a document look unprofessional. Examiners and employers notice this immediately.
          </WarnBox>

          {/* ═══════════════════════════════════════ */}
          <SectionHeading id="para">5. Paragraph Formatting</SectionHeading>
          <ExplainerBox title="What is Paragraph Formatting?">
            Paragraph formatting controls the layout and spacing of entire paragraphs — not individual characters. It includes alignment, indentation, line spacing, borders, and shading. In Word, a "paragraph" is created each time you press <kbd>Enter</kbd>. Tools are in <strong>Home → Paragraph group</strong>.
          </ExplainerBox>

          <Sub id="alignment">Text Alignment</Sub>
          <Tbl
            headers={["Alignment", "Shortcut", "Use Case"]}
            rows={[
              ["Left (default)", "Ctrl+L", "Standard body text — ragged right edge"],
              ["Centre", "Ctrl+E", "Headings, titles, centred captions"],
              ["Right", "Ctrl+R", "Dates in letters, page numbers on right, addresses"],
              ["Justify", "Ctrl+J", "Both edges align to margins — used in books, newspapers, formal reports"],
            ]}
          />

          <Sub id="indent">Indentation</Sub>
          <ul className="list-disc pl-6 space-y-2 text-sm leading-relaxed">
            <li><strong>Left indent:</strong> Moves the entire paragraph away from the left margin.</li>
            <li><strong>Right indent:</strong> Moves the paragraph away from the right margin.</li>
            <li><strong>First-line indent:</strong> Only the first line of the paragraph is indented (common in essays and books).</li>
            <li><strong>Hanging indent:</strong> The first line stays at the left margin; subsequent lines are indented — used in bibliographies and reference lists.</li>
            <li>Set indents via: the ruler (drag indent markers), Layout tab → Indent boxes, or Paragraph dialog (Ctrl+Alt+M or right-click → Paragraph).</li>
          </ul>

          <Sub id="linespacing">Line Spacing and Paragraph Spacing</Sub>
          <Tbl
            headers={["Setting", "Shortcut / Location", "Explanation"]}
            rows={[
              ["Single spacing (1.0)", "Ctrl+1", "Lines are as close together as possible"],
              ["1.5 line spacing", "Ctrl+5", "One and a half times single spacing — comfortable for reading"],
              ["Double spacing (2.0)", "Ctrl+2", "Used in academic essays to allow room for hand-written corrections"],
              ["Exact / Multiple / At Least", "Paragraph dialog → Line Spacing", "Fine-grained control measured in points"],
              ["Space Before / After paragraph", "Layout tab → Spacing", "Adds breathing room between paragraphs without pressing Enter twice"],
            ]}
          />

          <NoteBox>
            Most Kenyan universities and colleges require academic essays in <strong>double spacing (2.0), Times New Roman, 12pt, 1-inch margins</strong>. Always confirm the institution's style guide.
          </NoteBox>

          <Sub id="styles">Paragraph Styles</Sub>
          <p className="text-sm leading-relaxed mb-3">
            A <strong>Style</strong> is a saved collection of formatting settings (font, size, alignment, spacing, colour) that can be applied with one click. Styles are in <strong>Home → Styles group</strong>. Using consistent styles is the professional approach to formatting.
          </p>
          <Tbl
            headers={["Built-in Style", "Typical Use"]}
            rows={[
              ["Normal", "Default body text style — the starting point for most text"],
              ["Heading 1", "Top-level chapter or section titles"],
              ["Heading 2", "Subsection titles under Heading 1"],
              ["Heading 3", "Sub-subsections"],
              ["Title", "Document title on a cover page"],
              ["Subtitle", "Document subtitle or tagline"],
              ["Quote / Block Text", "Extended quotations indented from both margins"],
              ["List Paragraph", "Body text formatted for bullet/numbered list items"],
            ]}
          />

          <ExplainerBox title="Why Styles Matter">
            Styles are the foundation of three major Word features: (1) the automatic <strong>Table of Contents</strong> — Word uses Heading styles to build the TOC, (2) the <strong>Navigation Pane</strong> — headings appear as clickable links, and (3) <strong>Outline view</strong> — lets you restructure a document by dragging headings.
          </ExplainerBox>

          <Sub id="tabs">Tab Stops</Sub>
          <p className="text-sm leading-relaxed mb-2">
            Pressing <kbd>Tab</kbd> moves the cursor to the next <strong>tab stop</strong>. Default tab stops are every 1.27 cm (0.5 inch). Custom tab stops are set on the ruler or in the Paragraph dialog → Tabs. Types of tab stops:
          </p>
          <Tbl
            headers={["Tab Stop Type", "Symbol on Ruler", "Text Alignment"]}
            rows={[
              ["Left Tab", "L", "Text starts at the tab stop and extends right"],
              ["Centre Tab", "⊥ (inverted T)", "Text is centred on the tab stop"],
              ["Right Tab", "⌐", "Text ends at the tab stop (right-aligned)"],
              ["Decimal Tab", "⊥.", "Numbers align on their decimal point — useful for currency columns"],
              ["Bar Tab", "|", "Inserts a vertical bar at the tab position — not a text stop"],
            ]}
          />

          <Sub id="borders-shading">Paragraph Borders and Shading</Sub>
          <p className="text-sm leading-relaxed">Found in Home → Paragraph → Borders dropdown, or via the <strong>Borders and Shading</strong> dialog (Format → Borders and Shading). You can add a box border around a paragraph, shade the background, or add a horizontal line between paragraphs. Use for callout boxes, pull quotes, or emphasis.</p>

          {/* ═══════════════════════════════════════ */}
          <SectionHeading id="page">6. Page Layout and Design</SectionHeading>

          <Sub id="margins">Margins</Sub>
          <p className="text-sm leading-relaxed mb-2"><strong>Margins</strong> are the blank spaces around the edges of a page. Set them via <strong>Layout → Margins</strong>. Common presets:</p>
          <Tbl
            headers={["Preset", "Top/Bottom", "Left/Right", "Common Use"]}
            rows={[
              ["Normal", "1 inch (2.54 cm)", "1 inch (2.54 cm)", "Standard — most documents and assignments"],
              ["Narrow", "0.5 inch", "0.5 inch", "When fitting more content per page"],
              ["Wide", "1 inch", "2 inches", "For documents with side annotations"],
              ["Office 2003 Default", "1 inch", "1.25 inches", "Older standard"],
            ]}
          />
          <p className="text-sm leading-relaxed">For a custom margin: Layout → Margins → Custom Margins → type values in the Page Setup dialog.</p>

          <Sub id="orientation">Page Orientation</Sub>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li><strong>Portrait</strong> (default): Taller than wide (height &gt; width). Used for letters, essays, reports.</li>
            <li><strong>Landscape</strong>: Wider than tall. Used for wide tables, certificates, brochures.</li>
            <li>Set via Layout → Orientation. You can also set individual <em>sections</em> of a document to different orientations using section breaks.</li>
          </ul>

          <Sub id="paper-size">Paper Size</Sub>
          <Tbl
            headers={["Size", "Dimensions", "Common Use"]}
            rows={[
              ["A4 (default in Kenya)", "210 × 297 mm", "Standard letters, reports, assignments — used throughout East Africa"],
              ["Letter (US default)", "8.5 × 11 inches (216 × 279 mm)", "Common in US-based systems"],
              ["A3", "297 × 420 mm", "Large posters, oversized tables"],
              ["Legal", "8.5 × 14 inches", "Legal documents in US system"],
            ]}
          />

          <Sub id="columns">Columns</Sub>
          <p className="text-sm leading-relaxed mb-2">Split text into columns: Layout → Columns. Options: One, Two, Three, Left (narrow left), Right (narrow right), or More Columns for custom settings. Newspapers and newsletters use multiple columns. Insert a <strong>Column Break</strong> (Layout → Breaks → Column Break) to force text to the next column.</p>

          <Sub id="page-breaks">Page Breaks and Section Breaks</Sub>
          <Tbl
            headers={["Type", "How to Insert", "Purpose"]}
            rows={[
              ["Page Break", "Ctrl+Enter or Layout → Breaks → Page", "Forces content to start on the next page — e.g. between chapters"],
              ["Column Break", "Layout → Breaks → Column", "Forces content to the next column in a multi-column layout"],
              ["Section Break – Next Page", "Layout → Breaks → Next Page", "Starts a new section on a new page; allows different margins, orientation, or headers"],
              ["Section Break – Continuous", "Layout → Breaks → Continuous", "Starts a new section on the same page — e.g. switching from 1 to 2 columns mid-page"],
              ["Section Break – Even/Odd Page", "Layout → Breaks → Even/Odd Page", "Starts the section on the next even or odd page — used in book printing"],
            ]}
          />

          <WarnBox>
            Never press Enter repeatedly to move content to the next page — use a proper Page Break. Empty paragraphs cause layout problems when you later add or remove content above.
          </WarnBox>

          <Sub id="watermark">Watermarks, Page Colour, and Page Borders</Sub>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li><strong>Watermark:</strong> Design → Watermark → choose "DRAFT", "CONFIDENTIAL", or a custom text/image watermark. It appears behind the main text.</li>
            <li><strong>Page Colour:</strong> Design → Page Color — changes the background colour of pages (does not print by default).</li>
            <li><strong>Page Border:</strong> Design → Page Borders — adds a decorative or line border around every page or specific sections.</li>
          </ul>

          {/* ═══════════════════════════════════════ */}
          <SectionHeading id="tables">7. Tables</SectionHeading>
          <ExplainerBox title="What is a Table?">
            A table is a grid of <strong>rows</strong> (horizontal) and <strong>columns</strong> (vertical). Each box where a row and column intersect is called a <strong>cell</strong>. Tables organise data clearly — product price lists, timetables, comparison charts, and results tables.
          </ExplainerBox>

          <Sub id="create-table">Creating a Table</Sub>
          <ul className="list-disc pl-6 space-y-2 text-sm leading-relaxed">
            <li><strong>Insert → Table → drag grid:</strong> Hover over the grid to select rows × columns (up to 10×8).</li>
            <li><strong>Insert → Table → Insert Table:</strong> Type exact number of rows and columns. Also set AutoFit behaviour.</li>
            <li><strong>Draw Table:</strong> Draw irregular/custom tables by drawing cells with a pen tool.</li>
            <li><strong>Convert Text to Table:</strong> Select comma-separated (or tab-separated) text, then Insert → Table → Convert Text to Table — Word creates a table automatically.</li>
            <li><strong>Excel Spreadsheet:</strong> Insert → Table → Excel Spreadsheet — embeds an Excel sheet in the Word document.</li>
          </ul>

          <Sub id="navigate-table">Navigating and Editing Tables</Sub>
          <Tbl
            headers={["Action", "Method"]}
            rows={[
              ["Move to next cell", "Tab key"],
              ["Move to previous cell", "Shift+Tab"],
              ["Add a new row at end of table", "Press Tab in the last cell"],
              ["Select a single cell", "Click and drag within cell, or click left edge of cell (cursor becomes arrow)"],
              ["Select a column", "Click top border of column (cursor becomes downward arrow)"],
              ["Select a row", "Click left margin next to row (cursor becomes diagonal arrow)"],
              ["Select entire table", "Click the table move handle (⊕ icon at top-left of table)"],
            ]}
          />

          <Sub id="table-tabs">Table Design and Layout Tabs</Sub>
          <p className="text-sm leading-relaxed mb-2">When the cursor is inside a table, two extra tabs appear on the ribbon: <strong>Table Design</strong> and <strong>Layout</strong>.</p>
          <Tbl
            headers={["Tab", "Key Features"]}
            rows={[
              ["Table Design", "Table Styles (pre-designed colour schemes), Shading (cell background colour), Borders (cell borders style/colour), Header Row, Banded Rows options"],
              ["Layout", "Select (cell/row/column/table), Delete (rows/columns/cells/table), Insert Above/Below/Left/Right, Merge Cells, Split Cells, Split Table, AutoFit, Cell Size (width/height), Cell Alignment, Text Direction, Sort, Formula"],
            ]}
          />

          <Sub id="merge-split">Merging and Splitting Cells</Sub>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li><strong>Merge Cells:</strong> Select multiple cells → Layout → Merge Cells (or right-click → Merge Cells). Combines the selected cells into one larger cell — used for table headings that span multiple columns.</li>
            <li><strong>Split Cells:</strong> Select a cell → Layout → Split Cells → specify how many rows/columns to divide it into.</li>
          </ul>

          <Sub id="table-formulas">Basic Formulas in Word Tables</Sub>
          <p className="text-sm leading-relaxed mb-2">Word tables can perform basic calculations. Click in a cell → Layout → Formula. Common formulas:</p>
          <Tbl
            headers={["Formula", "What It Calculates"]}
            rows={[
              ["=SUM(ABOVE)", "Sum of all numbers in cells above the current cell"],
              ["=SUM(LEFT)", "Sum of all numbers in cells to the left"],
              ["=AVERAGE(ABOVE)", "Average of cells above"],
              ["=SUM(B2:B5)", "Sum of specific cells (like Excel) — B=column, number=row"],
              ["=PRODUCT(LEFT)", "Multiplies all values to the left"],
              ["=COUNT(ABOVE)", "Counts the number of values above"],
            ]}
          />

          <ExampleBox title="Example: Sales Table with Formula">
            A furniture shop in Nairobi creates a Word table with products, quantities, and unit prices. In the last row's "Total" cell, they type <code>=SUM(ABOVE)</code> to automatically sum up all prices. When prices change, they right-click the result and choose <em>Update Field</em> to recalculate.
          </ExampleBox>

          {/* ═══════════════════════════════════════ */}
          <SectionHeading id="lists">8. Lists: Bulleted, Numbered, and Multilevel</SectionHeading>

          <Tbl
            headers={["List Type", "Shortcut / Button", "Best Used For"]}
            rows={[
              ["Bulleted list", "Home → Bullets button", "Unordered items where sequence doesn't matter — shopping lists, features"],
              ["Numbered list", "Home → Numbering button", "Ordered steps or items where sequence matters — instructions, rankings"],
              ["Multilevel list", "Home → Multilevel List button", "Hierarchical outlines with main points and sub-points — legal documents, outlines"],
            ]}
          />

          <Sub id="list-control">Controlling List Levels</Sub>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li><strong>Increase indent (demote):</strong> Press <kbd>Tab</kbd> at the start of a list item to move it to the next deeper level.</li>
            <li><strong>Decrease indent (promote):</strong> Press <kbd>Shift+Tab</kbd> to move it up one level.</li>
            <li><strong>Change bullet symbol:</strong> Home → Bullets dropdown → Define New Bullet → choose a symbol, picture, or font character.</li>
            <li><strong>Change numbering style:</strong> Home → Numbering dropdown → choose Roman numerals, letters (A, B, C), or Arabic (1, 2, 3).</li>
            <li><strong>Set Numbering Value:</strong> Right-click a numbered item → Set Numbering Value — useful for restarting or continuing a list.</li>
          </ul>

          {/* ═══════════════════════════════════════ */}
          <SectionHeading id="headfoot">9. Headers, Footers, and Page Numbers</SectionHeading>
          <ExplainerBox title="Headers and Footers Defined">
            <strong>Headers</strong> appear at the top of every page (above the top margin). <strong>Footers</strong> appear at the bottom of every page (below the bottom margin). They repeat automatically on every page and typically contain the document title, author, date, company logo, or page number.
          </ExplainerBox>

          <Sub id="insert-hf">Inserting Headers and Footers</Sub>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li>Insert → Header → choose a style, or <em>Edit Header</em> to create custom content. Double-clicking in the header/footer area also opens it for editing.</li>
            <li>While in the header/footer, the <strong>Header & Footer tab</strong> appears on the ribbon with options for page numbers, date/time, images, and navigation.</li>
            <li><strong>Different First Page:</strong> Header & Footer tab → tick "Different First Page" — the first page (cover page) can have a blank or different header/footer.</li>
            <li><strong>Different Odd & Even Pages:</strong> Useful for books where left pages and right pages have different headers.</li>
            <li><strong>Link to Previous:</strong> Enabled by default. When creating sections, unticking this lets different sections have different headers/footers.</li>
          </ul>

          <Sub id="page-numbers">Page Numbers</Sub>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li>Insert → Page Number → choose position: Top of Page, Bottom of Page, Page Margins, or Current Position.</li>
            <li>Insert → Page Number → Format Page Numbers → set number format (1, 2, 3 or i, ii, iii or A, B, C) and the start number (e.g., start at 0 to show "1" on the second page after a cover).</li>
            <li>To show "Page X of Y": Insert → Page Number → Page X of Y preset, or manually use <code>{'{ PAGE }'}</code> and <code>{'{ NUMPAGES }'}</code> field codes.</li>
          </ul>

          {/* ═══════════════════════════════════════ */}
          <SectionHeading id="insert">10. Inserting Objects</SectionHeading>

          <Sub id="pictures">Pictures and Images</Sub>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li><strong>Insert → Pictures → This Device:</strong> Insert an image from your computer.</li>
            <li><strong>Insert → Pictures → Online Pictures:</strong> Search Bing for royalty-free images without leaving Word.</li>
            <li><strong>Insert → Pictures → Stock Images:</strong> Microsoft 365's built-in library of high-quality images.</li>
            <li>After inserting, click the image to see the <strong>Picture Format</strong> tab — crop, resize, apply artistic effects, adjust brightness/contrast, apply picture styles, set text wrapping.</li>
          </ul>

          <Sub id="text-wrap">Text Wrapping Around Images</Sub>
          <Tbl
            headers={["Wrapping Style", "Behaviour"]}
            rows={[
              ["In Line with Text (default)", "Image sits in the text flow like a large character — moves with text"],
              ["Square", "Text wraps in a rectangle around the image"],
              ["Tight", "Text wraps closely following the image's outline"],
              ["Through", "Text fills in any white space within the image outline"],
              ["Top and Bottom", "Text appears above and below but not to the sides of the image"],
              ["Behind Text", "Image goes behind the text — acts as a background"],
              ["In Front of Text", "Image overlays on top of text — text is hidden behind it"],
            ]}
          />

          <Sub id="shapes">Shapes and SmartArt</Sub>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li><strong>Shapes:</strong> Insert → Shapes — choose from lines, rectangles, circles, arrows, callouts, flowchart symbols, etc. After drawing, the <strong>Shape Format</strong> tab appears for fill, outline, and effects.</li>
            <li><strong>SmartArt:</strong> Insert → SmartArt — pre-designed graphic diagrams: List, Process (flowcharts), Cycle, Hierarchy (org charts), Relationship, Matrix, Pyramid. Enter text in the Text Pane.</li>
            <li><strong>Text Box:</strong> Insert → Text Box — a moveable container for text, not anchored to the main text flow. Useful for sidebars and captions.</li>
          </ul>

          <Sub id="charts">Charts</Sub>
          <p className="text-sm leading-relaxed mb-2">Insert → Chart → select chart type (Column, Line, Pie, Bar, Area, etc.) → Word opens a mini Excel spreadsheet to enter data → the chart automatically updates.</p>
          <ExampleBox title="Example: Kenyan Population Chart">
            A geography student inserts a <strong>Pie Chart</strong> into their report comparing the population distribution across Kenya's 47 counties, entering population figures into the embedded spreadsheet. The chart updates automatically as data is entered.
          </ExampleBox>

          <Sub id="symbols">Symbols and Special Characters</Sub>
          <p className="text-sm leading-relaxed">Insert → Symbol → More Symbols → opens the Symbol dialog. Find characters not on the keyboard: ©, ®, ™, °, ±, £, €, √, ∞, Greek letters (α, β, γ), mathematical operators. Also Insert → Symbol → Special Characters for em dash (—), en dash (–), non-breaking space, and optional hyphen.</p>

          <Sub id="hyperlink">Hyperlinks</Sub>
          <p className="text-sm leading-relaxed">Select text → Insert → Link (Ctrl+K) → link to an existing file, a webpage URL, an email address, or a bookmark within the same document. To remove a hyperlink: right-click → Remove Hyperlink.</p>

          {/* ═══════════════════════════════════════ */}
          <SectionHeading id="references">11. References: Table of Contents, Footnotes, and Citations</SectionHeading>

          <Sub id="toc">Table of Contents (TOC)</Sub>
          <ExplainerBox title="How the TOC Works">
            Word builds a Table of Contents automatically using <strong>Heading styles</strong> (Heading 1, Heading 2, Heading 3). Text formatted with these styles appears in the TOC with corresponding page numbers. This is why using Styles consistently is so important.
          </ExplainerBox>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li>Click where you want the TOC → References → Table of Contents → choose Automatic Table 1 or 2.</li>
            <li>To update the TOC after making changes: References → Update Table → choose "Update page numbers only" or "Update entire table".</li>
            <li>For a manual TOC: References → Table of Contents → Manual Table — you type entries yourself (not auto-generated).</li>
          </ul>

          <Sub id="footnotes">Footnotes and Endnotes</Sub>
          <Tbl
            headers={["Type", "Location", "Purpose"]}
            rows={[
              ["Footnote", "Bottom of the page where the reference is", "Immediate explanation or citation visible on the same page as the text"],
              ["Endnote", "At the end of the document (or section)", "Collected references or additional notes — common in academic books"],
            ]}
          />
          <p className="text-sm leading-relaxed">Insert via: References → Insert Footnote (Ctrl+Alt+F) or Insert Endnote (Ctrl+Alt+D). Word automatically numbers them and renumbers if you add/delete.</p>

          <Sub id="citations">Citations and Bibliography</Sub>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li>References → Citations & Bibliography → Style dropdown — choose APA, MLA, Chicago, Harvard, etc.</li>
            <li>References → Insert Citation → Add New Source — fill in details (author, title, publisher, year, URL).</li>
            <li>References → Bibliography → choose a built-in bibliography style — Word compiles all sources into a formatted reference list automatically.</li>
          </ul>

          <Sub id="captions">Captions and Cross-References</Sub>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li><strong>Caption:</strong> References → Insert Caption — adds a label below a figure, table, or equation (e.g., "Figure 1: Nairobi CBD Map").</li>
            <li><strong>Cross-reference:</strong> References → Cross-reference — inserts a reference to another part of the document ("See Table 3 on page 15"). It updates automatically if the page number changes.</li>
          </ul>

          {/* ═══════════════════════════════════════ */}
          <SectionHeading id="mailmerge">12. Mail Merge</SectionHeading>
          <ExplainerBox title="What is Mail Merge?">
            Mail Merge is a powerful Word feature that lets you create <strong>personalised copies</strong> of the same document for many different recipients. Instead of typing each letter separately, you write it once with <strong>merge fields</strong> (placeholders) and Word automatically fills in each recipient's details from a data source (Excel spreadsheet, Access database, or Word table).
          </ExplainerBox>

          <Sub id="merge-uses">Common Uses of Mail Merge</Sub>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li>Personalised invitation letters (e.g., wedding invitations, school open day)</li>
            <li>Student results slips (each student gets their own marks)</li>
            <li>Staff payslips for a company</li>
            <li>Mailing labels and envelopes</li>
            <li>Marketing emails sent to a customer database</li>
          </ul>

          <Sub id="merge-steps">Steps to Perform a Mail Merge</Sub>
          <ol className="list-decimal pl-6 space-y-3 text-sm leading-relaxed">
            <li><strong>Prepare the data source:</strong> Create an Excel spreadsheet with column headers (FirstName, LastName, Address, Score) and one row per recipient.</li>
            <li><strong>Open the main document:</strong> Open or create the letter in Word.</li>
            <li><strong>Start Mail Merge:</strong> Mailings → Start Mail Merge → Letters (or Envelopes, Labels, Directory, E-mail Messages).</li>
            <li><strong>Select Recipients:</strong> Mailings → Select Recipients → Use an Existing List → browse to the Excel file → select the worksheet → OK.</li>
            <li><strong>Insert Merge Fields:</strong> Click where you want personalised data (e.g., after "Dear") → Mailings → Insert Merge Field → FirstName. Repeat for other fields. Fields appear as «FirstName».</li>
            <li><strong>Preview Results:</strong> Mailings → Preview Results — click arrows to see how each recipient's letter looks.</li>
            <li><strong>Edit Recipient List:</strong> Mailings → Edit Recipient List — filter, sort, or exclude specific recipients.</li>
            <li><strong>Finish &amp; Merge:</strong> Mailings → Finish & Merge → choose:<br/>
              — <em>Edit Individual Documents</em>: Creates one Word document with all letters on separate pages (for review before printing).<br/>
              — <em>Print Documents</em>: Sends directly to the printer.<br/>
              — <em>Send Email Messages</em>: Sends personalised emails (requires Outlook).</li>
          </ol>

          <ExampleBox title="Example: Moi University Exam Slips">
            Moi University uses Mail Merge to produce exam attendance slips. The data source is an Excel spreadsheet with columns: StudentID, FullName, Course, ExamDate, Room. The mail merge template has merge fields inserted. With 2,000 students, all slips are generated in seconds instead of hours.
          </ExampleBox>

          <WarnBox>
            If the merge fields show as <code>«MERGEFIELD FirstName»</code> instead of actual data in Preview, it means the data source connection failed. Go to Mailings → Select Recipients and reconnect to the data file.
          </WarnBox>

          {/* ═══════════════════════════════════════ */}
          <SectionHeading id="review">13. Track Changes and Comments</SectionHeading>

          <Sub id="track-changes">Track Changes</Sub>
          <ExplainerBox title="What is Track Changes?">
            Track Changes records every edit made to a document — insertions, deletions, and formatting changes — and shows them in a different colour. Each editor's changes appear in a distinct colour. This is essential for collaborative document editing, allowing authors and editors to see exactly what was changed and by whom.
          </ExplainerBox>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li><strong>Turn on:</strong> Review → Track Changes (Ctrl+Shift+E). All subsequent edits are marked.</li>
            <li><strong>Insertions:</strong> Shown underlined in a colour.</li>
            <li><strong>Deletions:</strong> Shown with strikethrough in a colour (or in the margin as a balloon).</li>
            <li><strong>Accept a change:</strong> Review → Accept → Accept This Change (or accept all changes).</li>
            <li><strong>Reject a change:</strong> Review → Reject → Reject This Change (reverses the edit).</li>
            <li><strong>Show Markup:</strong> Review → Show Markup — choose what types of tracked changes to display.</li>
            <li><strong>Lock Tracking:</strong> Review → Track Changes → Lock Tracking — requires a password to turn off tracking (prevents reviewers from disabling it).</li>
          </ul>

          <Sub id="comments">Comments</Sub>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li>Select text → Review → New Comment — a balloon appears in the margin with your name and a space to type a note.</li>
            <li><strong>Reply to a comment:</strong> Click Reply inside a comment balloon — creates a threaded conversation.</li>
            <li><strong>Resolve a comment:</strong> Click Resolve in the comment — greys it out without deleting it.</li>
            <li><strong>Delete a comment:</strong> Review → Delete → Delete Comment, or right-click → Delete Comment.</li>
            <li>Comments are ideal for asking questions ("Can you clarify this statistic?"), leaving suggestions, or explaining changes.</li>
          </ul>

          {/* ═══════════════════════════════════════ */}
          <SectionHeading id="findreplace">14. Find, Replace, and Spelling/Grammar</SectionHeading>

          <Sub id="find">Find</Sub>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li><strong>Ctrl+F:</strong> Opens the Navigation Pane's search box — highlights all matches as you type. Press Enter to jump to next match.</li>
            <li><strong>Ctrl+H:</strong> Opens the Find and Replace dialog directly on the Replace tab.</li>
            <li><strong>Advanced Find (Ctrl+G → More):</strong> Search with options — match case, whole words only, use wildcards, find formatting (a specific font, style, or paragraph format).</li>
          </ul>

          <Sub id="replace">Find and Replace</Sub>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li>Ctrl+H → type in "Find what" and "Replace with" boxes.</li>
            <li><strong>Replace:</strong> Replaces one occurrence at a time (safer).</li>
            <li><strong>Replace All:</strong> Replaces every occurrence in the document in one click — use with caution.</li>
            <li><em>Example:</em> A 50-page report incorrectly uses "KSH" throughout. Find: "KSH", Replace: "KES" → Replace All fixes all 200 occurrences instantly.</li>
          </ul>

          <Sub id="spellcheck">Spelling and Grammar</Sub>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li><strong>Red wavy underline:</strong> Possible spelling error. Right-click for suggestions.</li>
            <li><strong>Blue double underline:</strong> Possible grammar error or style suggestion.</li>
            <li><strong>Full check:</strong> Review → Spelling &amp; Grammar (F7) — goes through the entire document error by error.</li>
            <li><strong>Ignore Once / Ignore All:</strong> Skip this error / skip all instances of this "error" (useful for proper nouns).</li>
            <li><strong>Add to Dictionary:</strong> Adds the word to your custom dictionary so it's never flagged again.</li>
            <li><strong>AutoCorrect:</strong> File → Options → Proofing → AutoCorrect Options — set words to auto-correct as you type (e.g., "teh" → "the").</li>
          </ul>

          <Sub id="thesaurus">Thesaurus and Word Count</Sub>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li><strong>Thesaurus:</strong> Select a word → Review → Thesaurus (Shift+F7) — shows synonyms and antonyms.</li>
            <li><strong>Word Count:</strong> Review → Word Count — shows words, characters, paragraphs, lines, pages. Also visible in the Status Bar at the bottom of the screen.</li>
          </ul>

          {/* ═══════════════════════════════════════ */}
          <SectionHeading id="print">15. Printing</SectionHeading>

          <Sub id="print-preview">Print Preview and Print Settings</Sub>
          <p className="text-sm leading-relaxed mb-2">File → Print (Ctrl+P) opens the combined Print Preview and Print settings panel (Backstage view). Key settings:</p>
          <Tbl
            headers={["Setting", "Options"]}
            rows={[
              ["Printer", "Choose the connected printer or save as PDF using 'Microsoft Print to PDF'"],
              ["Copies", "How many copies to print"],
              ["Print Range", "All Pages, Current Page, or Custom Range (e.g., 1-5, 8, 11-15)"],
              ["Sides", "One sided, or both sides (duplex — flip on long/short edge)"],
              ["Collated", "1,2,3 / 1,2,3 (one full set then next) vs Uncollated: 1,1 / 2,2 / 3,3"],
              ["Orientation", "Portrait or Landscape (overrides document setting for print)"],
              ["Paper Size", "A4, Letter, etc."],
              ["Margins", "Normal, Narrow, Wide, or Custom"],
              ["Pages per Sheet", "Print 2, 4, 6, 8, or 16 pages on one sheet (scaled down) — useful for booklets"],
            ]}
          />

          <NoteBox>
            Before printing any important document, always use <strong>Print Preview</strong> to check how it will look on paper. Check that headers/footers display correctly and that no content is cut off at the margins.
          </NoteBox>

          {/* ═══════════════════════════════════════ */}
          <SectionHeading id="shortcuts">16. Essential Keyboard Shortcuts</SectionHeading>
          <p className="text-sm text-muted-foreground mb-4">Mastering shortcuts dramatically increases your productivity. These are the most important shortcuts for Word — examiners often include a "name the shortcut for…" question.</p>

          <Sub id="file-shortcuts">File Operations</Sub>
          <div className="space-y-0 rounded-lg border border-border overflow-hidden mb-4">
            <KbdRow keys="Ctrl+N" action="New document" />
            <KbdRow keys="Ctrl+O" action="Open document" />
            <KbdRow keys="Ctrl+S" action="Save document" />
            <KbdRow keys="F12" action="Save As" />
            <KbdRow keys="Ctrl+W" action="Close document" />
            <KbdRow keys="Ctrl+P" action="Print" />
            <KbdRow keys="Alt+F4" action="Exit Word" />
          </div>

          <Sub id="edit-shortcuts">Editing</Sub>
          <div className="space-y-0 rounded-lg border border-border overflow-hidden mb-4">
            <KbdRow keys="Ctrl+Z" action="Undo last action" />
            <KbdRow keys="Ctrl+Y" action="Redo" />
            <KbdRow keys="Ctrl+X" action="Cut" />
            <KbdRow keys="Ctrl+C" action="Copy" />
            <KbdRow keys="Ctrl+V" action="Paste" />
            <KbdRow keys="Ctrl+A" action="Select all" />
            <KbdRow keys="Ctrl+F" action="Find" />
            <KbdRow keys="Ctrl+H" action="Find and Replace" />
            <KbdRow keys="F7" action="Spelling and Grammar check" />
            <KbdRow keys="Shift+F7" action="Thesaurus" />
            <KbdRow keys="Ctrl+Home" action="Go to the beginning of document" />
            <KbdRow keys="Ctrl+End" action="Go to the end of document" />
          </div>

          <Sub id="format-shortcuts">Formatting</Sub>
          <div className="space-y-0 rounded-lg border border-border overflow-hidden mb-4">
            <KbdRow keys="Ctrl+B" action="Bold" />
            <KbdRow keys="Ctrl+I" action="Italic" />
            <KbdRow keys="Ctrl+U" action="Underline" />
            <KbdRow keys="Ctrl+=" action="Subscript" />
            <KbdRow keys="Ctrl+Shift++" action="Superscript" />
            <KbdRow keys="Ctrl+Space" action="Clear character formatting" />
            <KbdRow keys="Ctrl+L" action="Align left" />
            <KbdRow keys="Ctrl+E" action="Centre align" />
            <KbdRow keys="Ctrl+R" action="Align right" />
            <KbdRow keys="Ctrl+J" action="Justify" />
            <KbdRow keys="Ctrl+1" action="Single line spacing" />
            <KbdRow keys="Ctrl+2" action="Double line spacing" />
            <KbdRow keys="Ctrl+5" action="1.5 line spacing" />
            <KbdRow keys="Ctrl+M" action="Increase paragraph indent" />
            <KbdRow keys="Ctrl+Shift+M" action="Decrease paragraph indent" />
            <KbdRow keys="Ctrl+Enter" action="Insert page break" />
            <KbdRow keys="Shift+F3" action="Change text case (cycle)" />
            <KbdRow keys="Ctrl+Shift+E" action="Toggle Track Changes on/off" />
            <KbdRow keys="Ctrl+K" action="Insert hyperlink" />
            <KbdRow keys="Ctrl+Alt+F" action="Insert footnote" />
            <KbdRow keys="Ctrl+Alt+D" action="Insert endnote" />
          </div>

          <NoteBox>
            <strong>CAT tip:</strong> Be ready to state the shortcut key and what it does, identify what a described shortcut does, AND explain why a feature (like Track Changes or Mail Merge) is used — including real-world examples.
          </NoteBox>

        </div>

        {/* ── TOC sidebar ── */}
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-20">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">On this page</p>
            <nav className="space-y-1">
              {sections.map(s => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`block text-xs py-1 px-2 rounded transition-colors ${
                    activeSection === s.id
                      ? "text-foreground font-medium bg-muted"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      </div>
    </Layout>
  );
}
