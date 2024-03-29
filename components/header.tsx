import { createClient } from "@/prismicio"
import { PrismicNextLink } from "@prismicio/next"
import Link from "next/link"
import NavBar from "./navbar"

const Header = async () => {
  const client = createClient()
  const settings = await client.getSingle("settings")
  return (
    <header className="top-0 z-50 mx-auto w-full max-w-7xl md:sticky md:top-4">
      <NavBar settings={settings} />
    </header>
  )
}

export default Header