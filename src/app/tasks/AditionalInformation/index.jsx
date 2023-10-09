import React, { useEffect, useState } from 'react'
import SelectColors from './SelectColors'
import { Box, styled } from '@mui/system'
import { Grid, Paper, TextField, Typography } from '@mui/material'
import MuiFileSelector from './MuiFileSelector'
import AddImage from './AddImage'

export default function AditionalInformation() {

    const [colors, setColors] = useState([])

    return (
        <div className='w-full'>
            <SelectColors getSizes={(val) => { setColors(val); console.log(val, "<->") }} />
            {
                colors.map((elem, index) => {
                    return (
                        <ProductOneColor key={index} elem={elem} />
                    )
                })
            }
        </div>
    )
}


const ProductOneColor = ({ elem }) => {
    return (
        <Box component="div" sx={{ p: 2, border: '1px dashed grey' }}>
            <Typography variant="h6" gutterBottom>
                {elem.title} {elem.id}
            </Typography>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                    <AddImage pr_id={elem.id} key={elem.id}/>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        // className="mt-8 mb-8"
                        // required
                        label="Narxi"
                        autoFocus
                        id="name"
                        variant="outlined"
                        fullWidth
                        // value={percentage}
                        type='number'
                    // onChange={(event) => {setPercentage(event.target.value)}}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}