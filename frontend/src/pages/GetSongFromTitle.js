import { TextField, Button, Stack } from "@mui/material"
import { useState } from "react"
import { DataGrid } from "@mui/x-data-grid";

const serverUrl = "http://localhost:8000/api";

export default function GetSongFromTitle({cols}) {
    const [searchedTitle, setSearchedTitle] = useState("")
    const [songData, setSongData] = useState({})

    function getSong() {
        fetch(serverUrl + "/record/" + searchedTitle, {mode: "cors"}).then((res) => {
            return res.json();
        }).then((resData) => {
            setSongData(resData.data)
        }).catch((err) => {
            console.log("An error occurred: ",err);
        })
    }
    return (
        <>  
            <Stack direction="column" spacing={2}>
                <Stack direction="row" spacing={2}>
                    <TextField id="outlined-basic" label="search" variant="outlined" style={{height: "40px", width: "100%", marginTop: "2px"}} onChange={(e) => {setSearchedTitle(e.target.value)}}/>
                    <Button variant="contained" style={{height: "50px", marginTop: "2px", width: "100px"}} onClick={() => {getSong()}}>GET</Button>
                </Stack>
                {songData.id ? Object.keys(songData).map((key) => {
                    return <span><b>{key}</b>{`: ${songData[key]}`}</span>
                }) : <span>No record found</span>}
             </Stack>
        </>
    )
}