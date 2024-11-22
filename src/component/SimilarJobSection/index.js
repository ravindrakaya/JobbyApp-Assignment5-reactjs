import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobSection = props => {
  const {jobItemDetailsList} = props
  const {similarJobs} = jobItemDetailsList
  console.log(similarJobs)

  return (
    <div className="similar-job-container">
      <h1 className="similar-job-text">Similar Jobs</h1>
      <ul className="similar-job-list-container">
        {similarJobs.map(eachItem => (
          <li className="similar-list-item-container" key={eachItem.id}>
            <div className="company-logo-container">
              <img
                src={eachItem.companyLogoUrl}
                alt="similar job company logo"
                className="title-img"
              />
              <div className="job-logo-text-container">
                <h1 className="logo-text">{eachItem.title}</h1>
                <div className="star-job-icon-container">
                  <FaStar className="star-icon" />
                  <p className="logo-text">{eachItem.rating}</p>
                </div>
              </div>
            </div>
            <h1 className="similar-job-text">Description</h1>
            <p className="similar-job-text">{eachItem.jobDescription}</p>

            <div className="footer-location-type-container">
              <div className="location-container">
                <IoLocationSharp className="location-icon" />
                <p className="list-description">{eachItem.location}</p>
              </div>
              <div className="location-container">
                <BsFillBriefcaseFill className="location-icon" />
                <p className="list-description">{eachItem.employmentType}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SimilarJobSection
