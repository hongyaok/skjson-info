'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { LogoText } from '@/components/LogoText'
import { CodeBlock } from '@/components/CodeBlock'
import { DemoWidget } from '@/components/DemoWidget'
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
    <div className="min-h-screen bg-background text-foreground flex flex-col normal-case">
      <main className="flex-1 flex flex-col w-full max-w-5xl mx-auto px-6 py-12 gap-12">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="font-medium">Back to Home</span>
          </Link>
        </div>

        <FadeSection className="gap-4">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground"><LogoText text="{skjson-js}" /></h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Zero dependencies. 100% mathematical parity. Run your JSON models natively in any JS environment.
          </p>
          <div className="flex gap-4 mt-2 flex-wrap">
            <a href="https://github.com/hongyaok/skjson-js" target="_blank" rel="noreferrer" className="w-fit">
              <Button variant="outline" className="gap-2">
                <Github className="w-4 h-4" />
                skjson-js
              </Button>
            </a>
            <a href="https://www.npmjs.com/package/skjson-js" target="_blank" rel="noreferrer" className="w-fit">
              <Button variant="outline" className="gap-2">
                <Package className="w-4 h-4" />
                NPM
              </Button>
            </a>
          </div>
        </FadeSection>

        <FadeSection className="gap-6">
          <h2 className="text-3xl font-extrabold">Installation</h2>
          <CodeBlock tabs={[{ label: 'Bash', language: 'bash', code: 'npm install skjson-js' }]} />
        </FadeSection>

        <FadeSection className="gap-6">
          <h2 className="text-3xl font-extrabold">Capabilities</h2>
          <div className="flex flex-wrap gap-4">
            <Card className="w-80 transition-transform hover:scale-105">
              <CardHeader>
                <CardTitle className="text-xl">Universal</CardTitle>
                <p className="text-muted-foreground text-sm mt-2">Works in React, Vue, Vanilla JS, Node.js, and edge environments.</p>
              </CardHeader>
            </Card>
            <Card className="w-80 transition-transform hover:scale-105">
              <CardHeader>
                <CardTitle className="text-xl">Type-Safe</CardTitle>
                <p className="text-muted-foreground text-sm mt-2">Written in TypeScript, providing full autocomplete for \`.predict()\` and \`.predict_proba()\`. </p>
              </CardHeader>
            </Card>
          </div>
        </FadeSection>

        <FadeSection className="gap-6 mt-4 p-8 rounded-lg bg-secondary/30 border border-border items-center">
          <h2 className="text-3xl font-extrabold text-center mb-6">Interactive Inference Demo</h2>
          <DemoWidget />
        </FadeSection>

        <FadeSection className="gap-6">
          <h2 className="text-3xl font-extrabold">Inference Example</h2>
          <CodeBlock tabs={[
            {
              label: 'JavaScript',
              language: 'javascript',
              code: `import { loadModel } from 'skjson-js'

// Fetch your JSON file
const response = await fetch('model.json')
const modelData = await response.json()

const predictor = loadModel(modelData)

// Predict requires a 2D array: [[feature1, feature2, ...]]
const preds = predictor.predict([[5.1, 3.5, 1.4, 0.2]])
console.log(preds) // Output: [0]`
            }
          ]} />
        </FadeSection>

        <FadeSection className="gap-6 pb-12">
          <h2 className="text-3xl font-extrabold">Preprocessing Execution</h2>
          <p className="text-muted-foreground">
            If you exported a preprocessing model like \`StandardScaler\`, you can use the \`.transform()\` method natively:
          </p>
          <CodeBlock tabs={[
            {
              label: 'JavaScript',
              language: 'javascript',
              code: `const scaler = loadModel(scalerData)
const scaledFeatures = scaler.transform([[5.1, 3.5, 1.4, 0.2]])
console.log(scaledFeatures)`
            }
          ]} />
        </FadeSection>
      </main>
    </div>
  )
}
