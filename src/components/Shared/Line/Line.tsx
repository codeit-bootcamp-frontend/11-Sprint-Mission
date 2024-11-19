import { StyledLine } from './Line.styles';

export interface LineProps {
  column?: boolean;
  className?: string;
}

function Line({ column, className }: LineProps) {
  return <StyledLine column={column} className={className} />;
}

export default Line;
