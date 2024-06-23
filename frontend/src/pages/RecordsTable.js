import { useState, useEffect } from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import Charts from './Charts';
import GetSongFromTitle from './GetSongFromTitle';
import { Stack, Rating } from '@mui/material';

const serverUrl = "http://localhost:8000/api";

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport />
        </GridToolbarContainer>
    );
}

export default function RecordsTable() {
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });
    const [recordsData, setRecordsData] = useState({
        rows: [],
        total: 0,
        cols: []
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch(serverUrl + "/records/?start=" + paginationModel.page * 10, { mode: "cors" }).then((res) => {
            return res.json();
        }).then((resData) => {
            setRecordsData({ recordsData, ...resData })
        }).catch((err) => {
            console.log("An error occurred: ", err);
        }).finally(() => {
            setIsLoading(false);
        })
    }, [paginationModel.page])

    const updateRating = async function (id, index, newRating) {
        const newRatingJson = {
            rating: newRating
        }
        await fetch(serverUrl + "/record/" + id, {
            mode: "cors", method: "PUT", body: JSON.stringify(newRatingJson), headers: { "Content-Type": "application/json" }
        }).then((res) => {
            const recordsDataCopy = {...recordsData};
            recordsDataCopy.rows[index]['rating'] = newRating;
            setRecordsData(recordsDataCopy);
            return true;
        }).catch((err) => {
            console.log("An error occurred: ", err);
            throw err;
        })
    }

    return (
        <div style={{ height: '100%', width: '100%' }}>
            <Stack direction="column">
                {/* <div style={{ height: '200px', width: '80%' }}> */}
                <Stack direction="row" spacing={1} height="500px">
                    <DataGrid
                        columns={recordsData.cols}
                        rows={recordsData.rows}
                        // {...recordsData.rows}
                        rowCount={recordsData.total}
                        loading={isLoading}
                        pageSizeOptions={[10]}
                        paginationModel={paginationModel}
                        paginationMode="server"
                        onPaginationModelChange={setPaginationModel}
                        processRowUpdate={async (updatedRow, originalRow) => {
                            await updateRating(updatedRow.id, updatedRow.index, updatedRow.rating).then((res) => {
                                return updatedRow;
                            }).catch((err) => { return originalRow })
                            // return originalRow;
                        }}
                        slots={{
                            toolbar: CustomToolbar
                        }}
                        disableRowSelectionOnClick
                        disableSelectionOnClick
                    />
                    <GetSongFromTitle></GetSongFromTitle>
                </Stack>
                {/* </div> */}
                <Charts></Charts>
            </Stack>
        </div>

    );
}
