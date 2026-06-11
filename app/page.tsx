'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ServerOff, Zap, CheckCircle, Globe, SearchCode, ArrowRight, LayoutDashboard, Copy, Check, Code2, MonitorPlay, FileJson, Construction } from 'lucide-react'
import { Button } from '@/components/8starlabs-ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ThemeToggle } from '@/components/ThemeToggle'
import { LogoText } from '@/components/LogoText'
import StatusIndicator from '@/components/8starlabs-ui/status-indicator'

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

const FEATURES = [
  {
    icon: ServerOff,
    title: "No Backend",
    desc: "No API, no server costs. Run models directly on the client.",
    gradient: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-400",
  },
  {
    icon: Zap,
    title: "Instant Inference",
    desc: "Zero network round-trip latency. Predictions happen in milliseconds.",
    gradient: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-400",
  },
  {
    icon: CheckCircle,
    title: "Safe & Secure",
    desc: "JSON can't execute arbitrary code like Pickle can.",
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-400",
  },
  {
    icon: Globe,
    title: "Works Anywhere",
    desc: "React, Vue, Node, Edge functions—any JS environment.",
    gradient: "from-violet-500/20 to-purple-500/20",
    iconColor: "text-violet-400",
  },
  {
    icon: SearchCode,
    title: "Inspectable",
    desc: "Open the JSON and see exactly what your model learned.",
    gradient: "from-pink-500/20 to-rose-500/20",
    iconColor: "text-pink-400",
  },
  {
    icon: LayoutDashboard,
    title: "Full Customizability",
    desc: "Build real bespoke dashboards. Escape the rigid UI constraints of Streamlit or Gradio.",
    gradient: "from-indigo-500/20 to-blue-500/20",
    iconColor: "text-indigo-400",
  },
]

const STEPS = [
  {
    icon: Code2,
    label: "Train & Export",
    desc: "Train your scikit-learn model in Python as normal, export with skjson",
    code: "skjson.save(clf, 'model.json')",
  },
  {
    icon: FileJson,
    label: "Load in JS",
    desc: "Import the JSON model in your frontend environment",
    code: "import modelJson from './model.json'",
  },
  {
    icon: MonitorPlay,
    label: "Predict Instantly",
    desc: "Load the predictor and call .predict() in the browser",
    code: "const preds = loadModel(modelJson).predict(new_data)",
  },
]

function InstallBlock({ command }: { command: string }) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = command
      ta.style.position = 'fixed'
      ta.style.left = '-9999px'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="install-block flex items-center justify-between gap-4 max-w-sm w-full">
      <code>
        <span className="prefix">$ </span>
        <span className="pkg">{command}</span>
      </code>
      <button
        onClick={handleCopy}
        className="flex-shrink-0 p-2 rounded-lg hover:bg-white/5 transition-colors text-muted-foreground hover:text-foreground"
        title="Copy to clipboard"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  )
}

