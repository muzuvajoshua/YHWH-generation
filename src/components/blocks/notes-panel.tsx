import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NotesPanelData } from "@/types";
import { FileText } from "lucide-react";

interface NotesPanelProps {
  data: NotesPanelData;
}

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-zinc-100">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={i} className="italic text-zinc-200">
          {part.slice(1, -1)}
        </em>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className="px-1.5 py-0.5 rounded bg-white/[0.06] text-violet-300 text-[12px] font-mono"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

function renderMarkdownLine(line: string, idx: number): React.ReactNode {
  if (line.startsWith("# ")) {
    return (
      <h1
        key={idx}
        className="text-[15px] font-semibold tracking-tight text-zinc-100 mt-4 mb-1 first:mt-0"
      >
        {line.slice(2)}
      </h1>
    );
  }
  if (line.startsWith("## ")) {
    return (
      <h2
        key={idx}
        className="text-[14px] font-semibold tracking-tight text-zinc-200 mt-3 mb-1 first:mt-0"
      >
        {line.slice(3)}
      </h2>
    );
  }
  if (line.startsWith("### ")) {
    return (
      <h3
        key={idx}
        className="text-[13px] font-semibold text-zinc-300 mt-2 mb-0.5 first:mt-0"
      >
        {line.slice(4)}
      </h3>
    );
  }
  if (line.startsWith("- ") || line.startsWith("* ")) {
    return (
      <li
        key={idx}
        className="flex items-start gap-2 text-[13px] text-zinc-400 ml-1"
      >
        <span className="mt-2 w-1 h-1 rounded-full bg-violet-400/70 shrink-0" />
        <span className="leading-relaxed">{renderInline(line.slice(2))}</span>
      </li>
    );
  }
  if (/^\d+\. /.test(line)) {
    const match = line.match(/^(\d+)\. (.*)/);
    if (match) {
      return (
        <li
          key={idx}
          className="flex items-start gap-2 text-[13px] text-zinc-400 ml-1"
        >
          <span className="text-violet-300 font-mono text-[11px] mt-0.5 shrink-0">
            {match[1]}.
          </span>
          <span className="leading-relaxed">{renderInline(match[2])}</span>
        </li>
      );
    }
  }
  if (line === "---" || line === "***") {
    return <hr key={idx} className="border-white/[0.08] my-3" />;
  }
  if (line.startsWith("> ")) {
    return (
      <blockquote
        key={idx}
        className="border-l-2 border-violet-500/40 pl-3 text-[13px] text-zinc-400 italic my-1"
      >
        {line.slice(2)}
      </blockquote>
    );
  }
  if (line.trim() === "") {
    return <div key={idx} className="h-2" />;
  }
  return (
    <p key={idx} className="text-[13px] text-zinc-300 leading-relaxed">
      {renderInline(line)}
    </p>
  );
}

export function NotesPanel({ data }: NotesPanelProps) {
  const { title, content } = data;
  const lines = content.split("\n");

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-md border border-white/[0.08] bg-white/[0.03] text-zinc-400 shrink-0">
            <FileText className="h-3.5 w-3.5" />
          </span>
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {lines.map((line: string, idx: number) => renderMarkdownLine(line, idx))}
        </div>
      </CardContent>
    </Card>
  );
}
