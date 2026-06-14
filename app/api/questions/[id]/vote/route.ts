import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: questionId } = await params;

  const payload = await req.json();
  const voterId = payload?.voterId
    ? String(payload.voterId)
    : "";

  if (!voterId) {
    return NextResponse.json(
      { error: "Missing voterId" },
      { status: 400 }
    );
  }

  // Get current vote count
  const { data: question, error: fetchError } = await supabase
    .from("questions")
    .select("vote_count")
    .eq("poll_id", questionId)
    .single();

  if (fetchError) {
    return NextResponse.json(
      { error: fetchError.message },
      { status: 500 }
    );
  }

  const newVoteCount = (question?.vote_count ?? 0) + 1;

  // Update vote count
  const { error: updateError } = await supabase
    .from("questions")
    .update({ vote_count: newVoteCount })
    .eq("poll_id", questionId);

  if (updateError) {
    return NextResponse.json(
      { error: updateError.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    votes: newVoteCount,
  });
}