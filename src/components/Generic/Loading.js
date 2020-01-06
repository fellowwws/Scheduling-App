import React, { useState, useEffect, useRef } from 'react'

const initState = 'Loading'.split('') //['L','o','a','d','i','n','g']

function Loading() {
  const [message, setMessage] = useState(initState)

  useInterval(() => {
    setMessage([...message, '.']) //['L','o','a','d','i','n','g','.','.','.']
  }, 300)

  useEffect(() => {
    if (message.length > 10) setMessage(initState)
  }, [message])

  return (
    <p className="text-center text-muted">
      <small>{message.join('')}</small>
    </p>
  )
}

function useInterval(callback, interval) {
  const savedCallback = useRef()

  useEffect(() => {
    savedCallback.current = callback
  })

  useEffect(() => {
    function tick() {
      savedCallback.current()
    }

    let id = setInterval(tick, interval)
    return () => clearInterval(id)
  }, [])
}

export default Loading
