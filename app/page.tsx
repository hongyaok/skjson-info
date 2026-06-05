'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ServerOff, Zap, CheckCircle, Globe, SearchCode, ArrowRight, LayoutDashboard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ThemeToggle } from '@/components/ThemeToggle'
import { LogoText } from '@/components/LogoText'
import { StatusIndicator } from '@/components/ui/status-indicator'

const TIMELINE_DATA = [
  { name: "skjson", status: "active", desc: "A pure Python tool to export scikit-learn models to standard JSON." },
  { name: "skjson-js", status: "active", desc: "Zero dependencies Javascript runner to execute JSON models natively." },
  { name: "skjson-visualiser", status: "fixing", desc: "A python and javascript package leveraging on the explainability of the json format to visualise the models." },
  { name: "for you to contribute", status: "idle", desc: "Open source contributions are welcome!" },
] as const;

import { CodeBlock } from '@/components/CodeBlock'
import { Github } from '@/components/GithubIcon'
import { FlipTextBoard } from '@/components/FlipTextBoard'

function FadeSection({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className={`w-full flex flex-col items-center ${className}`}
    >
      {children}
    </motion.div>
  )
}

function FeatureCard({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <Card className="w-72 transition-transform hover:scale-105">
      <CardHeader>
        <Icon className="h-6 w-6 mb-2" />
        <CardTitle>{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
    </Card>
  )
}

export default function Page() {
  const [shake, setShake] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShake(true)
      setTimeout(() => setShake(false), 400) // Shake for 400ms
    }, 600) // After drop completes
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col overflow-x-hidden">
      {/* Header */}
      <header className="w-full px-6 py-4 fixed top-0 left-0 right-0 flex justify-between items-center z-50 bg-background/80 backdrop-blur-md">
        <h3 className="text-xl font-black tracking-tight text-foreground">
          <LogoText text="{skjson}" />
        </h3>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </header>

      <main
        className={`flex-1 flex flex-col items-center w-full max-w-6xl mx-auto px-4 pt-32 pb-24 gap-24 ${shake ? 'animate-shake' : ''}`}
      >
        {/* 1. Hero Section */}
        <FadeSection className="gap-6 mt-8">
          <motion.h1
            initial={{ y: -100, opacity: 0, scale: 1.2 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
            className="text-7xl sm:text-9xl font-black tracking-tighter text-center"
            style={{ textShadow: '0px 20px 30px rgba(0,0,0,0.5)' }}
          >
            <LogoText text="{skjson}" />
          </motion.h1>

          <div className="flex flex-col items-center mt-4 min-h-[100px] sm:min-h-[140px] justify-center relative w-full">
            <h1 className="sr-only">
              Train in Python. Run from frontend. No backend needed.
            </h1>
            <FlipTextBoard phrases={[
              "Train in Python.",
              "Run from frontend.",
              "No backend needed."
            ]} />
          </div>

          <p className="text-xl text-muted-foreground max-w-2xl text-center mt-4 normal-case">
            Skip the FastAPI, CORS headers, and deployment pipelines. Export to JSON, load in JS, and predict instantly from your frontend.
          </p>

          <div className="flex gap-4 mt-2 mb-4 justify-center">
            <a href="https://github.com/hongyaok/skjson" target="_blank" rel="noreferrer">
              <Button variant="outline" className="gap-2">
                <Github className="w-4 h-4" />
                skjson
              </Button>
            </a>
            <a href="https://github.com/hongyaok/skjson-js" target="_blank" rel="noreferrer">
              <Button variant="outline" className="gap-2">
                <Github className="w-4 h-4" />
                skjson-js
              </Button>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-4 w-[90%] sm:w-full max-w-lg mx-auto justify-center">
            <Link href="/skjson" className="flex-1">
              <Button size="lg" className="w-full gap-2 h-14 text-lg">
                Export with skjson
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/skjson-js" className="flex-1">
              <Button size="lg" variant="outline" className="w-full gap-2 h-14 text-lg">
                Infer with skjson-js
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </FadeSection>

        {/* 2. The Problem */}
        {/* <FadeSection className="bg-muted p-8 rounded-lg gap-4 mt-8 items-center max-w-4xl">
          <ServerOff className="h-12 w-12 text-destructive mb-2" />
          <h2 className="text-3xl font-extrabold text-center">You built a great model. Now what?</h2>
          <p className="text-lg text-muted-foreground text-center">
            Now you need a Flask API or FastAPI, a server, CORS headers, rate limiting, deployment pipelines... just to run predictions on a form field.
          </p>
        </FadeSection> */}

        {/* 3. 3 Step Visual */}
        <FadeSection className="gap-6 mt-10 normal-case">
          <h2 className="text-3xl font-extrabold text-center mb-4">From .fit() to frontend in 3 steps</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/skjson" className="h-[140px]">
              <Card className="w-72 h-full transition-transform hover:scale-105 cursor-pointer hover:border-primary/50 flex flex-col justify-center">
                <CardHeader>
                  <CardTitle className="text-xl">1. Train</CardTitle>
                  <CardDescription>Train your scikit-learn model in Python as normal.</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/skjson" className="h-[140px]">
              <Card className="w-72 h-full transition-transform hover:scale-105 cursor-pointer hover:border-primary/50 flex flex-col justify-center">
                <CardHeader>
                  <CardTitle className="text-xl">2. Export</CardTitle>
                  <CardDescription>skjson.save(model, "model.json")</CardDescription>
                </CardHeader>
              </Card>
            </Link>
            <Link href="/skjson-js" className="h-[140px]">
              <Card className="w-72 h-full transition-transform hover:scale-105 cursor-pointer hover:border-primary/50 flex flex-col justify-center">
                <CardHeader>
                  <CardTitle className="text-xl">3. Run</CardTitle>
                  <CardDescription>Load it in JS, call .predict() in the browser.</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </FadeSection>



        {/* 5. Code Snippets Side-by-Side */}
        <FadeSection className="mt-10 gap-6 w-full max-w-5xl">
          <h2 className="text-3xl font-extrabold text-center mb-4"><LogoText text="{skjson}" /> code?</h2>
          <div className="flex flex-col md:flex-row gap-6 w-full justify-center">
            <div className="flex-1 w-full min-w-[300px]">
              <CodeBlock tabs={[
                {
                  label: "Python",
                  language: "python",
                  code: `from sklearn.ensemble import RandomForestClassifier
import skjson

clf = RandomForestClassifier().fit(X, y)
skjson.save(clf, 'model.json')`
                }
              ]} />
            </div>
            <div className="flex-1 w-full min-w-[300px]">
              <CodeBlock tabs={[
                {
                  label: "JavaScript",
                  language: "javascript",
                  code: `import { loadModel } from 'skjson-js'
import modelJson from './model.json'

const predictor = loadModel(modelJson)
const preds = predictor.predict(new_data)`
                }
              ]} />
            </div>
          </div>
        </FadeSection>

        {/* 6. Why skjson? */}
        <FadeSection className="mt-10 gap-6 normal-case">
          <h2 className="text-3xl font-extrabold text-center mb-4">why <LogoText text="{skjson}" />?</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <FeatureCard icon={ServerOff} title="No Backend" desc="No API, no server costs. Run models directly on the client." />
            <FeatureCard icon={Zap} title="Instant Inference" desc="Zero network round-trip latency. Predictions happen in milliseconds." />
            <FeatureCard icon={CheckCircle} title="Safe & Secure" desc="JSON can't execute arbitrary code like Pickle can." />
            <FeatureCard icon={Globe} title="Works Anywhere" desc="React, Vue, Node, Edge functions—any JS environment." />
            <FeatureCard icon={SearchCode} title="Inspectable" desc="Open the JSON and see exactly what your model learned." />
            <FeatureCard icon={LayoutDashboard} title="Full Customizability" desc="Build real bespoke dashboards. Escape the rigid UI constraints of Streamlit or Gradio." />
          </div>
        </FadeSection>

        {/* 7. Timeline */}
        <FadeSection className="mt-16 gap-6 normal-case">
          <h2 className="text-3xl font-extrabold text-center mb-4">the <LogoText text="{skjson}" /> timeline</h2>

          <div className="relative flex flex-col sm:grid sm:grid-cols-4 w-full max-w-4xl mx-auto mt-4 mb-4 gap-8 sm:gap-0">
            {/* Desktop Line */}
            <div className="hidden sm:block absolute top-[14px] left-[12.5%] right-[12.5%] h-[2px] bg-border z-0">
              {/* Animated Light looping to the 3rd item (66.66% width) */}
              <div className="absolute top-0 left-0 h-full w-[66.66%] overflow-hidden">
                <motion.div
                  className="h-full w-full bg-gradient-to-r from-transparent via-yellow-500 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                />
              </div>
            </div>

            {/* Mobile Line */}
            <div className="sm:hidden absolute top-4 bottom-4 left-[21px] w-[2px] bg-border z-0">
              {/* Animated Light looping to the 3rd item (66.66% height) */}
              <div className="absolute top-0 left-0 w-full h-[66.66%] overflow-hidden">
                <motion.div
                  className="w-full h-full bg-gradient-to-b from-transparent via-yellow-500 to-transparent"
                  animate={{ y: ["-100%", "100%"] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                />
              </div>
            </div>

            {/* Timeline Items */}
            {TIMELINE_DATA.map((item, i) => (
              <div key={i} className="group relative flex sm:flex-col items-center sm:justify-start gap-4 sm:gap-0 z-10 pl-2 sm:pl-0 cursor-default">
                <div className="bg-background p-2 rounded-full z-10 shrink-0">
                  <StatusIndicator state={item.status as any} size="lg" />
                </div>
                <div className="flex flex-col sm:items-center w-full">
                  <p className="sm:mt-4 font-semibold text-sm sm:text-center px-2">{item.name}</p>
                  <p className="sm:hidden text-xs text-muted-foreground mt-1 pr-4">{item.desc}</p>
                </div>
                {/* Desktop Tooltip */}
                <div className="hidden sm:group-hover:block absolute top-full mt-2 w-48 p-2 bg-popover text-popover-foreground text-xs rounded-md shadow-xl border text-center z-50 animate-in fade-in zoom-in-95">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </FadeSection>

        {/* Explore Links */}
        <FadeSection className="mt-10 gap-6">
          <div className="flex flex-col sm:flex-row gap-4 w-[90%] sm:w-full max-w-lg mx-auto justify-center">
            <Link href="/skjson" className="flex-1">
              <Button size="lg" className="w-full gap-2 h-14 text-lg">
                Explore skjson
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/skjson-js" className="flex-1">
              <Button size="lg" variant="outline" className="w-full gap-2 h-14 text-lg">
                Explore skjson-js
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </FadeSection>

      </main>

      {/* Footer */}
      <footer className="w-full border-t border-border mt-auto normal-case">
        <div className="px-6 py-6 flex justify-between flex-wrap gap-4 text-xs sm:text-sm w-full">
          <p className="text-muted-foreground">© 2026 Hong Yao</p>
          <div className="flex gap-4">
            <a href="https://github.com/hongyaok/skjson" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">GitHub (Python)</a>
            <a href="https://github.com/hongyaok/skjson-js" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground">GitHub (JS)</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
