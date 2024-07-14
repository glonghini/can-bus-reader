import { useEffect, useState } from "react"
import { BodyContainer, BodyRow, Cell, HeaderRow, Table } from "./DataTable"

type DataFrame = {
  id: number,
  data: number[]
}

export default function Stream() {
  const [data, setData] = useState<DataFrame[]>([])

  useEffect(() => {
    window.api.readStream((data) => {
      const newValue = data.split(' ').map((_) => Number(_))

      setData((_data) => {
        const _ = [..._data]

        const index = _.findIndex((_) => _.id === newValue[1])

        if (index !== -1) {
          _[index].data = newValue.slice(2, newValue.length)

          _.sort((a, b) => a.id - b.id)
        }
        else {
          _.push({ id: newValue[1], data: newValue.slice(2, newValue.length) })
        }

        return _
      })

      // console.log(data, newValue)
    })

    return () => {
      window.api.closeConnection()
    }
  }, [])

  return <>
    <Table>
      <HeaderRow>
        <Cell>
          ID
        </Cell>
        <Cell>
          1
        </Cell>
        <Cell>
          2
        </Cell>
        <Cell>
          3
        </Cell>
        <Cell>
          4
        </Cell>
        <Cell>
          5
        </Cell>
        <Cell>
          6
        </Cell>
        <Cell>
          7
        </Cell>
        <Cell>
          8
        </Cell>
      </HeaderRow>
      <BodyContainer>
        {
          data.map((_dataFrame, index) =>
            <BodyRow key={index}>
              <Cell>
                <p>0x{_dataFrame.id.toString(16).padStart(2, '0').toUpperCase()}</p>
              </Cell>
              {
                _dataFrame.data.map((_, _index) => <Cell key={_index}>
                  <p>0x{_.toString(16).toUpperCase()}</p>
                  <p>{_.toString(2).padStart(8, '0')}</p>
                </Cell>
                )
              }
            </BodyRow>)
        }
      </BodyContainer>
    </Table>
    <div>
      aaa
    </div>
  </>
}
