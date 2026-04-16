import { Helmet } from "react-helmet-async";
import { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/layout";

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
            {row.map((cell, j) => <td key={j} className="px-4 py-2 border-b border-border/30 font-mono text-xs">{cell}</td>)}
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

const FormulaBox = ({ formula, result, note }: { formula: string; result: string; note?: string }) => (
  <div className="rounded-lg border border-border/60 bg-muted/30 px-4 py-2 my-2 flex items-baseline gap-4">
    <code className="text-xs font-mono text-primary font-bold">{formula}</code>
    <span className="text-xs text-muted-foreground">→</span>
    <span className="text-xs font-semibold text-foreground">{result}</span>
    {note && <span className="text-xs text-muted-foreground ml-auto">{note}</span>}
  </div>
);

const sections = [
  { id: "interface", label: "The Excel Interface" },
  { id: "workbook", label: "Workbooks & Worksheets" },
  { id: "data", label: "Entering Data" },
  { id: "references", label: "Cell References" },
  { id: "formulas", label: "Formulas & Operators" },
  { id: "functions-basic", label: "Basic Functions" },
  { id: "functions-logic", label: "Logical Functions" },
  { id: "functions-lookup", label: "Lookup Functions" },
  { id: "functions-text", label: "Text Functions" },
  { id: "functions-date", label: "Date & Time Functions" },
  { id: "functions-math", label: "Math & Finance Functions" },
  { id: "sort-filter", label: "Sorting & Filtering" },
  { id: "cond-format", label: "Conditional Formatting" },
  { id: "charts", label: "Charts & Graphs" },
  { id: "pivot", label: "Pivot Tables" },
  { id: "validation", label: "Data Validation & Names" },
  { id: "print", label: "Printing & Page Setup" },
  { id: "errors", label: "Error Messages" },
  { id: "shortcuts", label: "Keyboard Shortcuts" },
];

export default function IctTopic2() {
  const [activeSection, setActiveSection] = useState("interface");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }); },
      { rootMargin: "-20% 0px -75% 0px" }
    );
    sections.forEach(s => { const el = document.getElementById(s.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <Layout breadcrumbs={[
      { label: "Home", href: "/" },
      { label: "Unit 5 — ICT", href: "/" },
      { label: "Microsoft Excel" },
    ]}>
      <Helmet><title>Microsoft Excel — ICT Notes</title></Helmet>

      <div className="flex gap-8 px-4 sm:px-6 py-8 max-w-7xl mx-auto">
        <div className="flex-1 min-w-0 max-w-3xl" ref={contentRef}>
          {/* Hero */}
          <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#d4a843" }}>
              Unit 5 — ICT · Topic 2
            </span>
            <h1 className="text-4xl font-bold font-serif mt-2 mb-3" style={{ color: "#0f2044" }}>
              Microsoft Excel
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A complete guide to spreadsheet software — from cell references and formulas to charts, pivot tables, and data analysis — covering everything for your CAT.
            </p>
            <div className="mt-4 flex gap-2 flex-wrap">
              {["Spreadsheets", "Formulas", "Functions", "Charts", "Pivot Tables", "Data Analysis"].map(tag => (
                <span key={tag} className="rounded-full px-3 py-1 text-xs font-medium"
                  style={{ backgroundColor: "#0f2044", color: "#f5f0e8" }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* ═══════════════════════════════════════ */}
          <SectionHeading id="interface">1. The Microsoft Excel Interface</SectionHeading>
          <ExplainerBox title="What is Microsoft Excel?">
            Microsoft Excel is a <strong>spreadsheet application</strong> — part of Microsoft Office/365 — used for storing, organising, calculating, and analysing numerical data. It is used everywhere in Kenya and globally: for business accounting, payroll, marks analysis, budgeting, inventory management, statistical research, and financial modelling.
          </ExplainerBox>

          <Tbl
            headers={["Interface Element", "Location / Description"]}
            rows={[
              ["Title Bar", "Top — shows workbook name and Excel version"],
              ["Quick Access Toolbar (QAT)", "Top-left — Save, Undo, Redo buttons (customisable)"],
              ["Ribbon", "Below title bar — tabs: Home, Insert, Page Layout, Formulas, Data, Review, View"],
              ["File Tab (Backstage)", "Far-left — New, Open, Save, Save As, Print, Options"],
              ["Name Box", "Left of formula bar — shows the address (reference) of the active cell, e.g. A1"],
              ["Formula Bar", "Right of Name Box — shows the formula or content of the active cell; edit formulas here"],
              ["Column Headers", "Lettered A, B, C… XFD — click to select an entire column"],
              ["Row Headers", "Numbered 1, 2, 3… 1,048,576 — click to select an entire row"],
              ["Active Cell", "The currently selected cell — highlighted with a green border"],
              ["Cell", "A single box in the grid — intersection of one row and one column"],
              ["Sheet Tab", "Bottom — each tab represents one worksheet; right-click to rename/colour/insert/delete"],
              ["Sheet Navigation Arrows", "Left of sheet tabs — scroll through many sheet tabs"],
              ["Status Bar", "Bottom — shows Sum, Average, Count, Min, Max of selected cells; view mode buttons; zoom"],
              ["Scroll Bars", "Right and bottom — navigate the worksheet"],
              ["Zoom Slider", "Bottom-right — adjust display magnification"],
              ["Split Box", "Top of vertical scroll bar / right of horizontal scroll bar — split the window"],
            ]}
          />

          <Sub id="interface-dims">Worksheet Dimensions</Sub>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li><strong>Columns:</strong> 16,384 columns (A to XFD)</li>
            <li><strong>Rows:</strong> 1,048,576 rows</li>
            <li><strong>Total cells per worksheet:</strong> 17,179,869,184 (over 17 billion cells)</li>
            <li><strong>Worksheets per workbook:</strong> Limited only by available memory (default: 1 in Excel 2016+, was 3 in older versions)</li>
            <li><strong>Maximum characters in a cell:</strong> 32,767 characters (only 1,024 display)</li>
          </ul>

          {/* ═══════════════════════════════════════ */}
          <SectionHeading id="workbook">2. Workbooks and Worksheets</SectionHeading>
          <Tbl
            headers={["Term", "Definition"]}
            rows={[
              ["Workbook", "The entire Excel file (.xlsx). Like a physical book."],
              ["Worksheet (Sheet)", "A single spreadsheet tab within the workbook. Like a page in a book."],
              ["Cell", "A single box where a row and column intersect. Identified by its cell reference (e.g., B3)."],
              ["Range", "A rectangular group of cells referred to together (e.g., A1:C5 is 3 columns × 5 rows = 15 cells)"],
              ["Active Cell", "The cell currently selected — you can see its reference in the Name Box"],
            ]}
          />

          <Sub id="sheet-ops">Working with Sheets</Sub>
          <Tbl
            headers={["Action", "How to Do It"]}
            rows={[
              ["Insert new sheet", "Right-click sheet tab → Insert, OR click the + (New Sheet) button at the right of tabs"],
              ["Delete a sheet", "Right-click sheet tab → Delete (warning: cannot be undone!)"],
              ["Rename a sheet", "Double-click sheet tab → type new name → Enter"],
              ["Move / Copy a sheet", "Right-click sheet tab → Move or Copy → choose position and workbook; tick 'Create a copy' to copy"],
              ["Colour a sheet tab", "Right-click sheet tab → Tab Color → choose colour"],
              ["Hide / Unhide a sheet", "Right-click sheet tab → Hide; to unhide: right-click any tab → Unhide"],
              ["Navigate between sheets", "Click the sheet tab, OR Ctrl+PageDown (next) / Ctrl+PageUp (previous)"],
              ["Select all sheets", "Right-click sheet tab → Select All Sheets (groups them for simultaneous editing)"],
            ]}
          />

          {/* ═══════════════════════════════════════ */}
          <SectionHeading id="data">3. Entering and Editing Data</SectionHeading>

          <Sub id="data-types">Types of Data in Excel</Sub>
          <Tbl
            headers={["Data Type", "Alignment (default)", "Examples", "Notes"]}
            rows={[
              ["Text (Labels)", "Left-aligned", "Student Name, Nairobi, January", "Any entry starting with a letter or apostrophe"],
              ["Numbers (Values)", "Right-aligned", "1500, 3.14, -250, 75%", "Used in calculations; include integers, decimals, negatives"],
              ["Dates", "Right-aligned", "15/04/2026, April 15 2026", "Stored internally as a serial number (e.g. 1 Jan 1900 = 1); format as Date"],
              ["Times", "Right-aligned", "9:30 AM, 14:45:00", "Stored as a fraction of a day; 0.5 = noon"],
              ["Formulas", "Depends on result", "=A1+B1, =SUM(A1:A10)", "Must start with = (equals sign)"],
              ["Boolean (Logical)", "Centre-aligned", "TRUE, FALSE", "Result of logical tests"],
              ["Errors", "Centre-aligned", "#DIV/0!, #VALUE!", "Show when a formula fails — see the Errors section"],
            ]}
          />

          <Sub id="entry-tips">Data Entry Tips</Sub>
          <ul className="list-disc pl-6 space-y-2 text-sm leading-relaxed">
            <li><strong>Confirm entry:</strong> Press <kbd>Enter</kbd> (move down), <kbd>Tab</kbd> (move right), or an arrow key.</li>
            <li><strong>Cancel entry:</strong> Press <kbd>Esc</kbd> before confirming — restores the original cell content.</li>
            <li><strong>Edit a cell:</strong> Press <kbd>F2</kbd> or double-click the cell to enter Edit mode.</li>
            <li><strong>Number stored as text:</strong> If a number has a leading apostrophe (e.g., '0712345678) it is stored as text. CONCAT/TEXT functions treat it as text; SUM ignores it.</li>
            <li><strong>Force line break within a cell:</strong> Press <kbd>Alt+Enter</kbd> while typing in a cell.</li>
            <li><strong>AutoComplete:</strong> Excel suggests matching previous entries as you type in the same column. Press <kbd>Tab</kbd> or <kbd>Enter</kbd> to accept; keep typing to reject.</li>
            <li><strong>AutoFill:</strong> Type a value in a cell → grab the small green square at the bottom-right corner of the cell (called the <strong>fill handle</strong>) → drag to fill adjacent cells. Fills series: 1, 2, 3… or Mon, Tue, Wed… or Jan, Feb, Mar…</li>
            <li><strong>Flash Fill (Ctrl+E):</strong> Excel detects a pattern from examples you've typed and fills the rest. E.g. if column A has "JOHN KAMAU" and you type "John" in B1, Flash Fill completes the rest with first names.</li>
          </ul>

          <Sub id="cell-format">Number Formats</Sub>
          <p className="text-sm leading-relaxed mb-2">Number formatting changes <em>how</em> a number is displayed without changing its value. Access via Home → Number group dropdown or <code>Ctrl+1</code> (Format Cells dialog).</p>
          <Tbl
            headers={["Format", "Example", "Use"]}
            rows={[
              ["General (default)", "1500.5", "No specific format — shows the number as entered"],
              ["Number", "1,500.50", "Shows thousands separator and decimal places"],
              ["Currency", "KES 1,500.50", "Adds currency symbol; fixed decimal places"],
              ["Accounting", "KES     1,500.50", "Currency symbol left-aligned; zeros as dash; negatives in brackets"],
              ["Date", "15-Apr-26 or 15/04/2026", "Many date display formats available"],
              ["Time", "09:30 AM", "Various time display options"],
              ["Percentage", "75%", "Multiplies the cell value by 100 and adds %"],
              ["Fraction", "3/4", "Shows numbers as fractions"],
              ["Scientific", "1.50E+03", "Scientific notation — useful for very large/small numbers"],
              ["Text", "'1500", "Treats everything as text — prevents any calculation"],
              ["Special", "Phone, Zip Code", "Locale-specific formats"],
              ["Custom", "#,##0.00 \"KES\"", "Create your own format using format codes"],
            ]}
          />

          {/* ═══════════════════════════════════════ */}
          <SectionHeading id="references">4. Cell References</SectionHeading>
          <ExplainerBox title="What is a Cell Reference?">
            A <strong>cell reference</strong> identifies a specific cell or range in a formula. Instead of typing a fixed number, you reference the cell — so if the cell's value changes, the formula result updates automatically. References follow the <strong>Column-Row</strong> format: column letter + row number → e.g., <code>B3</code> = column B, row 3.
          </ExplainerBox>

          <Sub id="ref-types">Three Types of Cell References</Sub>
          <Tbl
            headers={["Type", "Format", "Behaviour When Copied", "When to Use"]}
            rows={[
              ["Relative (default)", "A1", "Both column and row adjust relative to the new position", "Most formulas — e.g. adding two adjacent cells across many rows"],
              ["Absolute", "$A$1", "Column AND row are locked — never changes when copied", "Referring to a fixed value cell, e.g. a tax rate in one cell used across many rows"],
              ["Mixed — Column Absolute", "$A1", "Column A is locked; row adjusts", "Referencing an entire column of a fixed column letter"],
              ["Mixed — Row Absolute", "A$1", "Row 1 is locked; column adjusts", "Referencing an entire row of a fixed row number"],
            ]}
          />

          <ExampleBox title="Example: Tax Calculation with Absolute Reference">
            <p className="mb-2">A shop in Mombasa has a VAT rate of 16% in cell <strong>B1</strong> and prices in A4:A20. The formula in B4 to calculate VAT:</p>
            <code className="block bg-white/60 px-2 py-1 rounded text-xs mb-2">=A4*$B$1</code>
            <p>When copied down to B5, B6, etc.: A4 becomes A5, A6 (relative — changes), but <strong>$B$1 stays $B$1</strong> (absolute — locked on the VAT rate). If we used <code>=A4*B1</code>, copying down would change B1 to B2, B3, etc., giving wrong results.</p>
          </ExampleBox>

          <NoteBox>
            Toggle between reference types by pressing <strong>F4</strong> while editing a cell reference in the formula bar. Each press cycles: A1 → $A$1 → A$1 → $A1 → A1.
          </NoteBox>

          <Sub id="range-refs">Range References and 3D References</Sub>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li><strong>Range:</strong> <code>A1:C5</code> — all cells from A1 to C5 (a rectangle of 15 cells).</li>
            <li><strong>Non-contiguous range:</strong> <code>A1:A5, C1:C5</code> — two separate ranges (note the comma).</li>
            <li><strong>Entire column:</strong> <code>A:A</code> — all cells in column A.</li>
            <li><strong>Entire row:</strong> <code>1:1</code> — all cells in row 1.</li>
            <li><strong>3D reference (across sheets):</strong> <code>Sheet1:Sheet3!B2</code> — the same cell B2 across sheets from Sheet1 to Sheet3. Used in <code>=SUM(Sheet1:Sheet3!B2)</code> to sum B2 across multiple sheets.</li>
          </ul>

          {/* ═══════════════════════════════════════ */}
          <SectionHeading id="formulas">5. Formulas and Arithmetic Operators</SectionHeading>
          <ExplainerBox title="The Golden Rule of Formulas">
            Every formula in Excel <strong>must start with an equals sign (=)</strong>. Without it, Excel treats the entry as text. After the =, you can use cell references, numbers, operators, and functions.
          </ExplainerBox>

          <Sub id="operators">Arithmetic Operators (in Order of Precedence)</Sub>
          <Tbl
            headers={["Precedence", "Operator", "Meaning", "Example", "Result"]}
            rows={[
              ["1 (highest)", "- (unary)", "Negation (negative number)", "=-B1", "Negative of B1"],
              ["2", "%", "Percentage", "=50%", "0.5"],
              ["3", "^", "Exponentiation (power)", "=2^3", "8 (2 to the power of 3)"],
              ["4", "* and /", "Multiplication and Division", "=10*3, =15/4", "30, 3.75"],
              ["5 (lowest)", "+ and -", "Addition and Subtraction", "=5+3, =10-4", "8, 6"],
            ]}
          />

          <WarnBox>
            Excel follows <strong>BODMAS/BIDMAS</strong> (Brackets, Orders, Division/Multiplication, Addition/Subtraction). <code>=2+3*4</code> gives <strong>14</strong>, NOT 20. To force addition first: <code>=(2+3)*4 = 20</code>. Always use brackets when in doubt.
          </WarnBox>

          <Sub id="compare-ops">Comparison Operators</Sub>
          <Tbl
            headers={["Operator", "Meaning", "Example", "Result"]}
            rows={[
              ["=", "Equal to", '=A1=B1 (if A1=5 and B1=5)', "TRUE"],
              ["<>", "Not equal to", '=A1<>B1 (if A1=5, B1=3)', "TRUE"],
              [">", "Greater than", "=A1>10 (if A1=12)", "TRUE"],
              ["<", "Less than", "=A1<10 (if A1=12)", "FALSE"],
              [">=", "Greater than or equal", "=A1>=10 (if A1=10)", "TRUE"],
              ["<=", "Less than or equal", "=A1<=9 (if A1=10)", "FALSE"],
            ]}
          />
          <p className="text-sm text-muted-foreground mb-2">Comparison operators are used primarily inside logical functions like IF, COUNTIF, SUMIF.</p>

          <Sub id="concat-op">Text Concatenation Operator</Sub>
          <p className="text-sm leading-relaxed mb-1">The ampersand <strong>&amp;</strong> joins (concatenates) text strings and cell values.</p>
          <FormulaBox formula='="Hello "&"World"' result="Hello World" />
          <FormulaBox formula='=A1&" "&B1 (if A1="John", B1="Kamau")' result="John Kamau" />

          {/* ═══════════════════════════════════════ */}
          <SectionHeading id="functions-basic">6. Basic Statistical Functions</SectionHeading>
          <ExplainerBox title="Function Syntax">
            A <strong>function</strong> is a built-in formula with a name. Syntax: <code>=FUNCTIONNAME(argument1, argument2, ...)</code>. Arguments are the inputs — they can be cell references, ranges, numbers, text, or other functions.
          </ExplainerBox>

          <Sub id="sum-avg">SUM, AVERAGE, MIN, MAX, COUNT, COUNTA</Sub>
          <Tbl
            headers={["Function", "Syntax", "What It Does", "Example", "Result"]}
            rows={[
              ["SUM", "=SUM(range)", "Adds all numbers in the range", "=SUM(A1:A5) where values are 10,20,30,40,50", "150"],
              ["AVERAGE", "=AVERAGE(range)", "Calculates the arithmetic mean (sum ÷ count)", "=AVERAGE(A1:A5) same data", "30"],
              ["MIN", "=MIN(range)", "Returns the smallest number", "=MIN(A1:A5) same data", "10"],
              ["MAX", "=MAX(range)", "Returns the largest number", "=MAX(A1:A5) same data", "50"],
              ["COUNT", "=COUNT(range)", "Counts cells containing NUMBERS only", "=COUNT(A1:A6) if A6 has text", "5 (ignores text)"],
              ["COUNTA", "=COUNTA(range)", "Counts all non-empty cells (numbers, text, dates)", "=COUNTA(A1:A6)", "6"],
              ["COUNTBLANK", "=COUNTBLANK(range)", "Counts empty cells", "=COUNTBLANK(A1:A10) if 3 are empty", "3"],
              ["LARGE", "=LARGE(range, k)", "Returns the k-th largest value", "=LARGE(A1:A10, 2)", "2nd highest value"],
              ["SMALL", "=SMALL(range, k)", "Returns the k-th smallest value", "=SMALL(A1:A10, 3)", "3rd lowest value"],
            ]}
          />

          <ExampleBox title="Example: Class Results (Kenyan Secondary School)">
            <p className="mb-2">A teacher at Alliance High School enters 30 student marks in A2:A31. Formulas used:</p>
            <FormulaBox formula="=SUM(A2:A31)" result="Total marks of all students" />
            <FormulaBox formula="=AVERAGE(A2:A31)" result="Class mean score" />
            <FormulaBox formula="=MAX(A2:A31)" result="Highest mark (top student)" />
            <FormulaBox formula="=MIN(A2:A31)" result="Lowest mark" />
            <FormulaBox formula="=COUNT(A2:A31)" result="Number of students who sat (marks are numbers)" />
            <FormulaBox formula="=LARGE(A2:A31,2)" result="Second highest mark" />
          </ExampleBox>

          <Sub id="sumif-countif">SUMIF, AVERAGEIF, COUNTIF</Sub>
          <Tbl
            headers={["Function", "Syntax", "Purpose"]}
            rows={[
              ["COUNTIF", "=COUNTIF(range, criteria)", "Counts cells that meet ONE condition"],
              ["COUNTIFS", "=COUNTIFS(range1, criteria1, range2, criteria2, …)", "Counts cells meeting MULTIPLE conditions"],
              ["SUMIF", "=SUMIF(range, criteria, sum_range)", "Sums values where ONE condition is met"],
              ["SUMIFS", "=SUMIFS(sum_range, range1, criteria1, range2, criteria2, …)", "Sums values meeting MULTIPLE conditions"],
              ["AVERAGEIF", "=AVERAGEIF(range, criteria, avg_range)", "Averages values where ONE condition is met"],
            ]}
          />

          <ExampleBox title="COUNTIF and SUMIF Examples">
            <p className="mb-1">Student data: Column A = Name, Column B = Gender, Column C = Score, Column D = County</p>
            <FormulaBox formula='=COUNTIF(B2:B31,"Female")' result="Number of female students" />
            <FormulaBox formula='=SUMIF(B2:B31,"Male",C2:C31)' result="Total score of all male students" />
            <FormulaBox formula='=AVERAGEIF(D2:D31,"Nairobi",C2:C31)' result="Average score of Nairobi students" />
            <FormulaBox formula='=COUNTIFS(B2:B31,"Female",C2:C31,">60")' result="Female students who scored above 60" />
          </ExampleBox>

          {/* ═══════════════════════════════════════ */}
          <SectionHeading id="functions-logic">7. Logical Functions</SectionHeading>

          <Sub id="if">IF Function</Sub>
          <ExplainerBox title="IF Function">
            <p className="mb-1"><strong>Syntax:</strong> <code>=IF(logical_test, value_if_true, value_if_false)</code></p>
            <p>Tests a condition. If the condition is TRUE, returns the first value; if FALSE, returns the second value.</p>
          </ExplainerBox>
          <FormulaBox formula='=IF(C2>=50,"Pass","Fail")' result='"Pass" if score is 50 or above, else "Fail"' />
          <FormulaBox formula='=IF(B2="Female","F","M")' result='"F" if gender is Female, else "M"' />
          <FormulaBox formula="=IF(A2>0,A2*0.16,0)" result="Calculate 16% VAT only if value is positive" />

          <Sub id="nested-if">Nested IF (Multiple Conditions)</Sub>
          <p className="text-sm leading-relaxed mb-2">Place an IF inside another IF's value_if_true or value_if_false to test multiple conditions in sequence:</p>
          <FormulaBox
            formula='=IF(C2>=70,"Distinction",IF(C2>=60,"Merit",IF(C2>=50,"Pass","Fail")))'
            result="Grade based on score: ≥70=Distinction, ≥60=Merit, ≥50=Pass, else Fail"
          />
          <ExampleBox title="KNEC-Style Grading (Kenyan University)">
            A lecturer at Kenyatta University needs to assign grades A–F:
            <FormulaBox
              formula='=IF(C2>=70,"A",IF(C2>=60,"B",IF(C2>=50,"C",IF(C2>=40,"D","F"))))'
              result="A (≥70), B (≥60), C (≥50), D (≥40), F (below 40)"
            />
          </ExampleBox>

          <Sub id="and-or">AND, OR, NOT Functions</Sub>
          <Tbl
            headers={["Function", "Syntax", "Returns TRUE when…", "Example"]}
            rows={[
              ["AND", "=AND(cond1, cond2, ...)", "ALL conditions are TRUE", '=AND(C2>=50,D2="Present") → TRUE only if passed AND present'],
              ["OR", "=OR(cond1, cond2, ...)", "AT LEAST ONE condition is TRUE", '=OR(C2>=70,D2="Merit") → TRUE if either condition met'],
              ["NOT", "=NOT(condition)", "The condition is FALSE (reverses it)", '=NOT(C2<50) → TRUE if score is NOT less than 50'],
            ]}
          />
          <FormulaBox
            formula='=IF(AND(C2>=50,E2="Paid"),"Eligible","Not Eligible")'
            result="Eligible only if student passed (≥50) AND has paid fees"
          />

          <Sub id="iferror">IFERROR Function</Sub>
          <p className="text-sm leading-relaxed mb-2">Catches formula errors and replaces them with a custom message or value:</p>
          <ExplainerBox title="Syntax">
            <code>=IFERROR(formula, value_if_error)</code> — if the formula produces any error, shows the second argument instead.
          </ExplainerBox>
          <FormulaBox formula='=IFERROR(A1/B1,"Cannot divide by zero")' result='Division result, or the message if B1=0' />
          <FormulaBox formula='=IFERROR(VLOOKUP(A2,Sheet2!A:B,2,0),"Not Found")' result="VLOOKUP result, or 'Not Found' if the ID does not exist" />

          {/* ═══════════════════════════════════════ */}
          <SectionHeading id="functions-lookup">8. Lookup Functions</SectionHeading>

          <Sub id="vlookup">VLOOKUP (Vertical Lookup)</Sub>
          <ExplainerBox title="VLOOKUP Syntax">
            <code>=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])</code>
            <ul className="list-disc pl-4 mt-2 space-y-1">
              <li><strong>lookup_value:</strong> The value to search for (what you're looking up)</li>
              <li><strong>table_array:</strong> The range containing the table — lookup column MUST be the first column of this range</li>
              <li><strong>col_index_num:</strong> Which column number in the table to return (1 = first column, 2 = second, etc.)</li>
              <li><strong>range_lookup:</strong> FALSE (or 0) = exact match (almost always use this); TRUE (or 1) = approximate match (requires sorted data)</li>
            </ul>
          </ExplainerBox>

          <ExampleBox title="VLOOKUP: Student Marks Lookup">
            <p className="mb-2">A school has a table in Sheet2: Column A = Student ID, Column B = Student Name, Column C = Score. In Sheet1, you have Student IDs and want to pull their names and scores:</p>
            <FormulaBox
              formula="=VLOOKUP(A2,Sheet2!A:C,2,FALSE)"
              result="Returns the student's Name (2nd column) based on their ID in A2"
            />
            <FormulaBox
              formula="=VLOOKUP(A2,Sheet2!A:C,3,FALSE)"
              result="Returns the student's Score (3rd column)"
            />
            <p className="text-xs text-muted-foreground mt-2">If the ID in A2 is not found in Sheet2's column A, VLOOKUP returns a #N/A error — wrap with IFERROR to handle gracefully.</p>
          </ExampleBox>

          <WarnBox>
            VLOOKUP always searches the <strong>first column</strong> of the table_array from left to right. It <em>cannot</em> look to the left. If you need to look left, use INDEX/MATCH instead.
          </WarnBox>

          <Sub id="hlookup">HLOOKUP (Horizontal Lookup)</Sub>
          <ExplainerBox title="HLOOKUP Syntax">
            <code>=HLOOKUP(lookup_value, table_array, row_index_num, [range_lookup])</code>
            <p className="mt-1">Same as VLOOKUP but searches <strong>horizontally</strong> across the first ROW of the table instead of the first column. Used when data is arranged in rows rather than columns.</p>
          </ExplainerBox>
          <FormulaBox
            formula="=HLOOKUP(B1,A1:F3,2,FALSE)"
            result="Searches row 1 for B1's value, returns the value from row 2 of the matching column"
          />

          <Sub id="index-match">INDEX and MATCH (The Powerful Alternative)</Sub>
          <ExplainerBox title="Why INDEX/MATCH is Superior to VLOOKUP">
            <ul className="list-disc pl-4 space-y-1">
              <li>Can look in any direction (left, right, up, down)</li>
              <li>More flexible — the lookup column doesn't need to be first</li>
              <li>Faster on large datasets</li>
              <li>Not affected by inserting/deleting columns (VLOOKUP's col_index breaks)</li>
            </ul>
          </ExplainerBox>
          <p className="text-sm leading-relaxed mb-2">
            <strong>INDEX(array, row_num, [col_num]):</strong> Returns the value from a specific position in a range.<br />
            <strong>MATCH(lookup_value, lookup_array, [match_type]):</strong> Returns the relative position (row/column number) of a value in a range. Match_type 0 = exact match.
          </p>
          <FormulaBox
            formula="=INDEX(B2:B100, MATCH(E2, A2:A100, 0))"
            result="Find E2 in column A, then return the corresponding value from column B — equivalent to VLOOKUP but more flexible"
          />
          <ExampleBox title="INDEX/MATCH: Payroll Lookup">
            An HR officer at a Nairobi company wants to find an employee's salary. Employee IDs are in column A, names in column B, salaries in column C. She types the employee ID in cell E2 and uses:
            <FormulaBox formula="=INDEX(C2:C500, MATCH(E2, A2:A500, 0))" result="Salary of the employee with ID in E2" />
            This works even if she later inserts a new column between A and C — VLOOKUP would break.
          </ExampleBox>

          {/* ═══════════════════════════════════════ */}
          <SectionHeading id="functions-text">9. Text Functions</SectionHeading>

          <Tbl
            headers={["Function", "Syntax", "What It Does", "Example", "Result"]}
            rows={[
              ["UPPER", "=UPPER(text)", "Converts all characters to UPPERCASE", '=UPPER("nairobi")', "NAIROBI"],
              ["LOWER", "=LOWER(text)", "Converts all characters to lowercase", '=LOWER("KENYA")', "kenya"],
              ["PROPER", "=PROPER(text)", "Capitalises the First Letter of Each Word", '=PROPER("john kamau")', "John Kamau"],
              ["LEN", "=LEN(text)", "Returns the number of characters (including spaces)", '=LEN("Hello")', "5"],
              ["LEFT", "=LEFT(text, num_chars)", "Returns the first n characters from the left", '=LEFT("KE0712",2)', "KE"],
              ["RIGHT", "=RIGHT(text, num_chars)", "Returns the last n characters from the right", '=RIGHT("ID-2026",4)', "2026"],
              ["MID", "=MID(text, start_num, num_chars)", "Returns characters from the middle (starting at start_num)", '=MID("KE-0712-26",4,4)', "0712"],
              ["FIND", "=FIND(find_text, within_text, [start])", "Returns the position of a substring (case-sensitive)", '=FIND("@","user@gmail.com")', "5"],
              ["SEARCH", "=SEARCH(find_text, within_text, [start])", "Like FIND but case-insensitive", '=SEARCH("a","Kenya")', "3"],
              ["TRIM", "=TRIM(text)", "Removes leading, trailing, and extra internal spaces", '=TRIM("  Kenya  ")', "Kenya"],
              ["SUBSTITUTE", "=SUBSTITUTE(text, old_text, new_text, [instance])", "Replaces specific text within a string", '=SUBSTITUTE("Mr John","Mr","Dr")', "Dr John"],
              ["REPLACE", "=REPLACE(old_text, start, num_chars, new_text)", "Replaces characters by position", '=REPLACE("KE2024",3,4,"2026")', "KE2026"],
              ["CONCATENATE / &", "=CONCATENATE(text1, text2) or =text1&text2", "Joins text strings together", '=A2&" "&B2 → "John"&" "&"Kamau"', "John Kamau"],
              ["TEXTJOIN", "=TEXTJOIN(delimiter, ignore_empty, text1, text2, …)", "Joins text with a delimiter; can ignore blanks", '=TEXTJOIN(", ",TRUE,A2:A5)', "Nairobi, Mombasa, Kisumu"],
              ["TEXT", "=TEXT(value, format_text)", "Converts a number/date to text with a specific format", '=TEXT(TODAY(),"DD/MM/YYYY")', '"15/04/2026"'],
              ["VALUE", "=VALUE(text)", "Converts text that looks like a number into an actual number", '=VALUE("1500")', "1500 (as a number)"],
            ]}
          />

          <ExampleBox title="Extracting Parts of a Kenyan National ID or Phone Number">
            <p className="mb-2">If column A contains phone numbers like "0712345678":</p>
            <FormulaBox formula='=LEFT(A2,4)' result='"0712" — the network code prefix' />
            <FormulaBox formula='=RIGHT(A2,6)' result='"345678" — last 6 digits' />
            <FormulaBox formula='=MID(A2,2,9)' result='"712345678" — number without leading 0' />
            <FormulaBox formula='="254"&MID(A2,2,9)' result='"254712345678" — international format' />
          </ExampleBox>

          {/* ═══════════════════════════════════════ */}
          <SectionHeading id="functions-date">10. Date and Time Functions</SectionHeading>

          <Tbl
            headers={["Function", "Syntax", "What It Returns", "Example", "Result (approximate)"]}
            rows={[
              ["TODAY", "=TODAY()", "Current date (updates every day)", "=TODAY()", "15/04/2026"],
              ["NOW", "=NOW()", "Current date AND time", "=NOW()", "15/04/2026 23:30"],
              ["DATE", "=DATE(year,month,day)", "Creates a date from year, month, day numbers", "=DATE(2026,4,15)", "15/04/2026"],
              ["YEAR", "=YEAR(date)", "Extracts the year from a date", "=YEAR(A1) if A1=15/04/2026", "2026"],
              ["MONTH", "=MONTH(date)", "Extracts the month number (1–12)", "=MONTH(A1)", "4"],
              ["DAY", "=DAY(date)", "Extracts the day of the month (1–31)", "=DAY(A1)", "15"],
              ["WEEKDAY", "=WEEKDAY(date,[return_type])", "Day of the week number (1=Sun default; use 2 for Mon=1)", "=WEEKDAY(A1,2)", "3 (Wednesday)"],
              ["WEEKNUM", "=WEEKNUM(date)", "Week number of the year (1–53)", "=WEEKNUM(A1)", "16"],
              ["DATEDIF", "=DATEDIF(start,end,unit)", "Difference between dates in 'Y', 'M', 'D', 'YM', 'MD'", '=DATEDIF(A1,TODAY(),"Y")', "Age in years"],
              ["NETWORKDAYS", "=NETWORKDAYS(start,end,[holidays])", "Working days between two dates (excludes weekends)", "=NETWORKDAYS(A1,B1)", "Business days"],
              ["EDATE", "=EDATE(start_date, months)", "Date n months from start_date", "=EDATE(A1,3)", "Date 3 months later"],
              ["EOMONTH", "=EOMONTH(start_date, months)", "Last day of the month n months from start_date", "=EOMONTH(A1,0)", "30/04/2026"],
            ]}
          />

          <ExampleBox title="Kenyan Example: Employee Age and Service Years">
            <p className="mb-2">An HR spreadsheet: Column A = Name, Column B = Date of Birth, Column C = Date Hired</p>
            <FormulaBox formula='=DATEDIF(B2,TODAY(),"Y")' result="Employee's current age in complete years" />
            <FormulaBox formula='=DATEDIF(C2,TODAY(),"Y")' result="Years of service at the company" />
            <FormulaBox formula='=DATEDIF(C2,TODAY(),"Y")&" years, "&DATEDIF(C2,TODAY(),"YM")&" months"' result='"5 years, 3 months" — complete service period' />
          </ExampleBox>

          {/* ═══════════════════════════════════════ */}
          <SectionHeading id="functions-math">11. Math, Rounding, and Financial Functions</SectionHeading>

          <Sub id="math-fns">Math Functions</Sub>
          <Tbl
            headers={["Function", "Syntax", "What It Does", "Example", "Result"]}
            rows={[
              ["ROUND", "=ROUND(number, num_digits)", "Rounds to n decimal places (standard rounding)", "=ROUND(3.14159,2)", "3.14"],
              ["ROUNDUP", "=ROUNDUP(number, num_digits)", "Always rounds UP (away from zero)", "=ROUNDUP(3.141,2)", "3.15"],
              ["ROUNDDOWN", "=ROUNDDOWN(number, num_digits)", "Always rounds DOWN (towards zero)", "=ROUNDDOWN(3.149,2)", "3.14"],
              ["INT", "=INT(number)", "Rounds down to the nearest integer", "=INT(4.9)", "4"],
              ["MOD", "=MOD(number, divisor)", "Returns the remainder of division", "=MOD(10,3)", "1"],
              ["ABS", "=ABS(number)", "Absolute value (removes negative sign)", "=ABS(-150)", "150"],
              ["SQRT", "=SQRT(number)", "Square root", "=SQRT(144)", "12"],
              ["POWER", "=POWER(number, power)", "Raises a number to a power", "=POWER(2,8)", "256"],
              ["SUMPRODUCT", "=SUMPRODUCT(array1, array2, …)", "Multiplies corresponding elements and sums the products", "=SUMPRODUCT(A2:A5,B2:B5)", "Qty × Price totals summed"],
              ["RAND", "=RAND()", "Random decimal between 0 and 1 (volatile — changes on every recalculate)", "=RAND()", "0.43821… (varies)"],
              ["RANDBETWEEN", "=RANDBETWEEN(bottom, top)", "Random integer between two values", "=RANDBETWEEN(1,100)", "Random number 1–100"],
            ]}
          />

          <Sub id="finance-fns">Basic Financial Functions</Sub>
          <Tbl
            headers={["Function", "Syntax", "Purpose"]}
            rows={[
              ["PMT", "=PMT(rate, nper, pv)", "Monthly loan payment — rate=interest rate per period, nper=number of periods, pv=loan amount"],
              ["PV", "=PV(rate, nper, pmt)", "Present Value — the loan amount for given payments"],
              ["FV", "=FV(rate, nper, pmt)", "Future Value of an investment"],
              ["NPV", "=NPV(rate, value1, value2, …)", "Net Present Value — worth of future cash flows today"],
              ["IRR", "=IRR(values)", "Internal Rate of Return — discount rate making NPV = 0"],
            ]}
          />

          <ExampleBox title="Loan Payment Calculation (Kenyan Example)">
            <p className="mb-2">A bank in Kenya offers a KES 500,000 loan at 12% annual interest over 3 years (36 months). Monthly repayment:</p>
            <FormulaBox
              formula="=PMT(12%/12, 36, -500000)"
              result="KES 16,607.15 per month"
              note="Rate per month=12%/12=1%; nper=36 months; PV=negative (money received)"
            />
          </ExampleBox>

          {/* ═══════════════════════════════════════ */}
          <SectionHeading id="sort-filter">12. Sorting and Filtering</SectionHeading>

          <Sub id="sorting">Sorting Data</Sub>
          <ul className="list-disc pl-6 space-y-2 text-sm leading-relaxed">
            <li><strong>Quick sort:</strong> Click any cell in the column to sort by → Data → Sort A to Z (ascending) or Sort Z to A (descending).</li>
            <li><strong>Multi-level sort (Sort dialog):</strong> Data → Sort → Add Level to sort by multiple columns. E.g., sort by Department, then within each department sort by Surname alphabetically.</li>
            <li><strong>Custom sort order:</strong> Data → Sort → Order dropdown → Custom List — e.g., sort months as Jan, Feb, Mar (not alphabetically as Apr, Aug, Dec).</li>
            <li><strong>Sort by cell colour or font colour:</strong> Data → Sort → Sort On → Cell Color / Font Color — useful after using Conditional Formatting.</li>
          </ul>

          <Sub id="filtering">AutoFilter</Sub>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li><strong>Turn on AutoFilter:</strong> Click any cell in the data → Data → Filter (or Ctrl+Shift+L). Dropdown arrows appear on each column header.</li>
            <li><strong>Filter by value:</strong> Click the dropdown → uncheck "Select All" → tick only the values to show.</li>
            <li><strong>Filter by condition:</strong> Dropdown → Text Filters / Number Filters / Date Filters → choose "Greater Than", "Contains", "Between", "Top 10", etc.</li>
            <li><strong>Multiple column filters:</strong> Apply filters on multiple columns — they combine with AND logic.</li>
            <li><strong>Clear filter on one column:</strong> Dropdown → Clear Filter from "[Column Name]".</li>
            <li><strong>Clear all filters:</strong> Data → Clear (or Ctrl+Shift+L to toggle filter off then on).</li>
          </ul>

          <Sub id="advanced-filter">Advanced Filter</Sub>
          <p className="text-sm leading-relaxed">Data → Advanced — allows filtering with a criteria range (a separate area where you write your conditions), and can copy filtered results to another location. Supports OR conditions (conditions on separate rows in the criteria range).</p>

          {/* ═══════════════════════════════════════ */}
          <SectionHeading id="cond-format">13. Conditional Formatting</SectionHeading>
          <ExplainerBox title="What is Conditional Formatting?">
            Conditional Formatting automatically changes the <strong>appearance</strong> of cells (background colour, font colour, icons, data bars) based on their values — without you manually formatting each cell. It makes patterns and outliers visually obvious at a glance.
          </ExplainerBox>

          <Tbl
            headers={["Option", "What It Does", "Practical Example"]}
            rows={[
              ["Highlight Cell Rules", "Format cells greater than, less than, equal to, between, containing specific text, or duplicate values", "Highlight all students who scored below 50 in red"],
              ["Top/Bottom Rules", "Format the top N items, bottom N items, above average, below average", "Highlight the top 10% highest-scoring students in green"],
              ["Data Bars", "Adds a bar inside each cell proportional to the value — like a mini bar chart", "Visualise sales figures across regional branches"],
              ["Color Scales", "Applies a colour gradient across a range (e.g., red = low, yellow = medium, green = high)", "Show exam score distribution from red (fail) to green (excellent)"],
              ["Icon Sets", "Adds icons (traffic lights, arrows, stars, flags) based on value thresholds", "Traffic light: red = overdue, yellow = due soon, green = paid"],
              ["New Rule", "Create a custom rule using a formula", "Format cells where the entire row should highlight if column B = 'Absent'"],
            ]}
          />

          <ExampleBox title="Formula-Based Conditional Formatting">
            To highlight an entire row where a student is absent: Select A2:E31 → Conditional Formatting → New Rule → "Use a formula" → enter:
            <FormulaBox formula='=$D2="Absent"' result="Highlights the entire row if column D says Absent" note="Note the $ before D (absolute column) but not before 2 (relative row)" />
          </ExampleBox>

          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li><strong>Manage Rules:</strong> Home → Conditional Formatting → Manage Rules — see all rules, edit or delete them, change the order (rules applied in order from top to bottom).</li>
            <li><strong>Clear Rules:</strong> Home → Conditional Formatting → Clear Rules → From Selected Cells or From Entire Sheet.</li>
          </ul>

          {/* ═══════════════════════════════════════ */}
          <SectionHeading id="charts">14. Charts and Graphs</SectionHeading>
          <ExplainerBox title="Why Charts?">
            Charts convert raw numbers into visual representations that are easier to understand, compare, and communicate. Excel supports over 20 chart types. The key is choosing the right chart for the data.
          </ExplainerBox>

          <Sub id="chart-types">Chart Types and When to Use Them</Sub>
          <Tbl
            headers={["Chart Type", "Best Used For", "Kenyan Example"]}
            rows={[
              ["Column Chart", "Comparing categories side by side (vertical bars)", "Comparing sales revenue across Nairobi, Mombasa, Kisumu branches"],
              ["Bar Chart", "Like column but horizontal — better for long category names", "Comparing performance of 47 Kenyan counties"],
              ["Line Chart", "Showing trends over time (data points connected by lines)", "Kenya's GDP growth from 2010 to 2026"],
              ["Pie Chart", "Showing parts of a whole (percentages); use only for 5–6 slices max", "Budget allocation for a county government"],
              ["Doughnut Chart", "Like pie but with a hole — can show multiple series", "Comparing two budget years' allocations"],
              ["Area Chart", "Like line but filled — shows volume/magnitude of change over time", "Total rainfall accumulation across months"],
              ["Scatter (XY) Chart", "Showing the relationship between two numerical variables", "Height vs weight of Form 4 students"],
              ["Bubble Chart", "Like scatter but with a third variable shown as bubble size", "Countries: GDP (X), Life expectancy (Y), Population (bubble size)"],
              ["Histogram", "Showing distribution of numerical data in intervals (bins)", "Distribution of students by score ranges (0–10, 11–20, etc.)"],
              ["Box & Whisker", "Showing data distribution with median, quartiles, outliers", "Statistical analysis of exam scores"],
              ["Waterfall", "Showing how a total is built up from positive and negative components", "Revenue breakdown: starting balance, income, expenses, net profit"],
            ]}
          />

          <Sub id="create-chart">Creating and Editing a Chart</Sub>
          <ol className="list-decimal pl-6 space-y-2 text-sm leading-relaxed">
            <li><strong>Select the data</strong> (including column and row headers).</li>
            <li>Insert → Charts → choose the chart type. The chart appears on the current sheet.</li>
            <li>Three new tabs appear: <strong>Chart Design</strong>, <strong>Format</strong> (and in older versions, Layout).</li>
            <li><strong>Chart Design → Add Chart Element:</strong> Add/remove chart title, axis titles, data labels, legend, gridlines, error bars, trendlines.</li>
            <li><strong>Chart Design → Change Chart Type:</strong> Switch between types without losing formatting.</li>
            <li><strong>Chart Design → Switch Row/Column:</strong> Transposes which data series is on the X-axis vs which is grouped.</li>
            <li><strong>Chart Design → Select Data:</strong> Add or remove data series; edit legend entries and axis labels.</li>
            <li><strong>Move a chart to its own sheet:</strong> Chart Design → Move Chart → New Sheet → give it a name. This creates a "Chart Sheet" — a sheet containing only the chart, no cells.</li>
            <li><strong>Format elements:</strong> Double-click any chart element (bar, axis, title, legend) → opens the Format pane on the right for detailed formatting.</li>
          </ol>

          {/* ═══════════════════════════════════════ */}
          <SectionHeading id="pivot">15. Pivot Tables</SectionHeading>
          <ExplainerBox title="What is a Pivot Table?">
            A PivotTable is one of the most powerful Excel features — it allows you to <strong>summarise, reorganise, group, count, total, and average</strong> large datasets in seconds, without writing a single formula. You drag fields (column headers) into areas (Rows, Columns, Values, Filters) to create interactive summaries that can be rearranged instantly.
          </ExplainerBox>

          <Sub id="pivot-create">Creating a Pivot Table</Sub>
          <ol className="list-decimal pl-6 space-y-2 text-sm leading-relaxed">
            <li>Click any cell in your data table (data must have headers in row 1).</li>
            <li>Insert → PivotTable → Select the data range → Choose where to place the PivotTable (new worksheet recommended) → OK.</li>
            <li>The <strong>PivotTable Field List</strong> pane appears on the right showing all column headers as fields.</li>
            <li>Drag fields into the four areas:<br />
              — <strong>Filters:</strong> A field that filters the entire table (like a slicer at the top)<br />
              — <strong>Columns:</strong> Field whose unique values become column headers<br />
              — <strong>Rows:</strong> Field whose unique values become row labels<br />
              — <strong>Values:</strong> Numerical field to be summarised (Sum, Count, Average, Max, Min)
            </li>
            <li>The PivotTable updates immediately when you drag fields.</li>
          </ol>

          <ExampleBox title="Pivot Table: School Exam Analysis">
            Data: Student | Class | Gender | Subject | Score (5,000 rows)<br />
            <br />
            A head teacher drags: <strong>Rows</strong> = Class, <strong>Columns</strong> = Gender, <strong>Values</strong> = Average of Score → Instantly shows the average score for boys and girls in each class — a summary that would take hours with manual formulas.
            <br /><br />
            Then she adds <strong>Filters</strong> = Subject → can now click on "Mathematics" to filter the entire table to show only Maths results.
          </ExampleBox>

          <Sub id="pivot-ops">Key Pivot Table Operations</Sub>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li><strong>Change summary function:</strong> Click the field in Values area → Value Field Settings → choose Sum, Count, Average, Min, Max, Product, etc.</li>
            <li><strong>Show values as:</strong> Value Field Settings → Show Values As → % of Grand Total, % of Column Total, Running Total, Rank, etc.</li>
            <li><strong>Group data:</strong> Right-click a date field in Rows/Columns → Group → group by Year, Quarter, Month. Right-click numbers → Group by intervals.</li>
            <li><strong>Sort/Filter within pivot:</strong> Use the dropdown arrows on row/column labels.</li>
            <li><strong>Slicers:</strong> PivotTable Analyze → Insert Slicer → choose a field — creates clickable filter buttons that are more visual and user-friendly than the filter dropdown.</li>
            <li><strong>Refresh:</strong> If the source data changes, right-click the PivotTable → Refresh (the PivotTable does NOT update automatically).</li>
            <li><strong>PivotChart:</strong> PivotTable Analyze → PivotChart — creates a chart linked to the PivotTable that filters when you change the pivot.</li>
          </ul>

          {/* ═══════════════════════════════════════ */}
          <SectionHeading id="validation">16. Data Validation and Named Ranges</SectionHeading>

          <Sub id="data-validation">Data Validation</Sub>
          <ExplainerBox title="What is Data Validation?">
            Data Validation restricts what users can enter into a cell — preventing invalid data at the point of entry rather than correcting it later. It is found at Data → Data Validation.
          </ExplainerBox>
          <Tbl
            headers={["Validation Type", "Example Setting", "What It Prevents"]}
            rows={[
              ["Whole Number", "Between 0 and 100", "Entering decimals or values outside 0–100 (e.g. in a marks column)"],
              ["Decimal", "Greater than 0", "Entering negative prices"],
              ["List (dropdown)", "Source: Male,Female", "Entering anything other than the options in the dropdown list"],
              ["Date", "Between 01/01/2020 and today", "Entering dates in the future or before the company started"],
              ["Time", "Between 8:00 and 17:00", "Entering times outside working hours"],
              ["Text Length", "Less than or equal to 10", "Entering phone numbers with more/less than 10 digits"],
              ["Custom (formula)", "=COUNTIF(A:A,A1)=1", "Prevents duplicate entries in the column"],
            ]}
          />
          <p className="text-sm leading-relaxed mt-2">Also in the Data Validation dialog: set an <strong>Input Message</strong> (tooltip shown when the cell is selected, guiding the user) and an <strong>Error Alert</strong> (custom error message when invalid data is entered).</p>

          <Sub id="named-ranges">Named Ranges</Sub>
          <p className="text-sm leading-relaxed mb-2">Instead of using cell addresses like <code>A1:A100</code>, you can give a range a meaningful name like <em>StudentScores</em> or <em>TaxRate</em>. Formulas become self-documenting and easier to audit.</p>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li><strong>Create:</strong> Select the range → click the Name Box (shows the cell address) → type the name → Enter.</li>
            <li><strong>Or:</strong> Formulas → Define Name → type the name and select the range.</li>
            <li><strong>Manage all names:</strong> Formulas → Name Manager — view, edit, delete named ranges.</li>
            <li><strong>Use in formulas:</strong> <code>=SUM(StudentScores)</code> instead of <code>=SUM(A2:A101)</code> — much clearer.</li>
            <li><strong>Navigate to a range:</strong> Click the Name Box dropdown → select the name → jumps to that range.</li>
          </ul>

          <Sub id="freeze">Freeze Panes</Sub>
          <p className="text-sm leading-relaxed mb-2">When scrolling through a large spreadsheet, row and column headers scroll off screen. Freeze Panes keeps them visible.</p>
          <Tbl
            headers={["Option", "What It Freezes", "How to Set It"]}
            rows={[
              ["Freeze Top Row", "Row 1 stays visible when scrolling down", "View → Freeze Panes → Freeze Top Row"],
              ["Freeze First Column", "Column A stays visible when scrolling right", "View → Freeze Panes → Freeze First Column"],
              ["Freeze Panes (custom)", "Rows above AND columns left of the selected cell", "Click cell B2 → View → Freeze Panes → Freeze Panes (freezes row 1 and column A)"],
              ["Unfreeze Panes", "Removes all freezes", "View → Freeze Panes → Unfreeze Panes"],
            ]}
          />

          {/* ═══════════════════════════════════════ */}
          <SectionHeading id="print">17. Printing and Page Setup</SectionHeading>

          <Sub id="print-setup">Page Layout Settings</Sub>
          <Tbl
            headers={["Setting", "Location", "Options"]}
            rows={[
              ["Margins", "Page Layout → Margins", "Normal, Wide, Narrow, or Custom (set in cm/inches)"],
              ["Orientation", "Page Layout → Orientation", "Portrait (tall) or Landscape (wide) — use Landscape for wide tables"],
              ["Paper Size", "Page Layout → Size", "A4 (Kenya standard), Letter, A3, etc."],
              ["Print Area", "Page Layout → Print Area → Set Print Area", "Define exactly which cells to print — selected cells only"],
              ["Print Titles", "Page Layout → Print Titles", "Row(s) to repeat at top / Column(s) to repeat at left on every printed page"],
              ["Fit to Page", "Page Layout → Scale to Fit", "Scale down to fit on 1 page wide × 1 page tall (or custom)"],
              ["Gridlines", "Page Layout → Sheet Options → Gridlines Print", "Print the cell gridlines (off by default)"],
              ["Row/Column Headings", "Page Layout → Sheet Options → Headings Print", "Print the A, B, C… and 1, 2, 3… labels"],
              ["Page Breaks", "View → Page Break Preview", "Drag blue lines to adjust where pages break"],
              ["Headers/Footers", "Insert → Header & Footer", "Add document title, date, page numbers to printed pages"],
            ]}
          />

          <Sub id="print-dialog">Printing</Sub>
          <p className="text-sm leading-relaxed">File → Print (Ctrl+P). In the print settings pane: choose printer, number of copies, which pages to print, whether to collate, and fit-to-page scaling. The right side shows a live print preview.</p>

          <NoteBox>
            Always switch to <strong>Page Layout view</strong> (View → Page Layout) or <strong>Page Break Preview</strong> before printing to see exactly how the spreadsheet will look on paper — how many pages it takes and where page breaks fall.
          </NoteBox>

          {/* ═══════════════════════════════════════ */}
          <SectionHeading id="errors">18. Excel Error Messages</SectionHeading>
          <ExplainerBox title="Understanding Errors">
            When a formula cannot compute a result, Excel displays an error value starting with #. Understanding what each error means allows you to fix it quickly. Errors can be caught using <code>=IFERROR()</code>.
          </ExplainerBox>

          <Tbl
            headers={["Error", "Name", "Cause", "Fix"]}
            rows={[
              ["#DIV/0!", "Division by zero", "Formula divides by zero or by an empty cell", "Check divisor is not zero/empty; use IFERROR or IF to handle"],
              ["#VALUE!", "Wrong value type", "Formula expects a number but finds text, or wrong argument type", "Check cell types — ensure numbers aren't stored as text"],
              ["#REF!", "Invalid reference", "A cell referenced in the formula has been deleted or the reference is invalid", "Undo the deletion or update the formula to reference correct cells"],
              ["#NAME?", "Unrecognised name", "Function name misspelled, or a named range doesn't exist, or text not in quotes", 'Check spelling of function; put text in quotes: "text" not just text'],
              ["#N/A", "Value not available", "VLOOKUP/MATCH can't find the lookup value; value doesn't exist", "Check lookup value exists in lookup range; use IFERROR to show 'Not Found'"],
              ["#NUM!", "Invalid number", "Formula contains an invalid numeric value (e.g. SQRT of a negative)", "Check formula arguments are mathematically valid"],
              ["#NULL!", "Null intersection", "Two ranges in the formula don't intersect (space used instead of comma)", "Replace the space with a comma between ranges: SUM(A1:A5,C1:C5)"],
              ["####", "Column too narrow", "Cell is too narrow to display the number or date (not technically an error)", "Double-click the column border to auto-fit width, or drag it wider"],
            ]}
          />

          {/* ═══════════════════════════════════════ */}
          <SectionHeading id="shortcuts">19. Essential Excel Keyboard Shortcuts</SectionHeading>

          <Sub id="nav-shortcuts">Navigation</Sub>
          <div className="space-y-0 rounded-lg border border-border overflow-hidden mb-4">
            <KbdRow keys="Ctrl+Home" action="Go to cell A1 (beginning of worksheet)" />
            <KbdRow keys="Ctrl+End" action="Go to the last used cell (bottom-right of data)" />
            <KbdRow keys="Ctrl+Arrow" action="Jump to the last non-empty cell in the direction of the arrow" />
            <KbdRow keys="Ctrl+G or F5" action="Go To — jump to a specific cell address or named range" />
            <KbdRow keys="Ctrl+PageDown" action="Move to the next worksheet" />
            <KbdRow keys="Ctrl+PageUp" action="Move to the previous worksheet" />
            <KbdRow keys="F5" action="Open Go To dialog" />
          </div>

          <Sub id="select-shortcuts">Selecting</Sub>
          <div className="space-y-0 rounded-lg border border-border overflow-hidden mb-4">
            <KbdRow keys="Ctrl+A" action="Select all cells (press twice if in data region)" />
            <KbdRow keys="Ctrl+Shift+End" action="Extend selection to the last used cell" />
            <KbdRow keys="Ctrl+Shift+Arrow" action="Extend selection to the last non-empty cell" />
            <KbdRow keys="Ctrl+Space" action="Select the entire column of the active cell" />
            <KbdRow keys="Shift+Space" action="Select the entire row of the active cell" />
          </div>

          <Sub id="edit-shortcuts">Editing</Sub>
          <div className="space-y-0 rounded-lg border border-border overflow-hidden mb-4">
            <KbdRow keys="F2" action="Edit the active cell (enter Edit mode)" />
            <KbdRow keys="Esc" action="Cancel cell entry (restore original value)" />
            <KbdRow keys="Delete" action="Clear cell contents (keeps formatting)" />
            <KbdRow keys="Ctrl+Z" action="Undo" />
            <KbdRow keys="Ctrl+Y" action="Redo" />
            <KbdRow keys="Ctrl+C" action="Copy" />
            <KbdRow keys="Ctrl+X" action="Cut" />
            <KbdRow keys="Ctrl+V" action="Paste" />
            <KbdRow keys="Ctrl+D" action="Fill Down (copy top cell of selection to cells below)" />
            <KbdRow keys="Ctrl+R" action="Fill Right (copy leftmost cell of selection to cells right)" />
            <KbdRow keys="Ctrl+;" action="Insert today's date as a static value" />
            <KbdRow keys="Ctrl+Shift+;" action="Insert current time as a static value" />
            <KbdRow keys="Alt+Enter" action="New line within a cell" />
            <KbdRow keys="Ctrl+E" action="Flash Fill" />
          </div>

          <Sub id="format-shortcuts">Formatting</Sub>
          <div className="space-y-0 rounded-lg border border-border overflow-hidden mb-4">
            <KbdRow keys="Ctrl+1" action="Open Format Cells dialog" />
            <KbdRow keys="Ctrl+B" action="Bold" />
            <KbdRow keys="Ctrl+I" action="Italic" />
            <KbdRow keys="Ctrl+U" action="Underline" />
            <KbdRow keys="Ctrl+Shift+$" action="Apply Currency format" />
            <KbdRow keys="Ctrl+Shift+%" action="Apply Percentage format" />
            <KbdRow keys="Ctrl+Shift+#" action="Apply Date format (DD-MMM-YY)" />
            <KbdRow keys="Ctrl+Shift+@" action="Apply Time format" />
            <KbdRow keys="Ctrl+Shift+!" action="Apply Number format (thousands separator, 2 decimals)" />
            <KbdRow keys="Alt+H, H" action="Open fill (background) colour picker" />
          </div>

          <Sub id="formula-shortcuts">Formulas and Functions</Sub>
          <div className="space-y-0 rounded-lg border border-border overflow-hidden mb-4">
            <KbdRow keys="=" action="Start a formula" />
            <KbdRow keys="Alt+=" action="AutoSum — inserts =SUM() for the range above or to the left" />
            <KbdRow keys="F4" action="Toggle absolute/relative reference while editing a cell reference" />
            <KbdRow keys="Ctrl+`" action="Toggle between showing formulas and showing values in all cells" />
            <KbdRow keys="Ctrl+Shift+Enter" action="Enter an array formula (legacy — in modern Excel use regular Enter)" />
            <KbdRow keys="F9" action="Evaluate/calculate the selected part of a formula" />
            <KbdRow keys="Shift+F3" action="Open Insert Function dialog (search for a function)" />
          </div>

          <Sub id="workbook-shortcuts">Workbook and File</Sub>
          <div className="space-y-0 rounded-lg border border-border overflow-hidden mb-4">
            <KbdRow keys="Ctrl+N" action="New workbook" />
            <KbdRow keys="Ctrl+O" action="Open workbook" />
            <KbdRow keys="Ctrl+S" action="Save workbook" />
            <KbdRow keys="F12" action="Save As" />
            <KbdRow keys="Ctrl+W" action="Close workbook" />
            <KbdRow keys="Ctrl+P" action="Print" />
            <KbdRow keys="Ctrl+F" action="Find" />
            <KbdRow keys="Ctrl+H" action="Find and Replace" />
            <KbdRow keys="Ctrl+Shift+L" action="Toggle AutoFilter on/off" />
          </div>

          <NoteBox>
            <strong>CAT exam tip:</strong> Know the difference between COUNT (numbers only), COUNTA (all non-blank), and COUNTBLANK. Know when to use VLOOKUP vs INDEX/MATCH. Be able to construct an IF formula with AND/OR conditions from a written scenario. Practice interpreting error messages — a common exam question is "What does #VALUE! mean and how do you fix it?"
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
