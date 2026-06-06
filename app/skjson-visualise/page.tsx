'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Eye } from 'lucide-react'
import { Button } from '@/components/8starlabs-ui/button'
import { LogoText } from '@/components/LogoText'
import { ThemeToggle } from '@/components/ThemeToggle'
import { DecisionTreeVis } from '@/components/DecisionTreeVis'
import { Github } from '@/components/GithubIcon'

function FadeSection({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={`w-full flex flex-col ${className}`}
    >
      {children}
    </motion.div>
  )
}

export default function Page() {
  return (
    <div className="min-h-screen text-foreground flex flex-col normal-case">
      <header className="w-full px-6 py-4 fixed top-0 left-0 right-0 flex justify-between items-center z-50 bg-background/80 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="font-medium">Back to Home</span>
          </Link>
        </div>
        <ThemeToggle />
      </header>

      <main className="flex-1 flex flex-col w-full max-w-5xl mx-auto px-6 pt-24 pb-12 gap-12">

        <FadeSection className="gap-4">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground"><LogoText text="{skjson-visualise}" /></h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Explainable AI starts with seeing how your model thinks. Coming soon...
          </p>
          <div className="flex gap-4 mt-2 flex-wrap">
            {/* <a href="https://github.com/hongyaok/skjson" target="_blank" rel="noreferrer" className="w-fit">
              <Button variant="outline" className="gap-2">
                <Github className="w-4 h-4" />
                skjson
              </Button>
            </a> */}
            <Button variant="outline" className="gap-2" disabled>
              <Eye className="w-4 h-4" />
              skjson-visualise (soon)
            </Button>
          </div>
        </FadeSection>

        <FadeSection className="gap-6 mt-4 p-8 rounded-lg bg-secondary/30 border border-border items-center">
          <h2 className="text-3xl font-extrabold text-center mb-2">Interactive Decision Tree</h2>
          <p className="text-muted-foreground text-center text-sm max-w-2xl mb-4">
            This visualises a single decision tree from an Iris Random Forest model exported via skjson.
            Enter feature values and watch the tree traverse to a prediction.
          </p>
          <DecisionTreeVis />
        </FadeSection>

        {/* Coming Soon */}
        <FadeSection className="gap-6 pb-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center gap-4 py-16"
          >
            <h2
              className="text-6xl sm:text-8xl font-black tracking-tighter text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-600"
            >
              coming soon
            </h2>
            <p className="text-muted-foreground text-center max-w-lg text-lg mt-2">
              skjson-visualise will be a standalone Python and JavaScript package that leverages the explainability of the JSON model format to create rich, interactive visualisations.
            </p>
            <div className="flex gap-3 mt-4">
              <motion.div
                className="w-2 h-2 rounded-full bg-yellow-400"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}
              />
              <motion.div
                className="w-2 h-2 rounded-full bg-yellow-500"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}
              />
              <motion.div
                className="w-2 h-2 rounded-full bg-amber-600"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1.5, delay: 0.6 }}
              />
            </div>
          </motion.div>
        </FadeSection>

        {/* Contact Me */}
        <FadeSection className="pb-12">
          <div className="flex justify-center w-full">
            <a href="https://github.com/hongyaok" target="_blank" rel="noreferrer">
              <Button variant="outline" size="lg" withArrow className="h-12 px-8">
                If you wish to contribute, contact me
              </Button>
            </a>
          </div>
        </FadeSection>
      </main>
    </div>
  )
}
