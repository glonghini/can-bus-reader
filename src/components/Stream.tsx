import { useCallback, useEffect, useMemo, useState } from "react"
import { BodyContainer, BodyRow, Cell, HeaderRow, Table } from "./DataTable"
import { Button, Checkbox, Grid, Paper, TextField, Typography } from "@mui/material"
import Filter from "./Filter"

type DataFrame = {
  id: string
  data: string[]
}

type Byte = {
  value: string,
  error: boolean
}

type Message = {
  id: string
  data: [Byte, Byte, Byte, Byte, Byte, Byte, Byte, Byte]
}

export default function Stream() {
  const [data, setData] = useState<DataFrame[]>([])
  const [message, setMessage] = useState<Message>({
    id: '7DF',
    data: [
      { value: '', error: false },
      { value: '', error: false },
      { value: '', error: false },
      { value: '', error: false },
      { value: '', error: false },
      { value: '', error: false },
      { value: '', error: false },
      { value: '', error: false },
    ]
  })
  const [filteredIds, setFilteredIds] = useState<string[]>([])
  // useMemos
  const ids = useMemo<string[]>(() => data.map((_) => _.id), [data])
  const isMessageValid = useMemo(() => {
    if (isNaN(parseInt(message.id, 16)) || !message.data.filter((_byte) => Boolean(_byte.value)).length || message.data.filter((_byte) => Boolean(_byte.value)).find((_byte) => isNaN(parseInt(message.id, 16)))) return false

    return true
  }, [message])

  useEffect(() => {
    window.api.readStream((data) => {
      // Checking if the message sent is in fact a CAN Bus message
      if (isNaN(Number(data.split(',')[0])) || data.split(',').length < 2) return

      const newValue = data.split(',')

      setData((_data) => {
        const _ = [..._data]

        const index = _.findIndex((_) => _.id === newValue[1])

        if (index !== -1) {
          _[index].data = newValue.slice(2, newValue.length)
        }
        else {
          _.push({ id: newValue[1], data: newValue.slice(2, newValue.length) })

          _.sort()
        }

        return _
      })
    })
  }, [])

  const sendMessage = () => {
    window.api.writeStream(
      [
        (parseInt(message.id, 16) & 0xff00) / 0x100,
        parseInt(message.id, 16) & 0xff,
        message.data.filter((_byte) => Boolean(_byte.value)).length,
        ...message.data.filter((_byte) => Boolean(_byte.value)).map((_byte) => parseInt(_byte.value, 16))
      ]
    )
  }

  const setByte = useCallback((index: number, value: string) => {
    if (value.length > 2) return

    setMessage((_message) => {
      const __message = { ..._message }

      __message.data[index] = {
        value,
        error: value !== '' ? isNaN(parseInt(value, 16)) : false
      }

      return __message
    })
  }, [])

  return <Grid container spacing={1}>
    <Grid item xs={9} maxHeight={'50vh'}>
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
            data.length ?
              data
                .filter((_dataFrame) => !filteredIds.includes(_dataFrame.id))
                .map((_dataFrame, index) =>
                  <BodyRow key={index}>
                    <Cell>
                      <p>{_dataFrame.id}</p>
                    </Cell>
                    {
                      _dataFrame.data.map((_, _index) => <Cell key={_index}>
                        <p>{_}</p>
                        <p>{parseInt(_, 16).toString(2).padStart(8, '0')}</p>
                      </Cell>
                      )
                    }
                  </BodyRow>)
              :
              <BodyRow>
                <Cell flexGrow={1}>
                  <p>
                    No data to show.
                  </p>
                </Cell>
              </BodyRow>
          }
        </BodyContainer>
      </Table>
    </Grid>
    <Grid item xs={3}>
      <Paper sx={{ backgroundColor: '#444', padding: 2 }}>
        <Grid container spacing={.5}>
          <Grid item xs={3}>
            <Button onClick={() => setData([])}>
              Clear all
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography color={'white'}>
              Send messages
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='subtitle2'>
              Data
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='ID'
              value={message.id}
              onChange={(e) => setMessage(_message => ({ ..._message, id: e.target.value }))}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant='subtitle2'>
              Data
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <TextField
              label='1'
              value={message.data[0].value}
              onChange={(e) => setByte(0, e.target.value)}
              error={message.data[0].error}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label='2'
              value={message.data[1].value}
              onChange={(e) => setByte(1, e.target.value)}
              error={message.data[1].error}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label='3'
              value={message.data[2].value}
              onChange={(e) => setByte(2, e.target.value)}
              error={message.data[2].error}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label='4'
              value={message.data[3].value}
              onChange={(e) => setByte(3, e.target.value)}
              error={message.data[3].error}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label='5'
              value={message.data[4].value}
              onChange={(e) => setByte(4, e.target.value)}
              error={message.data[4].error}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label='6'
              value={message.data[5].value}
              onChange={(e) => setByte(5, e.target.value)}
              error={message.data[5].error}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label='7'
              value={message.data[6].value}
              onChange={(e) => setByte(6, e.target.value)}
              error={message.data[6].error}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label='8'
              value={message.data[7].value}
              onChange={(e) => setByte(7, e.target.value)}
              error={message.data[7].error}
            />
          </Grid>
          {/* Spacer */}
          <Grid item xs={9} />
          <Grid item xs={3}>
            <Button
              onClick={sendMessage}
              disabled={!isMessageValid}
            >
              Send
            </Button>
          </Grid>
          <Grid item xs={12} maxHeight={'50vh'}>
            <Filter
              ids={ids}
              filteredIds={filteredIds}
              setFilteredIds={setFilteredIds}
            />
          </Grid>
        </Grid>
      </Paper>
    </Grid >
  </Grid >
}
