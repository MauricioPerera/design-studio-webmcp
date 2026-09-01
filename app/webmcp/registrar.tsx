"use client";
import { useEffect } from "react";
import { registerTools } from "@nekuda/webmcp-sdk";
import { createEditorTools, type EditorController } from "./tools";
export function WebmcpRegistrar({ editor }: { editor: EditorController }) { useEffect(() => { const registration = registerTools(createEditorTools(editor)); return () => registration.unregister(); }, [editor]); return null; }
