import React, { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import DatatablePagination from './DatatablePagination';
import DataTable from 'react-data-table-component';
import { Row, Col, Table } from "react-bootstrap";

const customStyles = {
    rows: {
        style: {
            borderRadius: '0.5rem'
        },
    },
    headCells: {
        style: {
            borderBottom: '1px solid #000000',
            fontWeight: 'blod',
            fontSize: '16px',
            accentColor: '#1d496d'
        },
    },
    cells: {
        style: {
            fontSize: '16px',
            accentColor: '#1d496d'
        },
    },
};


const FacilityTable = ({
    setPerPage,
    setCurrentPage,
    setSelectedRows,
    setMenuVisible,
    paginatedData,
    filteredData = [],
    totalItems,
    currentPage,
    perPage,
    columns,
    toggledClearRows,
    isSingleRecordSelected,
    selectableRows,
    selectableRowsSingle,
    menuVisible,
    conditionalRowStyles,
}) => {

    const closeContextMenu = () => {
        setMenuVisible(false);
    };

    const handlePageClick = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage);
    };

    const handlePerPageChange = (newPerPage) => {
        setPerPage(newPerPage);
        setCurrentPage(0);
    };

    // handle checkbox selection
    const handleRowSelected = useCallback(state => {
        setSelectedRows(state.selectedRows);
    }, [setSelectedRows]);

    const pageSummary =
        totalItems === 0
            ? '0-0 of 0'
            : `${currentPage * perPage + 1}-${Math.min(
                (currentPage + 1) * perPage,
                totalItems
            )} of ${totalItems}`;

    return (
        <div className='body-content pt-4 pb-4'>
            <Row>
                <Col md={12}>
                    {(paginatedData.length > 0) ?
                        (
                            <DataTable
                                columns={columns}
                                data={paginatedData}
                                selectableRows={selectableRows}
                                selectableRowsSingle={selectableRowsSingle}
                                clearSelectedRows={toggledClearRows}
                                selectableRowDisabled={() => isSingleRecordSelected}
                                pagination={false} // Disable default pagination                                    
                                noHeader
                                onRowClicked={closeContextMenu}
                                noDataComponent={<div>No data available</div>}
                                highlightOnHover
                                customStyles={customStyles}
                                fixedHeader={true}
                                fixedHeaderScrollHeight={'50dvh'}
                                onSelectedRowsChange={handleRowSelected}
                                conditionalRowStyles={conditionalRowStyles}
                            />
                        ) : (
                            <div>
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            {menuVisible ? (
                                                <th>
                                                    <FontAwesomeIcon icon={faEllipsisH} />
                                                </th>
                                            ) : null}
                                            {selectableRows ? <th><input type='checkbox' className='pe-none' /></th> : null}
                                            {((columns.length > 0) ? (columns.map((column) => (
                                                <th key={column.name}>{column.name}</th>
                                            ))) : [])}
                                        </tr>
                                    </thead>
                                </Table>
                                <div className='text-center mb-3'>No data available</div>
                            </div>
                        )}
                </Col>
            </Row>
            {/* Pagination */}
            <DatatablePagination
                filteredData={filteredData}
                perPage={perPage}
                handlePageClick={handlePageClick}
                handleRowsPerPage={handlePerPageChange}
                pageSummary={pageSummary}
            />
        </div >
    )
}

export default FacilityTable