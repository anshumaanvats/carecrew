import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <p className="text-center text-base font-medium leading-6 text-muted-foreground">
          Empowering care, enriching lives—because everyone deserves comfort, dignity, and support.
        </p>
        <p className="mt-6 text-center text-sm leading-5 text-muted-foreground">
          Designed & Developed by{" "}
          <Link
            href="/"
            className="text-black dark:text-white transition-colors duration-200 hover:text-blue-500 dark:hover:text-blue-500 hover:font-bold"
          >
            CARECREW
          </Link>.
        </p>
      </div>
    </footer>
  )
}
