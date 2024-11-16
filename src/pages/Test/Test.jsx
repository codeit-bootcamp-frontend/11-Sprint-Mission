import Button from '../../components/Button/Button';
import Heart from '../../components/HeartButton/HeartButton';
import ProdCard from '../../components/ProdCard/ProdCard';
import InputAddFile from '../../components/InputFile/InputAddFile';
import { TestContainer, Table, Th, Td, TdContainer } from './Test.styles';
import NotResult from '../../components/NotResult/NotResult';
import UserInfo from '../../components/UserInfo/UserInfo';
import Input from '../../components/Input/Input';
import ComentPost from '../../components/Coment/ComentPost';

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
                  <Heart borderType count={12} />
                  <Heart borderType count={12} isActive={true} />
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

            <tr>
              <Td>NotResult</Td>
              <Td>
                <TdContainer>
                  <NotResult />
                  <NotResult type='search' />
                  <NotResult type='comments' />
                </TdContainer>
              </Td>
            </tr>
            <tr>
              <Td>UserInfo</Td>
              <Td>
                <TdContainer>
                  <UserInfo>
                    <UserInfo.ProfileImage imageSize='big' />
                    <UserInfo.Text userName='유저이름' date='2024. 01. 02' />
                    <UserInfo.Line column />
                    <UserInfo.Heart borderType count={123} />
                  </UserInfo>
                </TdContainer>
                <TdContainer>
                  <UserInfo wide>
                    <UserInfo.ProfileImage imageSize='big' />
                    <UserInfo.Text
                      userName='유저이름'
                      date='2024. 01. 02'
                      column
                      wide
                    />
                    <UserInfo.Line column />
                    <UserInfo.Heart borderType count={123} />
                  </UserInfo>
                  <UserInfo wide>
                    <UserInfo.ProfileImage imageSize='small' />
                    <UserInfo.Text
                      userName='유저이름'
                      date='2024. 01. 02'
                      wide
                    />
                    <UserInfo.Heart count={123} />
                  </UserInfo>
                  <UserInfo wide>
                    <UserInfo.UserName userName='유저이름' />
                    <UserInfo.Heart count={123} size='sm' wide />
                    <UserInfo.Date date='2024. 11. 11' />
                  </UserInfo>
                </TdContainer>
              </Td>
            </tr>
            <tr>
              <Td>Input</Td>
              <Td>
                <TdContainer>
                  <Input placeholder='플레이스 홀더 입니다.' />
                  <Input as='textarea' placeholder='플레이스 홀더 입니다.' />
                  <Input placeholder='플레이스 홀더 입니다.' />
                  <Input
                    placeholder='플레이스 홀더 입니다.'
                    isError={true}
                    errorMessage='에러 발생'
                  />
                </TdContainer>
              </Td>
            </tr>

            <tr>
              <Td>ComentPost</Td>
              <Td>
                <TdContainer>
                  <ComentPost
                    title='문의하기'
                    placeholder='개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.'
                  />
                  <ComentPost
                    title='댓글달기'
                    placeholder='댓글을 입력해주세요.'
                  />
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
