import { useCallback, useEffect, useState } from 'react'

export default function Header() {
  const [ports, setPorts] = useState<any[]>([])
  const [selectedPort, setSelectedPort] = useState<string | null>(null)
  const [connected, setConnected] = useState<boolean>(false)

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
    if (await window.api.openConnection(selectedPort)) {
      setConnected(true)
      window.api.startStream()
    }
  }, [selectedPort])

  const closeConnection = async () => {
    setConnected(!await window.api.closeConnection())
  }

  return <nav>
    <select onChange={(e) => setSelectedPort(e.target.value)}>
      {
        ports.map((_, index) => <option key={index} value={_.path}>{_.path} ({_.manufacturer})</option>)
      }
    </select>
    <button onClick={listPorts}>
      Refresh ports
    </button>
    <button onClick={connected ? closeConnection : openConnection}>
      {connected ? 'Disconnect' : 'Connect'}
    </button>
  </nav>
}
