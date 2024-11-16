import { StyledLine } from './Line.styles';

function Line({ column, className }) {
  return <StyledLine $column={column} className={className} />;
}

export default Line;
