import React, { useState } from 'react'
import SelectColors from './SelectColors'
import { Box } from '@mui/system'
import { Grid, TextField, Typography } from '@mui/material'
import AddImage from './AddImage'

export default function AditionalInformation({getImages}) {

    const [colors, setColors] = useState([])
    const [additions, setAditions] = useState([])
    
    const setImages = (val) => {

        setAditions(prev => {
            let foundIndex = prev.findIndex(x => x.color_id == val.color_id);
            if(foundIndex >= 0){
                prev[foundIndex] = val;
                getImages(prev)
                return prev
            }else{
                getImages([...prev, val])
                return [...prev, val]
            }
        })

    }

    return (
        <div className='w-full'>
            <SelectColors getSizes={(val) => { setColors(val); }} />
            {
                colors.map((elem, index) => {
                    return (
                        <ProductOneColor key={index} elem={elem} setImages={val => {setImages(val)}}/>
                    )
                })
            }
        </div>
    )
}


const ProductOneColor = ({ elem, setImages }) => {

    const [priceColorFile, setPriceColorFile] = useState({
        color_id: elem.id,
        price: 0,
        files: []
    })

    const getFiles = (val) => {
        let fileList = val.map(elem => {
            return elem.file
        })
        setPriceColorFile({
            ...priceColorFile,
            files: fileList
        })
        setImages({
            ...priceColorFile,
            files: fileList
        })
    }

    const getPrace = (val) => {
        setPriceColorFile({
            ...priceColorFile,
            price: val
        })
        setImages({
            ...priceColorFile,
            price: val
        })
    }

    return (
        <Box component="div" sx={{ p: 2, border: '1px dashed grey', mb: 1 }}>
            <Typography variant="h6" gutterBottom>
                {elem.title} {elem.id}
            </Typography>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>
                    <AddImage pr_id={elem.id} getImages={val => {getFiles(val)}} key={elem.id}/>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Narxi"
                        autoFocus
                        id="name"
                        variant="outlined"
                        fullWidth
                        // value={percentage}
                        type='number'
                        onChange={(event) => {getPrace(event.target.value)}}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}