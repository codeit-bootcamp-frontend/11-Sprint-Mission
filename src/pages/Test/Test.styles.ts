import { styled } from 'styled-components';
import { flexColumn } from '../../styles/layout.styles';

export const TestContainer = styled.div`
  width: 100%;
  height: auto;
  padding: 10rem 4rem;
  ${flexColumn}
  gap: 1.2rem;
`;
export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  text-align: left;
`;
export const Th = styled.th`
  border: 1px solid #ddd;
  padding: 1rem;
  background-color: #f2f2f2;
  font-size: 1.6rem;
  text-align: center;
  font-weight: bold;
`;
export const Td = styled.td`
  border: 1px solid #ddd;
  padding: 1rem;
  font-size: 1.6rem;
  vertical-align: middle;
`;
export const TdContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 1.2rem;
`;
