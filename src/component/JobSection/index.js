import Loader from 'react-loader-spinner'
import {IoSearch} from 'react-icons/io5'
import JobItem from '../JobItem'

import './index.css'

const JobSection = props => {
  const {
    jobDetailsList,
    jobStatus,
    apiStatusConstants,
    updateSearchInput,
    searchInput,
    getJobsUpOnClick,
  } = props

  const renderNoJobText = () => (
    <div>
      <h1 className="jobs-fail-heading">No Jobs Found</h1>
      <p className="jobs-fail-description">
        We could not find any jobs. Try other filters
      </p>
      <img src="" alt="no jobs" />
    </div>
  )

  const renderJobsSuccess = () => {
    const searchResults = jobDetailsList.filter(eachItem =>
      eachItem.title.toLowerCase().includes(searchInput.toLowerCase()),
    )
    if (searchResults.length === 0) {
      renderNoJobText()
    }

    return (
      <ul className="job-success-view-container">
        {searchResults.map(eachItem => (
          <JobItem key={eachItem.employmentType} jobDetails={eachItem} />
        ))}
      </ul>
    )
  }

  const onClickJobRetryBtn = () => {
    getJobsUpOnClick()
  }

  const renderJobsFailure = () => (
    <div className="jobs-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-fail-img"
      />
      <h1 className="jobs-fail-heading">Oops! Something Went Wrong</h1>
      <p className="jobs-fail-description">
        we cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        data-testid="searchButton"
        onClick={onClickJobRetryBtn}
        className="retry-btn"
      >
        Retry
      </button>
    </div>
  )

  const renderNoJobsView = () => (
    <div className="jobs-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="jobs-fail-img"
      />
      <h1 className="jobs-fail-heading">No Jobs Found</h1>
      <p className="jobs-fail-description">
        we could not find any jobs. Try other filters.
      </p>
      <button
        type="button"
        className="retry-btn"
        data-testid="searchButton"
        onClick={onClickJobRetryBtn}
      >
        Retry
      </button>
    </div>
  )

  const renderLoading = () => (
    <div className="loader-container">
      <Loader
        data-testid="loader"
        type="ThreeDots"
        color="#ffffff"
        height="50"
        width="50"
      />
    </div>
  )

  const renderJobsContainer = () => {
    switch (jobStatus) {
      case apiStatusConstants.success:
        return renderJobsSuccess()
      case apiStatusConstants.failure:
        return renderJobsFailure()
      case apiStatusConstants.inProgress:
        return renderLoading()
      case apiStatusConstants.noFound:
        return renderNoJobsView()
      default:
        return null
    }
  }

  const onChangeSearchInput = event => {
    updateSearchInput(event.target.value)
  }

  const onClickSearchIcon = () => {
    getJobsUpOnClick()
  }

  const renderJobSection = () => (
    <div className="right-part-container">
      <div className="search-input-container">
        <input
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={onChangeSearchInput}
          value={searchInput}
        />
        <button
          className="search-btn"
          type="button"
          data-testid="searchButton"
          onClick={onClickSearchIcon}
        >
          <IoSearch className="react-search-icon" />
        </button>
      </div>
      {renderJobsContainer()}
    </div>
  )

  return renderJobSection()
}

export default JobSection
