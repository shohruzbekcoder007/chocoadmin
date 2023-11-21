import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import taskService from './services/taskService'
import { Box, Grid, Stack, TextField, Typography } from '@mui/material';
import { ImageContainer, ImageRemove, ImageWrapper } from './AditionalInformation/styles';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon/FuseSvgIcon';
import { host } from 'src/utils/API_urls';

export default function PriceUpdate({productId, name}) {

  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const [product_type, setProductType] = React.useState(null)
  const [prImages, setPrImages] = React.useState([])

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }

      taskService.getProductImages(productId).then(response => {
        console.log(response.data, response.data.product_type, response.data.all_images)
        setProductType(response.data.product_type)
        setPrImages(response.data.all_images)
      }).catch(error => {
        console.log(error)
      })

    }
  }, [open]);

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen('paper')}>Price</Button>
      {/* <Button onClick={handleClickOpen('body')}>scroll=body</Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          {/* Narxlarni o'zgartirish */}
          {name.title_uz} <br/>
          {name.title_ru}
        </DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          {

          }
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {
              prImages.map((elem, index) => {
                return <OnePriceImage key={index} imgpr={elem} productId={productId} product_type={product_type}/>
              })
            }
          </DialogContentText>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions> */}
      </Dialog>
    </React.Fragment>
  );
}


const OnePriceImage = ({imgpr, productId, product_type}) => {

  console.log(imgpr)
  const [imageList, setImageList] = React.useState(imgpr?.images || [])
  const [price, setPrice] = React.useState(imgpr?.price || 0)

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log(file)
    const form_data = new FormData()
    form_data.append('price', price)
    form_data.append('product', productId)
    form_data.append('image', file)
    if(product_type == "book"){
      form_data.append('wrapper', imgpr.wrapper)
    }else{
      form_data.append('color', imgpr.color_id)
    }
    taskService.createProductImage(form_data).then(response => {
      console.log(response)
      setImageList(prev => {
        return [...prev, {id: response.data.id, image: response.data.image}]
      })
    }).catch(error => {
      console.log(error)
    })
  }

  const removeFile = (id) => {
    console.log(id)
    taskService.removeImage(id).then(response => {
      if(response.status == 204){
        setImageList(prev => {
          return prev.filter((img) => img.id != id);
        })
      }
    }).catch(error => {
      console.log(error)
    })
  }

  return (
    <Box component="div" sx={{ p: 2, border: '1px dashed grey', mb: 1 }}>
            <Typography variant="h6" gutterBottom>
                {imgpr.wrapper}
            </Typography>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={12} sx={{mb: 2}}>
                <Stack direction="row" alignItems="center" spacing={2} useFlexGap flexWrap="wrap">
                  <ImageWrapper>
                        <ImageContainer>
                            <label htmlFor={`upload-image-${productId}`}>
                                <Button variant="contained" component="span">
                                    Upload
                                </Button>
                                <input
                                    id={`upload-image-${productId}`}
                                    hidden
                                    accept="image/*"
                                    type="file"
                                    onChange={handleFileUpload}
                                />
                            </label>
                        </ImageContainer>
                    </ImageWrapper>
                    {
                      imageList.map((elem, index) => {
                        return (
                          <ImageWrapper key={index}>
                            {/* host + "/media/" +  */}
                            <img src={host + elem.image} alt="Uploaded Image" height="300" />
                            <ImageRemove
                                onClick={() => { removeFile(elem.id) }}
                            >
                                <FuseSvgIcon className="text-48" size={24} color="error">material-twotone:close</FuseSvgIcon>
                            </ImageRemove>
                          </ImageWrapper>
                        )
                      })
                    }
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label={"Narxi"}
                        id="name"
                        variant="outlined"
                        fullWidth
                        type='number'
                        onChange={(event) => {console.log(event.target.value)}}
                    />
                </Grid>
            </Grid>
        </Box>
  )
}