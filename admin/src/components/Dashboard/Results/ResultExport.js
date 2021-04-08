import React from 'react'
import DownloadButton from '../../UI/DownloadButton'
import { CSVLink } from 'react-csv'

const ResultExport = ({ data, headers, filename }) => {
  return (
    <CSVLink data={data} headers={headers} filename={filename}>
      <DownloadButton />
    </CSVLink>
  )
}

export default ResultExport
