import Link from 'next/link'
import { FastLogo } from '@/components/fast-logo'
// import { Linkedin } from 'lucide-react'
import { FaLinkedin, FaGithub } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">

            <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground ">
              Built by Ahmad Waseem
              <Link
                href="https://www.linkedin.com/in/muhammad-ahmad-waseem"
                target="_blank"
                rel="noreferrer"
                aria-label="Ahmad Waseem on LinkedIn"
                className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
              >
                <FaLinkedin className="size-5 " />
              </Link>
              <Link
                href="https://github.com/Ahmadw4473/FAST-Ai-Office/"
                target="_blank"
                rel="noreferrer"
                aria-label="Ahmad Waseem on GitHub"
                className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
              >
                <FaGithub className="size-5" />
              </Link>
            </h2>
            <h6 className="flex items-center  ">By Fastian, for Fastians</h6>
          </div>
        </div>
      </div>
    </footer>
  )
}
