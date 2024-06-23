import { BarChart } from '@mui/x-charts';
import { ScatterChart } from '@mui/x-charts/ScatterChart';
import { useEffect, useState, memo } from 'react';

const serverUrl = "http://localhost:8000/api";

function Charts() {
    const [danceabilityList, setDanceabilityList] = useState([])

    useEffect(() => {
        fetch(serverUrl + "/scatterChartData/", {mode: "cors"}).then((res) => {
            return res.json();
        }).then((resData) => {
            setDanceabilityList(resData.data)
        }).catch((err) => {
            console.log("An error occurred: ",err);
        })
    },[])

    return (
        <>
            <ScatterChart
                width={500}
                height={300}
                series={[
                    {
                        label: 'Danceability',
                        data: danceabilityList.map((song) => ({ x: song.danceability, y: song.danceability, id: song.id }))
                    }
                ]}
            />
        </>
    );
}

export default Charts;