import Button from '../../components/Button/Button';
import Heart from '../../components/HeartButton/HeartButton';
import ProdCard from '../../components/ProdCard/ProdCard';
import InputAddFile from '../../components/InputFile/InputAddFile';
import { TestContainer, Table, Th, Td, TdContainer } from './Test.styles';

function Test() {
  return (
    <>
      <TestContainer>
        <Table>
          <thead>
            <tr>
              <Th>컴포넌트</Th>
              <Th>UI</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td>Button</Td>
              <Td>
                <TdContainer>
                  <Button color='blue'>버튼</Button>
                  <Button disabled={true}>버튼</Button>
                  <Button color='white'>버튼</Button>
                  <Button color='blue' round>
                    버튼
                  </Button>
                  <Button>버튼</Button>
                  <Button color='blue' wide>
                    버튼
                  </Button>
                </TdContainer>
              </Td>
            </tr>

            <tr>
              <Td>Heart</Td>
              <Td>
                <TdContainer>
                  <Heart border count={12} />
                  <Heart border count={12} isActive={true} />
                  <Heart count={10000} />
                  <Heart count={100} isActive={true} />
                  <Heart size='sm' count={100} />
                  <Heart size='sm' count={100} isActive={true} />
                </TdContainer>
              </Td>
            </tr>

            <tr>
              <Td>ProdCard</Td>
              <Td>
                <TdContainer>
                  <ProdCard size='md' title='중간 사이즈' count={100} />
                  <ProdCard size='sm' title='작은 사이즈' count={123} />
                </TdContainer>
              </Td>
            </tr>

            <tr>
              <Td>InputAddFile</Td>
              <Td>
                <TdContainer>
                  <InputAddFile />
                </TdContainer>
              </Td>
            </tr>
          </tbody>
        </Table>
      </TestContainer>
    </>
  );
}

export default Test;
