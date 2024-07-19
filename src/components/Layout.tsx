import { Container, ThemeProvider } from "@mui/material"
import Header from "./Header"
import { theme } from "./theme"

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return <main>
    <Header />
    <ThemeProvider theme={theme}>
      <Container maxWidth='xl' sx={{ paddingY: 1, height: 'calc(100vh - 48px)', overflow: 'hidden' }}>
        {children}
      </Container>
    </ThemeProvider>
  </main>
}
