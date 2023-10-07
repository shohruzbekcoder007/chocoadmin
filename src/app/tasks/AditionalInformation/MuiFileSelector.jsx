import React from 'react'
import { MuiFileInput } from 'mui-file-input'

export default function MuiFileSelector() {

    const [value, setValue] = React.useState(null)

    const handleChange = (newValue) => {
        setValue(newValue)
    }

    return <MuiFileInput multiple value={value} onChange={handleChange} sx={{width: "100%", m: 0}}/>

}