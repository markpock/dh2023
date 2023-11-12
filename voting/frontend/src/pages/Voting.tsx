import React, {useState, useRef, useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import './Voting.css'

import { proposal } from '../extern';
import { GridApi, GridOptions } from 'ag-grid-community';
import { Link } from 'react-router-dom';


const fields = [
    ['cost', 'Cost'],
    ['quantity', 'Quantity'],
    ['desc', 'Line Item'],
    ['priority', 'Priority']
]

// I hate this but it needs to be done.
const columnDefs: any[] = [{
    headerName: '',
    field: 'itemID',
    headerCheckboxSelection: true,
    checkboxSelection: true,
    valueFormatter: ()=>'',
    width: 100
 }, ...fields.map(x => {return {headerName: x[1], field: x[0]}})]

interface VotingProps {
    selectedID: number, 
    selectedRows: number[],
    dispatch: (_: number[]) => void
}

const Voting = ({selectedID, selectedRows, dispatch}: VotingProps) => {
    console.log(selectedID);
    const rowData = proposal(selectedID).items.map((x, i) => {return {...x, itemID: i}})

    const gridApi = useRef<GridApi | null>(null);

    const handleGrid = () => {
        if (gridApi.current !== null) {        
            const nonNull = gridApi.current
            const itemIDs = nonNull.getSelectedRows().map((item) => item.itemID)
            dispatch(itemIDs)
            itemIDs.forEach(x => nonNull.getRowNode('' + x)?.setSelected(true))
        }
    }

    return (
        <div className="ag-theme-alpine" style={{ width: '100%' }}>
            <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            domLayout='autoHeight'
            rowSelection='multiple'
            onGridReady={(params) => gridApi.current = params.api}
            getRowId={(params) => '' + params.data.itemID}
            onFirstDataRendered={({api}) => api.forEachNode(node => node.setSelected(node.rowIndex !== null && selectedRows.includes(node.rowIndex)))}
            />
            <button onClick={handleGrid}>Save approvals</button>
            <Link to={'/home'}>Return Home</Link>
        </div>
    );
};

export default Voting;