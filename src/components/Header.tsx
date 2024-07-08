

interface HeaderProps {
    title?: string
}

export const Header = ({title = "Default Header"}: HeaderProps) => {
  return (
    <header><h1>{title}</h1></header>
  )
}
