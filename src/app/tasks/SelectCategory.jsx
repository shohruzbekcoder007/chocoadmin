import React, { useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import taskService from './services/taskService'

export default function SelectCategory({categorySelectF}) {

    const [parentCategory, setParentCategory] = useState([])
    const [parentCategoryList, setParentCategoryList] = useState([])
    const [childCategory, setChildCategory] = useState('')
    const [childCategoryList, setChildCategoryList] = useState([])
    const [allCategory, setAllCategory] = useState([])

    const handleChange = (event) => {
        setParentCategory(event.target.value)
        const childCategorySelect = allCategory.find(element => element.id == event.target.value).children || []
        setChildCategoryList(childCategorySelect.map(element => {
            return {
                value: element.id,
                name: element.title
            }
        }))
    }

    const handleChangeChild = (event) => {
        setChildCategory(event.target.value)
        categorySelectF(event.target.value)
    }

    useEffect(() => {
        taskService.getCategory().then(response => {
            setAllCategory(response.data)
            setParentCategoryList(response.data.map(element => {
                return {
                    value: element.id,
                    name: element.title
                }
            }))
        }).catch(error => {
            console.log(error)
        })
    }, [])

    return (
        <>
            <FormControl sx={{ minWidth: "100%" }} className="mt-8 mb-8">
                <InputLabel id="demo-simple-select-autowidth-label">Parent category</InputLabel>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={parentCategory}
                    onChange={handleChange}
                    fullWidth
                    label="Parent category"
                >
                    {
                        parentCategoryList.map((elem, index ) => {
                            return <MenuItem key={index} value={elem.value}>{elem.name}</MenuItem>
                        })
                    }
                    {/* <MenuItem value="">
                        <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Twenty</MenuItem>
                        <MenuItem value={21}>Twenty one</MenuItem>
                        <MenuItem value={22}>Twenty one and a half</MenuItem> */}
                </Select>
            </FormControl>
            <FormControl sx={{ minWidth: "100%" }} className="mt-8 mb-8">
                <InputLabel id="demo-simple-select-autowidth-label">Child category</InputLabel>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={childCategory}
                    onChange={handleChangeChild}
                    fullWidth
                    label="Child category"
                >
                    <MenuItem value={""}>""</MenuItem>
                    {
                        childCategoryList.map((elem, index) => {
                            return <MenuItem key={index} value={elem.value}>{elem.name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </>
    )
}