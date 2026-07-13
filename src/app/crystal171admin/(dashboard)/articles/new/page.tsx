import ArticleForm from "../ArticleForm";
import { createArticle } from "../actions";

export default function NewArticlePage() {
  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-foreground">Add Article</h1>
      <ArticleForm action={createArticle} />
    </div>
  );
}
