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

      console.log(ports)

      setPorts(ports)
      setSelectedPort(ports[0].path || null)
    } catch (err) {
      console.log(err)
    }
  }, [])

  useEffect(() => {
    listPorts()
  }, [listPorts])

  const openConnection = () => {
    if (window.api.openConnection(selectedPort))
      setConnected(true)
    else
      setConnected(false)
  }

  useEffect(() => window.api.readStream(console.log), [])

  return <>
    <nav>
      <select >
        {
          ports.map((_, index) => <option key={index}>{_.path} ({_.manufacturer})</option>)
        }
      </select>
      <button onClick={openConnection}>
        Connect
      </button>
      <p>
        {connected ? 'Connected' : 'No connection'}
      </p>
    </nav>
    <div className="mainView">
      {children}
    </div>
  </>
}
