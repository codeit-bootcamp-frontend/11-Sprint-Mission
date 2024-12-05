export async function getArticleDetail(articleId: number) {  
  try {
    const response = await fetch(`https://panda-market-api.vercel.app/articles/${articleId}`);

    if (!response.ok) throw new Error(`error: ${response.status}`);
    
    const body = await response.json();

    return body;
  } catch (e) {
    console.error("error:", e);
    throw e;
  }
}

export async function getArticleComment({ articleId, limit = 10, }: { articleId: number; limit?: number;}) {
  const params = { limit: String(limit), };

  try {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`https://panda-market-api.vercel.app/articles/${articleId}/comments?${query}`);

    if (!response.ok) throw new Error(`error: ${response.status}`);

    const body = await response.json();

    return body;
  } catch (e) {
    console.error("Failed to fetch article comments:", e);
    throw e;
  }
}
