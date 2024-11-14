import { ChangeEvent } from "react";

export interface ProductBestListProps {
  createdAt: string;
  favoriteCount: number;
  ownerNickname: string;
  ownerId: number;
  images: string[];
  tags: string;
  price: number;
  description: string;
  name: string;
  id: number;
}

interface ProductProps {
  productLists: ProductBestListProps;
}

export interface ProductListProps {
  sortedItems: ProductBestListProps[];
  onChangeSort: (e: ChangeEvent) => void;
  onClickPage: (e: MouseEvent, pageNo: number) => void;
  gridRows: number;
  label: string;
  isLoading?: boolean;
  ispageNation: boolean; //페이지네이션 (true 일시 제공)
  issearch: boolean; //검색버튼 (true 일시 제공)
  loadingError?: boolean;
}
