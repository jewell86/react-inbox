import React from 'react'

const Body = ({ body }) => {
  return (
    <div class="row message-body">
      <div class="col-xs-11 col-xs-offset-1">
        { body }
      </div>
    </div>
  )
}

export default Body