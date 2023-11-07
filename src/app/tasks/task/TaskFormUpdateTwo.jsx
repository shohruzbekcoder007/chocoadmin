import Button from '@mui/material/Button'
import NavLinkAdapter from '@fuse/core/NavLinkAdapter'
import { useEffect, useMemo, useState } from 'react'
import FuseLoading from '@fuse/core/FuseLoading'
import _ from '@lodash'
import Box from '@mui/system/Box'
import FuseSvgIcon from '@fuse/core/FuseSvgIcon'
import IconButton from '@mui/material/IconButton'
import { Alert, FormControlLabel, FormGroup, Paper, Switch, TextField, Typography } from '@mui/material'
import MultipleSelectChip from '../MultipleSelectChip'
import Editor from '../Editor'
import SelectAutoWidth from '../SelectAutoWidth'
import SelectCategory from '../SelectCategory'
import SelectStatus from '../SelectStatus'
import SelectAdvertisement from '../SelectAdvertisement'
import SelectBanner from '../SelectBanner'
import taskService from '../services/taskService'
import AditionalInformation from '../AditionalInformation'
import BrandList from '../BrandList'
import SaleList from '../SaleList'
import AddBookTypes from '../AddBookTypes'
import SelectYozuv from '../SelectYozuv'
import { useTranslation } from 'react-i18next'

