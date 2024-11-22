export type Comment = {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
    image: string[];
  };
};

export type CommentListProps = {
  comment: Comment;
  onEdit: (id: number, content: string) => void;
  onDelete: (id: number) => void;
  onCancel?: () => void;
  onSave?: () => void;
};
