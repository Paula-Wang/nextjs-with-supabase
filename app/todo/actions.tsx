"use server";
import { TodoProps } from "@/types";
import { AddTodoProps } from "@/types";
import { createClient } from "@/utils/supabase/server";

const supabase = createClient();

export async function readTodo() {
  let { data: TODO, error } = await supabase.from("TODO").select("*");
  return TODO;
}

export async function addTodo({ task, completed, priority }: AddTodoProps) {
  const { data, error } = await supabase
    .from("TODO")
    .insert([{ task: task, completed: completed, priority: priority }])
    .select();

  return data;
}

export async function UpdateTodo(
  id: number,
  task: string,
  completed: boolean,
  priority: number
) {
  const { data, error } = await supabase
    .from("TODO")
    .update({ task: task, completed: completed, priority: priority })
    .eq("id", id)
    .select();
}

export async function DeleteTodo(id: number) {
  const { error } = await supabase.from("TODO").delete().eq("id", id);
}
