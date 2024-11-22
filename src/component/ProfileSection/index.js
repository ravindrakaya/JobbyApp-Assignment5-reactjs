import Loader from 'react-loader-spinner'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const ProfileSection = props => {
  const {
    profileDetailsList,
    profileStatus,
    apiStatusConstants,
    // updateCheckBoxInput,
    clickingProfileRetryBtn,
  } = props

  const renderProfileBottomContainer = () => (
    <div className="profile-bottom-container">
      <hr className="head-rise" />
      <h1 className="type-of-emp-text">Type of Employment</h1>
      <ul className="un-order-list-container">
        {employmentTypesList.map(eachItem => (
          <li className="label-container" key={eachItem.employmentTypeId}>
            <input
              className="label-input"
              type="checkbox"
              id={eachItem.employmentTypeId}
              value={eachItem.employmentTypeId}
              // onChange={onChangeCheckBox}
            />
            <label htmlFor={eachItem.employmentTypeId} className="label-para">
              {eachItem.label}
            </label>
          </li>
        ))}
      </ul>
      <hr className="head-rise" />
      <h1 className="type-of-emp-text">Salary Range</h1>
      <ul className="un-order-list-container">
        {salaryRangesList.map(eachItem => (
          <li className="label-container" key={eachItem.salaryRangeId}>
            <input
              className="label-input"
              type="radio"
              name="salary"
              value={eachItem.label}
              id={eachItem.salaryRangeId}
            />
            <label htmlFor={eachItem.salaryRangeId} className="label-para">
              {eachItem.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )

  const renderProfileSuccess = () => {
    const {profileImageUrl, name, shortBio} = profileDetailsList

    return (
      <>
        <div className="profile-container">
          <img
            src={profileImageUrl}
            alt="profile"
            className="profile-image-url"
          />
          <h1 className="profile-heading">{name}</h1>
          <p className="profile-description">{shortBio}</p>
        </div>
        {renderProfileBottomContainer()}
      </>
    )
  }

  const onClickProfileRetryBtn = () => {
    clickingProfileRetryBtn()
  }

  const renderProfileFailure = () => (
    <>
      <div className="failure-container">
        <button
          type="button"
          className="retry-btn"
          onClick={onClickProfileRetryBtn}
        >
          Retry
        </button>
      </div>
      {renderProfileBottomContainer()}
    </>
  )

  const renderLoading = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  const renderProfileContainer = () => {
    switch (profileStatus) {
      case apiStatusConstants.success:
        return renderProfileSuccess()
      case apiStatusConstants.failure:
        return renderProfileFailure()
      case apiStatusConstants.inProgress:
        return renderLoading()
      default:
        return null
    }
  }

  return <div className="left-part-container">{renderProfileContainer()}</div>
}

export default ProfileSection
