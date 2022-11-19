import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link, Redirect} from 'react-router-dom'
import {AiFillFire} from 'react-icons/ai'
import {IoIosClose} from 'react-icons/io'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import AppTheme from '../../context/Theme'
import Header from '../Header'
import Navbar from '../Navbar'

import './index.css'
import {
  HomeContainer,
  BannerContainer,
  ImageEl,
  ImageContainer,
  BannerPara,
  BannerButton,
  CloseBtn,
  ListContainer,
  ListItem,
  ImageTag,
  LogoImage,
  HeadDiv,
  HeaderEle,
  ContentDiv,
  ParaTag,
  FailureContainer,
  FailurePara,
  FailureHead,
  FailureButton,
  FailureImg,
  LoaderEl,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Trending extends Component {
  state = {
    dataArray: [],
    appStatus: apiStatusConstants.initial,
    showBanner: true,
  }

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    this.setState({appStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/videos/trending'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      this.setState({
        dataArray: data.videos,
        appStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({appStatus: apiStatusConstants.failure})
    }
  }

  onCloseBtn = () => {
    this.setState(prevState => ({showBanner: !prevState.showBanner}))
  }

  onRetry = () => {
    this.getVideos()
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
    const {dataArray} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <AppTheme.Consumer>
        {value => {
          const {activeTheme} = value
          const color = activeTheme === 'light' ? '#000000' : '#ffffff'
          const bgColor = activeTheme === 'light' ? '#f9f9f9' : '#0f0f0f'

          return (
            <HomeContainer
              bgColor={`${bgColor}`}
              color={`${color}`}
              data-testid="trending"
            >
              <>
                <HeadDiv>
                  <HeaderEle
                    bgColor={activeTheme === 'light' ? '#f1f1f1' : '#181818'}
                    color={`${color}`}
                    data-testid="trending"
                  >
                    <AiFillFire
                      size={40}
                      className={`trend-icon ${activeTheme}-icon`}
                    />
                    Trending
                  </HeaderEle>
                </HeadDiv>
                <ContentDiv>
                  {dataArray.map(item => (
                    <Link
                      to={`/videos/${item.id}`}
                      className={
                        activeTheme === 'light' ? 'link-light' : 'link-dark'
                      }
                      key={item.id}
                    >
                      <ListContainer>
                        <ListItem>
                          <ImageTag
                            src={`${item.thumbnail_url}`}
                            width="350px"
                            alt="video thumbnail"
                          />
                        </ListItem>
                        <ListItem>
                          <div className="logo-div">
                            <LogoImage
                              src={`${item.channel.profile_image_url}`}
                              width="30px"
                            />
                          </div>
                          <div>
                            <ParaTag
                              fontSize="18px"
                              color={`${color}`}
                              fontWeight="700"
                            >
                              {item.title}
                            </ParaTag>
                            <ParaTag
                              fontSize="15px"
                              color="#94a3b8"
                              fontWeight="500"
                            >
                              {item.channel.name}
                            </ParaTag>
                            <ParaTag
                              fontSize="15px"
                              color=" #94a3b8"
                              fontWeight="500"
                            >
                              {item.view_count} views .
                              <span>{item.published_at}</span>
                            </ParaTag>
                          </div>
                        </ListItem>
                      </ListContainer>
                    </Link>
                  ))}
                </ContentDiv>
              </>
            </HomeContainer>
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
    const {showBanner} = this.state
    return (
      <AppTheme.Consumer>
        {value => {
          const {activeTheme} = value

          const theme = activeTheme === 'light' ? 'light' : 'dark'

          return (
            <>
              <>
                <Header />
                <div className={`${theme} main-frame-container`}>
                  <Navbar />
                  <div className="content">
                    {showBanner ? (
                      <BannerContainer>
                        <ImageContainer>
                          <ImageEl
                            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                            alt="website logo"
                          />
                          <CloseBtn type="button" onClick={this.onCloseBtn}>
                            <IoIosClose size={25} />
                          </CloseBtn>
                        </ImageContainer>
                        <BannerPara>
                          Buy Nxt Watch Premium prepaid plans with UPI
                        </BannerPara>
                        <BannerButton>GET IT NOW</BannerButton>
                      </BannerContainer>
                    ) : null}
                    {this.checkStatus()}
                  </div>
                </div>
              </>
            </>
          )
        }}
      </AppTheme.Consumer>
    )
  }

  /* render() {
    const {dataArray, isLoading, appStatus, showBanner} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <AppTheme.Consumer>
        {value => {
          const {activeTheme} = value

          const color = activeTheme === 'light' ? '#000000' : '#ffffff'
          const bgColor = activeTheme === 'light' ? '#f9f9f9' : '#0f0f0f'
          const theme = activeTheme === 'light' ? 'light' : 'dark'

          return (
            <>
              <Header />
              <div className={`${theme} main-frame-container`}>
                <Navbar />
                <div className="content">
                  <HomeContainer
                    bgColor={`${bgColor}`}
                    color={`${color}`}
                    data-testid="trending"
                  >
                    {isLoading ? (
                      this.LoaderComponent()
                    ) : (
                      <>
                        {appStatus ? (
                          <>
                            {showBanner ? (
                              <BannerContainer>
                                <ImageContainer>
                                  <ImageEl
                                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                                    alt="website logo"
                                  />
                                  <CloseBtn
                                    type="button"
                                    onClick={this.onCloseBtn}
                                  >
                                    <IoIosClose size={25} />
                                  </CloseBtn>
                                </ImageContainer>
                                <BannerPara>
                                  Buy Nxt Watch Premium prepaid plans with UPI
                                </BannerPara>
                                <BannerButton>GET IT NOW</BannerButton>
                              </BannerContainer>
                            ) : null}

                            <HeadDiv>
                              <HeaderEle
                                bgColor={
                                  activeTheme === 'light'
                                    ? '#f1f1f1'
                                    : '#181818'
                                }
                                color={`${color}`}
                                data-testid="trending"
                              >
                                <AiFillFire
                                  size={40}
                                  className={`trend-icon ${activeTheme}-icon`}
                                />
                                Trending
                              </HeaderEle>
                            </HeadDiv>
                            <ContentDiv>
                              {dataArray.map(item => (
                                <Link
                                  to={`/videos/${item.id}`}
                                  className={
                                    activeTheme === 'light'
                                      ? 'link-light'
                                      : 'link-dark'
                                  }
                                  key={item.id}
                                >
                                  <ListContainer>
                                    <ListItem>
                                      <ImageTag
                                        src={`${item.thumbnail_url}`}
                                        width="350px"
                                        alt="video thumbnail"
                                      />
                                    </ListItem>
                                    <ListItem>
                                      <div className="logo-div">
                                        <LogoImage
                                          src={`${item.channel.profile_image_url}`}
                                          width="30px"
                                        />
                                      </div>
                                      <div>
                                        <ParaTag
                                          fontSize="18px"
                                          color={`${color}`}
                                          fontWeight="700"
                                        >
                                          {item.title}
                                        </ParaTag>
                                        <ParaTag
                                          fontSize="15px"
                                          color="#94a3b8"
                                          fontWeight="500"
                                        >
                                          {item.channel.name}
                                        </ParaTag>
                                        <ParaTag
                                          fontSize="15px"
                                          color=" #94a3b8"
                                          fontWeight="500"
                                        >
                                          {item.view_count} views .
                                          <span>{item.published_at}</span>
                                        </ParaTag>
                                      </div>
                                    </ListItem>
                                  </ListContainer>
                                </Link>
                              ))}
                            </ContentDiv>
                          </>
                        ) : (
                          this.renderFailureView()
                        )}
                      </>
                    )}
                  </HomeContainer>
                </div>
              </div>
            </>
          )
        }}
      </AppTheme.Consumer>
    )
  } */
}

export default Trending
