import React, { createContext, useContext, useReducer, useCallback, useEffect, type ReactNode } from "react";

export type PageMode = "home" | "chat" | "autoTasks" | "skillMarket";
export type AppPage = "home" | "chat" | "autoTasks" | "taskDetail" | "skillMarket";

export type Message = { id: string; role: "user" | "assistant"; content: string; createdAt: number; };
export type Conversation = { id: string; title: string; group: string; pinned: boolean; createdAt: number; updatedAt: number; messages: Message[]; };
export type WorkPanelTab = "log" | "outputs" | "preview";

type State = { pageMode: PageMode; conversations: Conversation[]; currentConversationId: string | null; rightPanelOpen: boolean; activeWorkPanelTab: WorkPanelTab; };

const LS_KEY = "marvis.conversations";
function loadConversations(): Conversation[] { try { const r = localStorage.getItem(LS_KEY); if (!r) return []; return JSON.parse(r); } catch { return []; } }
function saveConversations(cs: Conversation[]) { try { localStorage.setItem(LS_KEY, JSON.stringify(cs)); } catch {} }

const init: State = { pageMode: "home", conversations: loadConversations(), currentConversationId: null, rightPanelOpen: true, activeWorkPanelTab: "log" };

type Action =
  | { type: "GO_HOME" } | { type: "GO_AUTO_TASKS" } | { type: "GO_SKILL_MARKET" }
  | { type: "CREATE_CONVERSATION"; firstMessage: string } | { type: "SELECT_CONVERSATION"; id: string }
  | { type: "SEND_MESSAGE"; content: string } | { type: "PIN_CONVERSATION"; id: string }
  | { type: "RENAME_CONVERSATION"; id: string; title: string } | { type: "DELETE_CONVERSATION"; id: string }
  | { type: "TOGGLE_RIGHT_PANEL" } | { type: "SET_WORK_PANEL_TAB"; tab: WorkPanelTab };

let nid = Date.now(); function gid(): string { return String(++nid); }
function mkr(): Message { const r = ["老板好呀，今天有什么想让我帮忙的事？文件整理、搜资料、打开应用，随时招呼我~", "收到，我先帮你整理一下这个任务。当前是前端 mock 回复，后续可以接入真实 Agent。"]; return { id: gid(), role: "assistant", content: r[Math.floor(Math.random()*r.length)], createdAt: Date.now() }; }

function reducer(s: State, a: Action): State {
  switch (a.type) {
    case "GO_HOME": return { ...s, pageMode: "home", currentConversationId: null };
    case "GO_AUTO_TASKS": return { ...s, pageMode: "autoTasks", currentConversationId: null };
    case "GO_SKILL_MARKET": return { ...s, pageMode: "skillMarket", currentConversationId: null };
    case "CREATE_CONVERSATION": {
      const t = a.firstMessage.trim().slice(0,16)+(a.firstMessage.trim().length>16?"...":"");
      const cv: Conversation = { id: gid(), title: t, group: "办公室", pinned: false, createdAt: Date.now(), updatedAt: Date.now(), messages: [{ id: gid(), role: "user", content: a.firstMessage.trim(), createdAt: Date.now() }, mkr()] };
      const cs = [cv, ...s.conversations]; saveConversations(cs);
      return { ...s, pageMode: "chat", conversations: cs, currentConversationId: cv.id };
    }
    case "SELECT_CONVERSATION": return { ...s, pageMode: "chat", currentConversationId: a.id };
    case "SEND_MESSAGE": {
      const i = s.conversations.findIndex((c)=>c.id===s.currentConversationId); if (i===-1) return s;
      const cv = s.conversations[i]; const um: Message = { id: gid(), role: "user", content: a.content.trim(), createdAt: Date.now() };
      const up = { ...cv, updatedAt: Date.now(), messages: [...cv.messages, um, mkr()] };
      const cs = [...s.conversations]; cs[i]=up; saveConversations(cs);
      return { ...s, conversations: cs };
    }
    case "PIN_CONVERSATION": { const cs = s.conversations.map((c)=>c.id===a.id?{...c,pinned:!c.pinned}:c); saveConversations(cs); return { ...s, conversations: cs }; }
    case "RENAME_CONVERSATION": { const nt = a.title.trim()||"未命名"; const cs = s.conversations.map((c)=>c.id===a.id?{...c,title:nt}:c); saveConversations(cs); return { ...s, conversations: cs }; }
    case "DELETE_CONVERSATION": {
      let cs = s.conversations.filter((c)=>c.id!==a.id); saveConversations(cs);
      if (s.currentConversationId===a.id) { if (cs.length>0) return { ...s, conversations: cs, currentConversationId: cs[0].id, pageMode: "chat" }; return { ...s, conversations: cs, currentConversationId: null, pageMode: "home" }; }
      return { ...s, conversations: cs };
    }
    case "TOGGLE_RIGHT_PANEL": return { ...s, rightPanelOpen: !s.rightPanelOpen };
    case "SET_WORK_PANEL_TAB": return { ...s, activeWorkPanelTab: a.tab };
    default: return s;
  }
}

interface CtxVal { state: State; goHome: ()=>void; goAutoTasks: ()=>void; goSkillMarket: ()=>void; createConversation: (fm:string)=>void; selectConversation: (id:string)=>void; sendMessage: (ct:string)=>void; pinConversation: (id:string)=>void; renameConversation: (id:string,t:string)=>void; deleteConversation: (id:string)=>void; toggleRightPanel: ()=>void; setWorkPanelTab: (t:WorkPanelTab)=>void; currentConversation: Conversation|null; }
const Ctx = createContext<CtxVal|null>(null);

export function ConversationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, init);
  useEffect(()=>{ saveConversations(state.conversations); }, [state.conversations]);
  const goHome = useCallback(()=>dispatch({type:"GO_HOME"}),[]);
  const goAutoTasks = useCallback(()=>dispatch({type:"GO_AUTO_TASKS"}),[]);
  const goSkillMarket = useCallback(()=>dispatch({type:"GO_SKILL_MARKET"}),[]);
  const createConversation = useCallback((fm:string)=>dispatch({type:"CREATE_CONVERSATION",firstMessage:fm}),[]);
  const selectConversation = useCallback((id:string)=>dispatch({type:"SELECT_CONVERSATION",id}),[]);
  const sendMessage = useCallback((ct:string)=>dispatch({type:"SEND_MESSAGE",content:ct}),[]);
  const pinConversation = useCallback((id:string)=>dispatch({type:"PIN_CONVERSATION",id}),[]);
  const renameConversation = useCallback((id:string,t:string)=>dispatch({type:"RENAME_CONVERSATION",id,title:t}),[]);
  const deleteConversation = useCallback((id:string)=>dispatch({type:"DELETE_CONVERSATION",id}),[]);
  const toggleRightPanel = useCallback(()=>dispatch({type:"TOGGLE_RIGHT_PANEL"}),[]);
  const setWorkPanelTab = useCallback((t:WorkPanelTab)=>dispatch({type:"SET_WORK_PANEL_TAB",tab:t}),[]);
  const currentConversation = state.conversations.find((c)=>c.id===state.currentConversationId)??null;
  return <Ctx.Provider value={{state,goHome,goAutoTasks,goSkillMarket,createConversation,selectConversation,sendMessage,pinConversation,renameConversation,deleteConversation,toggleRightPanel,setWorkPanelTab,currentConversation}}>{children}</Ctx.Provider>;
}

export function useConversation(): CtxVal { const c = useContext(Ctx); if (!c) throw new Error("useConversation must be used within ConversationProvider"); return c; }
