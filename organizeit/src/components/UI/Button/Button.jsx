import React from 'react'

function Button(props) {
  return (
      <button
          type={ props.type }
          className={props?.className}
          onClick={props?.onClick}
          {...(props.attributes && props.attributes)}
      >
          { props.children }
      </button>
  )
}

export default Button;