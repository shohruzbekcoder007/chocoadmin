import styled from "styled-components";

export const ImageWrapper = styled.div`
    display: inline-block;
    width: 180px;
    height: 180px;
    padding: 5px;
    border: 1px dashed #ccc;
    position: relative;
    img {
        display: inline-block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`

export const ImageContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const ImageRemove = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 24px;
    height: 24px;
    cursor: pointer;

`