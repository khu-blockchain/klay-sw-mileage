import { usePagination } from "pagination-react-js"
import {ComponentProps, ReactNode} from "react";
import BaseTable from "@/components/atom/BaseTable";

type PaginationItemProps = {
  children: ReactNode
  label: ComponentProps<"li">["aria-label"]
  active?: boolean
  onClick?: ComponentProps<"li">["onClick"]
  rel?: ComponentProps<"li">["rel"]
}

const PaginationItem = ({ children, label, active, onClick, rel }: PaginationItemProps) => {
  return (
    <li
      className={["pagination-item", active ? "pagination-item-active" : undefined].filter((value) => value).join(" ")}
      aria-current={active ?? "page"}
      aria-label={label}
      rel={rel}
      onClick={onClick}
    >
      {children}
    </li>
  )
}

export type PaginationProps = {
  data: Array<any>;
  headers: Array<{key: string, label: string}>;
  onClickRow?: (arg: any) => any;
}

export const PaginationTable = ({data, headers, onClickRow}: PaginationProps) => {
  const LIMIT = 15;

  const { records, pageNumbers, setActivePage } = usePagination({
    activePage: 1,
    recordsPerPage: LIMIT,
    totalRecordsLength: data.length,
    offset: 2,
    navCustomPageSteps: { prev: 3, next: 3 },
    permanentFirstNumber: true,
    permanentLastNumber: true,
  })


  function updateActivePage(pageNumber: number | false) {
    pageNumber && setActivePage(pageNumber)
  }

  return (
    <div className='pagination-table'>
      <BaseTable
        onClickRow={onClickRow}
        data={data}
        headers={headers}
        indexOfFirst={records.indexOfFirst}
        indexOfLast={records.indexOfLast}
      />

      {data.length > LIMIT &&
        <nav className='pagination-nav' role="navigation" aria-label="Pagination Navigation">
          <ul className="pagination">
            <PaginationItem
              label={`Goto first page ${pageNumbers.firstPage}`}
              rel="first"
              onClick={() => updateActivePage(pageNumbers.firstPage)}
            >
              &laquo;
            </PaginationItem>

            <PaginationItem
              label={`Goto previous page ${pageNumbers.previousPage}`}
              rel="prev"
              onClick={() => updateActivePage(pageNumbers.previousPage)}
            >
              &lsaquo;
            </PaginationItem>

            <PaginationItem
              label={`Goto first page ${pageNumbers.firstPage}`}
              active={pageNumbers.firstPage === pageNumbers.activePage}
              onClick={() => updateActivePage(pageNumbers.firstPage)}
            >
              {pageNumbers.firstPage}
            </PaginationItem>

            {pageNumbers.customPreviousPage && (
              <PaginationItem
                label={`Goto page ${pageNumbers.customPreviousPage}`}
                onClick={() => updateActivePage(pageNumbers.customPreviousPage)}
              >
                &middot;&middot;&middot;
              </PaginationItem>
            )}

            {pageNumbers.navigation.map((navigationNumber) => {
              const isFirstOrLastPage = navigationNumber === pageNumbers.firstPage || navigationNumber === pageNumbers.lastPage

              return isFirstOrLastPage ? null : (
                <PaginationItem
                  label={`Goto page ${navigationNumber}`}
                  key={navigationNumber}
                  active={navigationNumber === pageNumbers.activePage}
                  onClick={() => updateActivePage(navigationNumber)}
                >
                  {navigationNumber}
                </PaginationItem>
              )
            })}

            {pageNumbers.customNextPage && (
              <PaginationItem label={`Goto page ${pageNumbers.customNextPage}`} onClick={() => updateActivePage(pageNumbers.customNextPage)}>
                &middot;&middot;&middot;
              </PaginationItem>
            )}

            {pageNumbers.firstPage !== pageNumbers.lastPage && (
              <PaginationItem
                label={`Goto last page ${pageNumbers.lastPage}`}
                active={pageNumbers.lastPage === pageNumbers.activePage}
                onClick={() => updateActivePage(pageNumbers.lastPage)}
              >
                {pageNumbers.lastPage}
              </PaginationItem>
            )}

            <PaginationItem
              label={`Goto next page ${pageNumbers.nextPage}`}
              rel="next"
              onClick={() => updateActivePage(pageNumbers.nextPage)}
            >
              &rsaquo;
            </PaginationItem>

            <PaginationItem
              label={`Goto last page ${pageNumbers.lastPage}`}
              rel="last"
              onClick={() => updateActivePage(pageNumbers.lastPage)}
            >
              &raquo;
            </PaginationItem>
          </ul>
        </nav>
      }
    </div>
  )
}
