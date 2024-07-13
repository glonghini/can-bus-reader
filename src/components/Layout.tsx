import { useCallback, useEffect, useState } from "react"

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
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
    setConnected(await window.api.openConnection(selectedPort))
  }, [selectedPort])

  const closeConnection = async () => {
    setConnected(!await window.api.closeConnection())
  }

  return <>
    <nav>
      <select onChange={console.log}>
        {
          ports.map((_, index) => <option key={index}>{_.path} ({_.manufacturer})</option>)
        }
      </select>
      <button onClick={listPorts}>
        Refresh ports
      </button>
      <button onClick={connected ? closeConnection : openConnection}>
        {connected ? 'Disconnect' : 'Connect'}
      </button>
    </nav>
    <div className="mainView">
      {children}
    </div>
  </>
}
