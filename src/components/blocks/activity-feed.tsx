import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ActivityFeedData, ActivityItem } from "@/types";
import { cn } from "@/lib/utils";

interface ActivityFeedProps {
  data: ActivityFeedData;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getAvatarTone(name: string): string {
  const tones = [
    "bg-violet-500/20 text-violet-200 ring-violet-500/30",
    "bg-emerald-500/20 text-emerald-200 ring-emerald-500/30",
    "bg-sky-500/20 text-sky-200 ring-sky-500/30",
    "bg-amber-500/20 text-amber-200 ring-amber-500/30",
    "bg-pink-500/20 text-pink-200 ring-pink-500/30",
    "bg-indigo-500/20 text-indigo-200 ring-indigo-500/30",
  ];
  const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return tones[hash % tones.length];
}

export function ActivityFeed({ data }: ActivityFeedProps) {
  const { title, items } = data;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-0 pb-2">
        <ul>
          {items.map((item: ActivityItem) => (
            <li
              key={item.id}
              className="group/row flex items-start gap-3 px-5 py-2.5 transition-colors hover:bg-white/[0.02]"
            >
              <span
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10.5px] font-semibold ring-1 ring-inset",
                  getAvatarTone(item.user)
                )}
              >
                {getInitials(item.user)}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] leading-snug text-zinc-300">
                  <span className="font-medium text-zinc-100">{item.user}</span>
                  <span className="text-zinc-500"> {item.action} </span>
                  <span className="font-medium text-violet-200">{item.target}</span>
                </p>
                <p className="text-[11px] text-zinc-500 mt-0.5 numeric">{item.time}</p>
              </div>
            </li>
          ))}
          {items.length === 0 && (
            <li className="px-5 py-8 text-center text-[13px] text-zinc-500">
              No activity yet
            </li>
          )}
        </ul>
      </CardContent>
    </Card>
  );
}
