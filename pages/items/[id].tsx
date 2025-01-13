import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import Header from "@/components/common/Header";
import {
  deleteComment,
  deleteProduct,
  fetchInquiryById,
  fetchProductById,
  postComment,
} from "@/pages/api/productApi";
import DetailProduct from "@/components/detail/DetailProduct";
import PrimaryButton from "@/components/common/PrimaryButton";
import DetailInquiry from "@/components/detail/DetailInquiry";
import InquiryEmpty from "@/components/detail/InquiryEmpty";
import Link from "next/link";
import { useRouter } from "next/router";
import BackIcon from "@/components/Icons/BackIcon";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

interface InputState {
  name: string;
  description: string;
  images: string[];
  price: number;
  favoriteCount: number;
  tags: string[];
  ownerNickname: string;
  updatedAt: string;
}

interface InquiryInterface {
  writer: {
    image: string;
    nickname: string;
    id: number;
  };
  updatedAt: string;
  createdAt: string;
  content: string;
  id: number;
}

interface CommentInterface {
  list: InquiryInterface[];
  nextCursor: string | null;
}

const INITIAL_DETAILS: InputState = {
  name: "",
  description: "",
  images: [],
  price: 0,
  favoriteCount: 0,
  tags: [],
  ownerNickname: "",
  updatedAt: "",
};

const INITIAL_COMMENTS: CommentInterface = { list: [], nextCursor: null };

function Detail() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id } = router.query;
  const productId = Array.isArray(id) ? id[0] : id;
  const [newComment, setNewComment] = useState("");
  const endRef = useRef(null); // infinity scroll 구현을 위한 endPoint를 할당할 Ref

  const { data: product, isLoading: productLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProductById(productId!),
    enabled: !!productId,
  });

  // 댓글 정보 (무한 스크롤)
  const {
    data: commentsData,
    fetchNextPage,
    hasNextPage,
    isLoading: commentsLoading,
    isFetchingNextPage,
  } = useInfiniteQuery<CommentInterface>({
    queryKey: ["inquiries", productId],
    queryFn: ({ pageParam }) =>
      fetchInquiryById(productId!, pageParam as string),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? null,
    enabled: !!productId,
  });

  // 댓글 추가 핸들러
  const addCommentMutation = useMutation({
    mutationFn: (newComment: string) =>
      postComment(productId!, { content: newComment }),
    onSuccess: () => {
      setNewComment("");
      if (productId) {
        queryClient.invalidateQueries({ queryKey: ["inquiries", productId] });
      }
    },
    onError: (error) => {
      console.error("댓글 추가 실패:", error);
    },
  });

  const deleteProductHandler = async (id: string) => {
    try {
      const response = await deleteProduct(id);

      if (response.ok) {
        queryClient.invalidateQueries({
          queryKey: ["products"],
          exact: false, // 모든 "products"로 시작하는 쿼리를 무효화
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateCommentHandler = () => {
    queryClient.invalidateQueries({ queryKey: ["inquiries", productId] });
  };

  const deleteCommentHandler = async (id: string) => {
    try {
      await deleteComment(id);
      queryClient.invalidateQueries({ queryKey: ["inquiries", productId] });
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * 댓글 추가 핸들러
   * @param {*} e
   */
  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (!productId) {
        throw new Error("Id is null");
      }
      addCommentMutation.mutate(newComment);
    },
    [productId, newComment, addCommentMutation]
  );

  // IntersectionObserver를 사용한 무한 스크롤 처리
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      {
        rootMargin: "100px",
      }
    );

    const current = endRef.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (!productId) return null;

  return (
    <>
      <Header />
      <div className='page-detail'>
        {productLoading ? (
          <p>Loading...</p>
        ) : (
          <DetailProduct {...product} onDelete={deleteProductHandler} />
        )}
        <div className='product-inquiry-wrap'>
          <form onSubmit={handleSubmit}>
            <label htmlFor='input_inquiry'>문의하기</label>
            <textarea
              id='input_inquiry'
              value={newComment}
              placeholder='개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.'
              onChange={({ target }) => setNewComment(target.value)}
            />
            <PrimaryButton type='submit' name='btn-add' disabled={!newComment}>
              등록
            </PrimaryButton>
          </form>
          {commentsLoading ? (
            <p>Loading...</p>
          ) : commentsData?.pages[0]?.list.length ? (
            commentsData.pages.map((page) =>
              page.list.map(({ id, content, writer, updatedAt }) => (
                <DetailInquiry
                  key={id}
                  id={id.toString()}
                  content={content}
                  writer={writer}
                  updatedAt={updatedAt}
                  onUpdate={updateCommentHandler}
                  onDelete={deleteCommentHandler}
                />
              ))
            )
          ) : (
            <InquiryEmpty />
          )}
        </div>
        {hasNextPage && !isFetchingNextPage && (
          <div ref={endRef} style={{ height: "20px" }} />
        )}
        <Link href='/items' className='navigate-to-items'>
          목록으로 돌아가기
          <span>
            <BackIcon />
          </span>
        </Link>
      </div>
    </>
  );
}

export default Detail;
