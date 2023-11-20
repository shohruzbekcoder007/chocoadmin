import React, { useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import taskService from './services/taskService'
import { useTranslation } from 'react-i18next'

export default function SelectCategory({categorySelectF, product_type, pct, chct}) {

    const [parentCategory, setParentCategory] = useState(null)
    const [parentCategoryList, setParentCategoryList] = useState([])
    const [childCategory, setChildCategory] = useState(null)
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
    }, [product_type])

    useEffect(() => {
        if(chct)
            setChildCategory(chct)
    }, [chct])

    useEffect(() => {
        if(pct){
            setParentCategory(pct)
            const childCategorySelect = allCategory.find(element => element.id == pct).children || []
            setChildCategoryList(childCategorySelect.map(element => {
                return {
                    value: element.id,
                    name: element.title_uz
                }
            }))
        }
    }, [pct])

    return (
        <>
            <div className="grid w-full grid-cols-1 gap-y-48 sm:grid-cols-2 mt-8 mb-8">
                <FormControl sx={{ marginRight: "10px" }} className="mt-8 mb-8">
                    <InputLabel id="demo-simple-select-autowidth-label">{t("Parent category")}</InputLabel>
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