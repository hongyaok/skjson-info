'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ServerOff, Zap, CheckCircle, Globe, SearchCode, ArrowRight, LayoutDashboard, Copy, Check, Code2, MonitorPlay, FileJson, Construction, ChevronDown, Package, Terminal } from 'lucide-react'
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

// Lazy-load the DemoWidget so the 412KB model.json only loads when scrolled into view
const DemoWidget = React.lazy(() => import('@/components/DemoWidget').then(mod => ({ default: mod.DemoWidget })))

function FadeSection({ children, className = '', id }: { children: React.ReactNode, className?: string, id?: string }) {
  return (
    <motion.div
      id={id}
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

const STATS = [
  { value: "100%", label: "Client-Side" },
  { value: "0ms", label: "Network Latency" },
  { value: "0", label: "Dependencies (JS)" },
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

function LazyDemoSection() {
  const [isVisible, setIsVisible] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="w-full max-w-4xl mx-auto">
      {isVisible ? (
        <React.Suspense fallback={
          <div className="flex items-center justify-center py-16">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-muted-foreground">Loading demo model...</p>
            </div>
          </div>
        }>
          <DemoWidget />
        </React.Suspense>
      ) : (
        <div className="flex items-center justify-center py-16">
          <p className="text-sm text-muted-foreground">Scroll to load demo...</p>
        </div>
      )}
    </div>
  )
}

export default function Page() {
  const scrollToDemo = () => {
    document.getElementById('live-demo')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen text-foreground flex flex-col overflow-x-hidden">
      {/* Header */}
      <header className="w-full px-6 py-4 fixed top-0 left-0 right-0 flex justify-between items-center z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <h3 className="text-xl font-black tracking-tight text-foreground">
          <LogoText text="{skjson}" />
        </h3>
        <div className="flex items-center gap-3">
          <nav className="hidden sm:flex items-center gap-1">
            <Link href="/skjson">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                Docs
              </Button>
            </Link>
            <a href="https://github.com/hongyaok/skjson" target="_blank" rel="noreferrer">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground gap-1.5">
                <Github className="w-4 h-4" />
                GitHub
              </Button>
            </a>
          </nav>
          <div className="w-px h-5 bg-border hidden sm:block" />
          <ThemeToggle />
        </div>
      </header>

      <main
        className="flex-1 flex flex-col items-center w-full max-w-6xl mx-auto px-6 pt-40 pb-24 gap-32"
      >
        {/* 1. Hero Section */}
        <FadeSection className="gap-8 mt-8">
          <div className="relative">
            <div className="hero-glow" />
            <motion.h1
              initial={{ y: -60, opacity: 0, scale: 1.05 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
              className="text-6xl sm:text-8xl md:text-9xl font-extrabold tracking-tighter text-center"
            >
              <LogoText text="{skjson}" />
            </motion.h1>
          </div>

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
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl text-center mt-4"
          >
            Export scikit-learn models to JSON. Run inference in the browser. Zero backend required.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="flex gap-4 mt-4 justify-center flex-col sm:flex-row items-center w-full"
          >
            <InstallBlock command="pip install skjson" />
            <InstallBlock command="npm install skjson-js" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex gap-3 mt-6 mb-2 justify-center flex-wrap"
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

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.5 }}
          >
            <Button 
              onClick={scrollToDemo} 
              size="lg" 
              className="btn-cta-gradient h-14 px-8 text-base gap-2 mt-4"
            >
              Try Live Demo
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </Button>
          </motion.div>
        </FadeSection>

        {/* 2. Stats Strip */}
        <FadeSection>
          <div className="stats-strip">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="stat-item"
              >
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </FadeSection>

        {/* 3. 3 Step Visual */}
        <FadeSection className="gap-10">
          <div className="text-center mb-2">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tighter mb-4">From .fit() to frontend in 3 steps</h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
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

        {/* 4. Code Snippets Side-by-Side */}
        <FadeSection className="gap-8 w-full max-w-5xl">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tighter text-center mb-6">Get Started</h2>
          <div className="flex flex-col md:flex-row gap-8 w-full justify-center">
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

        {/* 5. Live Demo Section (Lazy-loaded) */}
        <FadeSection className="gap-10" id="live-demo">
          <div className="text-center mb-4">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tighter mb-4">Try It Yourself</h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              This Iris classifier is running entirely in your browser. No server. No API.
            </p>
          </div>
          <div className="demo-section-glow w-full">
            <LazyDemoSection />
          </div>
        </FadeSection>

        {/* 6. Why skjson? */}
        <FadeSection className="gap-10">
          <div className="text-center mb-4">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tighter mb-4">Why <LogoText text="{skjson}" />?</h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
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
        <FadeSection className="gap-10">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tighter text-center mb-8">The <LogoText text="{skjson}" /> Timeline</h2>

          <div className="relative flex flex-col sm:grid sm:grid-cols-4 w-full max-w-4xl mx-auto mt-6 mb-6 gap-8 sm:gap-0">
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

        {/* 8. Open Source CTA */}
        <FadeSection className="gap-10">
          <div className="glass-card p-10 sm:p-14 w-full max-w-2xl text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tighter mb-4">Open Source & Growing</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
              skjson is free and open source. Contributions, bug reports, and ideas are always welcome.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <a href="https://github.com/hongyaok/skjson" target="_blank" rel="noreferrer">
                <Button variant="outline" className="gap-2 hover:translate-y-[-2px] transition-transform">
                  <Github className="w-4 h-4" />
                  skjson
                </Button>
              </a>
              <a href="https://github.com/hongyaok/skjson-js" target="_blank" rel="noreferrer">
                <Button variant="outline" className="gap-2 hover:translate-y-[-2px] transition-transform">
                  <Github className="w-4 h-4" />
                  skjson-js
                </Button>
              </a>
              <a href="https://github.com/hongyaok" target="_blank" rel="noreferrer">
                <Button withArrow className="gap-2 btn-cta-gradient rounded-lg">
                  Contribute
                </Button>
              </a>
            </div>
          </div>
        </FadeSection>

      </main>

      {/* Footer */}
      <footer className="w-full border-t border-border mt-auto">
        <div className="px-6 py-8 max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-bold">
                <LogoText text="{skjson}" />
              </h3>
              <p className="text-xs text-muted-foreground max-w-xs">
                Export scikit-learn models to JSON and run inference directly in the browser.
              </p>
              <p className="text-xs text-muted-foreground mt-1">© 2026 Hong Yao</p>
            </div>
            <div className="flex gap-8">
              <div className="flex flex-col gap-2">
                <p className="text-xs font-semibold text-foreground">Packages</p>
                <a href="https://pypi.org/project/skjson/" target="_blank" rel="noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
                  <Package className="w-3 h-3" /> PyPI
                </a>
                <a href="https://www.npmjs.com/package/skjson-js" target="_blank" rel="noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
                  <Terminal className="w-3 h-3" /> npm
                </a>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-xs font-semibold text-foreground">Source</p>
                <a href="https://github.com/hongyaok/skjson" target="_blank" rel="noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
                  <Github className="w-3 h-3" /> skjson (Python)
                </a>
                <a href="https://github.com/hongyaok/skjson-js" target="_blank" rel="noreferrer" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5">
                  <Github className="w-3 h-3" /> skjson-js
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
