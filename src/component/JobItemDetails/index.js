import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import JobItemDetailsCard from '../JobItemDetailsCard'
import SimilarJobSection from '../SimilarJobSection'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobItemDetailsList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    // console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        jobDetails: {
          companyLogoUrl: data.job_details.company_logo_url,
          companyWebsiteUrl: data.job_details.company_website_url,
          employmentType: data.job_details.employment_type,
          id: data.job_details.id,
          jobDescription: data.job_details.job_description,
          location: data.job_details.location,
          packagePerAnnum: data.job_details.package_per_annum,
          title: data.job_details.title,
          rating: data.job_details.rating,
          lifeAtCompany: {
            description: data.job_details.life_at_company.description,
            imageUrl: data.job_details.life_at_company.image_url,
          },
          skills: data.job_details.skills.map(eachItem => ({
            name: eachItem.name,
            imageUrl: eachItem.image_url,
          })),
        },
        similarJobs: data.similar_jobs.map(eachItem => ({
          companyLogoUrl: eachItem.company_logo_url,
          employmentType: eachItem.employment_type,
          id: eachItem.id,
          jobDescription: eachItem.job_description,
          location: eachItem.location,
          rating: eachItem.rating,
          title: eachItem.title,
        })),
      }

      this.setState({
        jobItemDetailsList: updatedData,
        apiStatus: apiStatusConstants.success,
        isLoading: false,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure, isLoading: false})
    }
  }

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader
        type="ThreeDots"
        color="#ffffff"
        data-testid="loader"
        height="50"
        width="50"
      />
    </div>
  )

  clickingJobItemRetryBtn = () => {
    this.getJobItemDetails()
  }

  renderJobItemDetailsContainer = () => {
    const {jobItemDetailsList, apiStatus} = this.state

    return (
      <div className="job-item-details-container">
        <JobItemDetailsCard
          jobItemDetailsList={jobItemDetailsList}
          apiStatus={apiStatus}
          apiStatusConstants={apiStatusConstants}
          clickingJobItemRetryBtn={this.clickingJobItemRetryBtn}
        />
        <SimilarJobSection jobItemDetailsList={jobItemDetailsList} />
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <>
        <Header />
        {isLoading
          ? this.renderLoading()
          : this.renderJobItemDetailsContainer()}
      </>
    )
  }
}

export default JobItemDetails
