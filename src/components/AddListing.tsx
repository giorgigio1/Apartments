import React from 'react'
import { useNavigate } from 'react-router-dom'

const AddListing = () => {

    const navigate = useNavigate()

  return (
    <div>
        <h1>Add Lising</h1>
        <button className="listing" onClick={() => navigate("/")}>Home page</button>

    </div>
  )
}

export default AddListing