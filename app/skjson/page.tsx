'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Package } from 'lucide-react'
import { Button } from '@/components/8starlabs-ui/button'
import Timeline, { TimelineItem, TimelineItemTitle, TimelineItemDescription } from '@/components/8starlabs-ui/timeline'
import StatusIndicator from '@/components/8starlabs-ui/status-indicator'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { LogoText } from '@/components/LogoText'
import { ThemeToggle } from '@/components/ThemeToggle'
import { AutoScrollTimeline } from '@/components/AutoScrollTimeline'
import { CodeBlock } from '@/components/CodeBlock'
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
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground"><LogoText text="{skjson}" /></h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            is a pure Python tool to export scikit-learn models to standard JSON. Compatible with Joblib and ONNX natively.
          </p>
          <div className="flex gap-4 mt-2 flex-wrap">
            <a href="https://github.com/hongyaok/skjson" target="_blank" rel="noreferrer" className="w-fit">
              <Button variant="outline" className="gap-2">
                <Github className="w-4 h-4" />
                skjson
              </Button>
            </a>
            <a href="https://pypi.org/project/skjson/" target="_blank" rel="noreferrer" className="w-fit">
              <Button variant="outline" className="gap-2">
                <Package className="w-4 h-4" />
                PyPI
              </Button>
            </a>
          </div>
        </FadeSection>

        <FadeSection className="gap-6">
          <h2 className="text-3xl font-extrabold">Installation</h2>
          <CodeBlock tabs={[{ label: 'Bash', language: 'bash', code: 'pip install skjson' }]} />
        </FadeSection>

        <FadeSection className="gap-6 mt-4">
          <h2 className="text-3xl font-extrabold">Quick Start</h2>
          <p className="text-muted-foreground">
            Export directly from `model.fit()` using `skjson.save(model, 'model.json')`.
          </p>
          <CodeBlock tabs={[
            {
              label: 'Python',
              language: 'python',
              code: `from sklearn.datasets import load_iris
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import skjson

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

clf = RandomForestClassifier(random_state=42).fit(X_train, y_train)

# Export the trained model to JSON
skjson.save(clf, 'demo.json')`
            }
          ]} />
        </FadeSection>

        <FadeSection className="gap-6 mt-4">
          <h2 className="text-3xl font-extrabold">Convert from Existing Models</h2>
          <p className="text-muted-foreground">
            Already saved your model? Convert from .joblib or .onnx directly to JSON without retraining.
          </p>
          <CodeBlock tabs={[
            {
              label: 'Joblib',
              language: 'python',
              code: `import skjson

# Convert a joblib-serialized sklearn model to JSON
skjson.joblib_to_json("model.joblib")
# → Creates "model.json" in the same directory`
            },
            {
              label: 'ONNX',
              language: 'python',
              code: `import skjson

# Convert an ONNX model to JSON
skjson.onnx_to_json("model.onnx")
# → Creates "model.json" in the same directory`
            }
          ]} />
        </FadeSection>

        {/* <FadeSection className="gap-6">
          <h2 className="text-3xl font-extrabold">Features & API</h2>
          <div className="flex flex-wrap gap-4">
            <Card className="w-80 transition-transform hover:scale-105">
              <CardHeader>
                <CardTitle className="text-xl">Native Export</CardTitle>
                <p className="text-muted-foreground text-sm mt-2">Export directly from `model.fit()` using `skjson.save(model, 'model.json')`.</p>
              </CardHeader>
            </Card>
            <Card className="w-80 transition-transform hover:scale-105">
              <CardHeader>
                <CardTitle className="text-xl">Joblib / ONNX Conversion</CardTitle>
                <p className="text-muted-foreground text-sm mt-2">Already saved your model? Convert from .joblib or .onnx directly to JSON without retraining.</p>
              </CardHeader>
            </Card>
          </div>
        </FadeSection> */}

        <FadeSection className="gap-6 pb-12">
          <h2 className="text-3xl font-extrabold">Supported Scikit-Learn Models</h2>
          <p className="text-muted-foreground">skjson natively exports the following models without additional configuration:</p>
          <div className="flex flex-wrap gap-4">
            <Card className="w-64">
              <CardHeader>
                <h4 className="font-semibold mb-2">Ensembles</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• RandomForestClassifier</li>
                  <li>• RandomForestRegressor</li>
                  <li>• GradientBoostingClassifier</li>
                </ul>
              </CardHeader>
            </Card>
            <Card className="w-64">
              <CardHeader>
                <h4 className="font-semibold mb-2">Linear Models</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• LogisticRegression</li>
                  <li>• LinearRegression</li>
                  <li>• Ridge / Lasso</li>
                </ul>
              </CardHeader>
            </Card>
            <Card className="w-64">
              <CardHeader>
                <h4 className="font-semibold mb-2">Preprocessing</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• StandardScaler</li>
                  <li>• MinMaxScaler</li>
                  <li>• OneHotEncoder</li>
                </ul>
              </CardHeader>
            </Card>
          </div>
        </FadeSection>

        <FadeSection className="gap-6 pb-12">
          <h2 className="text-3xl font-extrabold">Roadmap</h2>
          {/* Mobile Timeline */}
          <AutoScrollTimeline orientation="vertical" className="sm:hidden w-full px-4 h-[400px] border-y border-border/50 py-4">
            <Timeline orientation="vertical" alternating={false} alignment="top/left" className="w-full">
              <TimelineItem variant="default" customDot={<StatusIndicator state="active" />}>
                <TimelineItemTitle>Common sklearn models converted to JSON</TimelineItemTitle>
                <TimelineItemDescription>Completed</TimelineItemDescription>
              </TimelineItem>
              <TimelineItem variant="default" customDot={<StatusIndicator state="active" />}>
                <TimelineItemTitle>ONNX and joblib support</TimelineItemTitle>
                <TimelineItemDescription>Completed</TimelineItemDescription>
              </TimelineItem>
              <TimelineItem variant="secondary" hollow customDot={<StatusIndicator state="fixing" />}>
                <TimelineItemTitle>pkl support</TimelineItemTitle>
                <TimelineItemDescription>Ongoing</TimelineItemDescription>
              </TimelineItem>
              <TimelineItem variant="secondary" hollow customDot={<StatusIndicator state="fixing" />}>
                <TimelineItemTitle>sklearn pipeline support</TimelineItemTitle>
                <TimelineItemDescription>Ongoing</TimelineItemDescription>
              </TimelineItem>
              <TimelineItem variant="outline" hollow customDot={<StatusIndicator state="idle" />}>
                <TimelineItemTitle>sklearn.neural_network model support</TimelineItemTitle>
                <TimelineItemDescription>Idle</TimelineItemDescription>
              </TimelineItem>
            </Timeline>
          </AutoScrollTimeline>
          {/* Desktop Timeline */}
          <AutoScrollTimeline orientation="horizontal" className="hidden sm:block">
            <Timeline orientation="horizontal" alternating={true} alignment="top/left" horizItemSpacing={260} className="w-full min-w-max pt-16 pb-16">
              <TimelineItem variant="default" customDot={<StatusIndicator state="active" />}>
                <TimelineItemTitle>Common sklearn models converted to JSON</TimelineItemTitle>
                <TimelineItemDescription>Completed</TimelineItemDescription>
              </TimelineItem>
              <TimelineItem variant="default" customDot={<StatusIndicator state="active" />}>
                <TimelineItemTitle>ONNX and joblib support</TimelineItemTitle>
                <TimelineItemDescription>Completed</TimelineItemDescription>
              </TimelineItem>
              <TimelineItem variant="secondary" hollow customDot={<StatusIndicator state="fixing" />}>
                <TimelineItemTitle>pkl support</TimelineItemTitle>
                <TimelineItemDescription>Ongoing</TimelineItemDescription>
              </TimelineItem>
              <TimelineItem variant="secondary" hollow customDot={<StatusIndicator state="fixing" />}>
                <TimelineItemTitle>sklearn pipeline support</TimelineItemTitle>
                <TimelineItemDescription>Ongoing</TimelineItemDescription>
              </TimelineItem>
              <TimelineItem variant="outline" hollow customDot={<StatusIndicator state="idle" />}>
                <TimelineItemTitle>sklearn.neural_network model support</TimelineItemTitle>
                <TimelineItemDescription>Idle</TimelineItemDescription>
              </TimelineItem>
            </Timeline>
          </AutoScrollTimeline>
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
