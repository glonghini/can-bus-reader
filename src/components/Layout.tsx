import { useCallback, useEffect, useMemo, useState } from "react"

type Props = {
  children: React.ReactNode
}

type DataFrame = {
  id: number,
  data: number
}

export default function Layout({ children }: Props) {
  const [ports, setPorts] = useState<any[]>([])
  const [selectedPort, setSelectedPort] = useState<string | null>(null)
  const [connected, setConnected] = useState<boolean>(false)
  const [data, setData] = useState<DataFrame[]>([])

  const listPorts = useCallback(async () => {
    try {
      const ports = await window.api.listPorts()

      console.log(ports, ports[0].path || null)

      setPorts(ports)
      setSelectedPort(ports[0].path || null)
    } catch (err) {
      console.log(err)
    }
  }, [])

  useEffect(() => {
    listPorts()
  }, [listPorts])

  const openConnection = useCallback(async () => {
    setConnected(await window.api.openConnection(selectedPort))
  }, [selectedPort])

  const closeConnection = async () => {
    setConnected(!await window.api.closeConnection())
  }

  useEffect(() => {
    window.api.readStream((data) => {
      const newValue = data.split(' ').map((_) => Number(_))

      setData((_data) => {
        const __data = [..._data]

        const index = __data.findIndex((_) => _.id === (newValue[1] & 0xFF))

        if (index !== -1) __data[index].data = newValue[2] & 0xFF
        else __data.push({ id: newValue[1] & 0xFF, data: newValue[2] & 0xFF })

        return __data
      })

      console.log(data, newValue)
    })

    return () => {
      window.api.closeConnection()
    }
  }, [])

  return <>
    <nav>
      <select onChange={console.log}>
        {
          ports.map((_, index) => <option key={index}>{_.path} ({_.manufacturer})</option>)
        }
      </select>
      <button onClick={connected ? closeConnection : openConnection}>
        {connected ? 'Disconnect' : 'Connect'}
      </button>
    </nav>
    <div className="mainView">
      {
        data.map((_) => <div style={{ width: '10%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <p>{_.id}</p>
          <p>{_.data}</p>
        </div>)
      }
      {children}
    </div>
  </>
}
