import styles from './DataTable.module.css'

type Props = {
  children: React.ReactNode
  flexGrow?: number
  width?: number
}

export function Table({ children }: Props) {
  return <div
    id='table'
    className={styles.table}
  >
    {children}
  </div>
}

export function HeaderRow({ children }: Props) {
  return <div
    className={styles.headerRow}
  >
    {children}
  </div>
}

export function BodyRow({ children }: Props) {
  return <div
    className={styles.bodyRow}
  >
    {children}
  </div>
}

export function BodyContainer({ children }: Props) {
  return <div
    className={styles.bodyContainer}
  >
    {children}
  </div>
}

export function Cell({ children, width = 1, flexGrow }: Props) {
  return <div
    className={styles.cell}
    style={{ width: width * 100, flexGrow }}
  >
    {children}
  </div>
}