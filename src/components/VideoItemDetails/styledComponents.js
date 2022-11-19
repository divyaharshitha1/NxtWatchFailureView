import styled from 'styled-components'

export const VideoContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  overflow-y: auto;
  background-color: ${props => props.bgColor};
  color: ${props => props.color};
  overflow: auto;
  padding: 20px 5px;
`
export const VideoFrameContainer = styled.div`
  width: 100%;
  overflow: auto;
  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`
export const ParaEle = styled.p`
  font-size: ${props => props.fontSize};
  padding-left: 20px;
  padding-bottom: ${props => props.padding};
  font-weight: ${props => props.fontWeight};
  color: ${props => props.color};
  @media screen and (min-width: 768px) {
    align-self: flex-start;
  }
  @media screen and (max-width: 767px) {
    font-size: 13px;
  }
`
export const AttributesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-bottom: 0;
  align-items: center;
  border-bottom: 1px solid #94a3b8;
  margin: 0 10px;
`
export const ChannelContainer = styled.div`
  display: flex;
  padding: 0px;
  align-items: center;
`
export const ContentContainer = styled.div``

export const ImageEl = styled.img`
  height: 40px;
`
export const IconParas = styled.button`
  cursor: pointer;
  color: ${props => props.iconColor};
  font-size: 15px;
  font-weight: 600;
  padding: 0 20px;
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  outline: none;
`
export const FailureContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 767px) {
    padding: 25px;
    padding-top: 50px;
  }
`
export const FailureImg = styled.img`
  width: 35%;
  object-fit: contain;
  @media (max-width: 767px) {
    width: 50%;
  }
`
export const FailureHead = styled.h1`
  color: ${props => props.color};
`
export const FailurePara = styled.p``

export const FailureButton = styled.button`
  background-color: #4f46f5;
  color: #ffffff;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 10px;
  border-radius: 5px;
`
export const LoaderEl = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 767px) {
    height: 95vh;
  }
`
