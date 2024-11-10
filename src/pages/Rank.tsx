import {useState} from 'react';
import Wrapper from "@/components/Wrapper";
import LVStack from "@/components/atom/LVStack";
import {
    Box,
    Button,
    ButtonGroup,
    Center,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast
} from "@chakra-ui/react";
import BasicInput from "@/components/atom/BasicInput";
import FormWrapper from "@/components/FormWrapper";
import useStudentStore from "@/store/global/useStudentStore";

const Rank = () => {
  const {getStudent, setStudentInfo} = useStudentStore(state => state);
  const rankingData = Array.from({ length: 500 }, (_, i) => ({
    rank: i + 1,
    name: `학생 ${i + 1}`,
    points: Math.floor(Math.random() * 1000),
  }));
  const itemsPerPage = 50;
  const totalPages = Math.ceil(rankingData.length / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  const currentItems = rankingData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPageButtons = 5; // Number of page buttons to show

    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    if (endPage - startPage < maxPageButtons - 1) {
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <LVStack w={'100%'} spacing={'20px'}>
      <Wrapper>
        <LVStack w={'100%'}>
          <FormWrapper
            title={'마일리지 랭킹'}
            description='내 랭킹:'
          >
             <Table >
            <Thead>
              <Tr>
                <Th>순위</Th>
                <Th>이름</Th>
                <Th>포인트</Th>
              </Tr>
            </Thead>
            <Tbody>
            {currentItems.map((item) => (
                <Tr key={item.rank}>
                  <Td>{item.rank}</Td>
                  <Td>{item.name}</Td>
                  <Td>{item.points}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          </FormWrapper>
          <Box w={'100%'}>
          <Center mt={4} mb={4}>
            <ButtonGroup spacing={2}>
              <Button
                onClick={() => handlePageChange(currentPage - 1)}
                isDisabled={currentPage === 1}
              >
                이전
              </Button>

              {getPageNumbers().map((num) => (
                <Button
                  key={num}
                  onClick={() => handlePageChange(num)}
                  colorScheme={currentPage === num ? 'teal' : 'gray'}
                >
                  {num}
                </Button>
              ))}

              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                isDisabled={currentPage === totalPages}
              >
                다음
              </Button>
            </ButtonGroup>
          </Center>
          </Box>
        </LVStack>
      </Wrapper>
    </LVStack>

  );
};

export default Rank;
