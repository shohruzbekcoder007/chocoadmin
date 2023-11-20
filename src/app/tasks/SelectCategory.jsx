import React, { useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import taskService from './services/taskService'
import { useTranslation } from 'react-i18next'

export default function SelectCategory({categorySelectF, product_type, category, pct, chct}) {

    const [parentCategory, setParentCategory] = useState("")
    const [parentCategoryList, setParentCategoryList] = useState([])
    const [childCategory, setChildCategory] = useState("")
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
        // console.log(category, "<<--")
        
        // setParentCategory(55)
        if(product_type != ""){
            taskService.getCategory(product_type || "").then(response => {
                setAllCategory(response.data)
                setParentCategoryList(response.data.map(element => {
                    return {
                        value: element.id,
                        name: element.title_uz
                    }
                }))
                // setParentCategory(category?.parentCategory)
                // setChildCategory(category?.childCategory)
            }).catch(error => {
                console.log(error)
            })
        }
        // console.log(category, category?.children_category, category?.parent_category)
        // console.log(category, "<<--")
    }, [product_type])

    useEffect(() => {
        if(chct)
            setParentCategory(chct)
    }, [chct])

    useEffect(() => {
        if(pct)
            setChildCategory(pct)
    }, [pct])

    return (
        <>
            <div className="grid w-full grid-cols-1 gap-y-48 sm:grid-cols-2 mt-8 mb-8">
                <FormControl sx={{ marginRight: "10px" }} className="mt-8 mb-8">
                    <InputLabel id="demo-simple-select-autowidth-label">{t("Parent category")}</InputLabel>
                    {console.log(parentCategory)}
                    <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={+parentCategory}
                        onChange={handleChange}
                        fullWidth
                        label={t("Parent category")}
                    >
                        {
                            parentCategoryList.map((elem, index ) => {
                                return <MenuItem key={index} value={elem.value}>{elem.name}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
                <FormControl sx={{ marginLeft: "10px" }} className="mt-8 mb-8">
                    <InputLabel id="demo-simple-select-autowidth-label">{t("Child category")}</InputLabel>
                    {console.log(childCategory)}
                    <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={+childCategory}
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
            </div>
        </>
    )
}