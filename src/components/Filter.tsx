import { Checkbox } from "@mui/material"
import { BodyContainer, BodyRow, Cell, HeaderRow, Table } from "./DataTable"

type Props = {
  ids: string[]
  filteredIds: string[]
  setFilteredIds: React.Dispatch<React.SetStateAction<string[]>>
}

export default function Filter({ ids, filteredIds, setFilteredIds }: Props) {
  return <Table>
    <HeaderRow>
      <Cell width={.75}>
        <Checkbox />
      </Cell>
      <Cell flexGrow={1}>
        ID
      </Cell>
    </HeaderRow>
    {/* Selected Ids */}
    {
      // filteredIds.map((_id, index) => <BodyRow key={index}>
      //   <Cell width={.75}>
      //     <Checkbox
      //       checked={true}
      //       onChange={() => setFilteredIds((_ids) => _ids.filter((_) => _ !== _id))}
      //     />
      //   </Cell>
      //   <Cell flexGrow={1}>
      //     {_id}
      //   </Cell>
      // </BodyRow>)
    }
    {/* Not selected Ids */}
    <BodyContainer>
      {
        ids
          // .filter((_id) => !filteredIds.includes(_id))
          .map((_id, index) => <BodyRow key={index}>
            <Cell width={.75}>
              <Checkbox
                checked={filteredIds.includes(_id)}
                onChange={(e, checked) => setFilteredIds((_ids) => checked ? _ids.concat(_id) : _ids.filter((_) => _ !== _id))}
              />
            </Cell>
            <Cell flexGrow={1}>
              {_id}
            </Cell>
          </BodyRow>
          )
      }
    </BodyContainer>
  </Table>
}
