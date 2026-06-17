import React, { createContext, useContext, useReducer, useCallback, useEffect, type ReactNode } from "react";

export type AutoTaskStatus = "running" | "nonScheduled" | "paused" | "expired";
export type AutoTaskFilter = "all" | "running" | "nonScheduled" | "paused" | "expired";
export type AutoTaskScheduleType = "nonScheduled" | "once" | "interval" | "daily" | "weekly";

export type AutoTask = {
  id: string; name: string; description: string;
  scheduleType: AutoTaskScheduleType; status: AutoTaskStatus;
  date?: string; time?: string; createdAt: number; updatedAt: number;
};

type State = {
  autoTasks: AutoTask[]; activeTaskId: string | null;
  autoTaskFilter: AutoTaskFilter; autoTaskSearch: string;
  autoTaskSearchOpen: boolean; createTaskModalOpen: boolean;
};

const LS_KEY = "marvis.autoTasks";

function loadTasks(): AutoTask[] {
  try { const r = localStorage.getItem(LS_KEY); if (!r) return defaultTasks(); return JSON.parse(r) || defaultTasks(); }
  catch { return defaultTasks(); }
}
function defaultTasks(): AutoTask[] {
  return [{ id: "d001", name: "闹钟", description: "提醒我完成任务", scheduleType: "once", status: "expired", date: "2026-06-16", time: "14:11", createdAt: Date.now()-864e5, updatedAt: Date.now()-864e5 }];
}
function saveTasks(ts: AutoTask[]) { try { localStorage.setItem(LS_KEY, JSON.stringify(ts)); } catch {} }

let aid = Date.now(); function gid(): string { return String(++aid); }

function compute(s: AutoTaskScheduleType, d?: string, t?: string): AutoTaskStatus {
  if (s === "nonScheduled") return "nonScheduled";
  if (s === "once" && d && t) return new Date(d+"T"+t+":00").getTime() < Date.now() ? "expired" : "running";
  return "running";
}

const init: State = { autoTasks: loadTasks(), activeTaskId: null, autoTaskFilter: "all", autoTaskSearch: "", autoTaskSearchOpen: false, createTaskModalOpen: false };

type Action =
  | { type: "SF"; filter: AutoTaskFilter } | { type: "SS"; query: string } | { type: "TS" } | { type: "OCM" } | { type: "CCM" }
  | { type: "CAT"; task: Omit<AutoTask, "id"|"createdAt"|"updatedAt"> } | { type: "DAT"; id: string } | { type: "VAT"; id: string } | { type: "GAT" };

function reducer(s: State, a: Action): State {
  switch (a.type) {
    case "SF": return { ...s, autoTaskFilter: a.filter };
    case "SS": return { ...s, autoTaskSearch: a.query };
    case "TS": return { ...s, autoTaskSearchOpen: !s.autoTaskSearchOpen, autoTaskSearch: "" };
    case "OCM": return { ...s, createTaskModalOpen: true };
    case "CCM": return { ...s, createTaskModalOpen: false };
    case "CAT": {
      const n = Date.now(); const t: AutoTask = { ...a.task, id: gid(), createdAt: n, updatedAt: n, status: compute(a.task.scheduleType, a.task.date, a.task.time) };
      const ts = [t, ...s.autoTasks]; saveTasks(ts); return { ...s, autoTasks: ts, createTaskModalOpen: false };
    }
    case "DAT": { const ts = s.autoTasks.filter((t) => t.id !== a.id); saveTasks(ts); return { ...s, autoTasks: ts, activeTaskId: s.activeTaskId === a.id ? null : s.activeTaskId }; }
    case "VAT": return { ...s, activeTaskId: a.id };
    case "GAT": return { ...s, activeTaskId: null };
    default: return s;
  }
}

interface CtxVal {
  state: State; activeTask: AutoTask | null; filteredTasks: AutoTask[];
  setAutoTaskFilter: (f: AutoTaskFilter) => void; setAutoTaskSearch: (q: string) => void; toggleAutoTaskSearch: () => void;
  openCreateTaskModal: () => void; closeCreateTaskModal: () => void; createAutoTask: (t: Omit<AutoTask, "id"|"createdAt"|"updatedAt">) => void;
  deleteAutoTask: (id: string) => void; viewAutoTask: (id: string) => void; goAutoTasks: () => void;
}
const ACtx = createContext<CtxVal | null>(null);

export function AutoTaskProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, init);
  useEffect(() => { saveTasks(state.autoTasks); }, [state.autoTasks]);
  const setAutoTaskFilter = useCallback((f: AutoTaskFilter) => dispatch({ type: "SF", filter: f }), []);
  const setAutoTaskSearch = useCallback((q: string) => dispatch({ type: "SS", query: q }), []);
  const toggleAutoTaskSearch = useCallback(() => dispatch({ type: "TS" }), []);
  const openCreateTaskModal = useCallback(() => dispatch({ type: "OCM" }), []);
  const closeCreateTaskModal = useCallback(() => dispatch({ type: "CCM" }), []);
  const createAutoTask = useCallback((t: Omit<AutoTask, "id"|"createdAt"|"updatedAt">) => dispatch({ type: "CAT", task: t }), []);
  const deleteAutoTask = useCallback((id: string) => dispatch({ type: "DAT", id }), []);
  const viewAutoTask = useCallback((id: string) => dispatch({ type: "VAT", id }), []);
  const goAutoTasks = useCallback(() => dispatch({ type: "GAT" }), []);
  const activeTask = state.autoTasks.find((t) => t.id === state.activeTaskId) ?? null;
  const filteredTasks = state.autoTasks.filter((t) => {
    if (state.autoTaskFilter !== "all" && t.status !== state.autoTaskFilter) return false;
    if (state.autoTaskSearch) {
      const q = state.autoTaskSearch.toLowerCase();
      return t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q);
    }
    return true;
  });
  return <ACtx.Provider value={{ state, activeTask, filteredTasks, setAutoTaskFilter, setAutoTaskSearch, toggleAutoTaskSearch, openCreateTaskModal, closeCreateTaskModal, createAutoTask, deleteAutoTask, viewAutoTask, goAutoTasks }}>{children}</ACtx.Provider>;
}

export function useAutoTask(): CtxVal { const c = useContext(ACtx); if (!c) throw new Error("useAutoTask requires AutoTaskProvider"); return c; }
