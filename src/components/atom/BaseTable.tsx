import React from 'react';
import {Table, TableContainer, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import {PaginationProps} from "@/components/Pagenation";

export type BaseTableProps = PaginationProps & {
  indexOfFirst: number;
  indexOfLast: number;
}

const BaseTable = (props: BaseTableProps) => {
  const {data, headers, indexOfFirst, indexOfLast, onClickRow} = props;

  const onClickTable = (func: any, TData: any) => {
    if(!func) return;
    func(TData)
    return;
  }

  return (
    <TableContainer w={'100%'}>
      <Table size='md' w={'100%'}>
        <Thead>
          <Tr>
            {headers.map((header, index) => <Th key={index}>{header.label}</Th>)}
          </Tr>
        </Thead>
        <Tbody>
          {data.slice(indexOfFirst, indexOfLast + 1).map((records, index) =>
            <Tr _hover={{backgroundColor: onClickRow ? 'var(--chakra-colors-gray-50)' : 'transparent'}} cursor={onClickRow ? 'pointer' : 'default'} onClick={() => onClickTable(onClickRow, records)} key={index}>
              {headers.map((header, index) => <Td key={index} minW={'100px'} verticalAlign={'middle'} whiteSpace={'break-spaces'}>{records[header.key]}</Td>)}
            </Tr>)}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default BaseTable;