export default function Page() {
  return (
    <div className="min-h-screen text-foreground flex flex-col overflow-x-hidden">
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
        className="flex-1 flex flex-col items-center w-full max-w-6xl mx-auto px-4 pt-32 pb-24 gap-24"
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

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-muted-foreground max-w-2xl text-center mt-4 normal-case"
          >
            Skip the backend. Predict directly from your dashboard.
          </motion.p>

          {/* <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="flex gap-4 mt-6 justify-center flex-col sm:flex-row items-center w-full"
          >
            <InstallBlock command="pip install skjson" />
            <InstallBlock command="npm install skjson-js" />
          </motion.div> */}

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex gap-4 mt-6 mb-4 justify-center"
          >
            <Link href="/skjson">
              <Button variant="outline" className="gap-2 glass-card border-none hover:translate-y-[-2px]">
                skjson
              </Button>
            </Link>
            <Link href="/skjson-js">
              <Button variant="outline" className="gap-2 glass-card border-none hover:translate-y-[-2px]">
                skjson-js
              </Button>
            </Link>
            <Link href="/skjson-visualise">
              <Button variant="outline" className="gap-2 glass-card border-none hover:translate-y-[-2px]">
                <Construction className="w-4 h-4 text-amber-500" />
                skjson-vsl
              </Button>
            </Link>
          </motion.div>

          {/* <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 mt-4 w-[90%] sm:w-full max-w-3xl mx-auto justify-center"
          >
            {/* <Link href="/skjson" className="flex-1">
              <Button size="lg" className="w-full h-14 text-lg btn-rainbow-hover border-border border" withArrow>
                Export with skjson
              </Button>
            </Link>
            <Link href="/skjson-js" className="flex-1">
              <Button size="lg" variant="outline" className="w-full h-14 text-lg" withArrow>
                Infer with skjson-js
              </Button>
            </Link> *
          </motion.div> */}
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
          <div className="text-center mb-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">From .fit() to frontend in 3 steps</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Three steps. No backend needed.
            </p>
          </div>

          <div className="flex flex-col items-center w-full max-w-lg gap-0">
            {STEPS.map((step, i) => (
              <React.Fragment key={step.label}>
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="glass-card p-5 w-full"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center text-primary font-black text-lg border border-primary/20">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <step.icon className="w-4 h-4 text-primary" />
                        <h3 className="font-bold text-base">{step.label}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{step.desc}</p>
                      <code className="text-xs bg-black/5 dark:bg-black/30 px-2 py-1.5 rounded-md text-emerald-600 dark:text-emerald-400 font-mono block overflow-x-auto whitespace-nowrap">
                        {step.code}
                      </code>
                    </div>
                  </div>
                </motion.div>
                {i < STEPS.length - 1 && <div className="step-connector" />}
              </React.Fragment>
            ))}
          </div>
        </FadeSection>



        {/* 5. Code Snippets Side-by-Side */}
        <FadeSection className="mt-10 gap-6 w-full max-w-5xl">
          <h2 className="text-3xl font-extrabold text-center mb-4"><LogoText text="{skjson}" /> code?</h2>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="flex gap-4 mt-6 justify-center flex-col sm:flex-row items-center w-full"
          >
            <InstallBlock command="pip install skjson" />
            <InstallBlock command="npm install skjson-js" />
          </motion.div>
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
          <div className="text-center mb-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">why <LogoText text="{skjson}" />?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Everything you need to deploy scikit-learn models to the frontend.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-5xl">
            {FEATURES.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className={`glass-card p-6 h-full bg-gradient-to-br ${feat.gradient}`}>
                  <feat.icon className={`h-7 w-7 mb-3 ${feat.iconColor}`} />
                  <h3 className="text-lg font-bold mb-1.5">{feat.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feat.desc}</p>
                </div>
              </motion.div>
            ))}
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
          <div className="flex flex-col sm:flex-row gap-4 w-[90%] sm:w-full max-w-3xl mx-auto justify-center">
            {/* <Link href="/skjson" className="flex-1">
              <Button size="lg" variant="outline" className="w-full h-14 text-lg" withArrow>
                Explore skjson
              </Button>
            </Link>
            <Link href="/skjson-js" className="flex-1">
              <Button size="lg" variant="outline" className="w-full h-14 text-lg" withArrow>
                Explore skjson-js
              </Button>
            </Link>
            <Link href="/skjson-visualise" className="flex-1">
              <Button size="lg" variant="outline" className="w-full h-14 text-lg" withArrow>
                skjson-vsl (coming soon)
              </Button>
            </Link> */}
            <a href="https://github.com/hongyaok/skjson" target="_blank" rel="noreferrer">
              <Button variant="outline" className="gap-2 glass-card border-none hover:translate-y-[-2px]">
                <Github className="w-4 h-4" />
                skjson
              </Button>
            </a>
            <a href="https://github.com/hongyaok/skjson-js" target="_blank" rel="noreferrer">
              <Button variant="outline" className="gap-2 glass-card border-none hover:translate-y-[-2px]">
                <Github className="w-4 h-4" />
                skjson-js
              </Button>
            </a>
          </div>
        </FadeSection>

        {/* Contact Me */}
        <FadeSection className="mt-8 mb-4">
          <div className="flex justify-center w-full">
            <a href="https://github.com/hongyaok" target="_blank" rel="noreferrer">
              <Button variant="outline" size="lg" withArrow className="h-12 px-8">
                If you wish to contribute, contact me
              </Button>
            </a>
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
