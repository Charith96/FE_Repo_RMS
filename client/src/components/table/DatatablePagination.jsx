import React from 'react';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';

const DatatablePagination = ({
    perPage,
    filteredData,
    handleRowsPerPage,
    handlePageClick,
    pageSummary
}) => {

    const rowsPerPage = [5, 10, 15, 20, 25]
    return (
        <>
            <Row className='pagination-component mt-2'>
                <Col className='rows-handler'>
                    <div className="rows-per-page">
                        <div className='page-counter-lable'>Rows per page:</div>
                        <select className='form-select page-counter-dropdown' value={perPage} onChange={(e) => handleRowsPerPage(parseInt(e.target.value))}                                >
                            {rowsPerPage.map((page) => (<option value={page} key={page}>{page}</option>))}
                        </select>
                    </div>
                </Col>
                <Col className='page-handler'>
                    <ReactPaginate
                        nextLabel={<div className='text-nowrap'>Next <FontAwesomeIcon size='sm' icon={faChevronRight} /></div>}
                        previousLabel={<div className='text-nowrap'><FontAwesomeIcon size='sm' icon={faChevronLeft} /> Previous</div>}
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={Math.ceil(filteredData?.length / perPage)}
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                    />
                </Col>
                <Col className='page-summary'>
                    <div className="summary">
                        <span>{pageSummary}</span>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default DatatablePagination