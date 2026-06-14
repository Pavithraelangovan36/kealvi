import { supabase } from "@/lib/supabase";

export async function getQuestionsPage(offset: number, limit: number) {
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .order("created_at", { ascending: false })
    .range(offset, offset + limit);

  if (error) {
    console.error("Supabase Error:", error);
    throw new Error(error.message);
  }

  const rows = (data ?? []).map((q: any) => ({
    id: q.poll_id,
    body: q.question,
    author: q.created_by,
    votes: q.vote_count ?? 0,
  }));

  const hasMore = (data?.length ?? 0) > limit;

  return {
    questions: rows.slice(0, limit),
    hasMore,
  };
}

export async function searchQuestions(searchText: string, limit: number) {
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .ilike("question", `%${searchText}%`)
    .limit(limit);

  if (error) {
    console.error("Supabase Error:", error);
    throw new Error(error.message);
  }

  return (data ?? []).map((row: any) => ({
    id: row.poll_id,
    body: row.question,
    author: row.created_by,
    votes: row.vote_count ?? 0,
  }));
}