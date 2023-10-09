import { memo, useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Container } from "@mui/material";
import { ImageContainer, ImageRemove, ImageWrapper } from "./styles";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon/FuseSvgIcon";
import { v4 as uuidv4 } from 'uuid';

export default memo(function AddImage({pr_id}) {

    const [fileList, setFileList] = useState([])
    const [imageUrls, setImageUrls] = useState([])

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        const _id = uuidv4();

        reader.onloadend = () => {
            setImageUrls(prev => {
                return [...prev, {
                    file: reader.result,
                    id: _id,
                    pr_id: pr_id
                }]
            })
            setFileList(prev => {
                return [...prev, {
                    id: _id,
                    file: event.target.files[0],
                    pr_id: pr_id
                }]
            })
        };

        console.log(fileList)

        reader.readAsDataURL(file);
    };

    const removeFile = (id) => {
        setImageUrls(prev => {
            return prev.filter(element => element.id != id)
        })
    }

    return (
        <Container maxWidth="md">
            <Stack direction="row" alignItems="center" spacing={2} useFlexGap flexWrap="wrap">
                <ImageWrapper>
                    <ImageContainer>
                        <label htmlFor={`upload-image-${pr_id}`}>
                            <Button variant="contained" component="span">
                                Upload
                            </Button>
                            <input
                                id={`upload-image-${pr_id}`}
                                hidden
                                accept="image/*"
                                type="file"
                                onChange={handleFileUpload}
                            />
                        </label>
                    </ImageContainer>
                </ImageWrapper>
                {
                    imageUrls.map((elem, index) => {
                        return (
                            <ImageWrapper key={index}>
                                <img src={elem.file} alt="Uploaded Image" height="300" />
                                <ImageRemove
                                    onClick={() => {removeFile(elem.id)}}
                                >
                                    <FuseSvgIcon className="text-48" size={24} color="error">material-twotone:close</FuseSvgIcon>
                                </ImageRemove>
                            </ImageWrapper>
                        )
                    })
                }
            </Stack>
        </Container>
    );
})