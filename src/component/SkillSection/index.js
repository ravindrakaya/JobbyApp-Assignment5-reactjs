import './index.css'

const SkillSection = props => {
  const {skillDetails} = props
  //   const {name, imageUrl} = skillDetails
  console.log(skillDetails)
  return (
    <ul className="skill-container">
      {/* */}
      {skillDetails.map(eachItem => (
        <li className="skill-list-container" key={eachItem.name}>
          <img
            src={eachItem.imageUrl}
            className="skill-img"
            alt={eachItem.name}
          />
          <p className="name-el">{eachItem.name}</p>
        </li>
      ))}
    </ul>
  )
}

export default SkillSection
