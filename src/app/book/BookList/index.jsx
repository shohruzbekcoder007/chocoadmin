import * as React from 'react'
import Paper from '@mui/material/Paper'
import bookService from '../services/bookService'
import { Typography } from '@mui/material'

export default function BookList() {
  const [banners, setBanners] = React.useState([])
  React.useEffect(() => {
    bookService.getBanners().then(response => {
      setBanners(response.data)
    }).catch(error => {
        
    })
  },[])

  return (
    <>
      <Paper className="flex flex-col w-full flex-auto shadow rounded-2xl overflow-hidden mb-20">
        <div className="flex flex-col p-24 pb-16">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              salom hammaga
            </div>
            </div>
        </div>
      </Paper>
      {
        banners.map(banner => {
          return <OneBanner key={banner.id} banner={banner}/>
        })
      }
      
    </>
  );
}

const OneBanner = ({banner}) => {
  return (
    <Paper className="flex flex-col w-full flex-auto shadow rounded-2xl overflow-hidden mb-20">
        <div className="flex flex-col p-24 pb-16">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <img src={banner.image} alt={banner.title} />
            </div>
            {/* <div className="flex flex-col">
              <Typography variant="h2" component="p">
                h1. Heading
              </Typography>
            </div> */}
            </div>
            <Typography variant="h3" component="p">
                h1. Heading
              </Typography>
        </div>
      </Paper>
  )
}