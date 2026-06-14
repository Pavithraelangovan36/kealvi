import QuestionsList from "./questions-list";
import { getQuestionsPage } from "@/lib/questions";

export const dynamic = "force-dynamic";

export default async function Page() {
  const { questions } = await getQuestionsPage(0, 10);

  console.log("Questions from DB:", questions);

  return (
    <main className="mx-auto w-full max-w-2xl px-5 py-10">
      <h1 className="text-3xl font-bold mb-4">
        Live Q&A
      </h1>

      <QuestionsList initialQuestions={questions} />
    </main>
  );
}