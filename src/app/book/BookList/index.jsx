import * as React from 'react'
import Paper from '@mui/material/Paper'
import bookService from '../services/bookService'
import { Button, Divider, Stack, Typography } from '@mui/material'
import UpdateBook from '../UpdateBook'
import { useTranslation } from 'react-i18next'

export default function BookList({reRender, setCreatedOption}) {

  const [banners, setBanners] = React.useState([])

  React.useEffect(() => {
    bookService.getBanners().then(response => {
      setBanners(response.data)
    }).catch(error => {
        
    })
  },[reRender])

  return (
    <>
      {
        banners.map(banner => {
          return <OneBanner key={banner.id} banner={banner} setCreatedOption={setCreatedOption}/>
        })
      }
      
    </>
  );
}

const OneBanner = ({banner, setCreatedOption}) => {

  const [deleted, setDeleted] = React.useState(false)
  const { t } = useTranslation();

  const deleteBanner = () => {
    bookService.deleteBanner(banner.id).then(response => {
      console.log(response)
      if(response.status == 204){
        setDeleted(true)
      }
    }).catch(error => {
      console.log(error)
    })
  }

  if(!deleted){
    return (
      <Paper className="flex flex-col w-full flex-auto shadow rounded-2xl overflow-hidden mb-20">
          <div className="flex flex-col p-24 pb-16">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <img src={banner.image} alt={banner.title} />
              </div>
              </div>
              <Typography variant="h3" component="p">
                {banner.title}
              </Typography>
              <Typography variant="h4" component="p">
                <div dangerouslySetInnerHTML={{__html: banner.desc}}></div>
              </Typography>
          </div>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            divider={<Divider orientation="vertical" flexItem />}
            sx={{p: 2, justifyContent: "flex-end"}}
          >
            <UpdateBook banner={banner} setCreatedOption={setCreatedOption}/>
            <Button 
              variant="outlined"
              onClick={deleteBanner}
              color="error"
            >
              {t("Delete")}
            </Button>
          </Stack>
        </Paper>
    )
  }else{
    return <></>
  }
}