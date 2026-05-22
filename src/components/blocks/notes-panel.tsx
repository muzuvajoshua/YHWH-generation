import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NotesPanelData } from "@/types";
import { cn } from "@/lib/utils";
import { FileText } from "lucide-react";

interface NotesPanelProps {
  data: NotesPanelData;
}

function renderMarkdownLine(line: string, idx: number): React.ReactNode {
  // Heading 1
  if (line.startsWith("# ")) {
    return (
      <h1 key={idx} className="text-lg font-bold text-zinc-100 mt-3 mb-1 first:mt-0">
        {line.slice(2)}
      </h1>
    );
  }
  // Heading 2
  if (line.startsWith("## ")) {
    return (
      <h2 key={idx} className="text-base font-semibold text-zinc-200 mt-3 mb-1 first:mt-0">
        {line.slice(3)}
      </h2>
    );
  }
  // Heading 3
  if (line.startsWith("### ")) {
    return (
      <h3 key={idx} className="text-sm font-semibold text-zinc-300 mt-2 mb-0.5 first:mt-0">
        {line.slice(4)}
      </h3>
    );
  }
  // Unordered list item
  if (line.startsWith("- ") || line.startsWith("* ")) {
    return (
      <li key={idx} className="flex items-start gap-2 text-sm text-zinc-400 ml-2">
        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-500/60 flex-shrink-0" />
        <span>{renderInline(line.slice(2))}</span>
      </li>
    );
  }
  // Ordered list item
  if (/^\d+\. /.test(line)) {
    const match = line.match(/^(\d+)\. (.*)/);
    if (match) {
      return (
        <li key={idx} className="flex items-start gap-2 text-sm text-zinc-400 ml-2">
          <span className="text-violet-400 font-mono text-xs mt-0.5 flex-shrink-0">{match[1]}.</span>
          <span>{renderInline(match[2])}</span>
        </li>
      );
    }
  }
  // Horizontal rule
  if (line === "---" || line === "***") {
    return <hr key={idx} className="border-white/10 my-3" />;
  }
  // Blockquote
  if (line.startsWith("> ")) {
    return (
      <blockquote key={idx} className="border-l-2 border-violet-500/40 pl-3 text-sm text-zinc-400 italic my-1">
        {line.slice(2)}
      </blockquote>
    );
  }
  // Empty line
  if (line.trim() === "") {
    return <div key={idx} className="h-2" />;
  }
  // Regular paragraph
  return (
    <p key={idx} className="text-sm text-zinc-300 leading-relaxed">
      {renderInline(line)}
    </p>
  );
}

function renderInline(text: string): React.ReactNode {
  // Handle bold and italic with a simple split approach
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold text-zinc-100">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={i} className="italic text-zinc-300">{part.slice(1, -1)}</em>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="px-1.5 py-0.5 rounded-md bg-white/[0.08] text-violet-300 text-xs font-mono">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

export function NotesPanel({ data }: NotesPanelProps) {
  const { title, content } = data;
  const lines = content.split("\n");

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-zinc-800 border border-white/5">
            <FileText className="w-4 h-4 text-zinc-400" />
          </div>
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className={cn("space-y-1 prose-sm")}>
          {lines.map((line: string, idx: number) => renderMarkdownLine(line, idx))}
        </div>
      </CardContent>
    </Card>
  );
}
