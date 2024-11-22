import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import ProfileSection from '../ProfileSection'
import JobSection from '../JobSection'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  noFound: 'NOT_FOUND',
}

class Jobs extends Component {
  state = {
    profileDetailsList: [],
    profileStatus: apiStatusConstants.inProgress,
    jobStatus: apiStatusConstants.inProgress,
    jobDetailsList: [],
    searchInput: '',
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({jobStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/jobs'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()

      const updateData = data.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        jobDetailsList: updateData,
        jobStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({jobStatus: apiStatusConstants.failure})
    }
  }

  getProfileDetails = async () => {
    this.setState({profileStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        profileImageUrl: data.profile_details.profile_image_url,
        name: data.profile_details.name,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileDetailsList: updatedData,
        profileStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({profileStatus: apiStatusConstants.failure})
    }
  }

  updateSearchInput = searchInput => {
    this.setState({searchInput})
  }

  getJobsUpOnClick = () => {
    this.getJobDetails()
  }

  clickingProfileRetryBtn = () => {
    this.getProfileDetails()
  }

  updateCheckBoxInput = checkBoxInput => {
    this.setState({checkBoxInput})
  }

  render() {
    const {
      profileDetailsList,
      profileStatus,
      jobDetailsList,
      jobStatus,
      searchInput,
      checkBoxInput,
    } = this.state
    return (
      <>
        <Header />
        <div className="job-container">
          <ProfileSection
            profileDetailsList={profileDetailsList}
            profileStatus={profileStatus}
            apiStatusConstants={apiStatusConstants}
            updateCheckBoxInput={this.updateCheckBoxInput}
            checkBoxInput={checkBoxInput}
            clickingProfileRetryBtn={this.clickingProfileRetryBtn}
          />
          <JobSection
            jobDetailsList={jobDetailsList}
            jobStatus={jobStatus}
            apiStatusConstants={apiStatusConstants}
            updateSearchInput={this.updateSearchInput}
            searchInput={searchInput}
            getJobsUpOnClick={this.getJobsUpOnClick}
          />
        </div>
      </>
    )
  }
}

export default Jobs
