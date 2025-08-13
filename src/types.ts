export interface TabItem {
  name: string
}
export interface Props {
  list: TabItem[]
  active?: (item: any) => boolean
}
