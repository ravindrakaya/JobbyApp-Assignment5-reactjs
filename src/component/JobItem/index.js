import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobDetails
  return (
    <Link to={`/jobs/${id}`} className="job-link-class">
      <li className="job-list-container">
        <div className="title-container">
          <img src={companyLogoUrl} className="list-img" alt="company logo" />
          <div>
            <h1 className="list-heading">{title}</h1>
            <div className="rating-container">
              <FaStar className="star-icon" />
              <p className="list-description">{rating}</p>
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
        <h1 className="list-heading">Description</h1>
        <p className="list-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem
