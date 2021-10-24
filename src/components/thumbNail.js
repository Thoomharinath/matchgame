import './index.css'

const ThumbNail = props => {
  const {nail, checkScore} = props
  const {id, thumbnailUrl} = nail

  const onScore = () => {
    checkScore(id)
  }

  return (
    <li>
      <button type="button" className="card" onClick={onScore}>
        <img src={thumbnailUrl} alt="thumbnail" className="image" />
      </button>
    </li>
  )
}

export default ThumbNail
