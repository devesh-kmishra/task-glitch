import { Task } from "@/types";

export function toCSV(tasks: ReadonlyArray<Task>): string {
  const headers = [
    "id",
    "title",
    "revenue",
    "timeTaken",
    "priority",
    "status",
    "notes",
  ];
  const rows = tasks.map((t) => [
    t.id,
    escapeCsv(t.title),
    String(t.revenue),
    String(t.timeTaken),
    t.priority,
    t.status,
    escapeCsv(t.notes ?? ""),
  ]);
  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
}

function escapeCsv(value: string): string {
  if (value == null) return "";
  const escaped = value.replace(/"/g, '""');
  if (/[",\n]/.test(escaped)) {
    return `"${escaped}"`;
  }
  return escaped;
}

export function downloadCSV(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
