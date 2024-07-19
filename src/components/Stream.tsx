import { useEffect, useMemo, useState } from "react"
import { BodyContainer, BodyRow, Cell, HeaderRow, Table } from "./DataTable"
import { Button, Checkbox, Grid, Paper, TextField, Typography } from "@mui/material"

type DataFrame = {
  id: number,
  data: number[]
}

type Message = {
  id: string,
  service: string,
  byte1: string,
  byte2: string
}

export default function Stream() {
  const [data, setData] = useState<DataFrame[]>([{ id: 123, data: [12, 34, 56] }])
  const [message, setMessage] = useState<Message>({
    id: '7DF',
    service: '01',
    byte1: '',
    byte2: ''
  })
  // useMemos
  const pids = useMemo<number[]>(() => data.map((_) => _.id), [data])

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

      console.log(data, newValue)
    })

    return () => {
      window.api.closeConnection()
    }
  }, [])

  const sendMessage = () => {
    window.api.writeStream('message')
  }

  return <Grid container spacing={1}>
    <Grid item xs={9}>
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
                    <p>0x{_.toString(16).padStart(2, '0').toUpperCase()}</p>
                    <p>{_.toString(2).padStart(8, '0')}</p>
                  </Cell>
                  )
                }
              </BodyRow>)
          }
        </BodyContainer>
      </Table>
    </Grid>
    <Grid item xs={3}>
      <Paper sx={{ backgroundColor: '#444', padding: 2 }}>
        <Grid container spacing={.5}>
          <Grid item xs={12}>
            <Typography color={'white'}>
              Send messages
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <TextField label='ID' value={message.id} onChange={(e) => setMessage(_message => ({ ..._message, id: e.target.value }))} />
          </Grid>
          <Grid item xs={3}>
            <TextField label='Service' value={message.service} onChange={(e) => setMessage(_message => ({ ..._message, service: e.target.value }))} />
          </Grid>
          <Grid item xs={3}>
            <TextField label='Byte 1' value={message.byte1} onChange={(e) => setMessage(_message => ({ ..._message, byte1: e.target.value }))} />
          </Grid>
          <Grid item xs={3}>
            <TextField label='Byte 2' value={message.byte2} onChange={(e) => setMessage(_message => ({ ..._message, byte2: e.target.value }))} />
          </Grid>
          {/* Spacer */}
          <Grid item xs={9} />
          <Grid item xs={3}>
            <Button onClick={sendMessage}>
              Send
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Table>
              <HeaderRow>
                <Cell width={.75}>
                  <Checkbox />
                </Cell>
                <Cell flexGrow={1}>
                  ID
                </Cell>
              </HeaderRow>
              <BodyContainer>
                {
                  pids.map((_id) => <BodyRow>
                    <Cell width={.75}>
                      <Checkbox />
                    </Cell>
                    <Cell>
                      0x{_id.toString(16).padStart(2, '0').toUpperCase()}
                    </Cell>
                  </BodyRow>
                  )
                }
              </BodyContainer>
            </Table>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  </Grid>
}
