import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {MdPlaylistAdd} from 'react-icons/md'
import Header from '../Header'
import Navbar from '../Navbar'

import {
  VideoFrameContainer,
  VideoContainer,
  ParaEle,
  AttributesContainer,
  ChannelContainer,
  ImageEl,
  ContentContainer,
  IconParas,
  FailureContainer,
  FailurePara,
  FailureHead,
  FailureButton,
  FailureImg,
  LoaderEl,
} from './styledComponents'

import AppTheme from '../../context/Theme'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class VideoItemDetails extends Component {
  state = {
    videoDetails: {},
    channelDataObj: {},
    liked: false,
    disliked: false,
    saved: false,
    appStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({appStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const responseData = await response.json()
      const data = responseData.video_details
      const convertedData = {
        channel: data.channel,
        id: data.id,
        thumbnailUrl: data.thumbnail_url,
        publishedAt: data.published_at,
        title: data.title,
        videoUrl: data.video_url,
        viewCount: data.view_count,
        description: data.description,
      }
      const channelData = {
        name: data.channel.name,
        profileImageUrl: data.channel.profile_image_url,
        subscriberCount: data.channel.subscriber_count,
      }
      this.setState({
        videoDetails: convertedData,
        channelDataObj: channelData,
        appStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({appStatus: apiStatusConstants.failure})
    }
  }

  isDisliked = () => {
    const {liked, disliked} = this.state
    if (liked) {
      this.setState({liked: false})
    }
    if (disliked) {
      this.setState({disliked: false})
    } else {
      this.setState({disliked: true})
    }
  }

  isLiked = () => {
    const {liked, disliked} = this.state
    if (disliked) {
      this.setState({disliked: false})
    }
    if (liked) {
      this.setState({liked: false})
    } else {
      this.setState({liked: true})
    }
  }

  isSaved = async () => {
    const {saved} = this.state
    if (saved) {
      await this.setState({saved: false})
    } else {
      this.setState({saved: true})
    }
  }

  renderFailureView = () => (
    <AppTheme.Consumer>
      {value => {
        const {activeTheme} = value
        return (
          <FailureContainer>
            {activeTheme === 'light' ? (
              <FailureImg
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
                alt="failure view"
              />
            ) : (
              <FailureImg
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png"
                alt="failure view"
              />
            )}
            <FailureHead color>Oops! Something Went Wrong</FailureHead>
            <FailurePara>
              We are having some trouble to complete your request. Please try
              again.
            </FailurePara>
            <FailureButton onClick={this.onRetry}>Retry</FailureButton>
          </FailureContainer>
        )
      }}
    </AppTheme.Consumer>
  )

  LoaderComponent = () => (
    <AppTheme.Consumer>
      {value => {
        const {activeTheme} = value
        return (
          <LoaderEl data-testid="loader">
            <Loader
              type="Bars"
              color={activeTheme ? '#00BFFF' : '#000000'}
              height={50}
              width={50}
            />
          </LoaderEl>
        )
      }}
    </AppTheme.Consumer>
  )

  renderSuccessView = () => {
    const {videoDetails, channelDataObj, liked, disliked, saved} = this.state
    const {videoUrl, title, viewCount, publishedAt, description} = videoDetails

    return (
      <AppTheme.Consumer>
        {value => {
          const {activeTheme, addSavedVideos} = value
          const color = activeTheme === 'light' ? '#000000' : '#ffffff'
          const bgColor = activeTheme === 'light' ? '#f9f9f9' : '#0f0f0f'

          const onSaved = () => {
            this.isSaved()
            addSavedVideos(videoDetails)
          }

          return (
            <VideoContainer
              bgColor={`${bgColor}`}
              color={`${color}`}
              data-testid="videoItemDetails"
            >
              <VideoFrameContainer>
                <ReactPlayer url={videoUrl} control className="react-player" />
                <ParaEle color={`${color}`} fontWeight="bold" fontSize="15px">
                  {title}
                </ParaEle>
              </VideoFrameContainer>
              <AttributesContainer>
                <ParaEle color="#94a3b8" fontWeight="500" fontSize="13px">
                  {viewCount} . {publishedAt}
                </ParaEle>
                <ChannelContainer color={color}>
                  <IconParas
                    onClick={this.isLiked}
                    iconColor={liked ? '#2563eb' : '#64748b'}
                    color="#94a3b8"
                  >
                    <AiOutlineLike size={20} /> Like
                  </IconParas>
                  <IconParas
                    onClick={this.isDisliked}
                    iconColor={disliked ? '#2563eb' : '#64748b'}
                  >
                    <AiOutlineDislike size={20} /> Dislike
                  </IconParas>
                  <IconParas
                    onClick={onSaved}
                    iconColor={saved ? '#2563eb' : '#64748b'}
                  >
                    <MdPlaylistAdd size={20} /> {saved ? 'Saved' : 'Save'}
                  </IconParas>
                </ChannelContainer>
              </AttributesContainer>
              <ChannelContainer>
                <ImageEl
                  src={channelDataObj.profileImageUrl}
                  alt="channel logo"
                />
                <ContentContainer>
                  <ParaEle>{channelDataObj.name}</ParaEle>
                  <ParaEle color="#94a3b8" fontWeight="500" fontSize="13px">
                    {channelDataObj.subscriberCount} subscribers
                  </ParaEle>
                </ContentContainer>
              </ChannelContainer>
              <p className="description">{description}</p>
            </VideoContainer>
          )
        }}
      </AppTheme.Consumer>
    )
  }

  checkStatus = () => {
    const {appStatus} = this.state

    switch (appStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.LoaderComponent()
      default:
        return null
    }
  }

  render() {
    return (
      <AppTheme.Consumer>
        {value => {
          const {activeTheme} = value
          const theme = activeTheme === 'light' ? 'light' : 'dark'

          return (
            <>
              <Header />
              <div className={`${theme} main-frame-container`}>
                <Navbar />
                <div className="content">{this.checkStatus()}</div>
              </div>
            </>
          )
        }}
      </AppTheme.Consumer>
    )
  }
}

export default VideoItemDetails
