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

function getAvatarColor(name: string): string {
  const colors = [
    "from-indigo-500 to-violet-500",
    "from-violet-500 to-purple-500",
    "from-emerald-500 to-teal-500",
    "from-pink-500 to-rose-500",
    "from-orange-500 to-amber-500",
    "from-cyan-500 to-blue-500",
  ];
  const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
}

export function ActivityFeed({ data }: ActivityFeedProps) {
  const { title, items } = data;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ul className="divide-y divide-white/[0.04]">
          {items.map((item: ActivityItem, idx: number) => (
            <li
              key={item.id}
              className={cn(
                "flex items-start gap-3 px-6 py-3.5 transition-colors hover:bg-white/[0.02]",
                idx === 0 && "pt-1"
              )}
            >
              {/* Avatar */}
              <div
                className={cn(
                  "flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br flex items-center justify-center text-xs font-bold text-white shadow-lg",
                  getAvatarColor(item.user)
                )}
              >
                {getInitials(item.user)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-zinc-300 leading-snug">
                  <span className="font-medium text-zinc-100">{item.user}</span>
                  <span className="text-zinc-400"> {item.action} </span>
                  <span className="font-medium text-violet-300">{item.target}</span>
                </p>
                <p className="text-xs text-zinc-500 mt-0.5">{item.time}</p>
              </div>
            </li>
          ))}
          {items.length === 0 && (
            <li className="px-6 py-8 text-center text-sm text-zinc-500">No activity yet</li>
          )}
        </ul>
      </CardContent>
    </Card>
  );
}
