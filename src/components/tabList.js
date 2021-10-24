import './tabList.css'

const TabList = props => {
  const {tab, displayList} = props
  const {tabId, displayText} = tab
  console.log(displayText)

  const onTab = () => {
    displayList(tabId)
  }

  return (
    <li>
      <button type="button" onClick={onTab} className="tab-but">
        {displayText}
      </button>
    </li>
  )
}

export default TabList
