/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import {Component} from 'react'
// eslint-disable-next-line import/extensions
// eslint-disable-next-line no-unused-vars
import TabList from './tabList'
// eslint-disable-next-line no-unused-vars
import ThumbNail from './thumbNail'
import './game.css'

class Game extends Component {
  state = {
    list: [],
    status: true,
    id: 'FRUIT',
    imageUrl: '',
    timer: 60,
    imgId: '',
    score: 0,
    index: 0,
  }

  componentDidMount() {
    this.getList()
    this.timeInterval()
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  timeInterval = () => {
    this.timerId = setInterval(this.getTime, 1000)
  }

  getTime = () => {
    const {timer} = this.state
    if (timer >= 1) {
      this.setState(prevState => ({
        // eslint-disable-next-line no-labels
        timer: prevState.timer - 1,
      }))
    } else {
      this.setState({status: false})
    }
  }

  displayList = Id => {
    this.setState({id: Id}, this.getList)
  }

  getList = () => {
    const {imagesList} = this.props
    const {id, index} = this.state
    const data = imagesList.filter(each => each.category === id)

    this.setState({
      list: data,
      imageUrl: imagesList[index].imageUrl,
      imgId: imagesList[index].id,
    })

    // const index = Math.floor(Math.random() * 15)
    // const kk = imagesList[index].imageUrl
    // console.log(kk)
    // const kk1 = imagesList[index].id
  }

  checkScore = Id => {
    const {imgId} = this.state
    // const {imagesList} = this.props
    const rand = Math.floor(Math.random() * 30)
    // const kk = imagesList[index].imageUrl
    // console.log(kk)
    //  const kk1 = imagesList[index].id

    const check = imgId === Id
    if (check) {
      this.setState(
        prevState => ({score: parseInt(prevState.score) + 1, index: rand}),
        this.getList,
      )
    } else {
      this.setState({status: false})
    }
  }

  onReset = () => {
    this.setState({status: true, timer: 60, score: 0}, this.timeInterval)
  }

  matchComplete = () => {
    const {score} = this.state
    clearInterval(this.timerId)
    return (
      <div className="game-over">
        <img
          src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
          alt="trophy"
          className="trophy"
        />
        <p>YOUR SCORE</p>
        <p>{score}</p>
        <button type="button" className="reset-but" onClick={this.onReset}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png "
            alt="reset"
          />
          PLAY AGAIN
        </button>
      </div>
    )
  }

  gameStart = () => {
    const {list, imageUrl} = this.state
    const {tabsList1} = this.props
    return (
      <>
        <img src={imageUrl} alt="match" className="big-img" />
        <ul className="tab">
          {tabsList1.map(each => (
            <TabList
              key={each.tabId}
              tab={each}
              displayList={this.displayList}
            />
          ))}
        </ul>
        <ul className="tab-img">
          {list.map(each => (
            <ThumbNail key={each.id} nail={each} checkScore={this.checkScore} />
          ))}
        </ul>
      </>
    )
  }

  render() {
    const {timer, score, status} = this.state
    return (
      <div className="page">
        <nav className="nav-bar">
          <ul className="nav-bar">
            <li>
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
                alt="website logo"
                className="logo"
              />
            </li>
            <li>
              <p>
                score:<span className="score-color">{score}</span>
              </p>
            </li>
            <li>
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png "
                alt="timer"
              />
            </li>
            <p className="score">{timer} sec</p>
          </ul>
        </nav>

        {status ? this.gameStart() : this.matchComplete()}
      </div>
    )
  }
}

export default Game