function TaskFormUpdateTwo({ productId, setOpen }) {

    const [oldProduct, setOldProduct] = useState(null)

    const [product_type, setProduct_type] = useState(null)
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [status, setStatus] = useState("NEW")
    const [size, setSize] = useState([])
    const [has_size, setHasSize] = useState(false)
    const [is_active, setIsActive] = useState(false)
    const [description, setDescription] = useState('')
    const [descriptionRu, setDescriptionRu] = useState('')
    const [advertisement, setAdvertisement] = useState('')
    const [banner, setBanner] = useState('')
    const [percentage, setPercentage] = useState('')
    const [availability, setAvailability] = useState('')
    const [banner_discount, setBanner_discount] = useState('')
    const [brand, setBrand] = useState('')
    const [additions, setAdditions] = useState([])
    const [loading, setLoading] = useState(false)
    const [yozuv, setYozuv] = useState("krill")
    const [titleRu, setTitleRu] = useState('')
    const [ctg, setCtg] = useState("")
    const [error, setError] = useState(false)

    const { t } = useTranslation();

    useEffect(() => {
        taskService.getOneProduct(productId).then(response => {
            setTitle(response.data.title_uz)
            setTitleRu(response.data.title_ru)
            setDescription(response.data.description_uz)
            setDescriptionRu(response.data.description_ru)
            setOldProduct(response.data)
            setProduct_type(response.data.product_type)
            console.log(response.data)
            setSize(response.data.size)
            setPercentage(response.data.percentage)
            setAvailability(response.data.availability)
            setBanner(response.data.banner)
            setBanner_discount(response.data.banner_discount)
            setAdvertisement(response.data.advertisement)
            setBrand(response.data.brand)
            // size
            // setStatus()
            console.log(response.data, "-> " , response.data.brand,"<- tanlanganlari")
            const parent_category = response.data.category[0].id
            const children_category = response.data.category[0].children?.id
            const category = {
                parent_category: parent_category,
                children_category: children_category
            }
            setCtg(category)
            // children
        }).catch(error => {
            console.log(error)
        })
    }, [])

    const list_id = useMemo(() => {
        return additions.map(elem => {
            return elem.color_id
        })
    }, [additions])


    function onSubmitNew() {
        setLoading(true)

        taskService.updateProduct(productId, {
            product_type,
            title_uz: title,
            title_ru: titleRu,
            category: [(+category)],
            status,
            yozuv,
            has_size,
            is_active,
            description_uz: description,
            description_ru: descriptionRu,
            advertisement,
            banner,
            percentage,
            availability,
            banner_discount,
            brand
        }).then(response => {
            // console.log(response)
            setLoading(false)
            setOpen(false)
        }).catch(error => {
            console.log(error)
            setLoading(false)
            setError(true)
        })
    }

    return (
        <>
            {(!loading) ?
                <>
                    <div className="relative flex flex-col flex-auto items-center px-24 pt-20 sm:px-48">
                        {error?<Alert severity="error">Xatoli yuzaga keldi!!!</Alert>:null}
                        <div className="w-full">
                            <SelectAutoWidth getProductType={(val) => { setProduct_type(val) }} defaultVal={product_type}/>
                            <div className="grid w-full grid-cols-1 gap-y-48 sm:grid-cols-2 mt-8 mb-8">
                                <div style={{ marginRight: "10px" }}>
                                    <TextField
                                        className="mt-8 mb-8"
                                        required
                                        label={t("Mahsulot nomi(uz)")}
                                        // autoFocus
                                        id="name"
                                        variant="outlined"
                                        fullWidth
                                        value={title}
                                        onChange={(event) => { setTitle(event.target.value) }}
                                    />
                                </div>
                                <div style={{ marginLeft: "10px" }}>
                                    <TextField
                                        className="mt-8 mb-8"
                                        required
                                        label={t("Mahsulot nomi(ru)")}
                                        // autoFocus
                                        id="name"
                                        variant="outlined"
                                        fullWidth
                                        value={titleRu}
                                        onChange={(event) => { setTitleRu(event.target.value) }}
                                    />
                                </div>
                            </div>
                            <Typography variant="body2" gutterBottom>
                                {t("Description uz")}
                            </Typography>
                            <Editor getDescription={val => { setDescription(val) }} firstText={description} />
                            <Typography variant="body2" gutterBottom>
                                {t("Description ru")}
                            </Typography>
                            <Editor getDescription={val => { setDescriptionRu(val) }} firstText={descriptionRu} />
                            {
                                (product_type != "book") ?
                                    <MultipleSelectChip
                                        product_type={product_type}
                                        getSizes={(val) => {
                                            setSize(val.map(elem => {
                                                return elem.id
                                            }))
                                        }}
                                        defaultVal={size}
                                    /> :
                                    <></>
                            }
                            <SelectCategory 
                                categorySelectF={(val) => { setCategory(val) }} 
                                product_type={product_type} 
                                category={ctg}
                            />
                            <SelectStatus getStatusValue={(val) => { setStatus(val) }} defaultVal={status}/>
                            {
                                (product_type == "book") ? <SelectYozuv getStatusValue={(val) => { setYozuv(val) }} /> : null
                            }

                            <SelectAdvertisement getAdvertisementValue={(val) => { setAdvertisement(val) }} defVal={advertisement}/>
                            <BrandList getAdvertisementValue={(val) => { setBrand(val) }} product_type={product_type} defVal={brand} />
                            <SelectBanner getBannerValue={val => setBanner(val)} defVal={banner}/>
                            <TextField
                                className="mt-8 mb-8"
                                // required
                                label={t("Foyiz")}
                                // autoFocus
                                id="name"
                                variant="outlined"
                                fullWidth
                                value={percentage}
                                type='number'
                                onChange={(event) => { setPercentage(event.target.value) }}
                            />
                            <TextField
                                className="mt-8 mb-8"
                                // required
                                label={t("Availability")}
                                // autoFocus
                                id="name"
                                variant="outlined"
                                fullWidth
                                value={availability}
                                type='number'
                                onChange={(event) => { setAvailability(event.target.value) }}
                            />
                            <SaleList getAdvertisementValue={val => { setBanner_discount(val) }} defSales={banner_discount}/>
                            <FormGroup>
                                <FormControlLabel control={<Switch onChange={event => { setHasSize(event.target.checked) }} checked={has_size}/>} label={t("has_size")} />
                                <FormControlLabel required control={<Switch onChange={event => { setIsActive(event.target.checked) }} checked={is_active}/>} label={t("is_active")} />
                            </FormGroup>
                        </div>

                        {/* <div className="flex items-center justify-between border-b-1 w-full  mt-16 mb-16">
                            <span className="mt-8 mb-8">Aditional information</span>
                        </div>
                        {product_type != "book" ? <AditionalInformation getImages={val => { setAdditions(val) }} /> : <AddBookTypes getImages={val => { setAdditions(val) }} />} */}
                    </div>
                    {(
                        <Box
                            className="flex items-center mt-40 py-14 pr-16 pl-4 sm:pr-48 sm:pl-36 border-t"
                        >
                            <span className="ml-auto"></span>
                            <Button
                                className="ml-8"
                                variant="contained"
                                color="secondary"
                                disabled={false}
                                onClick={onSubmitNew}
                            >
                                {t("Update")}
                            </Button>
                        </Box>
                    )}
                </> : <FuseLoading />
            }
        </>

    );
}

export default TaskFormUpdateTwo;