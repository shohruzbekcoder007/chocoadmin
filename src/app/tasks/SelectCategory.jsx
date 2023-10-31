import React, { useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import taskService from './services/taskService'
import { useTranslation } from 'react-i18next'

export default function SelectCategory({categorySelectF, product_type, category}) {

    const [parentCategory, setParentCategory] = useState(category?.parent_category)
    const [parentCategoryList, setParentCategoryList] = useState([])
    const [childCategory, setChildCategory] = useState(category?.children_category)
    const [childCategoryList, setChildCategoryList] = useState([])
    const [allCategory, setAllCategory] = useState([])
    const { t } = useTranslation();
    

    const handleChange = (event) => {
        setParentCategory(event.target.value)
        const childCategorySelect = allCategory.find(element => element.id == event.target.value).children || []
        setChildCategoryList(childCategorySelect.map(element => {
            return {
                value: element.id,
                name: element.title_uz
            }
        }))
    }

    const handleChangeChild = (event) => {
        setChildCategory(+event.target.value)
        categorySelectF(+event.target.value)
    }

    useEffect(() => {
        if(product_type != ""){
            taskService.getCategory(product_type || "").then(response => {
                setAllCategory(response.data)
                setParentCategoryList(response.data.map(element => {
                    return {
                        value: element.id,
                        name: element.title_uz
                    }
                }))
            }).catch(error => {
                console.log(error)
            })
        }
        // console.log(category, category.children_category, category.parent_category)
        // console.log(category, "<<--")
    }, [product_type])

    return (
        <>
            <FormControl sx={{ minWidth: "100%" }} className="mt-8 mb-8">
                <InputLabel id="demo-simple-select-autowidth-label">{t("Parent category")}</InputLabel>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={parentCategory}
                    onChange={handleChange}
                    fullWidth
                    label={t("Parent category")}
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
                <InputLabel id="demo-simple-select-autowidth-label">{t("Child category")}</InputLabel>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={childCategory}
                    onChange={handleChangeChild}
                    fullWidth
                    label={t("Child category")}
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