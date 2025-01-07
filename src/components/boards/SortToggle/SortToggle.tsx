import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArticleStore } from "@/store/articleStore";
import { useArticleStore } from "@/store/articleStore";
import { ChevronDown } from "lucide-react";

function SortToggle() {
  const toggleState = useArticleStore(
    (state: ArticleStore) => state.toggleState
  );
  const setToggleState = useArticleStore(
    (state: ArticleStore) => state.setToggleState
  );

  // 토글 상태에 따른 텍스트 표시
  const getSortText = () => {
    return toggleState === "like" ? "인기순" : "최신순";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex-center gap-2 h-[42px] rounded-[12px] border bg-white hover:bg-gray-50
          w-[42px] tablet:w-[130px]"
      >
        <span className="text-sm font-medium">{getSortText()}</span>
        <ChevronDown className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-[120px]"
      >
        <DropdownMenuItem
          className="text-sm"
          onClick={() => setToggleState("recent")}
        >
          최신순
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-sm"
          onClick={() => setToggleState("like")}
        >
          인기순
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SortToggle;
