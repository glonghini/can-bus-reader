type Props = {
  value: string,
  onChange: (value: string) => void
}

export default function Tabs({ value, onChange }: Props) {
  return <div className='tabs-container'>
    <Tab label='Read Stream' value='readStream' />
    <Tab label='OBD2' value='obd2' />
    <hr />
  </div>
}


function Tab({ label, value }: { label: string, value: string }) {
  return <div className='tab'>
    {label.toUpperCase()}
  </div>
}