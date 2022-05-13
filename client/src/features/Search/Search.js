import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'


export default function Search() {

  const params = useParams();

  useEffect(() => {
    axios.get(`/api/search/?${params.query}`)
  }, [])

  return (
    <div>Search</div>
  )
}
