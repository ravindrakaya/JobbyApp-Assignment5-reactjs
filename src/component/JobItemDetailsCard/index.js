import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {HiOutlineExternalLink} from 'react-icons/hi'
import Loader from 'react-loader-spinner'
import SkillSection from '../SkillSection'
import './index.css'

const JobItemDetailsCard = props => {
  const {
    apiStatus,
    jobItemDetailsList,
    apiStatusConstants,
    clickingJobItemRetryBtn,
  } = props
  const {jobDetails} = jobItemDetailsList
  const {
    companyLogoUrl,
    companyWebsiteUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    title,
    rating,
    lifeAtCompany,
    skills,
  } = jobDetails

  const {description, imageUrl} = lifeAtCompany

  const onClickJobItemRetryBtn = () => {
    clickingJobItemRetryBtn()
  }

  const renderJobItemDetailsSuccess = () => (
    <div className="job-description-detail-container">
      <div className="company-logo-container">
        <img
          src={companyLogoUrl}
          alt="job details company logo"
          className="title-img"
        />
        <div className="job-logo-text-container">
          <h1 className="logo-text">{title}</h1>
          <div className="star-job-icon-container">
            <FaStar className="star-icon" />
            <p className="logo-text">{rating}</p>
          </div>
        </div>
      </div>
      <div className="job-address-type-container">
        <div className="location-type-container">
          <div className="location-container">
            <IoLocationSharp className="location-icon" />
            <p className="list-description">{location}</p>
          </div>
          <div className="location-container">
            <BsFillBriefcaseFill className="location-icon" />
            <p className="list-description">{employmentType}</p>
          </div>
        </div>
        <p className="list-description">{packagePerAnnum}</p>
      </div>
      <hr className="list-head-rise" />

      <div className="job-item-detail-description-container">
        <h1 className="logo-text">Description</h1>
        <a
          href={companyWebsiteUrl}
          className="anchor-el"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit
          <span>
            <HiOutlineExternalLink className="external-link" />
          </span>
        </a>
      </div>
      <p className="logo-text">{jobDescription}</p>
      <div className="skills-container">
        <h1 className="logo-text">Skills</h1>
        <SkillSection skillDetails={skills} />
      </div>
      <h1 className="logo-text">Life at Company</h1>
      <div className="life-at-company-container">
        <p className="logo-text">{description}</p>
        <img
          src={imageUrl}
          alt="job details company logo"
          className="title-life-img"
        />
      </div>
    </div>
  )

  const renderJobItemDetailsFailure = () => (
    <div className="job-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-failure-view"
      />
      <h1 className="jobs-fail-heading">Oops! Something Went Wrong</h1>
      <p className="jobs-fail-description">
        we cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-btn"
        onClick={onClickJobItemRetryBtn}
      >
        Retry
      </button>
    </div>
  )

  const renderLoading = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  const renderJobItemDetails = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderJobItemDetailsSuccess()
      case apiStatusConstants.failure:
        return renderJobItemDetailsFailure()
      case apiStatusConstants.inProgress:
        return renderLoading()
      default:
        return null
    }
  }

  return renderJobItemDetails()
}

export default JobItemDetailsCard
