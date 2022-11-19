import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link, Redirect} from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import {IoIosClose} from 'react-icons/io'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import AppTheme from '../../context/Theme'
import Header from '../Header'
import Navbar from '../Navbar'

/* import FailureView from '../FailureView' */

import {
  HomeContainer,
  BannerContainer,
  ImageEl,
  ImageContainer,
  BannerPara,
  BannerButton,
  CloseBtn,
  SearchInputContainer,
  SearchInput,
  ButtonEl,
  ListContainer,
  ListItem,
  ImageTag,
  ContentDiv,
  ParaTag,
  NoVideosImage,
  NoResults,
  NoResultsHeading,
  NoResultsPara,
  NoResultsButton,
  FailureContainer,
  FailurePara,
  FailureHead,
  FailureButton,
  FailureImg,
  LoaderEl,
} from './styledComponents'

import './index.css'

/* const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}
*/

class Home extends Component {
  state = {
    dataArray: [],
    status: '',
    searchInput: '',
    showBanner: true,
    isLoading: true,
  }

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async (searchValue = '') => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchValue}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    try {
      const response = await fetch(apiUrl, options)
      if (response.ok) {
        const data = await response.json()
        await this.setState({dataArray: data.videos, status: true})
      }
    } catch {
      this.setState({status: false})
    }
    this.setState({isLoading: false})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onSearchIcon = () => {
    const {searchInput} = this.state
    this.getVideos(searchInput)
  }

  onKey = event => {
    if (event.key.toLowerCase() === 'enter') {
      this.onSearchIcon()
    }
  }

  onRetry = () => {
    this.getVideos()
  }

  onCloseBtn = () => {
    this.setState(prevState => ({showBanner: !prevState.showBanner}))
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

  /* renderSuccessView = () => {
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
          const bgColor = activeTheme === 'light' ? '#f9f9f9' : '#181818'

          return (
            <>
              {dataArray.length === 0 ? (
                <NoResults>
                  <NoVideosImage
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
                    alt="no videos"
                  />
                  <NoResultsHeading>No Search results found</NoResultsHeading>
                  <NoResultsPara>
                    Try different key words or remove search filter
                  </NoResultsPara>
                  <NoResultsButton onClick={this.onRetry}>
                    Retry
                  </NoResultsButton>
                </NoResults>
              ) : (
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
                            width="100%"
                            alt="video thumbnail"
                          />
                        </ListItem>
                        <ListItem>
                          <div className="logo-div">
                            <ImageTag
                              src={`${item.channel.profile_image_url}`}
                              width="30px"
                              alt="channel logo"
                            />
                          </div>
                          <div>
                            <ParaTag fontSize="15px" color={`${color}`}>
                              {item.title}
                            </ParaTag>
                            <ParaTag fontSize="12px" color=" #94a3b8">
                              {item.channel.name}
                            </ParaTag>
                            <ParaTag fontSize="12px" color="#94a3b8">
                              {item.view_count} views .
                              <span>{item.published_at}</span>
                            </ParaTag>
                          </div>
                        </ListItem>
                      </ListContainer>
                    </Link>
                  ))}
                </ContentDiv>
              )}
            </>
          )
        }}
      </AppTheme.Consumer>
    )
  }

  checkStatus = () => {
    const {appStatus} = this.state

    switch (appStatus) {
      case apiStatusConstants:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.LoaderComponent()
      default:
        return null
    }
  }
  */

  /* render() {
    const {showBanner, searchInput} = this.state
    return (
      <AppTheme.Consumer>
        {value => {
          const {activeTheme} = value
          const color = activeTheme === 'light' ? '#000000' : '#ffffff'
          const bgColor = activeTheme === 'light' ? '#f9f9f9' : '#0f0f0f'
          const theme = activeTheme === 'light' ? 'light' : 'dark'

          return (
            <HomeContainer
              bgColor={`${bgColor}`}
              color={`${color}`}
              data-testid="home"
            >
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
                    <SearchInputContainer>
                      <SearchInput
                        type="search"
                        placeholder="Search"
                        value={searchInput}
                        onChange={this.onChangeSearchInput}
                        onKeyDown={this.onKey}
                      />
                      <ButtonEl
                        onClick={this.onSearchIcon}
                        type="button"
                        color={color}
                        data-testid="searchButton"
                      >
                        <AiOutlineSearch size={20} />
                      </ButtonEl>
                    </SearchInputContainer>
                    {this.checkStatus()}
                  </div>
                </div>
              </>
            </HomeContainer>
          )
        }}
      </AppTheme.Consumer>
    )
  }
  */

  render() {
    const {dataArray, isLoading, status, searchInput, showBanner} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <AppTheme.Consumer>
        {value => {
          const {activeTheme} = value
          const color = activeTheme === 'light' ? '#000000' : '#ffffff'
          const bgColor = activeTheme === 'light' ? '#f9f9f9' : '#181818'
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
                    data-testid="home"
                  >
                    {isLoading ? (
                      this.LoaderComponent()
                    ) : (
                      <>
                        {status ? (
                          <>
                            {showBanner ? (
                              <BannerContainer data-testid="banner">
                                <ImageContainer>
                                  <ImageEl
                                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                                    alt="nxt watch logo"
                                  />
                                  <CloseBtn
                                    type="button"
                                    onClick={this.onCloseBtn}
                                    cursor="pointer"
                                    data-testid="close"
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

                            <SearchInputContainer>
                              <SearchInput
                                type="search"
                                placeholder="Search"
                                value={searchInput}
                                onChange={this.onChangeSearchInput}
                                onKeyDown={this.onKey}
                              />
                              <ButtonEl
                                onClick={this.onSearchIcon}
                                type="button"
                                color={color}
                                data-testid="searchButton"
                              >
                                <AiOutlineSearch size={20} />
                              </ButtonEl>
                            </SearchInputContainer>
                            <>
                              {dataArray.length === 0 ? (
                                <NoResults>
                                  <NoVideosImage
                                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
                                    alt="no videos"
                                  />
                                  <NoResultsHeading>
                                    No Search results found
                                  </NoResultsHeading>
                                  <NoResultsPara>
                                    Try different key words or remove search
                                    filter
                                  </NoResultsPara>
                                  <NoResultsButton onClick={this.onRetry}>
                                    Retry
                                  </NoResultsButton>
                                </NoResults>
                              ) : (
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
                                            width="100%"
                                            alt="video thumbnail"
                                          />
                                        </ListItem>
                                        <ListItem>
                                          <div className="logo-div">
                                            <ImageTag
                                              src={`${item.channel.profile_image_url}`}
                                              width="30px"
                                              alt="channel logo"
                                            />
                                          </div>
                                          <div>
                                            <ParaTag
                                              fontSize="15px"
                                              color={`${color}`}
                                            >
                                              {item.title}
                                            </ParaTag>
                                            <ParaTag
                                              fontSize="12px"
                                              color=" #94a3b8"
                                            >
                                              {item.channel.name}
                                            </ParaTag>
                                            <ParaTag
                                              fontSize="12px"
                                              color="#94a3b8"
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
                              )}
                            </>
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
  }
}

export default Home
