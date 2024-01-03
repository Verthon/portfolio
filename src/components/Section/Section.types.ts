export type Props = {
  children: React.ReactNode
  header: string
  description?: string
  type?: 'default' | 'skills' | 'projects' | 'contact'
  id?: string
}
